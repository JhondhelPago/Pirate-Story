import '@esotericsoftware/spine-pixi-v8';

import { Application } from 'pixi.js';
import { initAssets } from './utils/assets';
import { navigation } from './utils/navigation';
import { PirateLoadScreen } from './screens/PirateLoad';
import { PiratePreviewScreen } from './screens/PiratePreview'; 
import { PirateStartScreen } from './screens/PirateStartScreen';
import { TiledBackground } from './ui/TiledBackground';
import { sound } from '@pixi/sound';
import { getUrlParam } from './utils/getUrlParams';

export const app = new Application();

function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = 375;
    const minHeight = 700;

    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = Math.max(scaleX, scaleY);

    const width = windowWidth * scale;
    const height = windowHeight * scale;

    app.renderer.canvas.style.width = `${windowWidth}px`;
    app.renderer.canvas.style.height = `${windowHeight}px`;

    window.scrollTo(0, 0);
    app.renderer.resize(width, height);
    navigation.resize(width, height);
}

function visibilityChange() {
    if (document.hidden) {
        sound.pauseAll();
        navigation.blur();
    } else {
        sound.resumeAll();
        navigation.focus();
    }
}

async function init() {
    // Initialize app
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0xffffff,
    });

    document.body.appendChild(app.canvas);

    window.addEventListener('resize', resize);
    resize();

    document.addEventListener('visibilitychange', visibilityChange);

    // Load bundles in background
    await initAssets();

    // Persistent background
    navigation.setBackground(TiledBackground);

    // --------------------------------------------
    // ⭐ STEP 1: Always show loading screen first
    // --------------------------------------------
    await navigation.showScreen(PirateStartScreen);

    // --------------------------------------------
    // ⭐ STEP 2: Conditional navigation (custom)
    // --------------------------------------------
    const urlPreview = getUrlParam('preview');
    const urlLoad    = getUrlParam('load');
    const urlStart  = getUrlParam('start');

    if (urlLoad !== null) {
        await navigation.showScreen(PirateLoadScreen);
    }

    else if (urlPreview !== null) {
        // directly show preview screen
        await navigation.showScreen(PiratePreviewScreen);
    }

    else if (urlStart !== null) {
        await navigation.showScreen(PirateStartScreen)
    }

    
}

init();
