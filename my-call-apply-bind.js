
Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('not function');
    }

    context = context || window;

    context._fn = this;  // 通过点操作符改变this的指向

    let res = context._fn(...args);

    delete context._fn;

    return res;
}

Function.prototype.myApply = function(context, arr = []) {
    if (typeof this !== 'function') {
        throw new TypeError('not function');
    }

    context = context || window;

    context._fn = this;  // 通过点操作符改变this的指向

    let res = context._fn(...arr);

    delete context._fn;

    return res;
}

Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('not function');
    }

    context = context || window;

    context._fn = this;

    return function(...args) {
        let res = context._fn(...args);
        delete context._fn;
        return res;
    };
}