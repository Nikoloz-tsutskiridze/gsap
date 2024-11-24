import { useInView } from "react-intersection-observer";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, inView }) => {
  return (
    <div className={clipClass}>
      {inView && (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div
        ref={ref}
        className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden"
      >
        {/* Render non-image content immediately */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/337347.jpg"
            clipClass="contact-clip-path-1"
            inView={inView} // Lazy load this image
          />
        </div>

        <div className="absolute -top-28 left-20 w-64 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/Buck.jpg"
            clipClass="sword-man-clip-path md:scale-125 w-[400px]"
            inView={inView} // Lazy load this image
          />
        </div>

        {/* Render main content instantly */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join R6 community
          </p>

          <AnimatedTitle
            title="b<b>u</b>ild new era of<br />g<b>a</b>ming."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
