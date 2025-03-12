// 多语言支持模块
(function() {
    // 存储当前语言
    let currentLang = localStorage.getItem('language') || 'zh';
    
    // 语言数据
    let translations = {};
    
    // 初始化
    function init() {
        // 设置当前语言显示
        document.getElementById('current-language').textContent = currentLang === 'zh' ? '中文' : 'English';
        
        // 加载语言文件
        loadTranslations(currentLang);
        
        // 监听语言切换事件
        setupLanguageSwitcher();
    }
    
    // 加载翻译文件
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`locale/${lang}.json`);
            translations = await response.json();
            applyTranslations();
            
            // 更新HTML语言属性
            document.documentElement.lang = lang;
            
            // 保存语言选择到本地存储
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }
    
    // 应用翻译
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            
            // 处理嵌套键 (如 "nav.home")
            const value = getNestedTranslation(key, translations);
            
            if (value) {
                // 如果元素是input或textarea，更新placeholder或value
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.getAttribute('placeholder')) {
                        el.setAttribute('placeholder', value);
                    } else {
                        el.value = value;
                    }
                } 
                // 如果元素是meta标签，更新content
                else if (el.tagName === 'META') {
                    el.setAttribute('content', value);
                }
                // 否则更新内部HTML
                else {
                    el.innerHTML = value;
                }
            }
        });
        
        // 更新当前语言显示
        document.getElementById('current-language').textContent = currentLang === 'zh' ? '中文' : 'English';
    }
    
    // 处理嵌套键
    function getNestedTranslation(key, obj) {
        const keys = key.split('.');
        let result = obj;
        
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return null;
            }
        }
        
        return result;
    }
    
    // 设置语言切换器
    function setupLanguageSwitcher() {
        // 桌面语言切换
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        
        if (languageToggle) {
            languageToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                languageDropdown.classList.toggle('hidden');
            });
        }
        
        // 点击语言选项
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                if (lang !== currentLang) {
                    currentLang = lang;
                    loadTranslations(lang);
                }
                
                // 隐藏下拉菜单
                if (languageDropdown) {
                    languageDropdown.classList.add('hidden');
                }
            });
        });
        
        // 点击页面其他地方关闭下拉菜单
        document.addEventListener('click', function() {
            if (languageDropdown) {
                languageDropdown.classList.add('hidden');
            }
        });
    }
    
    // 初始化
    document.addEventListener('DOMContentLoaded', init);
})();