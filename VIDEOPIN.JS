/* ============================================================
   VIDEO PIN — Standalone Snippet
   Drop this <script> block anywhere on your page.
   Customize the CONFIG section below, then you're done.
   ============================================================ */

(function () {

    /* ── CONFIG — edit these values only ── */
    const CONFIG = {
        videoUrl:    "https://www.youtube.com/shorts/I55wTmvE81I",   // Your MP4 URL
        heading:     "📺 VIDEO: JINSI YA KUANGALIA WANAFUNZI WALIOCHAGULIWA KIDATO CHA 5", // Pin heading (\n = new line)
        position:    "bottom-right",                   // bottom-right | bottom-left | top-right | top-left
        width:       210,                              // pin width in px
        showDelay:   2000,                             // ms after page load before pin appears
        accentColor: "#e74c3c",                        // header background colour
    };
    /* ────────────────────────────────────── */

    /* Inject CSS */
    const style = document.createElement('style');
    style.textContent = `
        #__vpin {
            position: fixed;
            ${CONFIG.position.includes('bottom') ? 'bottom:20px;' : 'top:20px;'}
            ${CONFIG.position.includes('right')  ? 'right:16px;'  : 'left:16px;'}
            z-index: 99999;
            width: ${CONFIG.width}px;
            background: #1a1a2e;
            border-radius: 10px;
            box-shadow: 0 6px 28px rgba(0,0,0,0.55);
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transition: opacity 0.5s ease, transform 0.5s ease;
            pointer-events: none;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #__vpin.vpin-show {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }
        #__vpin-header {
            background: ${CONFIG.accentColor};
            color: #fff;
            font-size: 9.5px;
            font-weight: 800;
            padding: 7px 28px 7px 8px;
            text-align: center;
            letter-spacing: 0.4px;
            line-height: 1.5;
            text-transform: uppercase;
            white-space: pre-line;
        }
        #__vpin video {
            width: 100%;
            display: block;
            max-height: 128px;
            object-fit: cover;
            background: #000;
        }
        #__vpin-close {
            position: absolute;
            top: 4px; right: 7px;
            color: #fff;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            line-height: 1;
            opacity: 0.85;
            background: none;
            border: none;
            padding: 0;
        }
        #__vpin-close:hover { opacity: 1; }
        @media (max-width: 420px) {
            #__vpin { width: ${Math.round(CONFIG.width * 0.8)}px !important; }
            #__vpin video { max-height: 96px; }
            #__vpin-header { font-size: 8px; }
        }
    `;
    document.head.appendChild(style);

    /* Build HTML */
    const pin = document.createElement('div');
    pin.id = '__vpin';
    pin.innerHTML = `
        <div id="__vpin-header">${CONFIG.heading}</div>
        <button id="__vpin-close" title="Funga">✕</button>
        <video controls autoplay muted loop playsinline>
            <source src="${CONFIG.videoUrl}" type="video/mp4">
        </video>
    `;
    document.body.appendChild(pin);

    /* Show after delay */
    setTimeout(() => { pin.classList.add('vpin-show'); }, CONFIG.showDelay);

    /* Close button */
    document.getElementById('__vpin-close').addEventListener('click', function (e) {
        e.stopPropagation();
        pin.classList.remove('vpin-show');
        pin.style.display = 'none'; // fully hide after dismiss
    });

})();