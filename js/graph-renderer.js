import { NODE_COLORS } from '../data/transformations.js';

export class GraphRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Config
    this.config = {
      nodeRadius: 36,
      centerNodeRadius: 48,
      arrowSize: 12,
      font: '700 14px "Noto Sans SC", sans-serif',
      centerFont: '900 20px "Noto Sans SC", sans-serif',
      padding: 100 // 边距
    };
    
    // State
    this.data = { nodes: [], edges: [] };
    this.nodesCount = 0;
    this.width = 0;
    this.height = 0;
    
    // Interaction state
    this.hoverNode = null;
    this.hoverEdge = null;
    this.activeNode = null;
    this.activeEdge = null;
    this.mousePoint = { x: 0, y: 0 };
    
    // Physics / Positions
    this.positions = new Map(); // nodeId -> {x, y, r}
    this.edgePaths = new Map(); // edgeId -> bezier curve info
    
    // Animation frame
    this.animationId = null;
    this.time = 0;
    
    // Callbacks
    this.onNodeClick = null;
    this.onEdgeClick = null;
    this.onBackgroundClick = null;
    
    this.init();
  }
  
  init() {
    this.resize();
    this.bindEvents();
    this.startAnimation();
  }
  
  resize() {
    const parent = this.canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    
    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.width = rect.width;
    this.height = rect.height;
    
    // Scale context
    this.ctx.scale(dpr, dpr);
    
    // Recalculate layout if data exists
    if (this.data.nodes.length > 0) {
      this.calculateLayout();
    }
  }
  
  setData(familyData) {
    this.data = familyData;
    this.nodesCount = familyData.nodes.length;
    this.resetHighlight();
    this.calculateLayout();
  }
  
  resetHighlight() {
    this.activeNode = null;
    this.activeEdge = null;
  }
  
  highlightNodeAndEdges(node) {
    this.activeNode = node;
    this.activeEdge = null;
  }
  
  highlightEdge(edge) {
    this.activeEdge = edge;
    this.activeNode = null;
  }
  
  /**
   * 计算节点布局 - 使用改进的向心布局
   * 中间节点在中心，其他节点环绕四周
   */
  calculateLayout() {
    this.positions.clear();
    this.edgePaths.clear();
    
    if (this.nodesCount === 0) return;
    
    const centerX = this.width / 2;
    // 稍微偏左，给右侧面板留空间
    const renderCenterX = this.width > 800 ? centerX - 100 : centerX;
    const centerY = this.height / 2;
    
    const centerNode = this.data.nodes.find(n => n.isCenter);
    const otherNodes = this.data.nodes.filter(n => !n.isCenter);
    
    // 1. 设置中心节点
    if (centerNode) {
      this.positions.set(centerNode.id, {
        x: renderCenterX,
        y: centerY,
        r: this.config.centerNodeRadius,
        node: centerNode
      });
    }
    
    // 2. 环绕排列其他节点
    const radius = Math.min(this.width, this.height) / 2 - this.config.padding - 40;
    const angleStep = (Math.PI * 2) / otherNodes.length;
    
    otherNodes.forEach((node, i) => {
      // 从正上方开始顺时针排列
      const angle = i * angleStep - Math.PI / 2;
      this.positions.set(node.id, {
        x: renderCenterX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        r: this.config.nodeRadius,
        node: node
      });
    });
    
    // 3. 计算边路径 (贝塞尔曲线核心控制点)
    this.data.edges.forEach(edge => {
      const p1 = this.positions.get(edge.from);
      const p2 = this.positions.get(edge.to);
      if (!p1 || !p2) return;
      
      // 检查是否有双向边（如果有，需要将曲线错开）
      const hasReverseEdge = this.data.edges.some(e => e.from === edge.to && e.to === edge.from);
      const isSelfEdge = edge.from === edge.to;
      
      // 计算控制点以绘制曲线
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 中点
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      
      // 法线向量
      const nx = -dy / distance;
      const ny = dx / distance;
      
      // 控制点偏移量
      let offset = distance * 0.15;
      
      // 如果有双向边，增加偏移度避免重叠
      if (hasReverseEdge) {
        offset = distance * 0.25;
      }
      
      // 曲线控制点
      const cx = midX + nx * offset;
      const cy = midY + ny * offset;
      
      this.edgePaths.set(edge.id, {
        p1, p2, cx, cy, distance, edge
      });
    });
  }
  
  /* ==========================================
   * Rendering Loop
   * ========================================== */
  
  startAnimation() {
    const loop = (timestamp) => {
      this.time = timestamp;
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }
  
  draw() {
    // 1. Clear background
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    if (this.nodesCount === 0) return;
    
    // 2. Draw Edges
    this.edgePaths.forEach(path => this.drawEdge(path));
    
    // 3. Draw Nodes
    this.positions.forEach(pos => this.drawNode(pos));
    
    // 4. Draw node tooltips (if hovering)
    if (this.hoverNode && this.hoverNode !== this.activeNode) {
      this.drawTooltip(this.positions.get(this.hoverNode.id));
    }
  }
  
  drawEdge(path) {
    const { p1, p2, cx, cy, edge } = path;
    
    // 边缘状态判断
    let isActive = false;
    let isRelatedToActiveNode = false;
    let isHover = this.hoverEdge && this.hoverEdge.id === edge.id;
    let isRelatedToHoverNode = this.hoverNode && (edge.from === this.hoverNode.id || edge.to === this.hoverNode.id);
    
    if (this.activeEdge) {
      isActive = this.activeEdge.id === edge.id;
    } else if (this.activeNode) {
      isRelatedToActiveNode = edge.from === this.activeNode.id || edge.to === this.activeNode.id;
    }
    
    // 如果存在活跃节点/边，非活跃的变暗
    const fadeOut = (this.activeNode && !isRelatedToActiveNode) || 
                   (this.activeEdge && !isActive);
                   
    // 如果存在悬停节点，非相关的变暗
    const dimFromHover = (this.hoverNode && !isRelatedToHoverNode) ||
                         (this.hoverEdge && !isHover);
    
    const alpha = (fadeOut || dimFromHover) && !isActive && !isHover ? 0.15 : (isActive || isHover ? 1 : 0.4);
    
    // 基础线条颜色 - 黏土风用深棕灰色或主题色
    const baseEdgeColor = `rgba(140, 123, 106, ${alpha})`;
    const activeEdgeColor = this.data.color;
    const strokeColor = isActive || isHover ? activeEdgeColor : baseEdgeColor;
    
    // Draw the curve
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
    
    // 线条样式
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = isActive || isHover ? 4 : 2;
    this.ctx.stroke();
    
    // 画箭头
    const t = 0.55; // 箭头在曲线上的位置 (0~1)
    
    // 贝塞尔曲线上的点公式
    const arrowX = (1-t)*(1-t)*p1.x + 2*(1-t)*t*cx + t*t*p2.x;
    const arrowY = (1-t)*(1-t)*p1.y + 2*(1-t)*t*cy + t*t*p2.y;
    
    // 切线斜率公式
    const dx = 2*(1-t)*(cx - p1.x) + 2*t*(p2.x - cx);
    const dy = 2*(1-t)*(cy - p1.y) + 2*t*(p2.y - cy);
    const angle = Math.atan2(dy, dx);
    
    this.ctx.save();
    this.ctx.translate(arrowX, arrowY);
    this.ctx.rotate(angle);
    
    this.ctx.beginPath();
    this.ctx.moveTo(-this.config.arrowSize, -this.config.arrowSize/2);
    this.ctx.lineTo(0, 0);
    this.ctx.lineTo(-this.config.arrowSize, this.config.arrowSize/2);
    
    this.ctx.fillStyle = strokeColor;
    this.ctx.fill();
    this.ctx.restore();
    
    // 如果悬停在边上，显示反应条件或者方程的小提示
    if (isHover && !this.activeEdge) {
      this.drawEdgeLabel(path, arrowX, arrowY);
    }
    
    // 对于活跃的边，添加流动的粒子光效
    if (isActive || isRelatedToActiveNode) {
      // 使用基于时间的动画粒子
      const particleT = (this.time / 2000) % 1; // 2秒一个循环
      const px = (1-particleT)*(1-particleT)*p1.x + 2*(1-particleT)*particleT*cx + particleT*particleT*p2.x;
      const py = (1-particleT)*(1-particleT)*p1.y + 2*(1-particleT)*particleT*cy + particleT*particleT*p2.y;
      
      this.ctx.beginPath();
      this.ctx.arc(px, py, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff';
      this.ctx.shadowColor = 'rgba(0,0,0,0.2)';
      this.ctx.shadowBlur = 4;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;
      this.ctx.fill();
      
      // 清除粒子阴影避免影响其他绘制
      this.ctx.shadowColor = 'transparent';
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
    }
  }
  
  drawEdgeLabel(path, x, y) {
    const text = path.edge.condition || path.edge.type;
    if (!text) return;
    
    this.ctx.font = '700 12px "Noto Sans SC"';
    const padding = 8;
    const textWidth = this.ctx.measureText(text).width;
    
    this.ctx.shadowColor = 'rgba(180, 170, 150, 0.4)';
    this.ctx.shadowBlur = 6;
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    
    this.ctx.fillStyle = '#f8f6f0';
    this.ctx.beginPath();
    this.ctx.roundRect(x - textWidth/2 - padding, y + 15, textWidth + padding*2, 24, 12);
    this.ctx.fill();
    
    this.ctx.shadowColor = 'transparent';
    
    this.ctx.fillStyle = '#5c4d3c';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y + 27);
  }
  
  drawNode(pos) {
    const { x, y, r, node } = pos;
    const color = NODE_COLORS[node.type] || NODE_COLORS.element;
    
    // 边缘状态判断
    let isActive = false;
    let isRelatedToActiveNode = false;
    
    if (this.activeNode) {
      isActive = this.activeNode.id === node.id;
      // 检查是否与活跃节点相连
      isRelatedToActiveNode = this.data.edges.some(e => 
        (e.from === this.activeNode.id && e.to === node.id) || 
        (e.to === this.activeNode.id && e.from === node.id)
      );
    } else if (this.activeEdge) {
      isActive = this.activeEdge.from === node.id || this.activeEdge.to === node.id;
    }
    
    let isHover = this.hoverNode && this.hoverNode.id === node.id;
    
    // 淡出不相关的节点
    const fadeOut = this.activeNode && !isActive && !isRelatedToActiveNode;
    const globalAlpha = fadeOut ? 0.4 : 1;
    
    this.ctx.globalAlpha = globalAlpha;
    
    // 缩放动效
    let targetR = r;
    if (isActive || isHover) {
      targetR = r * 1.05; // 轻微放大
    }
    
    // 黏土风外阴影
    this.ctx.shadowColor = 'rgba(180, 170, 150, 0.5)';
    this.ctx.shadowBlur = isActive || isHover ? 16 : 10;
    this.ctx.shadowOffsetX = isActive || isHover ? 8 : 4;
    this.ctx.shadowOffsetY = isActive || isHover ? 8 : 4;
    
    // 画圆形节点主体
    this.ctx.beginPath();
    this.ctx.arc(x, y, targetR, 0, Math.PI * 2);
    
    // 黏土风渐变填充 (模拟立体感凸起)
    const gradient = this.ctx.createLinearGradient(x - targetR, y - targetR, x + targetR, y + targetR);
    gradient.addColorStop(0, this._lightenColor(color, 20));
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(1, this._darkenColor(color, 15));
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // 关闭正阴影，画一个亮白色的反方向阴影以增强黏土感
    this.ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    this.ctx.shadowBlur = 8;
    this.ctx.shadowOffsetX = -4;
    this.ctx.shadowOffsetY = -4;
    this.ctx.fill();
    
    // 恢复阴影
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    
    // 描边 (高亮态显示环绕线)
    if (isActive) {
      this.ctx.strokeStyle = '#5c4d3c';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
    
    // 画文字
    this.ctx.fillStyle = '#5c4d3c'; // 深棕色字体
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = node.isCenter ? this.config.centerFont : this.config.font;
    
    this.ctx.fillText(node.label, x, y);
    
    this.ctx.globalAlpha = 1; // 恢复
  }
  
  drawTooltip(pos) {
    if (!pos) return;
    const { x, y, r, node } = pos;
    const text = node.name;
    
    this.ctx.font = '14px "Noto Sans SC"';
    const padding = 10;
    const textWidth = this.ctx.measureText(text).width;
    
    const tooltipY = y - r - 30;
    
    // 黏土风气泡阴影
    this.ctx.shadowColor = 'rgba(180, 170, 150, 0.3)';
    this.ctx.shadowBlur = 8;
    this.ctx.shadowOffsetX = 4;
    this.ctx.shadowOffsetY = 4;
    
    this.ctx.fillStyle = '#f8f6f0';
    this.ctx.beginPath();
    this.ctx.roundRect(x - textWidth/2 - padding, tooltipY - 14, textWidth + padding*2, 28, 14);
    this.ctx.fill();
    
    this.ctx.shadowColor = 'transparent';
    
    this.ctx.fillStyle = '#5c4d3c';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, tooltipY);
  }
  
  /* ==========================================
   * Interaction Handling
   * ========================================== */
  
  bindEvents() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('click', this.handleClick.bind(this));
    
    // 鼠标离开画布清理悬停状态
    this.canvas.addEventListener('mouseleave', () => {
      this.hoverNode = null;
      this.hoverEdge = null;
      this.canvas.style.cursor = 'default';
    });
  }
  
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    // Using logical coordinates from bounding box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 1. Check Node Intersection
    let foundNode = null;
    for (const [id, pos] of this.positions.entries()) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      if (dx*dx + dy*dy <= pos.r*pos.r) {
        foundNode = pos.node;
        break;
      }
    }
    
    // 2. Check Edge Intersection (if no node found)
    let foundEdge = null;
    if (!foundNode) {
      // 一个简单距离到二次贝塞尔曲线的近似检测
      for (const [id, path] of this.edgePaths.entries()) {
        const dist = this._getDistanceToBezier(x, y, path.p1, path.cx, path.cy, path.p2);
        if (dist < 10) { // 10px 容差
          foundEdge = path.edge;
          break;
        }
      }
    }
    
    if (this.hoverNode !== foundNode || this.hoverEdge !== foundEdge) {
      this.hoverNode = foundNode;
      this.hoverEdge = foundEdge;
      this.canvas.style.cursor = (foundNode || foundEdge) ? 'pointer' : 'default';
    }
  }
  
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 1. Check Node Intersection
    let clickedNode = null;
    for (const [id, pos] of this.positions.entries()) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      if (dx*dx + dy*dy <= pos.r*pos.r) {
        clickedNode = pos.node;
        break;
      }
    }
    
    // 2. Check Edge Intersection
    let clickedEdge = null;
    if (!clickedNode) {
      for (const [id, path] of this.edgePaths.entries()) {
        const dist = this._getDistanceToBezier(x, y, path.p1, path.cx, path.cy, path.p2);
        if (dist < 10) { 
          clickedEdge = path.edge;
          break;
        }
      }
    }

    if (clickedNode) {
      if (this.onNodeClick) {
        const relatedEdges = this.data.edges.filter(edge => 
          edge.from === clickedNode.id || edge.to === clickedNode.id
        ).map(edge => ({
          ...edge,
          reactionType: edge.from === clickedNode.id ? '✅ 反应物' : '🎯 生成物'
        }));
        this.onNodeClick(clickedNode, relatedEdges);
      }
    } else if (clickedEdge) {
      if (this.onEdgeClick) {
        this.onEdgeClick(clickedEdge);
      }
    } else {
      if (this.onBackgroundClick) {
        this.onBackgroundClick();
      }
    }
  }
  
  /* ==========================================
   * Helper Math Functions
   * ========================================== */
  
  // 简化的颜色变暗函数
  _darkenColor(hex, amt) {
    if (!hex) return '#000000';
    let col = hex.replace(/^#/, '');
    if (col.length === 3) col = col[0]+col[0]+col[1]+col[1]+col[2]+col[2];
    let num = parseInt(col, 16);
    let r = (num >> 16) - amt;
    let b = ((num >> 8) & 0x00FF) - amt;
    let g = (num & 0x0000FF) - amt;
    
    if (r < 0) r = 0;
    if (b < 0) b = 0;
    if (g < 0) g = 0;
    
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }
  
  // 简化的颜色变亮函数
  _lightenColor(hex, amt) {
    if (!hex) return '#ffffff';
    let col = hex.replace(/^#/, '');
    if (col.length === 3) col = col[0]+col[0]+col[1]+col[1]+col[2]+col[2];
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00FF) + amt;
    let g = (num & 0x0000FF) + amt;
    
    if (r > 255) r = 255;
    if (b > 255) b = 255;
    if (g > 255) g = 255;
    
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }
  
  // 近似的点到二次贝塞尔曲线最短距离计算 (采样法)
  _getDistanceToBezier(px, py, p1, cx, cy, p2) {
    let minDist = Infinity;
    const steps = 20; // 降低采样率换取性能
    
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cx + t * t * p2.x;
        const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cy + t * t * p2.y;
        
        const dx = x - px;
        const dy = y - py;
        const distSq = dx*dx + dy*dy;
        
        if (distSq < minDist) minDist = distSq;
    }
    
    return Math.sqrt(minDist);
  }
}
