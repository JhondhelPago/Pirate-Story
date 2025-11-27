import '@esotericsoftware/spine-pixi-v8';
import { Application, Graphics } from 'pixi.js';

const app = new Application();

async function init() {
    // Detect mobile/desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
    document.documentElement.id = isMobile ? 'isMobile' : 'isDesktop';

    // Initialize PIXI (IMPORTANT: width & height)
    await app.init({
        width: 1920,
        height: 1080,
        resolution: 1,
        backgroundColor: 0x222222,
    });

    // Add canvas to page
    document.body.appendChild(app.canvas);
    app.canvas.style.border = '5px solid lime';

    // --- RED CIRCLE TEST ---
    const g = new Graphics();
    g.beginFill(0xff0000);
    g.drawCircle(0, 0, 100);
    g.endFill();
    g.position.set(400, 400);

    app.stage.addChild(g);

    // --- ENABLE RESIZE ---
    window.addEventListener('resize', resize);
    resize();

    console.log('Rendering OK!');
}

function resize() {
    const isMobile = document.documentElement.id === 'isMobile';

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const baseWidth = isMobile ? 1080 : 1920;
    const baseHeight = isMobile ? 1920 : 1080;

    const scaleX = windowWidth / baseWidth;
    const scaleY = windowHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);

    const scaledWidth = baseWidth * scale;
    const scaledHeight = baseHeight * scale;

    const offsetX = (windowWidth - scaledWidth) / 2;
    const offsetY = (windowHeight - scaledHeight) / 2;

    app.canvas.style.width = `${scaledWidth}px`;
    app.canvas.style.height = `${scaledHeight}px`;
    app.canvas.style.position = 'absolute';
    app.canvas.style.left = `${offsetX}px`;
    app.canvas.style.top = `${offsetY}px`;
}

init();
