import * as React from "react";

export const LeftArrowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={15}
    height={15}
    viewBox="0 0 511.801 511.801"
    {...props}
  >
    <path d="m271.067 255.84 237.76-237.76c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 0 0-14.827 0L248.453 248.373a10.623 10.623 0 0 0 0 15.04l245.333 245.333c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 0 0 0-14.827L271.067 255.84z" />
    <path d="m25.733 255.84 237.76-237.76c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 0 0-14.827 0L3.12 248.267a10.623 10.623 0 0 0 0 15.04L248.453 508.64c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 0 0 0-14.827L25.733 255.84z" />
  </svg>
);

export const RightArrowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={15}
    height={15}
    viewBox="0 0 512.094 512.094"
    {...props}
  >
    <path d="M263.641 248.4 18.308 3.067c-4.16-4.053-10.987-3.947-15.04.32a10.763 10.763 0 0 0 0 14.827l237.76 237.76L3.268 493.733c-4.267 4.053-4.373 10.88-.213 15.04 4.16 4.16 10.88 4.373 15.04.213l.213-.213L263.641 263.44a10.623 10.623 0 0 0 0-15.04z" />
    <path d="M508.974 248.4 263.641 3.067c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 0 0 0 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.16 4.16 10.88 4.373 15.04.213l.213-.213L508.974 263.44a10.62 10.62 0 0 0 0-15.04z" />
  </svg>
);

export const OrderListIcon = ({ size, height, width, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`${className}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
      />
    </svg>
  );
};
export const UsersIcon = ({ size, height, width, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: "new 0 0 100.4 100.4",
      }}
      viewBox="0 0 100.4 100.4"
      width="1em"
      height="1em"
      className={`${className}`}
      {...props}
    >
      <path d="M76.9 34v-2.7c3.4-2 5.6-5.7 5.6-9.7v-4.8c0-6.2-5-11.2-11.2-11.2S60 10.6 60 16.8v4.8c0 3.9 2 7.5 5.4 9.5V34c-1.5.4-2.9 1-4.3 1.8-2.2-5.1-7.3-8.7-13.2-8.7-5.8 0-10.7 3.4-13 8.4-1.3-.6-2.6-1.2-3.9-1.5v-2.7c3.4-2 5.6-5.7 5.6-9.7v-4.8c0-6.2-5-11.2-11.2-11.2s-11.2 5-11.2 11.2v4.8c0 3.9 2 7.5 5.4 9.5V34c-9 2.6-15.1 10.7-15.1 20.1 0 .8.7 1.5 1.5 1.5H35.9c1.2 1.9 2.9 3.5 4.9 4.7v4.5c-11.9 3.2-20 13.9-20 26.3 0 .8.7 1.5 1.5 1.5h51.5c.8 0 1.5-.7 1.5-1.5 0-12.3-8.5-23.2-20.3-26.3v-4.3c2.1-1.2 3.8-2.8 5.1-4.8h30.7c.8 0 1.5-.7 1.5-1.5-.1-9.4-6.5-17.7-15.4-20.2zM7.5 52.7c.6-7.8 6.2-14.2 13.9-16 .7-.2 1.2-.8 1.2-1.5v-5c0-.6-.3-1.1-.8-1.3-2.8-1.4-4.6-4.2-4.6-7.3v-4.8c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2v4.8c0 3.1-1.9 6-4.7 7.4-.5.2-.9.8-.9 1.4v4.8c0 .7.5 1.3 1.2 1.5 1.7.4 3.3 1 4.8 1.8-.2 1-.3 2-.3 3.1V48c0 1.6.3 3.2.8 4.7h-27zm45.3 5.5c-.5.2-.9.8-.9 1.4V66c0 .7.5 1.3 1.2 1.5C63.7 69.8 71.5 79 72.2 89.7H23.8C24.4 79 32 70 42.6 67.6c.7-.2 1.2-.8 1.2-1.5v-6.6c0-.6-.3-1.1-.8-1.3-3.9-1.9-6.3-5.8-6.3-10.1v-6.4c0-6.3 5.1-11.3 11.3-11.3s11.3 5.1 11.3 11.3V48c0 4.3-2.5 8.3-6.5 10.2zm8.7-5.5c.5-1.5.8-3.1.8-4.7v-6.4c0-.9-.1-1.9-.3-2.7 1.6-1 3.4-1.7 5.2-2.1.7-.2 1.2-.8 1.2-1.5v-5c0-.6-.3-1.1-.8-1.3-2.8-1.4-4.6-4.2-4.6-7.3v-4.8c0-4.5 3.7-8.2 8.2-8.2 4.5 0 8.2 3.7 8.2 8.2v4.8c0 3.1-1.9 6-4.7 7.4-.5.2-.9.8-.9 1.4v4.8c0 .7.5 1.3 1.2 1.5 7.7 1.7 13.4 8.3 14.1 16l-27.6-.1z" />
    </svg>
  );
};
export const ClientsIcon = ({ height, width, className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      overflow="hidden"
      viewBox="0 0 96 96"
      width="1em"
      height="1em"
      className={`${className}`}
      {...rest}
    >
      <circle cx={78} cy={25} r={5} />
      <circle cx={18} cy={25} r={5} />
      <circle cx={58} cy={25} r={5} />
      <circle cx={38} cy={25} r={5} />
      <path d="m89.9 49.5-3.2-14.6c-.1-.4-.3-.8-.7-1.1-1.2-.9-2.5-1.7-4-2.1-1.3-.4-2.6-.7-4-.7s-2.8.2-4 .7c-1.5.5-2.8 1.2-4 2.1-.4.3-.6.7-.7 1.1L68 40.8l-1.3-5.9c-.1-.4-.3-.8-.7-1.1-1.2-.9-2.5-1.7-4-2.1-1.3-.4-2.6-.7-4-.7s-2.8.2-4 .7c-1.5.5-2.8 1.2-4 2.1-.4.3-.6.7-.7 1.1L48 40.7v.1l-1.3-5.9c-.1-.4-.3-.8-.7-1.1-1.2-.9-2.5-1.7-4-2.1-1.3-.4-2.6-.7-4-.7s-2.8.2-4 .7c-1.5.5-2.8 1.2-4 2.1-.4.3-.6.7-.7 1.1L28 40.7l-1.3-5.8c-.1-.4-.3-.8-.7-1.1-1.2-.9-2.5-1.7-4-2.1-1.3-.4-2.6-.7-4-.7s-2.8.2-4 .7c-1.5.5-2.8 1.2-4 2.1-.4.3-.6.7-.7 1.1L6.1 49.4c-.3 1.1.4 2.3 1.6 2.5H8c.9 0 1.7-.6 2-1.6L13 37v7.1L10 59h3v17h4V59h2v17h4V59h3l-3-14.9V37l3 13.4c.2.9 1 1.6 1.9 1.6.9 0 1.7-.6 1.9-1.6L33 37v39h4V53h2v23h4V37l3 13.4c.2.9 1 1.6 2 1.6.9 0 1.7-.6 1.9-1.6L53 37v7.2L50 59h3v17h4V59h2v17h4V59h3l-3-15v-7l3 13.4c.2.9 1 1.6 2 1.6.9 0 1.7-.6 2-1.6L73 37v39h4V53h2v23h4V37l3 13.4c.2.9 1 1.6 2 1.6.2 0 .5 0 .7-.1.9-.4 1.4-1.4 1.2-2.4Z" />
    </svg>
  );
};
export const PrintIcon = ({ size, height, width, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path d="M21.5 10H18V5.635L13.281 1H6v9H2.5A1.5 1.5 0 0 0 1 11.5v8A1.5 1.5 0 0 0 2.5 21H6v2h12v-2h3.5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5zM17 6h-4V2zM7 2h5v5h5v3H7zm10 20H7v-5h10zm5-2.5a.5.5 0 0 1-.5.5H18v-2h1v-2H5v2h1v2H2.5a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h19a.5.5 0 0 1 .5.5zm-7 .5v1H9v-1zm-6-1v-1h6v1zm10-7h1v1h-1z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
};
export const StockIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="size-6"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661l-2.41-7.839a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
      />
    </svg>
  );
};
export const VerifyIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="#00F700"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="#00F700"
      />
    </svg>
  );
};
export const DownloadIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-6 h-6"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
    />
  </svg>
);
export const OrderIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="1em"
    height="1em"
    className={`${className}`}
    {...rest}
  >
    <defs>
      <style>
        {
          ".cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <g id="purchase-mobile">
      <path
        d="M35 37.762V10.074A4.074 4.074 0 0 0 30.926 6H9.074A4.074 4.074 0 0 0 5 10.074v45.852A4.074 4.074 0 0 0 9.074 60h21.852A4.074 4.074 0 0 0 35 55.926v-5.77"
        className="cls-1"
      />
      <path
        d="M26 6.404h0A2.596 2.596 0 0 1 23.404 9h-6.808A2.596 2.596 0 0 1 14 6.404h0M15 57h10"
        className="cls-1"
      />
      <rect width={37} height={12} x={12} y={38} className="cls-1" rx={6} />
      <circle cx={52} cy={29} r={2} className="cls-1" />
      <circle cx={51.5} cy={13.5} r={1.132} />
      <path
        d="m43.586 13.586 2.828 2.828M46.414 13.586l-2.828 2.828M23 41h-6v3h6v3h-6M20 39v10M27 44h17"
        className="cls-1"
      />
      <circle cx={16.934} cy={29.591} r={1.5} className="cls-1" />
      <circle cx={25.934} cy={29.591} r={1.5} className="cls-1" />
      <path d="M8.434 15.091h3l3 12h14l2-8H12.616" className="cls-1" />
    </g>
  </svg>
);
export const SignInIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-6 h-6"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
    />
  </svg>
);
export const EyeSlashFilledIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
      fill="currentColor"
    />
    <path
      d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
      fill="currentColor"
    />
    <path
      d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
      fill="currentColor"
    />
    <path
      d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
      fill="currentColor"
    />
    <path
      d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
      fill="currentColor"
    />
  </svg>
);

export const EyeFilledIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
      fill="currentColor"
    />
    <path
      d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
      fill="currentColor"
    />
  </svg>
);
export const GooglegIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

export const WarningIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width || 24}
    height={size || height || 24}
    fill="#F79F30"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"
      clipRule="evenodd"
    />
  </svg>
);
export const ErrorIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width || 24}
    height={size || height || 24}
    fill="#ff0000"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

export const CheckIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width || 24}
    height={size || height || 24}
    fill="#39bd02"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
);

export const EdithIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

export const DeleteRIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);
export const EyeIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);
export const PlusIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

export const DeletePotIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={`w-4 h-4 ${className}`}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...rest}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

export const HomeIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    className={`${className}`}
    {...rest}
  >
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 0 0 1.061 1.06l8.69-8.69z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.43z" />
  </svg>
);

export const ProductIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`${className}`}
    {...rest}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
    />
  </svg>
);

export const EditIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    className={`w-4 h-4 ${className}`}
    {...rest}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

export const DeleteIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={`w-4 h-4 ${className}`}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...rest}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);
export const UpLoadIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

export const UpArrowIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={20}
    height={20}
    viewBox="0 0 511.735 511.735"
    className={`w-3 h-3 ${className}`}
    {...rest}
  >
    <path d="M508.788 371.087 263.455 125.753a10.623 10.623 0 0 0-15.04 0L2.975 371.087c-4.053 4.267-3.947 10.987.213 15.04a10.763 10.763 0 0 0 14.827 0l237.867-237.76 237.76 237.76c4.267 4.053 10.987 3.947 15.04-.213a10.663 10.663 0 0 0 .106-14.827z" />
  </svg>
);
export const DownArrowIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 1024 1024"
    className={`${className}`}
    {...rest}
  >
    <path d="M903.232 256 960 306.432 512 768 64 306.432 120.768 256 512 659.072z" />
  </svg>
);

export const InventoryIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    className={`${className}`}
    {...rest}
  >
    <path
      fillRule="evenodd"
      d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75zM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0zM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);
export const BarCodeIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={20}
    height={20}
    viewBox="0 0 91.334 91.334"
    className={`2 ${className}`}
    {...rest}
  >
    <path d="M6.834 11.549H1a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h5.834a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM62.043 11.549h-4.168a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h4.168a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM17 11.549h-4a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM90.334 11.549h-4a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM81.167 11.549h-2.724a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h2.724a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM51.875 11.549h-4a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM42.167 11.549h-2.5a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM73.523 11.549H71.98a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h1.543a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM33.667 11.549h-4a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM23.667 11.549h-1a1 1 0 0 0-1 1v66.236a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V12.549a1 1 0 0 0-1-1zM67.227 11.549h-.363c-.551 0-1 .448-1 1v66.236c0 .552.449 1 1 1h.363c.551 0 1-.448 1-1V12.549c0-.552-.45-1-1-1z" />
  </svg>
);

export const ListCategoryIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={` ${className}`}
    {...rest}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6h.008v.008H6V6z"
    />
  </svg>
);

export const LogoutIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    className={`w-6 h-6 ${className}`}
    {...rest}
  >
    <path
      fillRule="evenodd"
      d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0z"
      clipRule="evenodd"
    />
  </svg>
);
export const HamburguerIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="2em"
    height="2em"
    className={`${className}`}
    {...rest}
  >
    <path
      fillRule="evenodd"
      d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);
