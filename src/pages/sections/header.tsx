import { useState } from "react";
import Image from 'next/image'
import TypeSpan from "../../components/type-span";
import styles from "../../styles/header.module.scss";
import EntryMotion, { fadeInProps, fadeDown } from "../../components/entry-motion/entry-motion";

function HeaderSection(){
  const [isFinished, setFinished] = useState(false);

  return (
    <div id="header" className={`w-full relative p-0 md:px-6 ${styles.header}`}>
      <div className="flex">
        <EntryMotion {...fadeInProps}>
          <Image priority src="/assets/images/headshot-bw-2x3.jpg" alt="Meghan Rabbitt" height={600} width={400} objectFit="cover"/>
        </EntryMotion>
        <div className="p-3 sm:p-8 flex flex-col justify-center relative grow">
          <EntryMotion {...fadeDown(50)}>
            <h1 className="text-xl sm:text-5xl mb-2 sm:mb-3 font-semibold">Meghan Rabbitt</h1>
          </EntryMotion>
          <EntryMotion delay={0.35} {...fadeInProps}>
            <span className={`${styles.line} mb-2 sm:mb-4`}/>
          </EntryMotion>
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