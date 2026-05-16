'use client';
import { useRef, useEffect } from 'react';

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let mouseX = -9999, mouseY = -9999;
    let stars = [];
    let meteors = [];
    let animId;
    let meteorTimer;

    function init() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.15,
      }));
    }

    function spawnMeteor() {
      meteors.push({
        x: Math.random() * width * 0.6 + width * 0.1,
        y: Math.random() * height * 0.25,
        len: Math.random() * 110 + 60,
        speed: Math.random() * 5 + 4,
        alpha: 0.9,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0d0820';
      ctx.fillRect(0, 0, width, height);

      stars.forEach(s => {
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = dist < 130 ? (1 - dist / 130) * 0.85 : 0;
        const alpha = Math.min(1, s.baseAlpha + boost);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 200, 255, ${alpha})`;
        ctx.fill();

        if (boost > 0.25) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 120, 255, ${boost * 0.22})`;
          ctx.fill();
        }
      });

      meteors = meteors.filter(m => m.alpha > 0.02);
      meteors.forEach(m => {
        const angle = Math.PI / 4;
        const grad = ctx.createLinearGradient(
          m.x, m.y,
          m.x - Math.cos(angle) * m.len,
          m.y - Math.sin(angle) * m.len
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - Math.cos(angle) * m.len,
          m.y - Math.sin(angle) * m.len
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        m.x += Math.cos(angle) * m.speed;
        m.y += Math.sin(angle) * m.speed;
        m.alpha -= 0.016;
      });
    }

    function loop() {
      draw();
      animId = requestAnimationFrame(loop);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    function handleResize() {
      init();
    }

    init();
    loop();
    spawnMeteor();
    meteorTimer = setInterval(spawnMeteor, 4500);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(meteorTimer);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
