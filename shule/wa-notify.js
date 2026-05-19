/* ============================================================
   WHATSAPP CHANNEL NOTIFICATION — Standalone JS Snippet
   Usage: <script src="wa-notify.js"></script>
   Or paste the whole thing inside a <script> tag.
   Only edit the CONFIG block below.
   ============================================================ */

(function () {

    /* ══════════════════════════════════════
       CONFIG — only edit this block
       ══════════════════════════════════════ */
    const CONFIG = {
        channelName : "OWM-TAMISEMI",
        message     : "Bofya Hapa Ujiunge WhatsApp Channel Rasmi Ya TAMISEMI Kwa Taarifa Zaidi 🔔",
        whatsappUrl : "https://whatsapp.com/channel/0029Vb7UxW211ulFnj5ky52W",
        avatarImg   : "https://selform-tamisemi.github.io/ngao.png",  // ← Replace with your image URL (or leave "" for emoji)
        position    : "bottom-right",  // bottom-right | bottom-left | top-right | top-left
        showDelay   : 2000,   // ms before first pop
        hideAfter   : 5000,   // ms before auto-hide (0 = stay forever)
        repeatEvery : 7000,   // ms between re-pops  (0 = show once only)
    };
    /* ══════════════════════════════════════ */

    /* ── Inject CSS ── */
    const css = `
        #__wapin {
            position: fixed;
            ${CONFIG.position.includes('bottom') ? 'bottom:20px;' : 'top:20px;'}
            ${CONFIG.position.includes('right')  ? 'right:16px;'  : 'left:16px;'}
            z-index: 999999;
            width: 300px;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.28);
            opacity: 0;
            transform: translateY(28px) scale(0.93);
            transition: opacity 0.4s ease, transform 0.4s ease;
            pointer-events: none;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #__wapin.wapin-show {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        /* top bar */
        .__wapin-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #075E54;
            padding: 6px 12px;
        }
        .__wapin-topbar-left {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .__wapin-app-label {
            color: rgba(255,255,255,0.80);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .__wapin-topbar-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .__wapin-time {
            color: rgba(255,255,255,0.55);
            font-size: 10px;
        }
        .__wapin-close {
            color: rgba(255,255,255,0.70);
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
            line-height: 1;
        }
        .__wapin-close:hover { color: #fff; }

        /* body */
        .__wapin-body {
            background: #fff;
            padding: 12px 14px;
            display: flex;
            gap: 11px;
            align-items: flex-start;
            text-decoration: none;
            cursor: pointer;
        }
        .__wapin-body:hover { background: #f7f7f7; }

        /* avatar — fixed 48x48, circle, same size whether img or emoji */
        .__wapin-avatar {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 50%;
            overflow: hidden;
            background: linear-gradient(135deg, #25d36500, #075e5400);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 24px;
        }
        .__wapin-avatar img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 50%;
            display: block;
        }

        .__wapin-text { flex: 1; min-width: 0; }
        .__wapin-sender {
            font-size: 14px;
            font-weight: 700;
            color: #111;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .__wapin-msg {
            font-size: 13px;
            color: #444;
            line-height: 1.45;
        }

        /* footer */
        .__wapin-footer {
            background: #f0f0f0;
            padding: 9px 14px;
        }
        .__wapin-btn {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: #fff;
            text-align: center;
            font-size: 13px;
            font-weight: 800;
            padding: 9px 0;
            border-radius: 8px;
            text-decoration: none;
            letter-spacing: 0.3px;
            transition: filter 0.2s;
            box-sizing: border-box;
        }
        .__wapin-btn:hover { filter: brightness(1.09); }

        /* bell / image ring animation */
        @keyframes __wapinBell {
            0%,100% { transform: rotate(0);      }
            15%      { transform: rotate(-18deg); }
            30%      { transform: rotate(18deg);  }
            45%      { transform: rotate(-11deg); }
            60%      { transform: rotate(11deg);  }
            75%      { transform: rotate(-5deg);  }
            90%      { transform: rotate(5deg);   }
        }
        .__wapin-ring { animation: __wapinBell 0.8s ease; }

        @media (max-width: 360px) { #__wapin { width: 260px; } }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── WhatsApp logo SVG ── */
    const waSVG = `<svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path fill="#fff" d="M23.47 8.53A10.35 10.35 0 0 0 16 5.6C10.26 5.6 5.6 10.26 5.6 16c0 1.84.48 3.63 1.4 5.21L5.5 26.5l5.42-1.42A10.35 10.35 0 0 0 16 26.4c5.74 0 10.4-4.66 10.4-10.4 0-2.78-1.08-5.39-3.05-7.37zm-7.47 15.99a8.6 8.6 0 0 1-4.39-1.2l-.31-.19-3.24.85.87-3.16-.21-.32A8.59 8.59 0 0 1 7.4 16a8.6 8.6 0 0 1 8.6-8.6 8.6 8.6 0 0 1 8.6 8.6 8.6 8.6 0 0 1-8.6 8.6zm4.72-6.43c-.26-.13-1.53-.75-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.66.84-.81 1.01-.15.17-.3.19-.56.06a7.06 7.06 0 0 1-2.08-1.28 7.77 7.77 0 0 1-1.44-1.79c-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.45.06-.68.32-.23.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.19 1.17.16 1.61.1.49-.07 1.53-.63 1.74-1.23.22-.6.22-1.12.15-1.23-.06-.11-.23-.17-.49-.3z"/>
    </svg>`;

    /* ── Avatar: image if provided, emoji fallback ── */
    const avatarInner = CONFIG.avatarImg
        ? `<img src="${CONFIG.avatarImg}" alt="${CONFIG.channelName}" onerror="this.parentElement.innerHTML='📢'">`
        : `📢`;

    /* ── Build notification element ── */
    const pin = document.createElement('div');
    pin.id = '__wapin';

    function getTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    pin.innerHTML = `
        <div class="__wapin-topbar">
            <div class="__wapin-topbar-left">
                ${waSVG}
                <span class="__wapin-app-label">TAMISEMI WhatsApp</span>
            </div>
            <div class="__wapin-topbar-right">
                <span class="__wapin-time" id="__wapin-time">${getTime()}</span>
                <button class="__wapin-close" id="__wapin-close" title="Funga">✕</button>
            </div>
        </div>
        <a class="__wapin-body" href="${CONFIG.whatsappUrl}" target="_blank" rel="noopener">
            <div class="__wapin-avatar" id="__wapin-avatar">${avatarInner}</div>
            <div class="__wapin-text">
                <div class="__wapin-sender">${CONFIG.channelName}</div>
                <div class="__wapin-msg">${CONFIG.message}</div>
            </div>
        </a>
        <div class="__wapin-footer">
            <a class="__wapin-btn" href="${CONFIG.whatsappUrl}" target="_blank" rel="noopener">
                CLICK HAPA KUJIUNGA ➜
            </a>
        </div>
    `;

    document.body.appendChild(pin);

    /* ── Live clock ── */
    setInterval(() => {
        const t = document.getElementById('__wapin-time');
        if (t) t.textContent = getTime();
    }, 30000);

    /* ── Show / hide logic ── */
    let hideTimer   = null;
    let repeatTimer = null;
    let dismissed   = false;

    function showPin() {
        if (dismissed) return;
        pin.classList.add('wapin-show');

        /* ring animation on avatar */
        const av = document.getElementById('__wapin-avatar');
        if (av) {
            av.classList.remove('__wapin-ring');
            void av.offsetWidth; // restart
            av.classList.add('__wapin-ring');
        }

        if (CONFIG.hideAfter > 0) {
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                pin.classList.remove('wapin-show');
                if (CONFIG.repeatEvery > 0 && !dismissed) {
                    repeatTimer = setTimeout(showPin, CONFIG.repeatEvery);
                }
            }, CONFIG.hideAfter);
        }
    }

    /* first pop */
    setTimeout(showPin, CONFIG.showDelay);

    /* close — pauses 30 s then one final re-pop */
    document.getElementById('__wapin-close').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dismissed = true;
        clearTimeout(hideTimer);
        clearTimeout(repeatTimer);
        pin.classList.remove('wapin-show');
        setTimeout(() => {
            dismissed = false;
            showPin();
            dismissed = true;
        }, 30000);
    });

})();