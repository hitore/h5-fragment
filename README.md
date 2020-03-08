# h5-fragment

Js动画效果探索。

定时器动画需要自己计算渲染的更新时间，而且可能会因事件阻塞（event loop）导致动画事件延迟执行，造成视觉错误。

所以需要一种更流畅、优雅的js动画效果方式。

# 实现

主要通过`window.requestAnimationFrame`实现

`window.requestAnimationFrame`告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

# 控制速度

动画速度与步数有关

默认：

```js
var start = 0;
var end = 100;
```

浏览器每重绘1次为1步，即浏览器重绘100次动画停止。

可根据自身需求修改起始位置。

通常

```
1步 = 1帧 ≈ 16.6ms
60步 = 60帧 ≈ 1s
```

# 缓动算法

过渡效果离不开缓动算法

可参考[Tween.js](https://github.com/tweenjs/tween.js/blob/master/src/Tween.js)

```js
TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

    },

    // ...
}
```

