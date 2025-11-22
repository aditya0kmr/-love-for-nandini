// Reusable Particle Effects Component
class ParticleSystem {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.options = {
      particleCount: options.particleCount || CONFIG.ANIMATIONS.PARTICLE_COUNT,
      particleColor: options.particleColor || 'rgba(255, 105, 180, 0.7)',
      particleSize: options.particleSize || [4, 12],
      speed: options.speed || [0.5, 1.5],
      shape: options.shape || 'heart'
    };
    this.init();
  }

  init() {
    this.container.appendChild(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height, this.options));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach(p => {
      p.update(this.height);
      p.draw(this.ctx);
    });
    requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  constructor(width, height, options) {
    this.reset(width, height, options);
    this.options = options;
  }

  reset(width, height, options) {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Utils.random(...options.particleSize);
    this.speed = Utils.random(...options.speed);
    this.angle = Math.random() * Math.PI * 2;
    this.spinSpeed = 0.03 + Math.random() * 0.02;
  }

  update(height) {
    this.y += this.speed;
    this.angle += this.spinSpeed;
    if (this.y > height) {
      this.y = -this.size;
      this.x = Math.random() * width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.drawHeart(ctx);
    ctx.restore();
  }

  drawHeart(ctx) {
    const size = this.size / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -size/2, -size, -size*0.75, -size, 0);
    ctx.bezierCurveTo(-size, size*0.6, 0, size*1.2, 0, size*1.8);
    ctx.bezierCurveTo(0, size*1.2, size, size*0.6, size, 0);
    ctx.bezierCurveTo(size, -size*0.75, 0, -size/2, 0, 0);
    ctx.fillStyle = this.options.particleColor;
    ctx.fill();
  }
}
