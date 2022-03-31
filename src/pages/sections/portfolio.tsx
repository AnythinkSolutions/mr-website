import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import FlipMove from "react-flip-move";
import styles from "../../styles/work.module.scss";
import { IPortfolioItem } from "../../utilities/portfolio-utilties";
import { onlyUniqueFilter } from "../../utilities/string-utilities";

const NUM_ITEMS = 12;

const PortfolioSection = ({data}: {data: IPortfolioItem[]}) => {
  let index = 0;
  let index2 = 0;

  // console.log("portfolio data: ", data);

  const allItems = useMemo<IPortfolioItem[]>(() => {
    //data comes from server with hidden filtered out, and ordered by order prop
    if(!data || data.length === 0) return [];
    const highlighted = data.filter(d => d.isHighlighted);
    if(highlighted.length > NUM_ITEMS){
      return highlighted.slice(0, NUM_ITEMS);
    }
    else if(highlighted.length < NUM_ITEMS){
      const extras = data.filter(d => !d.isHighlighted).slice(0, NUM_ITEMS - highlighted.length);
      return [...highlighted, ...extras];
    }
    return highlighted;
  }, [data]);

  const categories = useMemo<string[]>(() => {
    if(!allItems || allItems.length === 0) return ["All"];
    const cats = allItems.flatMap(i => i.category ?? []).filter(onlyUniqueFilter);
    return ["All", ...cats];
  }, [allItems]);
  
  const [category, setCategory] = useState<string>("All");  
  const [items, setItems] = useState<IPortfolioItem[]>(allItems);

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

        <div className={`container flex flex-wrap p-4 md:justify-start sm:justify-center ${styles["work-container"]}`} data-aos="fade-up" data-aos-duration={900}>
          <FlipMove staggerDurationBy="30" duration={500} easing="ease-in-out" typeName={null} >
            {items.map(item => (
              <div key={item.url} className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/1">
                <div data-aos="fade-up" data-aos-duration={900} data-aos-delay={index * 200}>
                  <PortfolioItemCard index={index++} item={item}/>
                </div>
              </div>
              )
            )}
          </FlipMove>
        </div>

    </div>
  );
}

export default PortfolioSection;

interface IPortfolioCard extends Record<string, any>{
  item: IPortfolioItem;
  index: number;
}

const basePath = "/assets/images/portfolio";
const gdBase = "https://drive.google.com/uc?id=";
const gdImage = "https://drive.google.com/file/d/{src}/view?usp=sharing"

function getImgSrc(imgUrl: string){
  if(!imgUrl) return `${basePath}/placeholder-3.jpg`;
  else if(imgUrl.startsWith("https://res.cloudinary.com")){
    return imgUrl;
  }
  else if(imgUrl.startsWith("gd/")){
    return `${imgUrl.replace("gd/", gdBase)}`;    
  }
  else if(imgUrl.startsWith("https://drive")){
    const src = imgUrl.replace("https://drive.google.com/file/d/", gdBase).replace("/view?usp=sharing", "");
    console.log("drive image: ", src);
    return src;
  }
  else if(imgUrl.length){
    return `${basePath}/${imgUrl}`;
  }
  else return `${basePath}/placeholder-3.jpg`;
}

function PortfolioItemCard({item, index}: IPortfolioCard){

  const path = useMemo(() => getImgSrc(item.src), [item.src]);
  
  return (
    <div className={`hover:bg-gray-100 hover-float`}>
      <a href={item.url} target="_blank" rel="noreferrer">
        <div className="flex flex-col p-4">
          <Image src={path} alt={item.alt} height={252} width={315} />
          <h3 className="mt-2 text-center font-bold text-sky-600">{item.title}</h3>
          <h4 className="mt-2 text-center italic">{item.client}</h4>
        </div>
      </a>
    </div>
  );
}