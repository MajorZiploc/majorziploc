import * as React from 'react';
const SvgDjangoReact = props => (
  <svg xmlns='http://www.w3.org/2000/svg' width={640} height={640} viewBox='0 0 480 480' {...props}>
    <path
      fill={props.backgroundelement?.stroke || '#00d8ff'}
      fillRule='evenodd'
      strokeLinecap='square'
      strokeLinejoin='bevel'
      d='M331.033 223.545c0-15.695-19.648-30.56-49.784-39.796 6.96-30.715 3.856-55.144-9.757-62.973-3.143-1.831-6.806-2.699-10.816-2.699v10.778c2.217 0 4.01.444 5.514 1.254 6.575 3.76 9.41 18.105 7.192 36.557-.54 4.53-1.408 9.313-2.468 14.19-9.467-2.313-19.802-4.106-30.657-5.263-6.517-8.927-13.285-17.045-20.091-24.14 15.733-14.654 30.503-22.656 40.548-22.656V118.02c-13.285 0-30.657 9.467-48.241 25.895-17.585-16.331-34.957-25.702-48.242-25.702v10.778c9.988 0 24.815 7.963 40.568 22.501-6.768 7.096-13.516 15.155-19.937 24.102-10.913 1.157-21.248 2.95-30.715 5.302a142.342 142.342 0 0 1-2.507-13.998c-2.275-18.452.54-32.797 7.057-36.615 1.446-.868 3.336-1.253 5.553-1.253v-10.76c-4.049 0-7.731.869-10.913 2.7-13.574 7.828-16.62 32.22-9.602 62.838-30.079 9.255-49.63 24.082-49.63 39.738 0 15.695 19.648 30.56 49.784 39.797-6.96 30.715-3.856 55.144 9.757 62.972 3.143 1.832 6.806 2.7 10.874 2.7 13.285 0 30.657-9.468 48.242-25.895 17.584 16.33 34.957 25.702 48.241 25.702 4.05 0 7.732-.868 10.914-2.7 13.573-7.828 16.62-32.219 9.602-62.837 29.963-9.217 49.514-24.102 49.514-39.739Zm-96.445 0c0-12.185-9.872-22.077-22.077-22.077-12.186 0-22.077 9.872-22.077 22.077 0 12.205 9.872 22.077 22.077 22.077 12.205-.02 22.077-9.891 22.077-22.077Zm-70.415-105.333Zm103.984 73.114c-1.793 6.228-4.01 12.649-6.517 19.07-1.986-3.857-4.05-7.732-6.325-11.589-2.217-3.856-4.589-7.635-6.96-11.298 6.864 1.022 13.477 2.275 19.802 3.817ZM246.04 242.77c-3.76 6.517-7.635 12.706-11.646 18.452-7.192.636-14.48.964-21.826.964-7.288 0-14.577-.347-21.73-.926a260.944 260.944 0 0 1-11.684-18.355c-3.664-6.325-7-12.745-10.046-19.224 2.989-6.478 6.382-12.937 9.988-19.262 3.76-6.517 7.635-12.706 11.646-18.452 7.192-.636 14.48-.964 21.826-.964 7.288 0 14.577.347 21.73.926a260.944 260.944 0 0 1 11.684 18.355c3.664 6.325 7 12.745 10.046 19.224-3.047 6.459-6.363 12.918-9.988 19.262Zm15.599-6.286a213.32 213.32 0 0 1 6.67 19.223 213.998 213.998 0 0 1-19.897 3.857c2.371-3.722 4.724-7.54 6.96-11.454 2.198-3.856 4.28-7.77 6.267-11.626Zm-48.975 51.52c-4.492-4.628-8.985-9.796-13.42-15.445 4.339.193 8.793.347 13.285.347 4.532 0 9.024-.096 13.42-.347a190.844 190.844 0 0 1-13.285 15.444Zm-35.92-28.44c-6.865-1.022-13.478-2.276-19.802-3.818 1.793-6.228 4.01-12.649 6.517-19.07 1.986 3.857 4.049 7.732 6.324 11.589a303.674 303.674 0 0 0 6.96 11.299Zm35.67-100.494c4.492 4.627 8.985 9.795 13.42 15.444-4.339-.193-8.793-.347-13.285-.347-4.531 0-9.024.097-13.42.347a190.844 190.844 0 0 1 13.285-15.444Zm-35.728 28.44c-2.372 3.721-4.724 7.539-6.96 11.453a284.864 284.864 0 0 0-6.286 11.588 213.32 213.32 0 0 1-6.672-19.224 236.951 236.951 0 0 1 19.918-3.817Zm-43.71 60.466c-17.103-7.289-28.151-16.852-28.151-24.43 0-7.577 11.067-17.199 28.15-24.429 4.146-1.793 8.696-3.374 13.381-4.878 2.758 9.467 6.382 19.32 10.875 29.404-4.435 10.045-8.021 19.84-10.72 29.268-4.782-1.503-9.332-3.142-13.536-4.935Zm25.99 69.007c-6.575-3.76-9.409-18.105-7.192-36.557.54-4.531 1.408-9.313 2.468-14.191 9.467 2.314 19.802 4.107 30.657 5.264 6.518 8.927 13.285 17.044 20.091 24.14-15.752 14.634-30.522 22.655-40.567 22.655-2.179-.058-4.01-.482-5.457-1.311Zm114.55-36.789c2.275 18.452-.54 32.798-7.057 36.615-1.446.868-3.336 1.254-5.553 1.254-9.988 0-24.815-7.963-40.568-22.502 6.768-7.095 13.516-15.155 19.937-24.101 10.913-1.157 21.248-2.95 30.715-5.322 1.118 4.879 1.986 9.564 2.526 14.056Zm18.587-32.218c-4.146 1.793-8.696 3.374-13.381 4.878-2.757-9.467-6.382-19.32-10.875-29.404 4.435-10.046 8.021-19.84 10.72-29.269 4.782 1.504 9.313 3.143 13.574 4.917 17.103 7.288 28.151 16.851 28.151 24.429-.039 7.597-11.087 17.199-28.19 24.449Z'
    />
    <g fill={props.foregroundelement?.stroke || '#092e20'}>
      <path d='M103.636 255.187h14.386v66.587c-7.38 1.402-12.798 1.962-18.682 1.962-17.563 0-26.717-7.94-26.717-23.167 0-14.666 9.715-24.193 24.754-24.193 2.336 0 4.11.186 6.26.746Zm0 33.518c-1.681-.56-3.082-.747-4.857-.747-7.286 0-11.49 4.484-11.49 12.33 0 7.661 4.017 11.864 11.397 11.864 1.587 0 2.895-.093 4.95-.373Z' />
      <path d='M140.908 277.403v33.348c0 11.49-.841 17-3.363 21.765-2.336 4.578-5.419 7.473-11.77 10.65l-13.359-6.352c6.352-2.99 9.435-5.604 11.396-9.623 2.056-4.11 2.71-8.874 2.71-21.39v-28.398Zm-14.386-22.14h14.386v14.76h-14.386ZM149.597 280.672c6.353-2.989 12.424-4.296 19.057-4.296 7.38 0 12.237 1.96 14.386 5.79 1.213 2.15 1.587 4.951 1.587 10.93v29.238c-6.446.934-14.573 1.589-20.55 1.589-12.051 0-17.47-4.205-17.47-13.546 0-10.09 7.193-14.76 24.849-16.255v-3.175c0-2.616-1.308-3.55-4.951-3.55-5.325 0-11.303 1.495-16.909 4.391v-11.116Zm22.513 22.886c-9.529.934-12.611 2.43-12.611 6.166 0 2.802 1.775 4.11 5.698 4.11 2.149 0 4.11-.187 6.913-.654ZM191.634 279.644c8.5-2.241 15.506-3.268 22.605-3.268 7.38 0 12.705 1.68 15.882 4.95 2.989 3.082 3.922 6.445 3.922 13.639v28.21h-14.386v-27.65c0-5.51-1.868-7.567-7.005-7.567-1.962 0-3.736.187-6.633 1.028v34.189h-14.385ZM239.636 331.022c5.045 2.616 10.089 3.83 15.413 3.83 9.434 0 13.451-3.83 13.451-12.985v-.28c-2.802 1.4-5.605 1.962-9.34 1.962-12.612 0-20.646-8.314-20.646-21.485 0-16.349 11.864-25.596 32.881-25.596 6.166 0 11.865.654 18.777 2.055l-4.925 10.376c-3.83-.747-.307-.1-3.202-.38v1.495l.187 6.071.092 7.848c.094 1.96.094 3.923.188 5.884v3.924c0 12.33-1.028 18.122-4.11 22.886-4.484 7.006-12.238 10.463-23.26 10.463-5.605 0-10.462-.841-15.507-2.803v-13.265Zm28.585-42.97h-1.495c-2.801-.094-6.07.653-8.314 2.054-3.455 1.962-5.231 5.512-5.231 10.556 0 7.194 3.55 11.304 9.902 11.304 1.962 0 3.55-.375 5.418-.935v-4.95c0-1.681-.093-3.55-.093-5.512l-.093-6.632-.094-4.764v-1.121ZM312.505 276.188c14.385 0 23.167 9.062 23.167 23.727 0 15.04-9.154 24.475-23.727 24.475-14.387 0-23.261-9.061-23.261-23.633 0-15.135 9.156-24.569 23.821-24.569Zm-.281 36.618c5.512 0 8.782-4.577 8.782-12.518 0-7.846-3.177-12.517-8.687-12.517-5.7 0-8.97 4.578-8.97 12.517.001 7.941 3.27 12.518 8.875 12.518Z' />
    </g>
  </svg>
);
export default SvgDjangoReact;
