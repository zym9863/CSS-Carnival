// CSS Carnival 控制脚本
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const amusementPark = document.querySelector('.amusement-park');
    const body = document.body;
    
    let isPaused = false;
    
    // 播放动画
    function playAnimations() {
        body.classList.remove('paused');
        isPaused = false;
        
        // 添加视觉反馈
        playBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playBtn.style.transform = '';
        }, 150);
        
        // 显示提示信息
        showMessage('🎉 动画开始播放！', 'success');
    }
    
    // 暂停动画
    function pauseAnimations() {
        body.classList.add('paused');
        isPaused = true;
        
        // 添加视觉反馈
        pauseBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            pauseBtn.style.transform = '';
        }, 150);
        
        // 显示提示信息
        showMessage('⏸️ 动画已暂停', 'warning');
    }
    
    // 重置动画
    function resetAnimations() {
        // 先暂停所有动画
        body.classList.add('paused');
        
        // 短暂延迟后重新开始
        setTimeout(() => {
            body.classList.remove('paused');
            isPaused = false;
            
            // 添加视觉反馈
            resetBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                resetBtn.style.transform = '';
            }, 150);
            
            // 显示提示信息
            showMessage('🔄 动画已重置！', 'info');
        }, 100);
    }
    
    // 显示消息提示
    function showMessage(text, type = 'info') {
        // 移除现有的消息
        const existingMessage = document.querySelector('.message-toast');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 创建新消息
        const message = document.createElement('div');
        message.className = `message-toast message-${type}`;
        message.textContent = text;
        
        // 添加样式
        Object.assign(message.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '25px',
            color: 'white',
            fontFamily: 'Fredoka One, cursive',
            fontSize: '14px',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        });
        
        // 根据类型设置背景色
        const colors = {
            success: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
            warning: 'linear-gradient(45deg, #FF9800, #FFC107)',
            info: 'linear-gradient(45deg, #2196F3, #03DAC6)',
            error: 'linear-gradient(45deg, #F44336, #E91E63)'
        };
        
        message.style.background = colors[type] || colors.info;
        
        // 添加到页面
        document.body.appendChild(message);
        
        // 显示动画
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 10);
        
        // 自动隐藏
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // 绑定事件监听器
    if (playBtn) {
        playBtn.addEventListener('click', playAnimations);
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', pauseAnimations);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAnimations);
    }
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        switch(e.key.toLowerCase()) {
            case ' ': // 空格键切换播放/暂停
                e.preventDefault();
                if (isPaused) {
                    playAnimations();
                } else {
                    pauseAnimations();
                }
                break;
            case 'r': // R键重置
                e.preventDefault();
                resetAnimations();
                break;
        }
    });
    
    // 添加鼠标交互效果
    const interactiveElements = document.querySelectorAll('.ferris-wheel, .roller-coaster, .carousel');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = '';
            this.style.transform = '';
        });
        
        element.addEventListener('click', function() {
            // 点击效果
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1.02)';
            }, 100);
            
            // 显示点击消息
            const messages = [
                '🎪 欢迎来到魔法游乐园！',
                '🎠 旋转木马真有趣！',
                '🎡 摩天轮转得好快！',
                '🎢 过山车真刺激！'
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showMessage(randomMessage, 'success');
        });
    });
    
    // 欢迎消息
    setTimeout(() => {
        showMessage('🎪 欢迎来到CSS魔法游乐园！按空格键可以暂停/播放动画', 'info');
    }, 1000);
    
    // 彩蛋：连续点击标题的特殊效果
    const title = document.querySelector('.park-title');
    let clickCount = 0;
    let clickTimeout;
    
    if (title) {
        title.addEventListener('click', function() {
            clickCount++;
            
            // 清除之前的超时
            clearTimeout(clickTimeout);
            
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            if (clickCount >= 5) {
                // 彩蛋效果
                document.body.style.animation = 'gradientShift 1s ease infinite';
                showMessage('🎉 你发现了彩蛋！狂欢模式开启！', 'success');
                
                // 3秒后恢复正常
                setTimeout(() => {
                    document.body.style.animation = '';
                    clickCount = 0;
                }, 3000);
            }
            
            // 5秒后重置点击计数
            clickTimeout = setTimeout(() => {
                clickCount = 0;
            }, 5000);
        });
    }
});
