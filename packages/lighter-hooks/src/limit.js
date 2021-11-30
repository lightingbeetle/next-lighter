// limit function call by max number of times per tick
var MAX = 50;

export default function limit(fn) {
  var dirty;
  var wrapped = function () {
    if (++wrapped.count >= MAX)
      throw new Error(
        "More than " + MAX + " calls, likely there's infinite recursion"
      );

    if (!dirty) {
      dirty = true;
      Promise.resolve().then(() => {
        dirty = false;
        wrapped.count = 0;
      });
    }

    return fn.apply(this, arguments);
  };
  wrapped.count = 0;

  return wrapped;
}
