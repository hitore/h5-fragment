# h5-fragment
代码片段

# 实现

主要通过`window.requestAnimationFrame`实现

# 控制速度

动画速度与步数有关

默认：

```
start = 0;
end = 100;
```

浏览器每重绘1次为1步，即浏览器重绘100次动画停止。

通常

```
1步 = 1帧 ≈ 16.6ms
60步 = 60帧 ≈ 1s
```
