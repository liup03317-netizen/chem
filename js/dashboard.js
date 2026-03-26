document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  loadStats();
});

function initParticles() {
  const container = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机大小
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 随机位置
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100; // Start below screen potentially
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    
    // 随机颜色
    const colors = ['#00f0ff', '#b500ff', '#00ff66', '#ffffff'];
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // 随机动画时长和延迟
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
  }
}

function loadStats() {
  try {
    const records = JSON.parse(localStorage.getItem('learning_records') || '{}');
    let toReviewCount = 0;
    let masteredCount = 0;
    const now = new Date();
    
    Object.values(records).forEach(record => {
      // 检查是否待复习
      if (record.markedForReview) {
        let isDue = false;
        if (!record.nextReview) {
          isDue = true;
        } else {
          const nextDate = new Date(record.nextReview);
          if (nextDate <= now) isDue = true;
        }
        
        if (isDue) {
          toReviewCount++;
        }
        
        // 如果复习间隔大于等于5天，认为已永久掌握
        if (record.interval >= 5) {
          masteredCount++;
        }
      }
    });
    
    // 更新DOM（带上涨数字动画效果）
    animateValue("dashboard-to-review", 0, toReviewCount, 1500, " <small>个配平方案</small>");
    animateValue("dashboard-mastered", 0, masteredCount, 2000, " <small>个方程式</small>");
    
  } catch (err) {
    console.error("Failed to load dashboard stats:", err);
  }
}

function animateValue(id, start, end, duration, suffix = "") {
  const obj = document.getElementById(id);
  if (!obj) return;
  
  if (end === 0) {
    obj.innerHTML = `0${suffix}`;
    return;
  }
  
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // ease-out-quart
    const easeOut = 1 - Math.pow(1 - progress, 4);
    
    const currentCount = Math.floor(easeOut * (end - start) + start);
    obj.innerHTML = `${currentCount}${suffix}`;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = `${end}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}
