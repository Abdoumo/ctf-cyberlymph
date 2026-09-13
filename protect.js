/**
 * Zero2AI — Source Code Protection
 * Blocks DevTools, right-click, keyboard shortcuts, text selection,
 * and detects DevTools opening via debugger traps & size detection.
 */
(function () {
    'use strict';

    // ─── 1. Disable Right-Click Context Menu ───
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // ─── 2. Block Keyboard Shortcuts ───
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I (Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+C (Inspect picker)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+K (Firefox Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k' || e.keyCode === 75)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+M (Responsive Design Mode)
        if (e.ctrlKey && e.shiftKey && (e.key === 'M' || e.key === 'm' || e.keyCode === 77)) {
            e.preventDefault();
            return false;
        }
    });

    // ─── 3. Disable Text Selection ───
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    });

    // ─── 4. Disable Drag ───
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // ─── 5. Disable Copy ───
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        return false;
    });

    // ─── 6. DevTools Detection via Window Size ───
    var devtoolsOpen = false;

    function checkDevTools() {
        var widthThreshold = window.outerWidth - window.innerWidth > 160;
        var heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                onDevToolsDetected();
            }
        } else {
            devtoolsOpen = false;
        }
    }

    function onDevToolsDetected() {
        // Clear the page content
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0f;color:#f0f0f5;font-family:Inter,sans-serif;text-align:center;flex-direction:column;"><h1 style="font-size:3rem;margin-bottom:16px;">⛔</h1><h2 style="font-size:1.5rem;margin-bottom:8px;">Accès interdit</h2><p style="color:#9494a8;">Les outils de développement sont désactivés sur cette page.</p></div>';
    }

    setInterval(checkDevTools, 1000);

    // ─── 7. Debugger Trap ───
    // This continuously triggers a breakpoint when DevTools is open
    (function loop() {
        setTimeout(function () {
            (function () {
                return false;
            }
            ['constructor']('debugger')
            ['call']());
            loop();
        }, 2000);
    })();

    // ─── 8. Console log override ───
    // Overwrite console methods to prevent inspection
    var noop = function () { };
    try {
        Object.defineProperty(window, 'console', {
            get: function () {
                return {
                    log: noop,
                    warn: noop,
                    error: noop,
                    info: noop,
                    debug: noop,
                    dir: noop,
                    table: noop,
                    trace: noop,
                    assert: noop,
                    clear: noop,
                    count: noop,
                    group: noop,
                    groupEnd: noop,
                    time: noop,
                    timeEnd: noop,
                };
            },
            set: function () { },
        });
    } catch (e) { }

    // ─── 9. CSS Protection ───
    var style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        input, textarea, select {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
    `;
    document.head.appendChild(style);
})();
