import { useEffect, useMemo, useState } from "react";
import FlipMove from "react-flip-move";
import styles from "../../styles/work.module.scss";
import { IArticle, IClient } from "../../utilities/app-types";
import { onlyUniqueFilter } from "../../utilities/string-utilities";
import FloatCard from "../../components/float-card/float-card";
import { useWindowSize } from "../../utilities/app-hooks";
import EntryMotion from "../../components/entry-motion/entry-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const WIDESCREEN = 1375;

export interface IPortfolioProps {
  articles: IArticle[];
  clients: IClient[];
}

const PortfolioSection: React.FC<IPortfolioProps> = ({articles, clients}) => {
  const [ref, inView] = useInView({triggerOnce: true, threshold: 0.33});
  const [category, setCategory] = useState<string>("All");  
  const { width } = useWindowSize();
  const [itemCount, setItemCount] = useState( width > 1280 ? 12 : 9);

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

  const categories = useMemo<string[]>(() => {
    if(!highlights || highlights.length === 0) return ["All"];
    const cats = highlights.flatMap(i => i.category ?? []).filter(onlyUniqueFilter);
    return ["All", ...cats];
  }, [highlights]);
  
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
    if(width < WIDESCREEN && itemCount !== 9){
      setItemCount(9);
    }
    else if(width >= WIDESCREEN && itemCount !== 12){
      setItemCount(12);
    }
  }, [width, itemCount]);

  return (
    <div className="flex flex-col">
      <EntryMotion threshold={0} duration={0.75} hidden={{opacity: 0, translateY: 50}}>
        <div className="flex flex-col items-center my-8 p-4 py-0" ref={ref}>        

            <div className="w-full flex flex-col items-center justify-center my-4 ml-4 section-header">
              <h2>Recent Highlights</h2>
              <div className="gradient_line lg" />
            </div>
            
            <div className="flex flex-col">
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
                    <EntryMotion delay={index * 0.1} threshold={0} immediate={inView}>
                      <FloatCard key={item.url} index={index++} item={item}/>
                    </EntryMotion>
                  </div>
                ))}
              </FlipMove>
            </div>

            <Link href="/portfolio">
              <a className="text-xl font-light mb-4 text-sky-400 mt-4">
                <span>
                  See all my work
                  <svg className="ml-1 inline align-top" height="24px" width="24px" fill="#38bdf8">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </span>
                {/* <Image src="/assets/images/arrow-forward.svg" height={24} width={24} alt="arrow forward"/>  */}
              </a>
            </Link>
        </div>
      </EntryMotion>
    </div>
  );
}

export default PortfolioSection;