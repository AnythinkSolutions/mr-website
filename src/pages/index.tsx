import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from "./sections/navbar";
import AOS from "aos";

import HeaderSection from "./sections/header";
import ClientsSection from "./sections/clients";
import AboutSection from "./sections/about";
import PortfolioSection from "./sections/portfolio";
import TestimonialsSection from "./sections/testimonials";
import { getClientData, getPortfolioData, getTestimonialData } from "./api/google-sheet-api";

import 'aos/dist/aos.css'; // You can also use <link> for styles
import styles from '../styles/Home.module.scss'
import { IArticle, IClient, ITestimonial } from "../utilities/api-utilities";
import ServicesSection from "./sections/services";

interface IPageProps {
  portfolioData: IArticle[];
  clientData: IClient[];
  testimonialData: ITestimonial[]
}

const Home: NextPage<IPageProps> = (props) => {
  
  const { portfolioData, clientData, testimonialData } = props;

  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meghan Rabbitt - writer, editor, journalist, content producer</title>
        <meta name="description" content="Writer, Editor, Journalist, Content Strategist - Meghan Rabbitt" />
        <link rel="icon" href="/mr-initials-white.gif" />
      </Head>

      <main className={styles.main}>
        <NavBar />
        <HeaderSection />
        <ClientsSection data={clientData}/>
        <div className={styles.section_gray}>
          <AboutSection />
        </div>
        <div className={styles.section}>
          <ServicesSection />
        </div>
        <div className={styles.section_gray}>
          <TestimonialsSection testimonials={testimonialData} clients={clientData}/>
        </div>
        <PortfolioSection articles={portfolioData} clients={clientData}/>
      </main>

      <footer className={styles.footer}>
        <div className="container flex center-items">
          <a href="https://www.anythinksolutions.com" target="_blank" rel="noopener noreferrer">
            Created by{' '}
            <Image src="/assets/images/logos/anythink.svg" alt="Anythink Solutions Logo" width={216} height={48} />            
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const sheet = await getPortfolioData();
  const clients = await getClientData();
  const testimonials = await getTestimonialData();

  return {
    props: {
      portfolioData: sheet, //.slice(0, sheet.length), // remove sheet header
      clientData: clients,
      testimonialData: testimonials,
    },
    revalidate: 30, //60*60*4, // In seconds
  };
}