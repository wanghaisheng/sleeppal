// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 导航栏滚动效果
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('bg-black/50');
        header.classList.add('backdrop-blur-lg');
      } else {
        header.classList.remove('bg-black/50');
        header.classList.remove('backdrop-blur-lg');
      }
    });
  }

  // 移动导航菜单
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && menuClose && mobileMenu) {
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
    
    menuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // 功能轮播
  const featureSlides = document.querySelectorAll('.feature-slide');
  const featureDots = document.querySelectorAll('.feature-nav-dot');
  let currentFeatureSlide = 0;
  
  function showFeatureSlide(index) {
    if (!featureSlides.length || !featureDots.length) return;
    
    featureSlides.forEach(slide => slide.classList.remove('active'));
    featureDots.forEach(dot => dot.classList.remove('active'));
    
    featureSlides[index].classList.add('active');
    featureDots[index].classList.add('active');
    currentFeatureSlide = index;
  }
  
  featureDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showFeatureSlide(index);
    });
  });
  
  // 自动轮播功能
  function autoAdvanceFeature() {
    if (!featureSlides.length) return;
    const nextIndex = (currentFeatureSlide + 1) % featureSlides.length;
    showFeatureSlide(nextIndex);
  }
  
  let featureInterval;
  const featureCarousel = document.querySelector('.feature-carousel');
  
  if (featureCarousel && featureSlides.length) {
    featureInterval = setInterval(autoAdvanceFeature, 5000);
    
    featureCarousel.addEventListener('mouseenter', function() {
      clearInterval(featureInterval);
    });
    
    featureCarousel.addEventListener('mouseleave', function() {
      featureInterval = setInterval(autoAdvanceFeature, 5000);
    });
  }

  // 评价轮播
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentTestimonialSlide = 0;
  
  function showTestimonial(index) {
    if (!testimonialSlides.length || !testimonialDots.length) return;
    
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonialSlide = index;
  }
  
  if (testimonialDots.length) {
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showTestimonial(index);
      });
    });
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      if (!testimonialSlides.length) return;
      const prevIndex = (currentTestimonialSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showTestimonial(prevIndex);
    });
    
    nextBtn.addEventListener('click', function() {
      if (!testimonialSlides.length) return;
      const nextIndex = (currentTestimonialSlide + 1) % testimonialSlides.length;
      showTestimonial(nextIndex);
    });
  }
  
  // 自动轮播评价
  function autoAdvanceTestimonial() {
    if (!testimonialSlides.length) return;
    const nextIndex = (currentTestimonialSlide + 1) % testimonialSlides.length;
    showTestimonial(nextIndex);
  }
  
  let testimonialInterval;
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  
  if (testimonialCarousel && testimonialSlides.length) {
    testimonialInterval = setInterval(autoAdvanceTestimonial, 6000);
    
    testimonialCarousel.addEventListener('mouseenter', function() {
      clearInterval(testimonialInterval);
    });
    
    testimonialCarousel.addEventListener('mouseleave', function() {
      testimonialInterval = setInterval(autoAdvanceTestimonial, 6000);
    });
  }

  // FAQ 折叠功能
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentNode;
        const isActive = faqItem.classList.contains('active');
        
        // 关闭所有FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // 如果当前点击的不是激活状态，则打开它
        if (!isActive) {
          faqItem.classList.add('active');
        }
      });
    });
  }

  // 返回顶部按钮
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 智能戒指投影效果
  function createRingParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('ring-particle');
      
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      particle.style.backgroundColor = `rgba(34, 197, 94, ${Math.random() * 0.5})`;
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.filter = 'blur(1px)';
      
      const animationDuration = Math.random() * 10 + 5;
      particle.style.animation = `float ${animationDuration}s linear infinite`;
      
      hero.appendChild(particle);
    }
  }
  
  createRingParticles();

  // 添加星星背景动画
  function addStars() {
    const starsContainer = document.querySelector('.starry-background');
    
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.classList.add('twinkling-star');
      
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.position = 'absolute';
      
      const twinkleDelay = Math.random() * 5;
      star.style.animation = `twinkle 5s ${twinkleDelay}s ease-in-out infinite`;
      
      starsContainer.appendChild(star);
    }
  }
  
  // Add stars
  addStars();

  // 添加视频播放弹窗功能
  const playVideoBtn = document.querySelector('.play-video-btn');
  
  if (playVideoBtn) {
    playVideoBtn.addEventListener('click', function() {
      // 创建视频弹窗
      const videoModal = document.createElement('div');
      videoModal.classList.add('video-modal');
      videoModal.style.position = 'fixed';
      videoModal.style.inset = '0';
      videoModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      videoModal.style.zIndex = '1000';
      videoModal.style.display = 'flex';
      videoModal.style.alignItems = 'center';
      videoModal.style.justifyContent = 'center';
      videoModal.style.padding = '20px';
      
      // 关闭按钮
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '20px';
      closeBtn.style.right = '20px';
      closeBtn.style.background = 'none';
      closeBtn.style.border = 'none';
      closeBtn.style.color = 'white';
      closeBtn.style.fontSize = '30px';
      closeBtn.style.cursor = 'pointer';
      
      // 视频容器
      const videoContainer = document.createElement('div');
      videoContainer.style.width = '100%';
      videoContainer.style.maxWidth = '800px';
      videoContainer.style.position = 'relative';
      videoContainer.style.aspectRatio = '16/9';
      
      // 视频占位符（实际开发中替换为真实视频）
      const videoPlaceholder = document.createElement('div');
      videoPlaceholder.style.width = '100%';
      videoPlaceholder.style.height = '100%';
      videoPlaceholder.style.backgroundColor = '#111';
      videoPlaceholder.style.borderRadius = '8px';
      videoPlaceholder.style.display = 'flex';
      videoPlaceholder.style.alignItems = 'center';
      videoPlaceholder.style.justifyContent = 'center';
      videoPlaceholder.innerHTML = '<p style="color: white; text-align: center;">演示视频加载中...<br>真实场景中将展示SleepPal产品演示视频</p>';
      
      videoContainer.appendChild(videoPlaceholder);
      videoModal.appendChild(closeBtn);
      videoModal.appendChild(videoContainer);
      document.body.appendChild(videoModal);
      
      // 阻止滚动
      document.body.style.overflow = 'hidden';
      
      // 关闭弹窗
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(videoModal);
        document.body.style.overflow = '';
      });
      
      // 点击背景也关闭
      videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
          document.body.removeChild(videoModal);
          document.body.style.overflow = '';
        }
      });
    });
  }

  // 添加星星粒子动画到整个页面
  function createStarryAnimation() {
    const starsCount = window.innerWidth < 768 ? 50 : 100;
    const container = document.createElement('div');
    container.className = 'star-particles';
    container.style.position = 'fixed';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.top = '0';
    container.style.left = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1';
    
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      
      // 随机大小
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // 随机位置
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      
      // 设置样式
      star.style.position = 'absolute';
      star.style.borderRadius = '50%';
      star.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      star.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.5)';
      
      // 添加动画
      const duration = Math.random() * 60 + 30;
      const delay = Math.random() * 10;
      star.style.animation = `floatStar ${duration}s ${delay}s linear infinite`;
      
      container.appendChild(star);
    }
    
    document.body.appendChild(container);
    
    // 添加关键帧动画
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatStar {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
          opacity: 0;
        }
      }
      
      @keyframes twinkle {
        0%, 100% {
          opacity: 0.1;
        }
        50% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  createStarryAnimation();

  // Only add the event listener if the button exists
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', function() {
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 寻找中...';
      this.disabled = true;
      this.classList.add('opacity-75');
      
      // In a real app, this would send the matching preferences to the server
      setTimeout(() => {
          window.location.href = 'match-in-progress.html';
      }, 1500);
    });
  }
});