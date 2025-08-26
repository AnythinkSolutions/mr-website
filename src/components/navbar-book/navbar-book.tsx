import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import styles from "./navbar-book.module.scss";
import Link from "next/link";

const VISIBLE_POSITION = -50;
const hiddenState = { opacity: 0, y: -50 };

const NavbarBook = () => {
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

  return (
    <div id="navbar-book" className={`w-full ${styles.navbarBook} ${isSticky ? styles.sticky : ""}`}>
      <div className="navbar-inner w-full flex justify-between center-content p-4 pb-0">
        <div className="flex-none sm:flex flex-col justify-center w-full">
          <div className="navbar-inner w-full flex justify-between center-content p-4 pb-0">
            <div className={`${styles.logo} hidden sm:flex flex-col`}>
              <h1 className={styles.title}>Meghan Rabbitt</h1>  
              <sub className={styles.subtitle}>Award winning journalist</sub>            
            </div>
            <div id="navbar-links" className={`flex-none sm:flex flex-col justify-center ${styles.navbarLinks}`}>
              <ul className="inline-flex items-center">
                {!isProduction && <li className="px-3 slide-up-sm text-red-500">Env: {process.env.NODE_ENV}</li>}

                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`/`}>Home</Link>
                </li>

                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`/about`}>About Meghan</Link>
                </li>

                <li className="px-3 slide-up-sm">
                  <Link scroll={true} href={`/contact`}>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBook;