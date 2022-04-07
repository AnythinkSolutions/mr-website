import '../styles/globals.scss'
import "../styles/slick-carousel/slick.css"; 
import "../styles/slick-carousel/slick-theme.css";
import "../styles/slick-carousel/slick-overrides.scss";

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
