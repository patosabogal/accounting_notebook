const isUndefined = (item) => typeof item === "undefined";
const isNull = (item) => item === null;
/* Check if at least one argument is undefined, null or an empty object */
const someEmptyUndefinedOrNull = (...args) => {
  for (let i = 0; i < args.length; i++) {
    if (isUndefined(args[i]) || args[i] === "" || isNull(args[i])) {
      return true;
    }

    // Special case for dates
    if (
      typeof args[i] === "object" &&
      Object.prototype.toString.call(args[i]) !== "[object Date]"
    ) {
      if (Array.isArray(args[i]) && args[i].length === 0) return true;

      if (Object.keys(args[i]).length === 0) return true;
    }
  }

  return false;
};
export const exists = (...args) =>
  args.every((a) => !someEmptyUndefinedOrNull(a));
