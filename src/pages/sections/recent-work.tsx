import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import portfolio from "../content/portfolio.content.json";
import styles from "../../styles/work.module.scss";

const basePath = "/assets/images/portfolio";
const categories = ["All", "Health", "Travel", "Content Marketing", "Other" ];
interface IPortfolioItem {
  src: string;
  alt: string;
  title: string;
  body?: string;
  url?: string;
  client?: string;
  category?: string[];
}

const RecentWorkSection = () => {
  let index = 0;
  let index2 = 0;

  const allItems = useMemo<IPortfolioItem[]>(() => portfolio, []);
  //TODO: make this list dynamic based on the categories in portfolio
  const [category, setCategory] = useState<string>("All");  
  const [items, setItems] = useState<IPortfolioItem[]>(allItems);

  useEffect(() => {
    if(category === "All"){
      setItems(allItems);
    }
    else{
      setItems(allItems.filter(i => i.category?.includes(category)));
    }
  }, [allItems, category]);

  return (
    <div id="recent-work" className="container mt-8">
      <div className="container" data-aos="fade-up" data-aos-duration="900">
        <div className="container flex items-center section-header mb-4">
          <h1>Recent Work</h1>
          <span/>
        </div>

        <div className="container flex justify-center gap-y-4 px-4 py-2">
          {categories.map(cat => (
            <div key={index2++} className={`uppercase mx-2 ${cat === category ? 'text-sky-500' : ' cursor-pointer hover:text-sky-300'}`} onClick={() => setCategory(cat)}>{cat}</div>
          ))}
        </div>
      </div>

      <div className={`container flex flex-wrap p-4 md:justify-start sm:justify-center ${styles["work-container"]}`}>
        <TransitionGroup component={null}>
          {items.map(item => (
              <CSSTransition key={item.src} in={true} timeout={500} classNames="portfolio-item">
                <WorkItem item={item} index={index++}/>
              </CSSTransition>
            )
        )}
        </TransitionGroup>
      </div>

    </div>
  );
}

export default RecentWorkSection;

interface IWorkItemProps {
  item: IPortfolioItem;
  index: number;
}

function WorkItem({item, index}: IWorkItemProps){

  return (
    <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/1"> {/* data-aos="fade-up" data-aos-duration="900" data-aos-delay={index * 200}  */}
      <div className={`hover:bg-gray-100 hover-float`}>
        <a href={item.url} target="_blank" rel="noreferrer">
          <div className="flex flex-col p-4">
            <Image src={`${basePath}/${item.src}`} alt={item.alt} height={252} width={315} />
            <h3 className="mt-2 text-center font-bold text-sky-600">{item.title}</h3>
            <h4 className="mt-2 text-center italic">{item.client}</h4>
          </div>
        </a>
      </div>
    </div>
  );
}