import * as React from 'react';
const SvgMusic = props => (
  <svg xmlns='http://www.w3.org/2000/svg' width={640} height={640} viewBox='0 0 90 90' {...props}>
    <rect
      width={94.32}
      height={65.52}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={2.4}
      rx={7.792}
      ry={7.792}
      transform='translate(6.62 27.486) scale(.66673)'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={1.600152}
      d='M20.541 27.486c3.27 0 6.208.11 6.208 3.38l-2.07 17.763c-1.13 4.42-.868 7.98-4.138 7.98s-2.642-3.695-3.7-8.04l-1.9-17.723c0-3.27 2.33-3.36 5.6-3.36Z'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeMiterlimit={2}
      strokeWidth={0.800076}
      d='M16.45 48.436h8.288M16.884 50.617h7.582'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={1.600152}
      d='M31.903 27.486h11.84v29.122h-11.84zM55.105 27.486c3.27 0 5.92 1.072 5.92 4.341v18.86a5.92 5.92 0 1 1-11.84 0v-18.88c0-3.27 2.65-4.321 5.92-4.321Z'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeMiterlimit={2}
      strokeWidth={1.525152}
      d='M20.353 56.657V70.83M37.795 56.657V70.83M54.916 56.657V70.83'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={1.600152}
      d='M27.422 20.26c0-3.992-3.152-7.227-7.04-7.227-3.889 0-7.041 3.235-7.041 7.226s3.161 4.326 7.05 4.326c3.888 0 7.031-.335 7.031-4.326Z'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeMiterlimit={2}
      strokeWidth={0.800076}
      d='M13.423 19.925h13.678M13.278 21.725h14.055'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={1.600152}
      d='M56.91 19.219c-.387-2.868-.675-5.118-2.16-5.118-1.486 0-2.115 3.2-2.175 5.226 0 4.296.69 5.791 2.175 5.791 1.485 0 2.16-1.604 2.16-5.9Z'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeMiterlimit={2}
      strokeWidth={0.800076}
      d='M52.576 19.734h4.365M52.452 21.438h4.417M49.02 32.709h11.892M48.948 34.814h11.973M49.064 39.11h11.81M48.934 41.186h12.011'
    />
    <ellipse
      cx={10.56}
      cy={10.44}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={2.4}
      rx={10.56}
      ry={10.44}
      transform='translate(6.46 73.89) scale(.66673)'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={1.600152}
      d='M20.357 70.436c-.095 2.643 1.518 16.179-2.128 16.048'
    />
    <ellipse
      cx={10.56}
      cy={10.44}
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={2.4}
      rx={10.56}
      ry={10.44}
      transform='translate(39.583 73.73) scale(.66673)'
    />
    <path
      fill={props.fill || 'none'}
      stroke={props.stroke || 'tan'}
      strokeLinecap='square'
      strokeLinejoin='bevel'
      strokeWidth={2.4}
      d='M4.099 0c0 1.635 1.874 22.869-4.099 22.869'
      transform='matrix(.6661 .02901 -.02901 .6661 52.298 71.145)'
    />
    {!(props.simple.toLowerCase() === 'true') && (
      <>
        <path
          fill={props.fill || 'none'}
          stroke={props.stroke || 'tan'}
          strokeLinecap='square'
          strokeLinejoin='bevel'
          strokeWidth={1.600152}
          d='M31.173 14.92c4.786-4.55 9.548-4.5 14.286.15'
        />
        <path
          fill={props.fill || 'none'}
          stroke={props.stroke || 'tan'}
          strokeLinecap='square'
          strokeLinejoin='bevel'
          strokeWidth={1.600152}
          d='M25.404 10.571c8.383-8.353 16.903-8.3 25.56.16M34.462 20.399c2.25-2.887 4.552-2.902 6.904-.046'
        />
      </>
    )}
  </svg>
);
export default SvgMusic;
