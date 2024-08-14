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
