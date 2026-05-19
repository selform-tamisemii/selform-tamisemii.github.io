/* ============================================================
   CORNER NOTIFICATION — Wanafunzi Waliochaguliwa 2026
   Usage: <script src="notify-wanafunzi.js"></script>
   Or paste inside a <script> tag before </body>
   ============================================================ */

(function () {

    /* ══════════════════════════════════════
       CONFIG — edit only this block
       ══════════════════════════════════════ */
    const CONFIG = {
        title      : "SELECTION TAMISEMI 2026",
        message    : "Click Hapa Kuangalia Namna Ya Kuangalia Wanafunzi Waliochaguliwa Kidato Cha 5 Na Vyuo 2026",
        url        : "/maelezo.html",
        btnText    : "ANGALIA SASA ➜",
        position   : "bottom-right",   // bottom-right | bottom-left | top-right | top-left
        accentColor: "#1565C0",        // top bar colour (blue = official/gov feel)
        showDelay  : 1500,             // ms before first pop
        hideAfter  : 4000,             // ms before auto-hide (0 = never)
        repeatEvery: 6000,             // ms between re-pops  (0 = once only)
    };
    /* ══════════════════════════════════════ */

    /* ── CSS ── */
    const css = `
        #__ntf {
            position: fixed;
            ${CONFIG.position.includes('bottom') ? 'bottom:18px;' : 'top:18px;'}
            ${CONFIG.position.includes('right')  ? 'right:15px;'  : 'left:15px;'}
            z-index: 999999;
            width: 300px;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 36px rgba(0,0,0,0.30);
            opacity: 0;
            transform: translateY(30px) scale(0.92);
            transition: opacity 0.4s ease, transform 0.4s ease;
            pointer-events: none;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #__ntf.ntf-show {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        /* ── Top bar ── */
        .__ntf-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${CONFIG.accentColor};
            padding: 7px 12px;
        }
        .__ntf-bar-left {
            display: flex;
            align-items: center;
            gap: 7px;
        }
        .__ntf-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #fff;
            opacity: 0.5;
            animation: __ntfPulse 1.4s ease infinite;
        }
        @keyframes __ntfPulse {
            0%,100% { opacity: 0.4; transform: scale(1);    }
            50%      { opacity: 1;   transform: scale(1.35); }
        }
        .__ntf-bar-label {
            color: rgba(255,255,255,0.85);
            font-size: 10.5px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .__ntf-bar-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .__ntf-time {
            color: rgba(255,255,255,0.55);
            font-size: 10px;
        }
        .__ntf-close {
            color: rgba(255,255,255,0.70);
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
            line-height: 1;
        }
        .__ntf-close:hover { color: #fff; }

        /* ── Body ── */
        .__ntf-body {
            background: #fff;
            padding: 13px 14px 11px;
            display: flex;
            gap: 12px;
            align-items: flex-start;
            text-decoration: none;
            cursor: pointer;
        }
        .__ntf-body:hover { background: #f5f8ff; }

        .__ntf-icon {
            width: 46px; height: 46px;
            min-width: 46px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1976D2, #0D47A1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }
        .__ntf-icon.ntf-ring {
            animation: __ntfShake 0.7s ease;
        }
        @keyframes __ntfShake {
            0%,100% { transform: rotate(0);      }
            15%      { transform: rotate(-16deg); }
            30%      { transform: rotate(16deg);  }
            45%      { transform: rotate(-10deg); }
            60%      { transform: rotate(10deg);  }
            75%      { transform: rotate(-5deg);  }
            90%      { transform: rotate(5deg);   }
        }

        .__ntf-text { flex: 1; min-width: 0; }
        .__ntf-title {
            font-size: 13.5px;
            font-weight: 800;
            color: #111;
            margin-bottom: 4px;
            line-height: 1.3;
        }
        .__ntf-msg {
            font-size: 12.5px;
            color: #444;
            line-height: 1.45;
        }

        /* ── Footer button ── */
        .__ntf-footer {
            background: #f0f4ff;
            padding: 9px 14px;
        }
        .__ntf-btn {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, #1976D2, #0D47A1);
            color: #fff;
            text-align: center;
            font-size: 13px;
            font-weight: 800;
            padding: 9px 0;
            border-radius: 8px;
            text-decoration: none;
            letter-spacing: 0.3px;
            transition: filter 0.2s, transform 0.2s;
            box-sizing: border-box;
        }
        .__ntf-btn:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
        }

        @media (max-width: 360px) { #__ntf { width: 260px; } }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── Build element ── */
    const ntf = document.createElement('div');
    ntf.id = '__ntf';

    function getTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    ntf.innerHTML = `
        <div class="__ntf-bar">
            <div class="__ntf-bar-left">
                <div class="__ntf-dot"></div>
                <span class="__ntf-bar-label">JINSI YA KUANGALIA</span>
            </div>
            <div class="__ntf-bar-right">
                <span class="__ntf-time" id="__ntf-time">${getTime()}</span>
                <button class="__ntf-close" id="__ntf-close" title="Funga">✕</button>
            </div>
        </div>
        <a class="__ntf-body" href="${CONFIG.url}" rel="noopener">
            <div class="__ntf-icon" id="__ntf-icon">🎓</div>
            <div class="__ntf-text">
                <div class="__ntf-title">${CONFIG.title}</div>
                <div class="__ntf-msg">${CONFIG.message}</div>
            </div>
        </a>
        <div class="__ntf-footer">
            <a class="__ntf-btn" href="${CONFIG.url}" rel="noopener">${CONFIG.btnText}</a>
        </div>
    `;

    document.body.appendChild(ntf);

    /* ── Live clock ── */
    setInterval(() => {
        const t = document.getElementById('__ntf-time');
        if (t) t.textContent = getTime();
    }, 30000);

    /* ── Show / hide / repeat ── */
    let hideTimer   = null;
    let repeatTimer = null;
    let dismissed   = false;

    function showNtf() {
        if (dismissed) return;
        ntf.classList.add('ntf-show');

        /* shake icon */
        const ic = document.getElementById('__ntf-icon');
        if (ic) {
            ic.classList.remove('ntf-ring');
            void ic.offsetWidth;
            ic.classList.add('ntf-ring');
        }

        if (CONFIG.hideAfter > 0) {
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                ntf.classList.remove('ntf-show');
                if (CONFIG.repeatEvery > 0 && !dismissed) {
                    repeatTimer = setTimeout(showNtf, CONFIG.repeatEvery);
                }
            }, CONFIG.hideAfter);
        }
    }

    /* first pop */
    setTimeout(showNtf, CONFIG.showDelay);

    /* close — one final re-pop after 30 s */
    document.getElementById('__ntf-close').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dismissed = true;
        clearTimeout(hideTimer);
        clearTimeout(repeatTimer);
        ntf.classList.remove('ntf-show');
        setTimeout(() => {
            dismissed = false;
            showNtf();
            dismissed = true;
        }, 30000);
    });

})();