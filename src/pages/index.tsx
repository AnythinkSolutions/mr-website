import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from "../components/navbar/navbar";

import { IArticle, IClient, IService, ITestimonial } from "../utilities/app-types";
import HeaderSection from "./sections/header";
import ClientsSection from "./sections/clients";
import PortfolioSection from "./sections/portfolio";
import TestimonialsSection from "./sections/testimonials";
import ServicesSection from "./sections/services";
import ContactSection from "./sections/contact";
import { getClientData, getPortfolioData, getServiceData, getTestimonialData } from "./api/google-sheet-api";

import styles from '../styles/Home.module.scss'

interface IPageProps {
  portfolioData: IArticle[];
  clientData: IClient[];
  testimonialData: ITestimonial[],
  serviceData: IService[],
}

const Home: NextPage<IPageProps> = (props) => {
  
  const { portfolioData, clientData, testimonialData, serviceData } = props;

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
        <div className={`${styles.section}`}>
          <div id="clients" className="scroll-anchor" />
          <ClientsSection data={clientData}/>
        </div>
        <div className={`${styles.section_gray}`}>
          <div id="services" className="scroll-anchor" />
          <ServicesSection serviceData={serviceData} />
        </div>
        <div className={`${styles.section}`}>
          <div id="work" className="scroll-anchor" />
          <PortfolioSection articles={portfolioData} clients={clientData}/>
        </div>
        <div className={`${styles.section_gray}`}>
          <div id="testimonials" className="scroll-anchor" />
          <TestimonialsSection testimonials={testimonialData} clients={clientData}/>
        </div>
        <div className={`${styles.section}`}>
          <div id="contact" className="scroll-anchor" />
          <ContactSection />
        </div>
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
  const services = await getServiceData();

  return {
    props: {
      portfolioData: sheet,
      clientData: clients,
      testimonialData: testimonials,
      serviceData: services,
    },
    revalidate: 1, //60*60*4, // In seconds
  };
}