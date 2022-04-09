import React from "react";
import Image from "next/image";
import styles from "../../styles/header.module.scss"

function NavBarSection(){
  
  return (
    <div id="navbar" className="container flex justify-between center-content p-4 pb-0" data-aos="fade-in" data-aos-duration={500}>   {/*data-aos="fade-down" data-aos-delay="500"*/}
      <div>
        <a href="#">
          <Image src="/assets/images/mr-logo-sm.jpg" alt="Meghan Rabbitt Logo" height={96} width={324}/>
        </a>
      </div>
      <div className="flex flex-col justify-center">
        <ul className="inline-flex">
          <li className="px-2 slide-up-sm">
            <a href="#clients">Clients</a>
          </li>
          <li className="px-2 slide-up-sm">
            <a href="#about">About</a>
          </li>
          <li className="px-2 slide-up-sm">
            <a href="#testimonials">Testimonials</a>
          </li>
          <li className="px-2 slide-up-sm">
            <a href="#services">Services</a>
          </li>
          <li className="px-2 slide-up-sm">
            <a href="#work">Work</a>
          </li>
          <li className="px-2">
            <div className={styles.vline} />
          </li>
          <li className="px-2 slide-up-sm">
            <a className="icon icon--fill" href="https://www.linkedin.com/in/meghan-rabbitt-04b80116/" rel="noreferrer" target="_blank" aria-label="Instagram">
              <Image src="/assets/images/logos/linkedin.svg" alt="linked in logo" width={16} height={16}/>
            </a>  
          </li>
          <li className="px-2 slide-up-sm">
            <a className="icon icon--fill" href="https://www.instagram.com/meghanrabbitt/?utm_medium=copy_link" rel="noreferrer" target="_blank" aria-label="Instagram">
              <Image src="/assets/images/logos/instagram.svg" alt="instagram logo" width={16} height={16}/>
            </a>  
          </li>
          <li className="px-2 slide-up-sm">
            <a className="icon icon--fill" href="https://www.facebook.com/megrabbitt" rel="noreferrer" target="_blank" aria-label="Instagram">
              <Image src="/assets/images/logos/facebook.svg" alt="facebook logo" width={16} height={16}/>
            </a>  
          </li>
        </ul>  
      </div>
    </div>
  );
}

export default NavBarSection;