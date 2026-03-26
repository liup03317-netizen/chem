import { ELEMENT_FAMILIES } from '../data/transformations.js';
import { GraphRenderer } from './graph-renderer.js';
import { DetailPanel } from './detail-panel.js';

class App {
  constructor() {
    this.currentElement = 'C';
    this.renderer = null;
    this.panel = null;
    
    this.init();
  }
  
  init() {
    // 1. Initialize UI components
    this.panel = new DetailPanel();
    
    // 2. Initialize Canvas Renderer
    const canvas = document.getElementById('graph-canvas');
    this.renderer = new GraphRenderer(canvas);
    
    // 绑定渲染器的回调事件
    this.renderer.onNodeClick = (node, relatedEdges) => {
      this.panel.showNodeDetail(node, relatedEdges, ELEMENT_FAMILIES[this.currentElement].color);
      this.renderer.highlightNodeAndEdges(node);
    };
    
    this.renderer.onEdgeClick = (edge) => {
      const sourceNode = ELEMENT_FAMILIES[this.currentElement].nodes.find(n => n.id === edge.from);
      const targetNode = ELEMENT_FAMILIES[this.currentElement].nodes.find(n => n.id === edge.to);
      this.panel.showEdgeDetail(edge, sourceNode, targetNode, ELEMENT_FAMILIES[this.currentElement].color);
      this.renderer.highlightEdge(edge);
    };
    
    this.renderer.onBackgroundClick = () => {
      this.panel.close();
      this.renderer.resetHighlight();
    };
    
    // 3. Bind UI events
    this.bindEvents();
    
    // 4. Handle resize
    window.addEventListener('resize', () => {
      this.renderer.resize();
    });
    
    // 5. Load initial data
    this.loadElementMap(this.currentElement);
  }
  
  bindEvents() {
    // 标签切换事件
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // 移除所有 active 类
        tabs.forEach(t => t.classList.remove('active'));
        // 添加当前 active 类
        const btn = e.currentTarget;
        btn.classList.add('active');
        
        // 切换元素
        const elementId = btn.getAttribute('data-element');
        if (elementId !== this.currentElement) {
          this.currentElement = elementId;
          this.panel.close();
          this.loadElementMap(elementId);
        }
      });
    });
    
    // 面板关闭事件由面板自己处理过了，如果是面板触发的关闭，通知渲染器重置高亮
    this.panel.element.addEventListener('panel-closed', () => {
      this.renderer.resetHighlight();
    });
  }
  
  loadElementMap(elementId) {
    const data = ELEMENT_FAMILIES[elementId];
    if (data) {
      this.renderer.setData(data);
    }
  }
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
