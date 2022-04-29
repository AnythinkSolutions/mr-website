import { useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import FlipMove from "react-flip-move";
import { IArticle, IClient } from "../utilities/app-types";
import { getClientData, getPortfolioData } from "./api/google-sheet-api";
import Footer from "../components/footer/footer";
import NavBar from "../components/navbar/navbar";
import EntryMotion from "../components/entry-motion/entry-motion";
import FloatCard from "../components/float-card/float-card";

import styles from "../styles/portfolio.module.scss";
import FilterBar, { ITabItem } from "../components/filter-bar/filter-bar";
import { onlyUniqueFilter } from "../utilities/string-utilities";

export interface IPortfolioProps {
  portfolioData: IArticle[];
  clientData: IClient[];
}

const filters : ITabItem[] = [
  {id: "cat", label: "By Category" },
  {id: "cli", label: "By Client" },
];

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

  
  const categories = useMemo<string[]>(() => {
    if(!writings || writings.length === 0) return ["All"];
    const cats = writings.flatMap(i => i.category ?? []).filter(onlyUniqueFilter);
    return ["All", ...cats];
  }, [writings]);

  
  const displayedItems = useMemo<IArticle[]>(() => {
    let result: IArticle[] = [];
    result = category === "All" ? writings : writings.filter(i => i.category?.includes(category));
    return result;
  }, [writings, category]);

  const onFilterChange = (item: ITabItem, index: number) => {
    setFilter(index);
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

        <div className="w-screen px-4 mt-8 max-w-full 2xl:max-w-screen-2xl mx-auto">
          
          <div className="rounded-3xl relative overflow-hidden aspect-w-16 aspect-h-12 sm:aspect-h-6 xl:aspect-h-5">
            <div className={`inset-0 ${styles.fullSizeImage}`}>
              <Image src="/assets/images/portfolio/pine.jpg" height={720} width={2048} alt="pine" objectFit="cover"/>
            </div>
          </div>

          <div className={`relative container -mt-20 lg:-mt-30 ${styles.headerContainer}`}>
            <div className="relative bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center">
              <h1 className="text-4xl mb-4">Journalism</h1>
              <p className="text-lg font-light">
                Health writing is like a box of chocolates. You never know what you&apos;re going to get. But you keep eating because your mouth wants more, even when your belly tries to tell you that you need to stop.
              </p>              
            </div>
          </div>

        </div> 

        <div className="mt-8 flex flex-col items-center ">
          <FilterBar items={filters} onChange={onFilterChange} selectedIndex={filter}/>
          <div className="flex justify-center gap-y-4 px-4 py-2">
            {categories.map((cat, idx) => (
              <div key={idx} className={`uppercase slide-up-sm mx-2 ${cat === category ? 'text-sky-500' : ' cursor-pointer hover:text-sky-300'}`} onClick={() => setCategory(cat)}>{cat}</div>
            ))}
          </div>
        </div>

        <div className={`flex flex-wrap p-4 justify-center ${styles["work-container"]}`}>
          <FlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null}>
            {displayedItems.map((item, index) => (
              <div key={item.url}>
                <EntryMotion delay={index * 0.1} threshold={0} immediate={true}>
                  <FloatCard key={item.url} index={index++} item={item}/>
                </EntryMotion>
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