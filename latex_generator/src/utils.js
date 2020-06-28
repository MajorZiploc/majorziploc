//@ts-check

/**
 * @template T
 * @param {T} thing
 * @param {function(any): any} operation
 * @returns {T}
 */
function operationOnThing(thing, operation, type = 'String') {
  // @ts-ignore
  if (thing.constructor.name === type) {
    return operation(thing);
    // @ts-ignore
  } else if (thing.constructor.name === 'Object') {
    // @ts-ignore
    return Object.fromEntries(
      // @ts-ignore
      Object.entries(thing).map(([key, value]) => [key, operationOnThing(value, operation, type)])
    );
  } else if (Array.isArray(thing)) {
    // @ts-ignore
    return thing.map(t => operationOnThing(t, operation, type));
  } else {
    return thing;
  }
}

/** @type {(thing: string) => string} */
function encodeLatexSpecialChars(thing) {
  return thing
    .replace(/(#|_|&)/g, '\\$1')
    .replace(/->/g, '$\\rightarrow$')
    .replace(/<-/g, '$\\leftarrow$');
}

module.exports = {
  operationOnThing,
  encodeLatexSpecialChars,
};
