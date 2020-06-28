import * as React from 'react';
const SvgSkateboarding = props => (
  <svg xmlns='http://www.w3.org/2000/svg' width={800} height={800} fill='none' viewBox='0 0 24 24' {...props}>
    <path
      stroke={props.stroke || '#000'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m5 19 2.333 1h9.334L19 19M8 22.01l.01-.011M16 22.01l.01-.011M7 7.833l3-1.5c2-1 4.27.568 4.27.568l-4.308 3.135L14 13.334v4M9.549 13.345l-1.24.827H5M15.165 9.21h2.722M17 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
    />
  </svg>
);
export default SvgSkateboarding;
