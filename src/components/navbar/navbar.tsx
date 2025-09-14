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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = useMemo(() => ["/about", "/portfolio"].indexOf(asPath) < 0, [asPath]);

  const isMobile = useIsMobile();
  const hiddenState = { opacity: 0, y: isMobile ? 0 : VISIBLE_POSITION };

  const toggleMenu = () => {
    console.log('Toggle menu, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
            {/* Desktop Navigation */}
            <div id="navbar-links" className="hidden sm:flex flex-col justify-center">
              <ul className="inline-flex items-center">
                
                {!isProduction && !isMobile && <li className="px-3 slide-up-sm text-red-500">Env: {process.env.NODE_ENV}</li>}

                <li className="px-3 slide-up-sm">
                  <Link href={`${paths.home}#book`}>My Book</Link>
                </li>
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
                  <a className="icon icon--fill" href="https://www.linkedin.com/in/meghan-rabbitt-04b80116/" rel="noreferrer" target="_blank" aria-label="LinkedIn">
                    <Image src="/assets/images/logos/linkedin.svg" alt="linked in logo" width={16} height={16}/>
                  </a>  
                </li>
                <li className="px-2 slide-up-sm hidden md:flex shrink-0">
                  <a className="icon icon--fill" href="https://www.instagram.com/meghanrabbitt/?utm_medium=copy_link" rel="noreferrer" target="_blank" aria-label="Instagram">
                    <Image src="/assets/images/logos/instagram.svg" alt="instagram logo" width={16} height={16}/>
                  </a>  
                </li>
                <li className="px-2 slide-up-sm hidden md:flex shrink-0">
                  <a className="icon icon--fill" href="https://www.facebook.com/megrabbitt" rel="noreferrer" target="_blank" aria-label="Facebook">
                    <Image src="/assets/images/logos/facebook.svg" alt="facebook logo" width={16} height={16}/>
                  </a>  
                </li>
              </ul>  
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="sm:hidden flex items-center">
              <button 
                className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          
          </div>

        </EntryMotion>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className={`${styles.overlay}`}
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <Link href="/" onClick={closeMenu}>
              <Image 
                src="/assets/images/mr-logo.png" 
                alt="Meghan Rabbitt Logo" 
                height={48} 
                width={162}
                className={styles.sidebarLogo}
              />
            </Link>
            <button 
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              ×
            </button>
          </div>
          
          <nav className={styles.sidebarNav}>
            <ul>
              <li>
                <Link href={`${paths.home}#book`} onClick={closeMenu}>My Book</Link>
              </li>
              {!isHome && (
                <li>
                  <Link scroll={true} href={`/`} onClick={closeMenu}>Home</Link>
                </li>
              )}
              <li>
                <Link scroll={true} href={`${paths.home}#clients`} onClick={closeMenu}>Clients</Link>
              </li>
              <li>
                <Link scroll={true} href={`${paths.home}#services`} onClick={closeMenu}>Services</Link>
              </li>
              <li>
                <Link scroll={true} href={`${paths.home}#work`} onClick={closeMenu}>Work</Link>
              </li>
              <li>
                <Link scroll={true} href={`${paths.home}#testimonials`} onClick={closeMenu}>Testimonials</Link>
              </li>
              <li>
                <Link href={`${paths.about}`} onClick={closeMenu}>About Me</Link>
              </li>
              <li>
                <Link scroll={true} href={`${paths.home}#contact`} onClick={closeMenu}>Contact Me</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.sidebarSocial}>
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/meghan-rabbitt-04b80116/" rel="noreferrer" target="_blank" aria-label="LinkedIn">
                <Image src="/assets/images/logos/linkedin.svg" alt="LinkedIn" width={24} height={24}/>
                LinkedIn
              </a>
              <a href="https://www.instagram.com/meghanrabbitt/?utm_medium=copy_link" rel="noreferrer" target="_blank" aria-label="Instagram">
                <Image src="/assets/images/logos/instagram.svg" alt="Instagram" width={24} height={24}/>
                Instagram
              </a>
              <a href="https://www.facebook.com/megrabbitt" rel="noreferrer" target="_blank" aria-label="Facebook">
                <Image src="/assets/images/logos/facebook.svg" alt="Facebook" width={24} height={24}/>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;