<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let width = 0;
	let height = 0;
	let particles: Particle[] = [];
	let animationId: number;

	class Particle {
		x = 0;
		y = 0;
		vx = 0;
		vy = 0;
		size = 0;
		alpha = 0;
		life = 0;

		constructor() {
			this.reset();
		}

		reset() {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.vx = (Math.random() - 0.5) * 0.5;
			this.vy = (Math.random() - 0.5) * 0.5;
			this.size = Math.random() * 2;
			this.alpha = Math.random() * 0.5 + 0.1;
			this.life = Math.random() * 100;
		}

		update() {
			this.x += this.vx;
			this.y += this.vy;
			this.life--;

			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;

			if (this.life <= 0) this.reset();
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`;
			ctx.fill();
		}
	}

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	function initParticles() {
		particles = [];
		const particleCount = Math.min(window.innerWidth / 10, 100);
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle());
		}
	}

	function animate() {
		ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
		ctx.fillRect(0, 0, width, height);

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];
			p.update();
			p.draw();

			for (let j = i + 1; j < particles.length; j++) {
				const p2 = particles[j];
				const dx = p.x - p2.x;
				const dy = p.y - p2.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 150) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 - dist / 1500})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.stroke();
				}
			}
		}
		animationId = requestAnimationFrame(animate);
	}

	function handleResize() {
		resize();
		initParticles();
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		resize();
		initParticles();
		animate();
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
		cancelAnimationFrame(animationId);
	});
</script>

<canvas
	bind:this={canvas}
	id="bg-canvas"></canvas>

<style>
	#bg-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.6;
	}
</style>
