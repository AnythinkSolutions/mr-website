import { useState } from "react";
import Image from 'next/image'
import TypeSpan from "../../components/type-span";
import styles from "../../styles/header.module.scss";

function HeaderSection(){
  const [isFinished, setFinished] = useState(false);
  
  return (
    <div id="header" className="container relative p-4 py-0">
      <div className={styles.headerBg} />
      <div className="flex">
        <div className="w-2/5" data-aos="fade-in" data-aos-duration={600}>
          <Image priority src="/assets/images/headshot-bw-2x3.jpg" alt="Meghan Rabbitt" height={600} width={400}/>
        </div>
        <div className="w-3/5 p-8 flex flex-col justify-center">
          <h1 className="text-5xl mb-6 font-semibold" data-aos="fade-down" data-aos-duration={500}>Meghan Rabbitt</h1>
          <span className={styles.line} data-aos="fade-in" data-aos-delay={350} data-aos-duration={500}/>
          <div className={`text-2xl ${styles.typespanContainer}`}>
            <TypeSpan startDelay={750} speed={40} withCursor cursorDelay={1250} onFinish={() => setFinished(true)}>Writer, Editor, Content Strategist</TypeSpan>
          </div>
          {isFinished && 
            <div className={styles.contactLink} data-aos="fade-in" data-aos-duration={1000}>
              <div className="relative slide-up-sm">
                <a href="#contact">Contact Me</a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;