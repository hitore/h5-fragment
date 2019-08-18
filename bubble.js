!function() {
  function Bubble(key) {
    this.bgColor = '#fff';
    this.key = key;
    this.selecters = $(key);
    this.pool = {};
    this.bindEventClick = bindEventClick;
    this.bubbleAnimate = bubbleAnimate;
    this.changeScale = changeScale;
    this.removeBubble = removeBubble;
    this.setBgColor = setBgColor;
    this.init = this.bindEventClick();
  }

  function bindEventClick() {
    var self = this;
    for (let i = 0; i < this.selecters.length; i += 1) {
      var select = this.selecters[i];
      select.addEventListener('mousedown', function(e) {
        if (e.button === 0) handleClick.call(self, e);
      }, true);
    }
  }

  function handleClick(e) {
    // var self = this;
    var uid = new Date().getTime();
    var target = e.target;
    
    // 检查是否父节点
    var isFather = false;
    for (let i = 0; i < this.selecters.length; i += 1) {
      if (this.selecters[i] === target) {
        isFather = true;
      }
    }
    if (!isFather) {
      console.warn('DOMException: Event listener try to bind on incorrect Node.');
      return;
    }

    var dom = document.createElement('div');
    dom.style = 'position: absolute; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none;';

    var currentPosition = window.getComputedStyle(target).position;
    target.style.position = currentPosition === 'static' ? 'relative' : currentPosition;
    target.style.overflow = 'hidden';
    target.appendChild(dom);

    this.pool[uid] = {
      x: e.offsetX,
      y: e.offsetY,
      target: target,
      bubble: dom,
      width: target.clientWidth,
      height: target.clientHeight,
      opacityStart: 0,
      opacityEnd: 120,
      start: 0,
      end: 30,
      listener: listener.bind(this, uid),
    };

    this.bubbleAnimate(uid);

    target.addEventListener('mouseup', this.pool[uid].listener);
    target.addEventListener('mouseleave', this.pool[uid].listener);
  }

  function listener(uid, e) {
    // 阻止冒泡
    e.stopPropagation();
    if (e.button === 0) this.removeBubble(uid);
  }

  function bubbleAnimate(uid) {
    var bubbleInfo = this.pool[uid];
    var circle = document.createElement('div');
    var style = 'position: absolute; border-radius: 50%; opacity: 0.3; transform: scale(0.1);';
    style += 'background: ' + this.bgColor + ';';
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
      var next = CubicEaseIn(bubbleInfo.start, current, diff, bubbleInfo.end);
      if (bubbleInfo.start < bubbleInfo.end) {
        bubbleInfo.start += 1;
        circle.style.transform = 'scale(' + next + ')';
        changeScale.call(self, uid);
      } else {
        circle.style.transform = 'scale(' + targe + ')';
      }
    });
  }

  function removeBubble(uid) {
    var self = this;
    var bubbleInfo = self.pool[uid];
    var circle = bubbleInfo.circle;
    var target = 0;
    window.requestAnimationFrame(function() {
      if (bubbleInfo.start < bubbleInfo.end / 2) {
        self.removeBubble(uid);
        return;
      }
      var current = parseFloat(circle.style.opacity);
      var diff = target - current;
      var next = SineEaseOut(bubbleInfo.opacityStart, current, diff, bubbleInfo.opacityEnd);
      if (bubbleInfo.opacityStart < bubbleInfo.opacityEnd) {
        bubbleInfo.opacityStart += 1;
        circle.style.opacity = next;
        self.removeBubble(uid);
      } else if (!bubbleInfo.finish) {
        bubbleInfo.finish = true;
        circle.style.opacity = target;
        bubbleInfo.target.removeChild(bubbleInfo.bubble);
        bubbleInfo.target.removeEventListener('mouseup', self.pool[uid].listener);
        bubbleInfo.target.removeEventListener('mouseleave', self.pool[uid].listener);
        delete self.pool[uid];
      }
    });
  }

  function setBgColor(color) {
    this.bgColor = color;
  }

  function SineEaseOut(t, b, c, d){
    return c * Math.sin(t / d * ( Math.PI / 2 )) + b;
  }

  function CubicEaseIn(t, b, c, d) {
    return c*(t/=d)*t + b;
  }
  
  function $(key) {
    return document.querySelectorAll(key);
  }

  window.Bubble = Bubble;
}();