import { useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import FlipMove from "react-flip-move";
import { IArticle, IClient } from "../utilities/app-types";
import { getClientData, getPortfolioData } from "./api/google-sheet-api";
import Footer from "../components/footer/footer";
import NavBar from "../components/navbar/navbar";
import Showcase from "../components/showcase/showcase";

import styles from "../styles/portfolio.module.scss";
import PortfolioCard from "../components/portfolio-card/portfolio-card";
import CategoryFilter from "../components/category-filter/category-filter";

export interface IPortfolioProps {
  portfolioData: IArticle[];
  clientData: IClient[];
}
    
const Portfolio: NextPage<IPortfolioProps> = ({portfolioData, clientData}) => {
  const [category, setCategory] = useState<string>("All");    
  const SafeFlipMove = FlipMove as any;      //TODO: dependency isn't ready for React 18

  const writings = useMemo<IArticle[]>(() => {
    if(!portfolioData || !clientData) return [];

    //data comes from server with hidden filtered out, and ordered by order prop
    const result = portfolioData.map(article => {
      if(article && article.clientKey){
        const client = clientData.find(c => c.key === article.clientKey);
        if(client) return {...article, clientObject: client } as IArticle;
      } 
      return article;
    });

    return result;
  }, [portfolioData, clientData]);

  const showcaseItems = useMemo(() => {
    const items = writings.filter(art => art.isHighlighted);
    return items;
  }, [writings]);

  const nonShowcaseItems = useMemo(() => {
    const items = writings.filter(a => !showcaseItems.includes(a));
    return items;
  }, [writings, showcaseItems])
    
  const displayedItems = useMemo<IArticle[]>(() => {
    let result: IArticle[] = [];
    result = category === "All" ? nonShowcaseItems : nonShowcaseItems.filter(i => i.category?.includes(category));
    return result;
  }, [nonShowcaseItems, category]);

  return (
    <div id="portfolio-page">
      <Head>
        <title>Meghan Rabbitt&apos;s Portfolio - writer, editor, journalist, content strategist</title>
        <meta name="description" content="Writer, Editor, Journalist, Content Strategist - Meghan Rabbitt" />
        <link rel="icon" href="/mr-initials-white.gif" />
      </Head>

      <main className={`pb-0`}>
        <NavBar />

        <div className="w-full flex flex-col items-center justify-center my-4 mt-8 section-header">
          <h2>My Clips</h2>
          <div className="gradient_line lg" />
        </div>

        {showcaseItems && showcaseItems.length >= 4 && (
          <div className="flex justify-center mt-8">
            <div className="w-full h-1/3 px-8">
              <Showcase articles={showcaseItems} delayStart={0.33}/>
            </div>
          </div>
        )}

        <div className="my-8">
          <CategoryFilter articles={writings} onChange={(item) => setCategory(item)} />
        </div>

        <div className={`grid lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 p-4 mt-8 justify-center relative ${styles["work-container"]}`}>
          <SafeFlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null}>
            {displayedItems.map((item, index) => (
              <div key={index} >
                <PortfolioCard article={item}/>
              </div>
            ))}
          </SafeFlipMove>
        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Portfolio;

export async function getStaticProps() {
  const works = await getPortfolioData();
  const clients = await getClientData();

  return {
    props: {
      portfolioData: works,
      clientData: clients,
    },
    revalidate: 1, //60*60*4, // In seconds
  };
}