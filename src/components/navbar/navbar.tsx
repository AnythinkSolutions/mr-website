import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss"
import { useRouter } from "next/router";

export interface INavBarProps {}

const NavBar : React.FC<INavBarProps> = () => {  
  const [paths, setPaths] = useState({home: '', about: '/about'});
  const { asPath } = useRouter();
  
  useEffect(() => {
    switch(asPath){
      case "/about":
        setPaths({home: "/", about: "#"});
        break;

      case "/":
        setPaths({home: "", about: "/about"});
        break;
    }
  }, [asPath]);

  return (
    <div id="navbar" className="container flex justify-between center-content p-4 pb-0" data-aos="fade-in" data-aos-duration={500}>   {/*data-aos="fade-down" data-aos-delay="500"*/}
      <div>
        <Link href="/" passHref>
          <Image src="/assets/images/mr-logo-sm.jpg" alt="Meghan Rabbitt Logo" height={96} width={324}/>
        </Link>
      </div>
      <div className="flex flex-col justify-center">
        <ul className="inline-flex">
          <li className="px-3 slide-up-sm">
            <Link scroll={true} href={`${paths.home}#clients`}>Clients</Link>
          </li>
          <li className="px-3 slide-up-sm">
            <Link scroll={true} href={`${paths.home}#testimonials`}>Testimonials</Link>
          </li>
          <li className="px-3 slide-up-sm">
            <Link scroll={true} href={`${paths.home}#services`}><a>Services</a></Link>
          </li>
          <li className="px-3 slide-up-sm">
            <Link scroll={true} href={`${paths.home}#work`}><a>Work</a></Link>
          </li>
          <li className="px-3 slide-up-sm">
            <Link href={`${paths.about}`}>About Me</Link>
          </li>
          <li className="px-3">
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

export default NavBar;