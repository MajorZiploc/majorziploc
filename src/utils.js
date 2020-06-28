// @ts-check
/** @type {(label: string, choices: any[]) => string} */
export const genericPluralizer = (label, choices) => `${label}${choices?.length > 1 ? 's' : ''}`;

/** @type {(str: string) => string} */
export const toCamel = str =>
  str
    .toLowerCase()
    .replace(/([-_ ][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', '').replace(' ', ''));

export const defaultSvgStyles = {
  fill: '#a19191',
  stroke: '#a19191',
};

/** @type {(strings: string[]) => (string | number)[]} */
export const padTypeAnimationTimings = strings => {
  return strings.flatMap(str => [str, 1000]);
};
