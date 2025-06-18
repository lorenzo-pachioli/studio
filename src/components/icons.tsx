import type { SVGProps } from 'react';

export const PawPrintIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="4" r="2" />
    <circle cx="18" cy="8" r="2" />
    <circle cx="4" cy="8" r="2" />
    <path d="M11.27 7.1A6.42 6.42 0 0 0 5.5 11.56c0 2.76 1.22 5.03 3.25 6.02A8.76 8.76 0 0 0 12 20a8.76 8.76 0 0 0 3.25-2.42c2.03-1 3.25-3.26 3.25-6.02A6.42 6.42 0 0 0 12.73 7.1Z" />
    <path d="M12 12v8" />
  </svg>
);

// Add other custom icons here if needed
