import React from "react";
import type { NextPage } from "next";
import Head from 'next/head'
import NavBar from "../components/navbar/navbar";
import AboutSection from "./sections/about";
import Footer from "../components/footer/footer";

import styles from '../styles/Home.module.scss'

interface IPageProps {
}

const AboutPage: NextPage<IPageProps> = (props) => {
  
  return (
    <div id="about-page" className={styles.container}>

      <Head>
        <title>About Meghan Rabbitt - writer, editor, journalist, content strategist</title>
        <meta name="description" content="Writer, Editor, Journalist, Content Strategist - Meghan Rabbitt" />
        <link rel="icon" href="/mr-initials-white.gif" />
      </Head>

      <main className={`${styles.main} pb-0`}>
        <NavBar />
        <div className={styles.section_gray}>
          <AboutSection />
        </div>

      </main>

      <Footer />
      {/* <footer className={styles.footer}>
        <div className="container flex center-items">
          <a href="https://www.anythinksolutions.com" target="_blank" rel="noopener noreferrer">
            Created by{' '}
            <Image src="/assets/images/logos/anythink.svg" alt="Anythink Solutions Logo" width={216} height={48} />            
          </a>
        </div>
      </footer> */}

    </div>
  )
};

export default AboutPage;