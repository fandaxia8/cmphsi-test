// restrict.js

// 禁止右键菜单
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// 禁用 F12 键
document.addEventListener('keydown', function (event) {
    if (event.key === 'F12') {
        event.preventDefault();
    }
});

// 禁用 Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+C 等快捷键
document.addEventListener('keydown', function (event) {
    if (
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) ||
        (event.ctrlKey && event.key === 'U') ||
        (event.ctrlKey && event.key === 'S') ||
        (event.ctrlKey && (event.key === 'C' || event.key === 'V')) ||
        event.key === 'F12'
    ) {
        event.preventDefault();
    }
});

// 隐藏特定的页面元素
document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.hidden');
    elements.forEach(function (el) {
        el.style.display = 'none';
    });
});

// 禁用拖放操作
document.addEventListener('dragstart', function (event) {
    event.preventDefault();
});

// 禁用文本选择
// document.addEventListener('mousedown', function (event) {
//     event.preventDefault();
// });

// 防止打开开发者工具（通过检测 window.devtools）
var devtools = /./;
devtools.toString = function () {
    window.location.href = 'about:blank'; // 防止打开开发者工具
};

// 禁用页面缩放
document.addEventListener('wheel', function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

// 点击延迟跳转脚本
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.id = '__top_progress_bar__';
    progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0;
    background-color: #00f821ff;
    z-index: 9999;
    transition: width linear;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  `;
    document.body.appendChild(progressBar);
    return progressBar;
};

// 全局点击拦截
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
    }

    e.preventDefault();
    const progressBar = document.getElementById('__top_progress_bar__') || createProgressBar();

    // 生成随机延迟（0.5-3秒）
    const randomDelay = Math.floor(Math.random() * 2500) + 500;

    // 关键改进：进度条动画时长 = 随机延迟时间
    progressBar.style.transition = `width ${randomDelay}ms linear`;

    // 重置并启动进度条动画
    progressBar.style.width = '0';
    void progressBar.offsetWidth; // 强制重绘
    progressBar.style.width = '100%';

    // 延迟跳转
    setTimeout(() => {
        window.location.href = link.href;
    }, randomDelay);
});

// 清理残留进度条
window.addEventListener('beforeunload', () => {
    const bar = document.getElementById('__top_progress_bar__');
    if (bar) bar.remove();
});