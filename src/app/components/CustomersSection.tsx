const IFRAME_ID = "testimonialto-18515f72-5509-4309-8a4f-cb37ce8b672c";

export default function CustomersSection() {
  return (
    <div className="bg-[#FFE944] relative shrink-0 w-full section-spacing-y section-spacing-x justify-center flex">
      <style>{`
        .testimonial-wrapper {
          width: 100%;
          height: 420px;
          max-height: 420px;
          overflow: hidden;
          position: relative;
        }

        #testimonialto-18515f72-5509-4309-8a4f-cb37ce8b672c {
          width: 100%;
          height: 420px !important;
          max-height: 420px !important;
          border: 0;
          display: block;
        }
      `}</style>

      <div className="content-stretch flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px] items-center relative size-full maxWidth">
        <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold not-italic relative shrink-0 text-[#383e48] h2-title text-center w-full">
          What our customers say
        </h2>

        <div className="testimonial-wrapper">
          <iframe
            id={IFRAME_ID}
            src={`https://embed-v2.testimonial.to/carousel/all/themeal?id=${IFRAME_ID}`}
            frameBorder="0"
            scrolling="no"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}