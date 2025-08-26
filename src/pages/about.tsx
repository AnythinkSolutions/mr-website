import React from "react";
import type { NextPage } from "next";
import Head from 'next/head'
import Link from "next/link";
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

        <div className={styles.section}>
          <AboutSection />

          <div className="flex flex-col gap-y-4 sm:gap-x-8 sm:flex-row w-full items-center justify-center my-4">
            <Link href="/#contact" className="text-xl font-light text-sky-400 mt-2 sm:mt-0">
              <span>
                <svg className="ml-1 inline align-top" height="24px" width="24px" fill="#38bdf8">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Contact Me                
              </span>
            </Link>
            <Link href="/portfolio" className="text-xl font-light text-sky-400">
              <span>
                Read My Work
                <svg className="ml-1 inline align-top" height="24px" width="24px" fill="#38bdf8">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </span>
            </Link>
            
          </div>

        </div>

      </main>

      <Footer />

    </div>
  )
};

export default AboutPage;