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
import FilterBar, { ITabItem } from "../components/filter-bar/filter-bar";
import { onlyUniqueFilter } from "../utilities/string-utilities";
// import Card from "../components/card/card";

export interface IPortfolioProps {
  portfolioData: IArticle[];
  clientData: IClient[];
}

// const filters : ITabItem[] = [
//   {id: "cat", label: "By Category" },
//   {id: "cli", label: "By Client" },
// ];

const allTabItem : ITabItem = {id: 0, label: "All"};
const catSource : Record<string, string> = {
  all: "/assets/images/portfolio/globe.jpg",
  health: "/assets/images/portfolio/health.jpg",
}
    
const Portfolio: NextPage<IPortfolioProps> = ({portfolioData, clientData}) => {
  const [filter, setFilter] = useState(0);
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

  
  const categories = useMemo<ITabItem[]>(() => {
    if(!writings || writings.length === 0) return [allTabItem];
    const cats = writings.flatMap(i => i.category ?? []).filter(onlyUniqueFilter).slice(0, 5);
    const catTabs : ITabItem[] = cats.map((cat, index) => ({id: index + 1, label: cat}));
    return [
      // allTabItem, 
      ...catTabs,
    ] as ITabItem[];
  }, [writings]);

  
  const displayedItems = useMemo<IArticle[]>(() => {
    let result: IArticle[] = [];
    result = category === "All" ? writings : writings.filter(i => i.category?.includes(category));
    return result;
  }, [writings, category]);

  const onFilterChange = (item: ITabItem, index: number) => {
    setFilter(index);
    setCategory(item.label);
  }

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
            <Showcase articles={writings} delayStart={0.33}/>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center my-4 mt-8 ml-4 section-header">
          <h2>My Writing</h2>
          <div className="gradient_line lg" />
        </div>

        <div className="mt-8 flex justify-center bg-slate-200 shadow-inner px-8 text-sm uppercase">
          <FilterBar items={categories} onChange={onFilterChange} selectedIndex={filter}/>
          {/* <div className="grid grid-cols-6 grid-rows-1 justify-center w-3/4 gap-x-4 py-6">
            {categories.map((cat, idx) => (              
              <div key={idx} className="h-28 rounded border bg-slate-50 flex items-center justify-center text-center" onClick={() => setCategory(cat)}>
                <Card key={idx} alt="category" src={catSource[cat.toLowerCase()] ?? catSource["all"]} onClick={() => setCategory(cat)}>
                  <div className="w-full h-full flex items-center justify-center text-sm">
                    <div className="bg-black/30 backdrop-blur-sm p-1 rounded-lg">
                      <span className={`uppercase font-semibold ${cat === category ? 'text-sky-300' : ' cursor-pointer text-white'}`}>{cat}</span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div> */}
        </div>

        <div className={`flex flex-wrap p-4 justify-center ${styles["work-container"]}`}>
          <FlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null}>
            {displayedItems.map((item, index) => (
              <div key={item.url}>
                {/* <EntryMotion delay={index * 0.1} threshold={0} immediate={true}> */}
                  <FloatCard key={item.url} item={item}/>
                {/* </EntryMotion> */}
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