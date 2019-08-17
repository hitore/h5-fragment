!function() {
  var _start = 0;
  var _end = 100;
  // 修正值
  var _correction = 5;
  var _scrolling = false;

  function myScrollTo(top) {
    if (_scrolling) return;
    _scrolling = true;
    var scrollHeight = document.body.scrollHeight || document.body.clientHeight;
    var visible = window.screen.height;
    var maxHeight = scrollHeight - visible;
    if (top <= 0)  top = 0;
    if (top >= maxHeight) top = maxHeight;
    animateScroll(top);
  }

  function SineEaseOut(t,b,c,d){
    return c * Math.sin(t / d * ( Math.PI / 2 )) + b;
  }

  function animateScroll(top) {
    window.requestAnimationFrame(function() {
      var current = document.body.scrollTop || document.documentElement.scrollTop;
      var diff = top - current;
      if (_start < _end && Math.abs(diff) > _correction) {
        _start += 1;
        var next = SineEaseOut(_start, current, diff, _end);
        window.scrollTo(0, next);
        animateScroll(top);
      } else {
        window.scrollTo(0, top);
        _start = 0;
        _scrolling = false;
      }
    });
  }

  window.myScrollTo = myScrollTo;
}();