type UaeFlagProps = {
  className?: string;
};

export function UaeFlag({ className = 'h-[12px] w-[20px]' }: UaeFlagProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 12" aria-hidden="true">
      <rect width="20" height="12" fill="#00732F" />
      <rect y="4" width="20" height="8" fill="white" />
      <rect y="8" width="20" height="4" fill="black" />
      <rect width="6" height="12" fill="#FF0000" />
    </svg>
  );
}
