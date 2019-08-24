!function() {
  var _loadingDom = null;
  var _end = 18;
  var _counter = {
    fadeIn: 0,
    fadeOut: 0,
  }

  function loading() {
    this.show = showLoading;
    this.hide = hideLoading;
    this.init = addKeyframes();
  }

  function showLoading() {
    if (_loadingDom) return;
    _loadingDom = getDom();
    document.body.appendChild(_loadingDom);
    fadeAnimate('fadeIn');
  }

  function hideLoading() {
    if (_loadingDom) {
      fadeAnimate('fadeOut', function() {
        document.body.removeChild(_loadingDom);
        _loadingDom = null;
      });
    }
  }

  var _svg = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1564568607905" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2171" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><defs><style type="text/css"></style></defs><path d="M874.666667 533.333333l-192 0c-12.8 0-21.333333-8.533333-21.333333-21.333333 0-12.8 8.533333-21.333333 21.333333-21.333333l192 0c12.8 0 21.333333 8.533333 21.333333 21.333333C896 524.8 887.466667 533.333333 874.666667 533.333333zM648.533333 407.466667c-8.533333 8.533333-21.333333 8.533333-29.866667 0-8.533333-8.533333-8.533333-21.333333 0-29.866667l136.533333-136.533333c8.533333-8.533333 21.333333-8.533333 29.866667 0 8.533333 8.533333 8.533333 21.333333 0 29.866667L648.533333 407.466667zM512 896c-12.8 0-21.333333-8.533333-21.333333-21.333333l0-192c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333l0 192C533.333333 887.466667 524.8 896 512 896zM512 362.666667c-12.8 0-21.333333-8.533333-21.333333-21.333333L490.666667 149.333333c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333l0 192C533.333333 354.133333 524.8 362.666667 512 362.666667zM270.933333 782.933333c-8.533333 8.533333-21.333333 8.533333-29.866667 0s-8.533333-21.333333 0-29.866667l136.533333-136.533333c8.533333-8.533333 21.333333-8.533333 29.866667 0 8.533333 8.533333 8.533333 21.333333 0 29.866667L270.933333 782.933333zM375.466667 407.466667l-136.533333-136.533333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866667 0l136.533333 136.533333c8.533333 8.533333 8.533333 21.333333 0 29.866667C398.933333 413.866667 384 413.866667 375.466667 407.466667zM362.666667 512c0 12.8-8.533333 21.333333-21.333333 21.333333L149.333333 533.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333 0-12.8 8.533333-21.333333 21.333333-21.333333l192 0C354.133333 490.666667 362.666667 499.2 362.666667 512zM648.533333 616.533333l136.533333 136.533333c8.533333 8.533333 8.533333 21.333333 0 29.866667-8.533333 8.533333-21.333333 8.533333-29.866667 0l-136.533333-136.533333c-8.533333-8.533333-8.533333-21.333333 0-29.866667C625.066667 610.133333 640 610.133333 648.533333 616.533333z" p-id="2172" fill="#ffffff"></path></svg>';

  function addKeyframes() {
    var keyFrames = '@keyframes rotateAnimate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function SineEaseOut(t, b, c, d){
    return c * Math.sin(t / d * ( Math.PI / 2 )) + b;
  }

  function getDom() {
    var div = document.createElement('div');
    var inner = document.createElement('div');
    inner.innerHTML = _svg;
    var style = 'position: fixed; left: 50%; top: 0; transform: translate(-50%, 0); width: 100%; height: 100vh; background: rgb(0,0,0); opacity: 0; max-width: 750px; z-index: 999; display: flex; align-items: center; justify-content: center;';
    var innerStyle = 'animation: rotateAnimate 2s linear infinite; display: flex; align-items: center; justify-content: center;';
    div.style = style;
    inner.style = innerStyle;
    div.appendChild(inner);
    return div;
  }

  function fadeAnimate(type, fn) {
    var target = 0;
    var start = _counter[type];
    if (type === 'fadeIn') target = 0.5;
    window.requestAnimationFrame(function() {
      if ((type === 'fadeIn' && _counter.fadeOut > 0) ||
          (type === 'fadeOut' && _counter.fadeIn > 0)) {
        fadeAnimate(type, fn);
        return;
      }
      var current = parseFloat(_loadingDom.style.opacity);
      var diff = target - current;
      var next = SineEaseOut(start, current, diff, _end);
      if (start < _end) {
        _counter[type] += 1;
        _loadingDom.style.opacity = next;
        fadeAnimate(type, fn);
      } else {
        _counter[type] = 0;
        _loadingDom.style.opacity = target;
        if (typeof fn === 'function') fn();
      }
    });
  }

  window.loading = new loading();
}();