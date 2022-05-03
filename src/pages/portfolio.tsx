import { useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import FlipMove from "react-flip-move";
import { IArticle, IClient } from "../utilities/app-types";
import { getClientData, getPortfolioData } from "./api/google-sheet-api";
import Footer from "../components/footer/footer";
import NavBar from "../components/navbar/navbar";
// import EntryMotion from "../components/entry-motion/entry-motion";
// import FlatCard from "../components/flat-card/flat-card";
import FloatCard from "../components/float-card/float-card";
import Showcase from "../components/showcase/showcase";

import styles from "../styles/portfolio.module.scss";
import { onlyUniqueFilter } from "../utilities/string-utilities";
import PortfolioCard from "../components/portfolio-card/portfolio-card";
// import Card from "../components/card/card";

export interface IPortfolioProps {
  portfolioData: IArticle[];
  clientData: IClient[];
}
    
const Portfolio: NextPage<IPortfolioProps> = ({portfolioData, clientData}) => {
  const [category, setCategory] = useState<string>("All");    

  const writings = useMemo<IArticle[]>(() => {
    if(!portfolioData || !clientData) return [];

    //data comes from server with hidden filtered out, and ordered by order prop
    const result = portfolioData.map(article => {
      if(article.clientKey){
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
  
  const categories = useMemo<string[]>(() => {
    if(!writings || writings.length === 0) return ["All"]; //[allTabItem];
    const cats = writings.flatMap(i => i.category ?? []).filter(onlyUniqueFilter).slice(0, 5);
    return ["All", ...cats];
  }, [writings]);

  
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

        <div className="flex justify-center mt-8">
          <div className="w-full h-1/3 px-8">
            <Showcase articles={showcaseItems} delayStart={0.33}/>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center my-4 mt-8 section-header">
          <h2>My Writing</h2>
          <div className="gradient_line lg" />
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-center gap-y-4 px-4 py-2 font-light">
            {categories.map((cat, idx) => (
              <div key={idx} className={`uppercase slide-up-sm mx-2 ${cat === category ? 'text-sky-500' : ' cursor-pointer hover:text-sky-300'}`} onClick={() => setCategory(cat)}>{cat}</div>
            ))}
          </div>
        </div>

        <div className={`grid lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 p-4 mt-8 justify-center ${styles["work-container"]}`}>
          <FlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null}>
            {displayedItems.map((item, index) => (
              <div key={item.url} >
                <PortfolioCard key={item.url} article={item}/>
              </div>
            ))}
          </FlipMove>
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