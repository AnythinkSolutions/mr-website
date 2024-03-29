import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss"
import { useRouter } from "next/router";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import EntryMotion from "../entry-motion/entry-motion";

const VISIBLE_POSITION = -50;
const hiddenState = { opacity: 0, translateY: -50 };

const NavBar = () => {  
  const [paths, setPaths] = useState({home: '', about: '/about'});
  const { asPath } = useRouter();
  const [isSticky, setSticky] = useState(false);
  const isHome = useMemo(() => ["/about", "/portfolio"].indexOf(asPath) < 0, [asPath]);

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
        <EntryMotion hidden={hiddenState}>
          <div className="navbar-inner w-full flex justify-between center-content p-4 pb-0">
          
            <div className={`${styles.logo} hidden sm:flex`}>
              <Link href="/">
                <a>
                  <Image className="" src="/assets/images/mr-logo.png" alt="Meghan Rabbitt Logo" height={72} width={243}/>
                </a>
              </Link>
            </div>
            <div className={`${styles.logo} flex sm:hidden`}>
              <Link href="/">
                <a>
                  <Image className="flex sm:hidden" src="/assets/images/mr-logo.png" alt="Meghan Rabbitt Logo" height={48} width={162}/>
                </a>
              </Link>
            </div>
            <div className="hidden sm:flex flex-col justify-center ">
              <ul className="inline-flex items-center">
                
                {!isProduction && <li className="px-3 slide-up-sm text-red-500">Env: {process.env.NODE_ENV}</li>}

                {!isHome && 
                  <li className="px-3 slide-up-sm">
                    <Link scroll={true} href={`/`}><a>Home</a></Link>
                  </li>
                }
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#clients`}><a>Clients</a></Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#services`}><a>Services</a></Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#work`}><a>Work</a></Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#testimonials`}><a>Testimonials</a></Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link href={`${paths.about}`}><a>About Me</a></Link>
                </li>
                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`${paths.home}#contact`}><a>Contact Me</a></Link>
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