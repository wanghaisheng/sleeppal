// App演示控制脚本
(function() {
    // 演示页面序列
    const demoSequence = [
        'login.html',
        'onboarding-1.html',
        'onboarding-2.html',
        'onboarding-3.html',
        'paywall.html',
        'home.html'
    ];
    
    let currentDemoPage = 0;
    let demoModal;
    let demoFrame;
    let isAutoPlaying = false;
    let autoPlayInterval;
    
    // 初始化
    function init() {
        demoModal = document.getElementById('app-demo-modal');
        demoFrame = document.getElementById('app-demo-frame');
        
        // 如果元素不存在，终止初始化
        if (!demoModal || !demoFrame) return;
        
        // 点击打开演示按钮
        const demoButtons = document.querySelectorAll('.open-app-demo');
        demoButtons.forEach(btn => {
            btn.addEventListener('click', openDemo);
        });
        
        // 关闭演示按钮
        const closeButton = document.getElementById('close-demo');
        if (closeButton) {
            closeButton.addEventListener('click', closeDemo);
        }
        
        // 监听iframe消息
        window.addEventListener('message', handleDemoMessage);
        
        // ESC键关闭演示
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && demoModal && !demoModal.classList.contains('hidden')) {
                closeDemo();
            }
        });
    }
    
    // 打开演示
    function openDemo(e) {
        e.preventDefault();
        
        if (!demoModal || !demoFrame) return;
        
        // Clear any previous login data
        localStorage.removeItem('sleeppal_logged_in');
        localStorage.removeItem('sleeppal_user');
        localStorage.removeItem('sleeppal_onboarded');
        localStorage.removeItem('sleeppal_demo');
        
        // 重置到第一页
        currentDemoPage = 0;
        loadDemoPage(currentDemoPage);
        
        // 显示模态窗口
        demoModal.classList.remove('hidden');
        demoModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // 不自动播放，等用户登录
        // startAutoPlay();
    }
    
    // 关闭演示
    function closeDemo() {
        if (!demoModal) return;
        
        demoModal.classList.add('hidden');
        demoModal.classList.remove('flex');
        document.body.style.overflow = '';
        
        // 停止自动播放
        stopAutoPlay();
    }
    
    // 加载演示页面
    function loadDemoPage(index) {
        if (index >= 0 && index < demoSequence.length) {
            currentDemoPage = index;
            demoFrame.src = demoSequence[index];
        }
    }
    
    // Handle demo message
    function handleDemoMessage(event) {
        if (event.data.type === 'demoAction') {
            switch(event.data.action) {
                case 'next':
                    // Move to next page
                    if (currentDemoPage < demoSequence.length - 1) {
                        loadDemoPage(currentDemoPage + 1);
                    }
                    break;
                    
                case 'prev':
                    // Go back to previous page
                    if (currentDemoPage > 0) {
                        loadDemoPage(currentDemoPage - 1);
                    }
                    break;
                    
                case 'close':
                    // Close demo
                    closeDemo();
                    break;
            }
        }
    }
    
    // 启动自动播放
    function startAutoPlay() {
        if (isAutoPlaying) return;
        
        isAutoPlaying = true;
        autoPlayInterval = setInterval(() => {
            if (currentDemoPage < demoSequence.length - 1) {
                loadDemoPage(currentDemoPage + 1);
            } else {
                stopAutoPlay();
            }
        }, 3000); // 每3秒自动前进一页
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            isAutoPlaying = false;
        }
    }
    
    // 文档加载完成后初始化
    document.addEventListener('DOMContentLoaded', init);
})();