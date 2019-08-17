!function() {
  function Bubble(key) {
    var self = this;
    this.selecters = $(key);
    this.pool = {};
    this.bindEventClick = bindEventClick;
    this.bubbleAnimate = bubbleAnimate;
    this.changeScale = changeScale;
    this.removeBubble = removeBubble;

    this.init = function() {
      self.bindEventClick();
    }();
  }

  function bindEventClick() {
    for (let i = 0; i < this.selecters.length; i += 1) {
      var select = this.selecters[i];
      select.addEventListener('click', handleClick.bind(this));
    }
  }

  function handleClick(e) {
    var uid = new Date().getTime() + '';
    var target = e.target;
    var dom = document.createElement('div');
    dom.style = 'position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none;';
    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    this.pool[uid] = {
      x: e.offsetX,
      y: e.offsetY,
      target: target,
      bubble: dom,
      width: target.clientWidth,
      height: target.clientHeight,
      start: 0,
      end: 30,
    };
    target.appendChild(dom);
    this.bubbleAnimate(uid);
  }

  function bubbleAnimate(uid) {
    var bubbleInfo = this.pool[uid];
    var circle = document.createElement('div');
    var style = 'position: absolute; border-radius: 50%; background: #fff; opacity: 0.3; transform: scale(0.1);';
    var max = Math.max(bubbleInfo.width, bubbleInfo.height);
    var size = 2 * max;
    style += 'left: ' + (bubbleInfo.x - max) + 'px;';
    style += 'top: ' + (bubbleInfo.y - max) + 'px;';
    style += 'width: ' + size + 'px;';
    style += 'height: ' + size + 'px;';
    circle.style = style;
    bubbleInfo.bubble.appendChild(circle);
    bubbleInfo.circle = circle;
    this.changeScale(uid);
  }

  function changeScale(uid) {
    var self = this;
    var bubbleInfo = self.pool[uid];
    var circle = bubbleInfo.circle;
    var targe = 1;
    window.requestAnimationFrame(function() {
      var current = parseFloat(/scale\((.+)\)/.exec(circle.style.transform)[1]);
      var diff = targe - current;
      if (bubbleInfo.start < bubbleInfo.end) {
        bubbleInfo.start += 1;
        if (bubbleInfo.start > 10) {
          var targetOpacity = 0;
          var currentOpacity = parseFloat(circle.style.opacity);
          var diffOpacity = targetOpacity - currentOpacity;
          var nextOpacity = SineEaseOut(bubbleInfo.start - 10, currentOpacity, diffOpacity, bubbleInfo.end);
          circle.style.opacity = nextOpacity;
        }
        var next = SineEaseOut(bubbleInfo.start, current, diff, bubbleInfo.end);
        circle.style.transform = 'scale(' + next + ')';
        changeScale.call(self, uid);
      } else {
        circle.style.transform = 'scale(' + targe + ')';
        self.removeBubble(uid);
      }
    });
  }

  function removeBubble(uid) {
    var bubbleInfo = this.pool[uid];
    bubbleInfo.target.removeChild(bubbleInfo.bubble);
    delete this.pool[uid];
  }

  function SineEaseOut(t, b, c, d){
    return c * Math.sin(t / d * ( Math.PI / 2 )) + b;
  }
  
  function $(key) {
    return document.querySelectorAll(key);
  }

  window.Bubble = Bubble;
}();