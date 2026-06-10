import svgPaths from './successPageSvgPaths';

export type SuccessRuleIconKey =
  | 'calendar'
  | 'pause'
  | 'meal'
  | 'clock'
  | 'snowflake'
  | 'recycle';

function CalendarRuleIcon() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[14.58%_7.5%_10.42%_7.5%] rounded-[6px] bg-white" />
      <div className="absolute inset-[14.58%_7.5%_62.92%_7.5%] rounded-tl-[6px] rounded-tr-[6px] bg-[#b9ab35]" />
      <div className="absolute inset-[7.08%_65%_80.42%_27.5%] rounded-[2px] bg-[#d8c84c]" />
      <div className="absolute inset-[7.08%_27.5%_80.42%_65%] rounded-[2px] bg-[#d8c84c]" />
      <div className="absolute inset-[47.08%_67.5%_42.92%_22.5%] rounded-[1px] bg-[#b9ab35]" />
      <div className="absolute inset-[67.08%_67.5%_22.92%_22.5%] rounded-[1px] bg-[#b9ab35]" />
      <div className="absolute inset-[47.08%_45%_42.92%_45%] rounded-[1px] bg-[#b9ab35]" />
      <div className="absolute inset-[67.08%_45%_22.92%_45%] rounded-[1px] bg-[#b9ab35]" />
      <div className="absolute inset-[47.08%_22.5%_42.92%_67.5%] rounded-[1px] bg-[#b9ab35]" />
      <div className="absolute inset-[67.08%_22.5%_22.92%_67.5%] rounded-[1px] bg-[#b9ab35]" />
    </div>
  );
}

function PauseRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute bottom-1/2 left-[31.82%] right-[31.82%] top-[9.09%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 13.7143 15.4286">
          <path d={svgPaths.p1189d580} fill="#EEEEEE" />
        </svg>
      </div>
      <div className="absolute inset-[29.55%_36.36%_54.55%_36.36%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 10.2857 6">
          <path d={svgPaths.p3f18e130} fill="#F029A8" />
        </svg>
      </div>
      <div className="absolute bottom-[9.09%] left-[31.82%] right-[31.82%] top-1/2">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 13.7143 15.4286">
          <path d={svgPaths.p3fcc7780} fill="#EEEEEE" />
        </svg>
      </div>
      <div className="absolute inset-[70.45%_36.36%_13.64%_36.36%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 10.2857 6">
          <path d={svgPaths.p3ab6f780} fill="#F029A8" />
        </svg>
      </div>
      <div className="absolute inset-[4.55%_27.27%_90.91%_27.27%] bg-[#d9d9d9]" />
      <div className="absolute inset-[90.91%_27.27%_4.55%_27.27%] bg-[#d9d9d9]" />
    </div>
  );
}

function MealRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[12.5%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 36 36">
          <path d={svgPaths.p37de9680} fill="#F5976F" />
        </svg>
      </div>
      <div className="absolute inset-[23.21%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 25.7143 25.7143">
          <path d={svgPaths.p108f7a00} fill="#FACFBC" />
        </svg>
      </div>
      <div className="absolute inset-[24.89%_80.19%_24.89%_11.34%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 4.06434 24.1069">
          <path d={svgPaths.pa38dd00} fill="#49515F" />
        </svg>
      </div>
      <div className="absolute inset-[24.89%_11.36%_24.89%_82.73%]">
        <div className="absolute inset-[1.65%_0_0_0]">
          <svg className="block size-full" fill="none" viewBox="0 0 2.8376 23.7092">
            <path d={svgPaths.p74e9c00} fill="#49515F" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClockRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[8.33%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 31.4286 31.4286">
          <path d={svgPaths.p35fe5270} fill="#EEEEEE" />
        </svg>
      </div>
      <div className="absolute inset-[16.67%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 25.1429 25.1429">
          <path d={svgPaths.p2da18c40} fill="#D9DEE5" />
        </svg>
      </div>
      <div className="absolute bottom-1/2 left-[47.92%] right-[47.92%] top-[22.92%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 1.57143 10.2143">
          <path d={svgPaths.p356ab300} fill="#411864" />
        </svg>
      </div>
      <div className="absolute inset-[48.23%_34.82%_34.83%_48.24%]">
        <div className="absolute inset-[5.86%]">
          <svg className="block size-full" fill="none" viewBox="0 0 5.63918 5.63977">
            <path d={svgPaths.p1a694c00} fill="#411864" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 3.14286 3.14286">
          <path d={svgPaths.pe379300} fill="#411864" />
        </svg>
      </div>
      <div className="absolute inset-[47.92%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 1.57143 1.57143">
          <path d={svgPaths.p3ee34c80} fill="#AE60F2" />
        </svg>
      </div>
    </div>
  );
}

function SnowflakeRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[8.33%_13.33%_8.33%_13.25%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 27.6884 31.4286">
          <path
            clipRule="evenodd"
            d={svgPaths.p2b0a6200}
            fill="#216172"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

function RecycleRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[12.75%_7.67%_4.17%_7.96%]">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 30.3748 29.91">
          <path d={svgPaths.p14bfba80} fill="#355917" />
        </svg>
      </div>
    </div>
  );
}

export function SuccessRuleIcon({ iconKey }: { iconKey: SuccessRuleIconKey }) {
  switch (iconKey) {
    case 'calendar':
      return <CalendarRuleIcon />;
    case 'pause':
      return <PauseRuleIcon />;
    case 'meal':
      return <MealRuleIcon />;
    case 'clock':
      return <ClockRuleIcon />;
    case 'snowflake':
      return <SnowflakeRuleIcon />;
    case 'recycle':
      return <RecycleRuleIcon />;
  }
}
