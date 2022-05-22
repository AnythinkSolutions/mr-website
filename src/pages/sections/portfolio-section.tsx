import { useEffect, useMemo, useState } from "react";
import FlipMove from "react-flip-move";
import styles from "../../styles/work.module.scss";
import { IArticle, IClient } from "../../utilities/app-types";
import FloatCard from "../../components/float-card/float-card";
import { useWindowSize } from "../../utilities/app-hooks";
import EntryMotion from "../../components/entry-motion/entry-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import CategoryFilter from "../../components/category-filter/category-filter";
import { SCREEN_WIDTHS } from "../../utilities/app-utilities";

const itemCounts = {default: 6, widescreen: 8, mobile: 3 };

export interface IPortfolioProps {
  articles: IArticle[];
  clients: IClient[];
}

const PortfolioSection: React.FC<IPortfolioProps> = ({articles, clients}) => {
  const [ref, inView] = useInView({triggerOnce: true, threshold: 0.33});
  const [category, setCategory] = useState<string>("All");  
  const { width } = useWindowSize();
  const [itemCount, setItemCount] = useState( width >= SCREEN_WIDTHS.wide ? itemCounts.widescreen : itemCounts.default);

  const itemsWithClient = useMemo<IArticle[]>(() => {
    if(!articles || !clients) return [];

    //data comes from server with hidden filtered out, and ordered by order prop
    const result = articles.map(article => {
      if(article.clientKey){
        const client = clients.find(c => c.key === article.clientKey);
        if(client) return {...article, clientObject: client } as IArticle;
      } 
      return article;
    });

    return result;
  }, [articles, clients]);

  const highlights = useMemo<IArticle[]>(() => {
    if(!itemsWithClient || itemsWithClient.length === 0) return [];
    const result = itemsWithClient.filter(d => d.isHighlighted);
    return result;
  }, [itemsWithClient]); 
  
  const displayedItems = useMemo<IArticle[]>(() => {
    let result: IArticle[] = [];
    const candidates = category === "All" ? highlights : highlights.filter(i => i.category?.includes(category));

    if(candidates && candidates.length > itemCount){
      result = candidates.slice(0, itemCount);
    }
    else if(candidates && candidates.length < itemCount && itemsWithClient){
      const extras = itemsWithClient
        .filter(d => !d.isHighlighted)
        .filter(i => i.category?.includes(category))
        .slice(0, itemCount - candidates.length);

      result = [...candidates, ...extras];
    }
    else result = candidates;

    return result;
  }, [itemsWithClient, highlights, category, itemCount]);

  //== This effect changes the # of items based on the width of the window
  // to try to keep 3 rows of items for med and lg width.
  useEffect(() => {
    if(width < SCREEN_WIDTHS.mobile){
      if(itemCount !== itemCounts.mobile) setItemCount(itemCounts.mobile);
    }
    else if(width < SCREEN_WIDTHS.wide){
      if(itemCount !== itemCounts.default) setItemCount(itemCounts.default);
    }
    else if(width >= SCREEN_WIDTHS.wide){
      if(itemCount !== itemCounts.widescreen) setItemCount(itemCounts.widescreen);
    }
  }, [width, itemCount]);

  return (
    <div className="flex flex-col">
      <EntryMotion threshold={0} duration={0.75} hidden={{opacity: 0, translateY: 50}}>
        <div className="flex flex-col items-center my-8 p-4 py-0" ref={ref}>        

            <div className="w-full flex flex-col items-center text-center justify-center my-4 ml-4 section-header">
              <h2>Recent Highlights</h2>
              <div className="gradient_line lg" />
            </div>
            
            <CategoryFilter articles={highlights} onChange={(item) => setCategory(item)} />

            <div className={`flex flex-wrap p-4 justify-center ${styles["work-container"]}`}>
              <FlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null}>
                {displayedItems.map((item, index) => (
                  <div key={item.url}>
                    <EntryMotion delay={index * 0.1} threshold={0} immediate={inView}>
                      <FloatCard key={item.url} item={item}/>
                    </EntryMotion>
                  </div>
                ))}
              </FlipMove>
            </div>

            <Link href="/portfolio">
              <a className="text-xl font-light mb-4 text-sky-400 mt-4">
                <span>
                  See more of my work
                  <svg className="ml-1 inline align-top" height="24px" width="24px" fill="#38bdf8">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </span>
              </a>
            </Link>
        </div>
      </EntryMotion>
    </div>
  );
}

export default PortfolioSection;