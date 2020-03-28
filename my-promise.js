function myPromise(fn) {
    let self = this;
    this.status = 'padding';
    this.resolveVal = undefined;
    this.rejectVal = undefined;
    this.finallyVal = undefined;
    this.resolveList = [];
    this.rejectList = [];
    this.finallyFn = () => {};


    function resolve(val) {
        self.status = 'resolve';
        self.resolveVal = val;
        self.resolveList.forEach(cb => cb());
        self.finallyVal = val;
        self.finallyFn();
    }

    function reject(val) {
        self.status = 'reject';
        self.rejectVal = val;
        self.rejectList.forEach(cb => cb());
        self.finallyVal = val;
        self.finallyFn();
    }

    try {
        fn(resolve, reject);
    } catch(e) {
        reject();
    }
    
}
myPromise.prototype.then = function(fn) {
    if (this.status === 'resolve') {
        fn(this.resolveVal);
    }
    if (this.status === 'padding') {
        this.resolveList.push(() => {
            fn(this.resolveVal);
        });
    }
    return this;
}

myPromise.prototype.catch = function(fn) {
    if (this.status === 'reject') {
        fn(this.rejectVal);
    }
    if (this.status === 'padding') {
        this.rejectList.push(() => {
            fn(this.rejectVal);
        });
    }
    return this;
}

myPromise.prototype.finally = function(fn) {
    this.finallyFn = () => {
        fn(this.finallyVal);
    }
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
    .finally(res => {
        console.log('finally', res);
    });