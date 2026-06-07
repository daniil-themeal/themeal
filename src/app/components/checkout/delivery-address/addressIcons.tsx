import type { ReactNode } from 'react';

function StatusIconFrame({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex size-[18px] shrink-0 items-center justify-center rounded-full ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 14C8 14 12.5 10.2 12.5 6.8C12.5 4.31 10.49 2.3 8 2.3C5.51 2.3 3.5 4.31 3.5 6.8C3.5 10.2 8 14 8 14Z"
        stroke="#8594AC"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.8" r="1.45" stroke="#8594AC" strokeWidth="1.5" />
    </svg>
  );
}

export function DeliveryAvailableIcon() {
  return (
    <StatusIconFrame className="bg-[#abc604]">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4L3.7 6.7L9 1"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StatusIconFrame>
  );
}

export function DeliveryUnavailableIcon() {
  return (
    <StatusIconFrame className="bg-[#ff4d4f]">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path
          d="M1 1L7 7M7 1L1 7"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </StatusIconFrame>
  );
}

export function ClearIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
        stroke="#8594AC"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronRightIcon() {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1.5 1.5L6.5 7L1.5 12.5"
        stroke="#9A38EF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
