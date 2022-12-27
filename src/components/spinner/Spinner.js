import spinner from './spinner.svg'
import React from 'react';

const Spinner = () => {
  return (
    <svg xmlns={spinner} xmlnsXlink={spinner} style={{margin: 'auto', background: 'rgb(241, 242, 243)', display: 'block', shapeRendering: 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#9f0013" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
      </circle>
    </svg>
  );
};

export default Spinner;