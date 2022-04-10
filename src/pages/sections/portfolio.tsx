import { useEffect, useMemo, useState } from "react";
import FlipMove from "react-flip-move";
import styles from "../../styles/work.module.scss";
import { IArticle, IClient } from "../../utilities/app-types";
import { onlyUniqueFilter } from "../../utilities/string-utilities";
import FloatCard from "../../components/float-card/float-card";

const NUM_ITEMS = 12;

const PortfolioSection = ({articles, clients}: {articles: IArticle[], clients: IClient[]}) => {
  let index = 0;
  let index2 = 0;

  const allItems = useMemo<IArticle[]>(() => {
    //data comes from server with hidden filtered out, and ordered by order prop
    if(!articles || articles.length === 0) return [];

    const highlighted = articles.filter(d => d.isHighlighted);
    let result: IArticle[] = [];
    if(highlighted.length > NUM_ITEMS){
      result = highlighted.slice(0, NUM_ITEMS);
    }
    else if(highlighted.length < NUM_ITEMS){
      const extras = articles.filter(d => !d.isHighlighted).slice(0, NUM_ITEMS - highlighted.length);
      result = [...highlighted, ...extras];
    }
    result = highlighted;

    result = result.map(article => {
      if(article.clientKey){
        const client = clients.find(c => c.key === article.clientKey);
        if(client) return {...article, clientObject: client } as IArticle;
      } 
      return article;
    });

    return result;
  }, [articles, clients]); 

  const categories = useMemo<string[]>(() => {
    if(!allItems || allItems.length === 0) return ["All"];
    const cats = allItems.flatMap(i => i.category ?? []).filter(onlyUniqueFilter);
    // console.log("categories: ", cats);
    return ["All", ...cats];
  }, [allItems]);
  
  const [category, setCategory] = useState<string>("All");  
  const [items, setItems] = useState<IArticle[]>(allItems);

  useEffect(() => {
    if(category === "All"){
      setItems(allItems);
    }
    else{
      const filtered = allItems.filter(i => i.category?.includes(category));
      setItems(filtered);
    }
  }, [category, allItems]);

  return (
    <div id="recent-work"  className="flex flex-col">
      <div className="container my-8 p-4 py-0 flex-col items-center">
        <div className="container" data-aos="fade-up" data-aos-duration="900">
          <div className="container flex items-center section-header mb-4">
            <h1>My Recent Work</h1>
            <span/>
          </div>
          
          <div className="container flex justify-center gap-y-4 px-4 py-2">
            {categories.map(cat => (
              <div key={index2++} className={`uppercase slide-up-sm mx-2 ${cat === category ? 'text-sky-500' : ' cursor-pointer hover:text-sky-300'}`} onClick={() => setCategory(cat)}>{cat}</div>
            ))}
          </div>
        </div>

        <div className={`container flex flex-wrap p-4 md:justify-start sm:justify-center ${styles["work-container"]}`} data-aos="fade-up" data-aos-duration={900}>
          <FlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null} >
            {items.map(item => (
              <div key={item.url} className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/1">
                <div data-aos="fade-up" data-aos-duration={900} data-aos-delay={index * 200}>
                  <FloatCard index={index++} item={item}/>
                </div>
              </div>
              )
            )}
          </FlipMove>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSection;