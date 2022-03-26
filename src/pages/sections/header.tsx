import React from "react";
import Image from 'next/image'
import styles from "../../styles/header.module.scss";

function HeaderSection(){

  return (
    <div id="header" className="container p-4 pt-0">
      <div className="flex bg-slate-50">
        <div className="w-2/5">
          <Image src="/assets/images/headshot-bw-v-md.jpg" alt="Meghan Rabbitt" height={1200} width={798}/>
        </div>
        <div className="w-3/5 p-8 flex flex-col justify-center">
          <h1 className="text-5xl mb-6 font-semibold" data-aos="fade-in" data-aos-duration="1000">Meghan Rabbitt</h1>
          <span className={styles.line} data-aos="fade-in" data-aos-duration="1000"/>
            <div className="text-2xl">
              <span data-aos="fade-in" data-aos-delay="1000" >Writer</span>
              <span data-aos="fade-in" data-aos-delay="1750">, Editor</span>
              <span data-aos="fade-in" data-aos-delay="2500">, Content Strategist</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;