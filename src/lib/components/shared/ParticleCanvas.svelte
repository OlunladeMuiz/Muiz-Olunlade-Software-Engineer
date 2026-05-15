<script lang="ts">
  import { onMount } from 'svelte';
  import { accentPalette } from '$lib/stores/theme';
  import { clamp, prefersReducedMotion } from '$lib/utils/animations';

  export let density = 72;
  export let className = '';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    if (!canvas || prefersReducedMotion()) {
      return;
    }

    const drawingContext = canvas.getContext('2d');
    const hostElement = canvas.parentElement;

    if (!drawingContext || !hostElement) {
      return;
    }

    const context: CanvasRenderingContext2D = drawingContext;
    const host: HTMLElement = hostElement;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = {
      x: 0,
      y: 0,
      active: false
    };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      drift: number;
    };

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.7 + 0.8,
        color: Math.random() > 0.3 ? accentPalette.cyan : accentPalette.violet,
        drift: Math.random() * Math.PI * 2
      };
    }

    function resizeCanvas() {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(clamp(density + width / 18, 48, 120));
      particles = Array.from({ length: count }, createParticle);
    }

    function repelFromPointer(particle: Particle) {
      if (!pointer.active) {
        return;
      }

      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.max(Math.hypot(dx, dy), 0.001);

      if (distance < 140) {
        const force = (140 - distance) / 140;
        particle.vx += (dx / distance) * force * 0.03;
        particle.vy += (dy / distance) * force * 0.03;
      }
    }

    function burstParticles() {
      if (!pointer.active) {
        return;
      }

      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.max(Math.hypot(dx, dy), 0.001);

        if (distance < 180) {
          const force = (180 - distance) / 180;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }
      }
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = 'lighter';

      for (const particle of particles) {
        particle.drift += 0.01;
        particle.x += particle.vx + Math.cos(particle.drift) * 0.05;
        particle.y += particle.vy + Math.sin(particle.drift) * 0.05;
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        repelFromPointer(particle);

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.beginPath();
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      for (let index = 0; index < particles.length; index += 1) {
        for (let target = index + 1; target < particles.length; target += 1) {
          const first = particles[index];
          const second = particles[target];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            context.strokeStyle = `rgba(255,255,255,${0.18 - distance / 800})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }

      context.restore();
    }

    function loop() {
      draw();
      animationFrame = window.requestAnimationFrame(loop);
    }

    function updatePointer(event: PointerEvent) {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function clearPointer() {
      pointer.active = false;
    }

    host.addEventListener('pointermove', updatePointer);
    host.addEventListener('pointerdown', updatePointer);
    host.addEventListener('pointerleave', clearPointer);
    host.addEventListener('click', burstParticles);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(host);
    resizeCanvas();
    loop();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', updatePointer);
      host.removeEventListener('pointerdown', updatePointer);
      host.removeEventListener('pointerleave', clearPointer);
      host.removeEventListener('click', burstParticles);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
  aria-hidden="true"
></canvas>
