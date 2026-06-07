import svgPaths from "../../imports/svgPaths";

function Facebook() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <div className="absolute left-[8px] overflow-clip size-[32px] top-[8px]">
        <div className="absolute inset-[8.33%_8.33%_8.54%_8.33%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6667 26.6">
            <path d={svgPaths.p30f77900} fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TikTok() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <div className="absolute left-[8px] overflow-clip size-[32px] top-[8px]">
        <div className="absolute inset-[8.33%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6667 26.6667">
            <path d={svgPaths.pa4fae00} fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <div className="absolute left-[8px] size-[32px] top-[8px]">
        <div className="-translate-x-1/2 absolute aspect-[16/16] bottom-[10.42%] left-1/2 overflow-clip top-[10.42%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.333 25.333">
            <path d={svgPaths.p286da700} fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function YouTube() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <div className="absolute left-[8px] overflow-clip size-[32px] top-[8px]">
        <div className="absolute inset-[20.83%_8.33%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6667 18.6667">
            <path d={svgPaths.p3449c380} fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Whatsapp() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <path d={svgPaths.p11963f00} fill="white" />
        <path d={svgPaths.pff12b80} fill="white" />
      </svg>
    </div>
  );
}

function Telegram() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <path d={svgPaths.p7246800} fill="white" />
      </svg>
    </div>
  );
}

function PersonalProfile() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <path d={svgPaths.p1c8c1200} fill="white" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <div id="footer" className="flex relative shrink-0 w-full items-center justify-center section-spacing-x bg-[#000] bg-[#282e37]">
      <div className="flex flex-col  items-center size-full maxWidth">
        
        <div className="content-stretch flex flex-col md:flex-row gap-[32px] md:gap-[64px] lg:gap-[80px] items-center justify-center md:justify-between md:items-start relative size-full px-[0px] py-[24px]">

          {/* Nav links + social media icons */}
          <div className="content-stretch flex  flex-col md:flex-1  gap-[24px] pt-[0px] sm:pt-[16px] sm:gap-[56px] items-start relative shrink-0 w-full">
            
            {/* Nav links */}
            <div className="[word-break:break-word] content-stretch flex flex-wrap justify-between font-['Quicksand:SemiBold',sans-serif] gap-[16px_24px] items-center leading-[1.5] not-italic relative shrink-0 text-[16px] lg:text-[20px] text-center lg:text-left md:justify-left text-white tracking-[-0.32px] w-full max-w-[800px]">
              <a href="#price" className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 hover:text-[#BB7AF4] transition-colors duration-150">Price</a>
              <a href="#qa" className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 hover:text-[#BB7AF4] transition-colors duration-150">Q&A</a>
              <a href="#delivery" className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 hover:text-[#BB7AF4] transition-colors duration-150">Delivery</a>
              <a href="#privacy" className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 hover:text-[#BB7AF4] transition-colors duration-150">Privacy Policy</a>
              <a href="#terms" className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 hover:text-[#BB7AF4] transition-colors duration-150">Terms & conditions</a>
            </div>
            {/* end: Nav links */}
            
            {/* Social media icons */}
            <div className="content-stretch flex gap-[12px] sm:gap-[16px] items-center justify-center md:justify-start relative shrink-0 w-full">
              <Facebook />
              <TikTok />
              <Instagram />
              <YouTube />
            </div>
            {/* end: Social media icons */}

            
          </div>
          {/* end: Nav links + social media icons */}


          <div className="flex flex-col md:flex-1 gap-[24px] max-w-[280px]">
          {/* Messenger / contact icons */}
          <div className="content-stretch flex md:justify-start gap-[16px] items-center justify-center relative shrink-0 w-full">
            <Whatsapp />
            <Telegram />
            <PersonalProfile />
          </div>
          {/* end: Messenger / contact icons */}

          {/* Legal info */}
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Medium',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.32px] md:flex-1 md:text-left md:w-auto w-full">YUMGOODS-FZCO CIF: DSO-FZCO-21291 License Number: 22986 Address: United Arab Emirates, Dubai, IFZA Business Park, DDP, PO Box 342001</p>
          {/* end: Legal info */}
</div>
        </div>
      </div>
    </div>
  );
}
