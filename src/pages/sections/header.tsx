import { useState } from "react";
import Image from 'next/image'
import TypeSpan from "../../components/type-span";
import styles from "../../styles/header.module.scss";

function HeaderSection(){
  const [isFinished, setFinished] = useState(false);
  
  return (
    <div id="header" className={`w-full relative p-0 md:px-6 ${styles.header}`}>
      {/* <div className={styles.headerBg} /> */}
      <div className="flex">
        <div className="" data-aos="fade-in" data-aos-duration={600}>
          <Image priority src="/assets/images/headshot-bw-2x3.jpg" alt="Meghan Rabbitt" height={600} width={400} objectFit="cover"/>
        </div>
        <div className="p-3 sm:p-8 flex flex-col justify-center relative grow">
          <h1 className="text-xl sm:text-5xl mb-2 sm:mb-6 font-semibold" data-aos="fade-down" data-aos-duration={500}>Meghan Rabbitt</h1>
          <span className={`${styles.line} mb-2 sm:mb-4`} data-aos="fade-in" data-aos-delay={350} data-aos-duration={500}/>
          <div className={`text-base sm:text-2xl ${styles.typespanContainer}`}>
            <TypeSpan startDelay={500} speed={40} withCursor cursorDelay={1250} onFinish={() => setFinished(true)}>Writer, Editor, Content Strategist</TypeSpan>
          </div>
          {isFinished && 
            <div className={`${styles.contactLink} ${isFinished ? styles.ready: ""}`}>
              <div className="relative slide-up-sm">
                <a className="text-sm sm:text-base" href="#contact">Contact Me</a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;