import Image from "next/image";
import EntryMotion from "../../components/entry-motion/entry-motion";

const ContactSection = () => {
  
  return (
    <div className="w-full">
      <EntryMotion duration={0.9} eventLabel="contact-me">
        <div className="flex flex-col items-center my-8 p-4 py-0">
          
          <div className="w-full flex flex-col items-center justify-center my-4 ml-4 section-header">
            <h2>Contact Me</h2>
            <div className="gradient_line lg" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-lg sm:text-2xl font-light mb-6">I&apos;d love to hear from you.</p>
            <div className="relative h-24 w-24 sm:w-48 sm:h-48">
              <Image 
                src="/assets/images/mr-logo-initials.gif" 
                alt="Meghan Rabbitt Logo" 
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3 className="text-lg sm:text-3xl mb-4 font-light text-sky-400 mt-4"><a href="mailto:hello@meghanrabbitt.com">hello@meghanrabbitt.com</a></h3>
            <h3 className="text-lg sm:text-3xl mb-4 font-light font-light">Boston, MA USA</h3>
          </div>
        </div>
      </EntryMotion>
    </div>
  );
}

export default ContactSection;
