
function curry(fn, arity) {
  let maxLength = arity ? arity : fn.length;
  //
  return function curried(...args) {
    if (args.length >= maxLength) {
      return fn.apply(this, args);
    } else {
      return function (...other) {
        return curried.apply(this, args.concat(other));
      }
    }
  }
}

