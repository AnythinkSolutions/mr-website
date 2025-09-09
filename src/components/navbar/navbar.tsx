import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss"
import { useRouter } from "next/router";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import EntryMotion from "../entry-motion/entry-motion";
import { useIsMobile } from "../../utilities/app-hooks";

const VISIBLE_POSITION = -50;

const NavBar = () => {  
  const [paths, setPaths] = useState({home: '', about: '/about'});
  const { asPath } = useRouter();
  const [isSticky, setSticky] = useState(false);
  const isHome = useMemo(() => ["/about", "/portfolio"].indexOf(asPath) < 0, [asPath]);

  const isMobile = useIsMobile();
  const hiddenState = { opacity: 0, y: isMobile ? 0 : VISIBLE_POSITION };

  const isProduction = process.env.NODE_ENV === "production";

  useScrollPosition(
    ({ currPos }) => {
      const isVisible = currPos.y < VISIBLE_POSITION;
      if(isVisible === isSticky) return;
      setSticky(isVisible);
    },
    [isSticky],
  );
  
  useEffect(() => {
    switch(asPath){
      case "/about":
        setPaths({home: "/", about: "#"});
        break;

      case "/portfolio":
        setPaths({home: "/", about: "/about"});
        break;
  
      case "/":
      default:
        setPaths({home: "", about: "/about"});
        break;
    }
  }, [asPath]);

  return (
    <>
      {/* The spacer eliminates the jump in the page when the navbar switches to fixed position. */}
      {isSticky && <div id="spacer" className={styles.spacer} />}
      <div id="navbar" className={`w-full ${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
        <EntryMotion hidden={hiddenState} duration={0.33}>
          <div className="navbar-inner w-full flex justify-between center-content p-4 pb-0 overflow-hidden">
          
            <div className={`${styles.logo} hidden sm:flex`}>
              <Link href="/">
                <Image className="" src="/assets/images/mr-logo.png" priority alt="Meghan Rabbitt Logo" height={72} width={243}/>
              </Link>
            </div>
            <div className={`${styles.logo} flex sm:hidden`}>
              <Link href="/">
                <Image className="flex sm:hidden" src="/assets/images/mr-logo.png" alt="Meghan Rabbitt Logo" height={48} width={162}/>
              </Link>
            </div>
            <div id="navbar-links" className="flex-none sm:flex flex-col justify-center">
              <ul className="inline-flex items-center">
                
                {!isProduction && !isMobile && <li className="px-3 slide-up-sm text-red-500">Env: {process.env.NODE_ENV}</li>}

                {!isHome && 
                  <li className="px-3 slide-up-sm">
                    <Link scroll={true} href={`/`}>Home</Link>
                  </li>
                }
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#clients`}>Clients</Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#services`}>Services</Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#work`}>Work</Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#testimonials`}>Testimonials</Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link href={`${paths.about}`}>About Me</Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#contact`}>Contact Me</Link>
                </li>
                <li className="px-3 h-full hidden md:flex">
                  <div className={styles.vline} />
                </li>
                <li className="px-2 slide-up-sm hidden md:flex shrink-0">
                  <a className="icon icon--fill" href="https://www.linkedin.com/in/meghan-rabbitt-04b80116/" rel="noreferrer" target="_blank" aria-label="Instagram">
                    <Image src="/assets/images/logos/linkedin.svg" alt="linked in logo" width={16} height={16}/>
                  </a>  
                </li>
                <li className="px-2 slide-up-sm hidden md:flex shrink-0">
                  <a className="icon icon--fill" href="https://www.instagram.com/meghanrabbitt/?utm_medium=copy_link" rel="noreferrer" target="_blank" aria-label="Instagram">
                    <Image src="/assets/images/logos/instagram.svg" alt="instagram logo" width={16} height={16}/>
                  </a>  
                </li>
                <li className="px-2 slide-up-sm hidden md:flex shrink-0">
                  <a className="icon icon--fill" href="https://www.facebook.com/megrabbitt" rel="noreferrer" target="_blank" aria-label="Instagram">
                    <Image src="/assets/images/logos/facebook.svg" alt="facebook logo" width={16} height={16}/>
                  </a>  
                </li>
              </ul>  
            </div>
          
          </div>

        </EntryMotion>
      </div>
    </>
  );
}

export default NavBar;