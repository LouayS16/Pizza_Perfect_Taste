/**
 * ==========================================================================
 * PIZZA PERFECT TASTE - REUSABLE INTERACTIVE HERO COMPONENT
 * ==========================================================================
 * High-performance, 60fps/120fps Scroll-Driven Interactive Video Hero.
 * Features:
 * - Liquid-smooth continuous Lerp with exponential physics damping
 * - Instant keyframe frame seeking without seek-lock latency
 * - Viewport visibility culling and battery saving
 * - Custom element (<interactive-hero>) and container mount support
 */

(function () {
  'use strict';

  class InteractiveHero {
    constructor(options = {}) {
      this.options = Object.assign({
        videoSrc: 'Assets/hero.mp4',
        posterImg: 'Assets/images/pizza-tartufo.jpg',
        basilLeafImg: 'Assets/images/basil-leaf.png',
        wordTop: 'DELICIOUS',
        wordMain: 'PIZZA',
        dealText: "TODAY'S BEST DEAL",
        slogans: ['FRESH.', 'HOT.', 'UNFORGETTABLE.'],
        ctaLink: '#menu',
        ctaText: 'ORDER NOW',
        damping: 12.0,
        heightVh: 300,
        autoPlayFallback: true
      }, options);

      this.container = null;
      this.trackElement = null;
      this.videoElement = null;
      this.scrubFill = null;
      this.textBlock = null;

      this.videoDuration = 0;
      this.isVideoReady = false;
      this.rawProgress = 0;
      this.smoothedProgress = 0;
      this.lastFrameTime = performance.now();
      this.isInView = true;
      this.animationFrameId = null;
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Bound methods
      this._onScroll = this.updateScrollProgress.bind(this);
      this._onResize = this._handleResize.bind(this);
      this._renderLoop = this.renderLoop.bind(this);
    }

    /**
     * Generate Hero HTML Template
     */
    renderHTML() {
      const slogansHtml = this.options.slogans.map((slogan, idx) => {
        const isHot = slogan.toLowerCase().includes('hot');
        const cleanWord = slogan.replace(/\.$/, '');
        return `<span class="slogan-word ${isHot ? 'hot-accent' : ''}">${cleanWord}<span class="slogan-dot">.</span></span>`;
      }).join('\n              ');

      return `
        <div class="hero-scroll-track" id="hero-scroll-track" style="height: ${this.options.heightVh}vh;">
          <div class="hero-sticky-stage">
            <!-- Fullscreen Hardware-Accelerated Video Layer -->
            <div class="hero-video-wrapper">
              <video id="hero-video" class="hero-video" src="${this.options.videoSrc}" playsinline muted preload="auto"
                poster="${this.options.posterImg}">
              </video>
            </div>

            <!-- Marketing Poster Content Layer -->
            <div class="hero-content-layer">
              <div class="hero-poster-block" id="hero-text-block">
                <!-- Floating 3D Basil Leaf -->
                <div class="hero-basil-leaf-wrap">
                  <img src="${this.options.basilLeafImg}" alt="Fresh Italian Basil Leaf" class="hero-basil-leaf" />
                </div>

                <!-- Top Word + Decorative Accent Arcs -->
                <div class="hero-poster-top">
                  <h2 class="hero-word-delicious">${this.options.wordTop}</h2>
                  <div class="hero-accent-arcs arcs-top-right">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <path d="M12 38 A26 26 0 0 1 38 12" stroke="#ff7a00" stroke-width="3" stroke-linecap="round" />
                      <path d="M20 38 A18 18 0 0 1 38 20" stroke="#ff7a00" stroke-width="3" stroke-linecap="round" />
                    </svg>
                  </div>
                </div>

                <!-- Giant Hero Word -->
                <div class="hero-poster-main">
                  <h1 class="hero-word-pizza">${this.options.wordMain}</h1>
                </div>

                <!-- Slanted Deal Banner + Bottom-Left Accent Arcs -->
                <div class="hero-poster-banner-wrap">
                  <div class="hero-accent-arcs arcs-bottom-left">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <path d="M32 6 A26 26 0 0 1 6 32" stroke="#ff7a00" stroke-width="3" stroke-linecap="round" />
                      <path d="M24 6 A18 18 0 0 1 6 24" stroke="#ff7a00" stroke-width="3" stroke-linecap="round" />
                    </svg>
                  </div>
                  <div class="hero-deal-banner">
                    <span>${this.options.dealText}</span>
                  </div>
                </div>

                <!-- Slogan Strip -->
                <div class="hero-slogan-strip reveal-on-scroll delay-2">
                  ${slogansHtml}
                </div>
              </div>
            </div>

            <!-- Centered Global Order CTA -->
            <div class="hero-center-cta-wrap">
              <a href="${this.options.ctaLink}" class="btn-poster-order" id="hero-order-cta">
                <span>${this.options.ctaText}</span>
                <span class="btn-poster-arrow-circle">
                  <i class="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>

            <!-- Cinematic Scrub Track Indicator -->
            <div class="hero-scrub-indicator">
              <div class="scrub-track">
                <div class="scrub-fill" id="hero-scrub-fill"></div>
              </div>
              <span class="scrub-label">CINEMATIC FRAME</span>
            </div>
          </div>
        </div>
      `;
    }

    /**
     * Mount component into target element or adopt existing DOM structure
     */
    mount(target) {
      const container = typeof target === 'string' ? document.querySelector(target) : target;
      if (!container) return this;

      this.container = container;

      // Check if target is a placeholder to inject HTML into, or already contains hero elements
      if (!container.querySelector('.hero-scroll-track') && !container.classList.contains('hero-scroll-track')) {
        container.innerHTML = this.renderHTML();
      }

      this.trackElement = container.querySelector('.hero-scroll-track') || container;
      this.videoElement = container.querySelector('#hero-video') || document.getElementById('hero-video');
      this.scrubFill = container.querySelector('#hero-scrub-fill') || document.getElementById('hero-scrub-fill');
      this.textBlock = container.querySelector('#hero-text-block') || document.getElementById('hero-text-block');

      if (!this.trackElement || !this.videoElement) {
        console.warn('[InteractiveHero] Required hero elements not found.');
        return this;
      }

      this.initEngine();
      return this;
    }

    /**
     * Initialize Video Decoding & Render Loop
     */
    initEngine() {
      const video = this.videoElement;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('webkit-playsinline', '');
      video.preload = 'auto';

      // GPU Compositor hints
      video.style.transform = 'translate3d(0, 0, 0)';
      video.style.backfaceVisibility = 'hidden';
      video.style.willChange = 'transform';

      const onVideoReady = () => {
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          this.videoDuration = video.duration;
          this.isVideoReady = true;

          // Warm up decoder
          try {
            video.currentTime = 0.001;
          } catch (e) {}

          this.updateScrollProgress();
        }
      };

      if (video.readyState >= 2) {
        onVideoReady();
      } else {
        video.addEventListener('loadedmetadata', onVideoReady, { once: true });
        video.addEventListener('canplay', onVideoReady, { once: true });
        video.addEventListener('loadeddata', onVideoReady, { once: true });
      }

      // Attach scroll and resize listeners
      window.addEventListener('scroll', this._onScroll, { passive: true });
      window.addEventListener('resize', this._onResize, { passive: true });

      // Start RAF render loop
      this.updateScrollProgress();
      this.animationFrameId = requestAnimationFrame(this._renderLoop);
    }

    _handleResize() {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.updateScrollProgress();
    }

    /**
     * Calculate Normalized Scroll Position
     */
    updateScrollProgress() {
      if (!this.trackElement) return;

      const rect = this.trackElement.getBoundingClientRect();
      const trackHeight = this.trackElement.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollDistance = trackHeight - windowHeight;

      // Visibility check
      this.isInView = rect.bottom > 0 && rect.top < windowHeight;

      if (scrollDistance <= 0) {
        this.rawProgress = 0;
        return;
      }

      const progress = -rect.top / scrollDistance;
      this.rawProgress = Math.min(Math.max(progress, 0), 1);
    }

    /**
     * 60fps/120fps Continuous Physics Interpolation Loop
     */
    renderLoop(currentTime) {
      const dt = Math.min((currentTime - this.lastFrameTime) / 1000, 0.05);
      this.lastFrameTime = currentTime;

      // Exponential damping
      const factor = 1 - Math.exp(-this.options.damping * dt);
      this.smoothedProgress += (this.rawProgress - this.smoothedProgress) * factor;

      if (Math.abs(this.rawProgress - this.smoothedProgress) < 0.00005) {
        this.smoothedProgress = this.rawProgress;
      }

      // Scrub video frame
      if (this.isVideoReady && this.videoDuration > 0 && !this.prefersReducedMotion && this.isInView) {
        const targetTime = Math.min(Math.max(this.smoothedProgress * this.videoDuration, 0), this.videoDuration - 0.005);
        if (Math.abs(this.videoElement.currentTime - targetTime) > 0.002) {
          try {
            this.videoElement.currentTime = targetTime;
          } catch (err) {}
        }
      }

      // Update scrub bar indicator
      if (this.scrubFill) {
        this.scrubFill.style.width = `${(this.smoothedProgress * 100).toFixed(2)}%`;
      }

      // Ensure text block remains fully opaque and visible
      if (this.textBlock) {
        this.textBlock.style.opacity = '1';
        this.textBlock.style.transform = 'none';
      }

      this.animationFrameId = requestAnimationFrame(this._renderLoop);
    }

    /**
     * Teardown and cleanup
     */
    destroy() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      window.removeEventListener('scroll', this._onScroll);
      window.removeEventListener('resize', this._onResize);
    }
  }

  // Factory function
  function createInteractiveHero(mountSelector, options = {}) {
    const hero = new InteractiveHero(options);
    if (mountSelector) {
      hero.mount(mountSelector);
    }
    return hero;
  }

  // Web Component definition: <interactive-hero video="Assets/hero.mp4"></interactive-hero>
  if (typeof customElements !== 'undefined' && !customElements.get('interactive-hero')) {
    class InteractiveHeroElement extends HTMLElement {
      connectedCallback() {
        const videoSrc = this.getAttribute('video') || 'Assets/hero.mp4';
        const posterImg = this.getAttribute('poster') || 'Assets/images/pizza-tartufo.jpg';
        const wordTop = this.getAttribute('word-top') || 'DELICIOUS';
        const wordMain = this.getAttribute('word-main') || 'PIZZA';
        const dealText = this.getAttribute('deal-text') || "TODAY'S BEST DEAL";
        const ctaLink = this.getAttribute('cta-link') || '#menu';
        const ctaText = this.getAttribute('cta-text') || 'ORDER NOW';
        const heightVh = parseInt(this.getAttribute('height-vh'), 10) || 300;

        const hero = new InteractiveHero({
          videoSrc,
          posterImg,
          wordTop,
          wordMain,
          dealText,
          ctaLink,
          ctaText,
          heightVh
        });

        hero.mount(this);
      }
    }
    customElements.define('interactive-hero', InteractiveHeroElement);
  }

  // Global namespace exports
  window.PizzaComponents = window.PizzaComponents || {};
  window.PizzaComponents.Hero = InteractiveHero;
  window.PizzaComponents.createInteractiveHero = createInteractiveHero;
  window.createInteractiveHero = createInteractiveHero;
})();
