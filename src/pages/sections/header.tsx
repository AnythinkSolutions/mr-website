import Image from 'next/image'
import TypeSpan from "../../components/type-span";
import styles from "../../styles/header.module.scss";

function HeaderSection(){
  const subHeadText = "Writer, Editor, Content Strategist";
  
  return (
    <div id="header" className={`container p-4 pt-0`}>
      <div className="flex bg-slate-50">
        <div className="w-2/5" data-aos="fade-in" data-aos-duration={600}>
          <Image src="/assets/images/headshot-bw-v-md.jpg" alt="Meghan Rabbitt" height={1200} width={798}/>
        </div>
        <div className="w-3/5 p-8 flex flex-col justify-center">
          <h1 className="text-5xl mb-6 font-semibold" data-aos="fade-down" data-aos-duration={500}>Meghan Rabbitt</h1>
          <span className={styles.line} data-aos="fade-in" data-aos-delay={500} data-aos-duration={500}/>
            <div className={`text-2xl ${styles.typespanContainer}`}>
              <TypeSpan startDelay={1250} speed={50}>Writer, Editor, Content Strategist</TypeSpan>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;