/**
 * promise/A+规范：
 * 1.一个promise的当前状态只能是pending、fulfilled和rejected三种之一。状态改变只能是pending到fulfilled或者pending到rejected。状态改变不可逆。
 * 2.promise的then方法接收两个可选参数，表示该promise状态改变时的回调(promise.then(onFulfilled, onRejected))。then方法返回一个promise，then 方法可以被同一个 promise 调用多次。
 */

function myPromise(fn) {
    let self = this;
    this.status = 'padding';
    this.resolveVal = undefined;
    this.rejectVal = undefined;
    this.finallyVal = undefined;
    this.resolveList = [];
    this.rejectList = [];


    function resolve(val) {
        self.status = 'fulfilled';
        self.resolveVal = val;
        self.resolveList.forEach(cb => cb());
    }

    function reject(val) {
        self.status = 'rejected';
        self.rejectVal = val;
        self.rejectList.forEach(cb => cb());
    }

    try {
        fn(resolve, reject);
    } catch(e) {
        reject();
    }
    
}
myPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
        onFulfilled(this.resolveVal);
    }
    if (this.status === 'padding') {
        this.resolveList.push(() => {
            onFulfilled(this.resolveVal);
        });
        this.rejectList.push(() => {
            onRejected(this.rejectVal);
        });
    }
    return this;
}

myPromise.prototype.catch = function(onRejected) {
    if (this.status === 'rejected') {
        onRejected(this.rejectVal);
    }
    if (this.status === 'padding') {
        this.rejectList.push(() => {
            onRejected(this.rejectVal);
        });
    }
    return this;
}

function foo() {
    return new myPromise((resolve, reject) => {
        setTimeout(() => {
            resolve({ a: 1, b: 2 });
        }, 2000);
    });
}

// function foo() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({ a: 1, b: 2 });
//         }, 2000);
//     });
// }


foo()
    .then(res => {
        console.log('request result', res);
    })
    .then(() => {
        console.log('more');
    })