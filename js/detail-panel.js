import { NODE_COLORS } from '../data/transformations.js';

export class DetailPanel {
  constructor() {
    this.element = document.getElementById('detail-panel');
    this.content = document.getElementById('panel-content');
    this.closeBtn = document.getElementById('close-panel-btn');
    this.toast = document.getElementById('toast');
    
    this.isOpen = false;
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.closeBtn.addEventListener('click', () => {
      this.close();
      // 触发自定义事件通知外部
      const event = new CustomEvent('panel-closed');
      this.element.dispatchEvent(event);
    });
  }
  
  open() {
    this.isOpen = true;
    this.element.classList.add('open');
  }
  
  close() {
    this.isOpen = false;
    this.element.classList.remove('open');
  }
  
  /**
   * 显示节点的详情及相关的反应列表
   */
  showNodeDetail(node, relatedEdges, themeColor) {
    let html = `
      <div class="detail-card">
        <div class="detail-header" style="border-bottom-color: ${themeColor}40">
          <span class="detail-badge" style="color: ${themeColor}; background: ${themeColor}20; border-color: ${themeColor}40">${node.label}</span>
          <h2 class="detail-title">${node.name}</h2>
        </div>
        
        <h3 style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px;">相关转化反应 (${relatedEdges.length})</h3>
        <div class="reaction-list">
    `;
    
    relatedEdges.forEach(edge => {
      html += this._createReactionCard(edge, edge.reactionType);
    });
    
    html += `
        </div>
      </div>
    `;
    
    this.content.innerHTML = html;
    this._bindReactionButtons();
    this.open();
  }
  
  /**
   * 显示单条连线（反应）详情
   */
  showEdgeDetail(edge, sourceNode, targetNode, themeColor) {
    let html = `
      <div class="detail-card">
        <div class="detail-header" style="border-bottom-color: ${themeColor}40">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
            <span class="detail-badge" style="color: ${themeColor}; background: ${themeColor}20; border-color: ${themeColor}40">${sourceNode.label}</span>
            <span style="color: var(--text-secondary);">→</span>
            <span class="detail-badge" style="color: ${themeColor}; background: ${themeColor}20; border-color: ${themeColor}40">${targetNode.label}</span>
          </div>
          <h2 class="detail-title">${edge.description || '化学反应'}</h2>
        </div>
        
        <div class="reaction-list">
    `;
    
    html += this._createReactionCard(edge, edge.type);
    
    html += `
        </div>
      </div>
    `;
    
    this.content.innerHTML = html;
    this._bindReactionButtons();
    this.open();
  }
  
  _createReactionCard(edge, reactionType) {
    const isAdded = this._checkIfAddedToReview(edge.id);
    const btnClass = isAdded ? 'action-btn added' : 'action-btn';
    const btnText = isAdded ? '✓ 已在复习计划' : '⭐ 加入复习计划';
    const condition = edge.condition ? `条件: ${edge.condition}` : '常温';
    const typeLabel = reactionType ? `${reactionType} · ${edge.type}` : edge.type;
    
    return `
      <div class="reaction-item">
        <div class="reaction-eq">${edge.equation}</div>
        <div class="reaction-meta">
          <span>🏷️ ${typeLabel}</span>
          <span>🌡️ ${condition}</span>
        </div>
        <button class="${btnClass}" data-id="${edge.id}" data-action="add-review">
          ${btnText}
        </button>
      </div>
    `;
  }
  
  _bindReactionButtons() {
    const btns = this.content.querySelectorAll('[data-action="add-review"]');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this._addToReview(id);
        
        // 更新按钮状态
        const btn = e.currentTarget;
        btn.className = 'action-btn added';
        btn.innerHTML = '✓ 已在复习计划';
        
        // 显示提示
        this._showToast();
      });
    });
  }
  
  _checkIfAddedToReview(reactionId) {
    try {
      const records = JSON.parse(localStorage.getItem('learning_records') || '{}');
      return records[reactionId] && records[reactionId].markedForReview;
    } catch (e) {
      return false;
    }
  }
  
  _addToReview(reactionId) {
    try {
      // 模拟阶段一的 localStorage 共享
      const records = JSON.parse(localStorage.getItem('learning_records') || '{}');
      records[reactionId] = records[reactionId] || {};
      records[reactionId].markedForReview = true;
      records[reactionId].nextReview = new Date().toISOString(); 
      records[reactionId].interval = 0;
      records[reactionId].source = 'transform_map'; // 标记来源
      localStorage.setItem('learning_records', JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save learning record:', e);
    }
  }
  
  _showToast() {
    this.toast.classList.add('show');
    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2500);
  }
}
