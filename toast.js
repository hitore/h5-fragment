!function() {
    var _start = 0;
    var _end = 100;
    var _delay = 1000;
    var _colorOptions = {
        error: '#f44336',
        info: '#2196f3',
        warn: '#fdd835',
        success: '#4caf50',
    };

    function message(data) {
        var dom = document.createElement('div');
        var style = 'padding: 0 20px; border-radius: 2px; box-sizing: border-box; color: #fff; display: flex; align-items: center; position: fixed; left: 50%; bottom: 0; transform: translate(-50%, 100%); width: 100%; max-width: 750px; height: 40px;    box-shadow: 0 -2px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);';
        style += 'background: ' + _colorOptions[data.type] || '#000' + ';';
        dom.style = style;
        dom.innerHTML = data.text || 'null';
        document.body.appendChild(dom);
        animateSilde(dom, 'silde-in', function() {
            handleDelay(dom);
        });
    }

    // 缓动算法
    function QuadraticEaseOut(t, b, c, d){
        return -c * ( t /= d ) * ( t - 2 ) + b;
    }

    function handleDelay(dom) {
        setTimeout(function() {
            animateSilde(dom, 'silde-out', function() {
                handleRemove(dom);
            });
        }, _delay);
    }

    function handleRemove(dom) {
        document.body.removeChild(dom);
    }

    function animateSilde(dom, type, fn) {
        var target = 0;
        if (type === 'silde-out') target = 100;
        window.requestAnimationFrame(function() {
            var num = ~~dom.style.transform.slice(16).replace(/\%|\)/g, '');
            var diff = target - num;
            var next = QuadraticEaseOut(_start, num, diff, _end);
            if (_start < _end) {
                _start += 1;
                dom.style.transform = 'translate(-50%, ' + next + '%)';
                animateSilde(dom, type, fn);
            } else {
                _start = 0;
                dom.style.transform = 'translate(-50%, ' + target + '%)';
                if (fn) fn();
            }
        });
    }

    window.message = message;
}();