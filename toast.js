!function() {
    var _toasts = {};
    var _delay = 1000;
    var _colorOptions = {
        error: '#f44336',
        info: '#2196f3',
        warn: '#fdd835',
        success: '#4caf50',
    };

    function message(data) {
        var dom = document.createElement('div');
        var style = 'padding: 0 20px; border-radius: 2px; box-sizing: border-box; color: #fff; display: flex; align-items: center; position: fixed; left: 50%; bottom: 0; transform: translate(-50%, 100%); width: 100%; max-width: 750px; height: 40px; box-shadow: 0 -2px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); z-index: 9999;font-size: 14px;';
        style += 'background: ' + _colorOptions[data.type] || '#000' + ';';
        dom.style = style;
        dom.innerHTML = data.text || 'null';
        document.body.appendChild(dom);
        var uid = new Date().getTime();
        _toasts[uid] = getInit();
        animateSilde(dom, 'silde-in', uid, function() {
            handleDelay(dom, uid);
        });
    }

    function getInit() {
        return {
            start: 0,
            end: 100,
        };
    }

    // 缓动算法
    function QuadraticEaseOut(t, b, c, d){
        return -c * ( t /= d ) * ( t - 2 ) + b;
    }

    function handleDelay(dom, uid) {
        setTimeout(function() {
            animateSilde(dom, 'silde-out', uid, function() {
                handleRemove(dom, uid);
            });
        }, _delay);
    }

    function handleRemove(dom, uid) {
        document.body.removeChild(dom);
        delete _toasts[uid];
    }

    function animateSilde(dom, type, uid, fn) {
        var target = 0;
        var s = _toasts[uid].start;
        var e = _toasts[uid].end;
        if (type === 'silde-out') target = 100;
        window.requestAnimationFrame(function() {
            var num = ~~dom.style.transform.slice(16).replace(/\%|\)/g, '');
            var diff = target - num;
            var next = QuadraticEaseOut(s, num, diff, e);
            if (s < e) {
                _toasts[uid].start += 1;
                dom.style.transform = 'translate(-50%, ' + next + '%)';
                animateSilde(dom, type, uid, fn);
            } else {
                _toasts[uid].start = 0;
                dom.style.transform = 'translate(-50%, ' + target + '%)';
                if (fn) fn();
            }
        });
    }

    window.message = message;
}();