import Image from "next/image";
import EntryMotion from "../../components/entry-motion/entry-motion";

export interface IContactSectionProps {
}

const ContactSection: React.FC<IContactSectionProps> = () => {
  return (
    <div className="w-full">
      <EntryMotion duration={0.9}>
        <div className="flex flex-col items-center my-8 p-4 py-0">
          
          <div className="w-full flex flex-col items-center justify-center my-4 ml-4 section-header">
            <h2>Contact Me</h2>
            <div className="gradient_line lg" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl font-light mb-6">Please get in touch, I&apos;d love to hear from you.</p>
            <Image src="/assets/images/mr-logo-initials.gif" alt="Meghan Rabbitt Logo" height={250} width={250} objectFit="cover" />
            <h3 className="text-3xl mb-4 font-light text-sky-400 mt-4"><a href="mailto:hello@meghanrabbitt.com">hello@meghanrabbitt.com</a></h3>
            <h3 className="text-3xl mb-4 font-light font-light">Boston, MA USA</h3>
          </div>
        </div>
      </EntryMotion>
    </div>
  );
}

export default ContactSection;
