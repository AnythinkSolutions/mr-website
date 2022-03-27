import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/work.module.scss";

const categories = ["All", "Health", "Travel", "Content Marketing", "Other" ];
interface IPortfolioItem {
  src: string;
  alt: string;
  title: string;
  body?: string;
  url?: string;
  client?: string;
  category?: "Health" | "Travel" | "Content Marketing" | "Other";
}

const basePath = "/assets/images/portfolio";
const items : IPortfolioItem[] = [
  {
    src: "prevention-foot-pain.jpg",
    alt: "foot pain",
    title: "Your Annoying Foot Pain, Explained",
    url: "https://www.prevention.com/fitness/a20480503/5-reasons-your-feet-hurt/",
    client: "Prevention",
    category: "Health",
  },
  {
    src: "prevention-lose-weight.jpg",
    alt: "scale, weight loss",
    title: "18 Most Effective Ways to Lose Weight After 50",
    url: "https://www.prevention.com/fitness/a20467060/lose-weight-after-50/",
    client: "Prevention",
    category: "Health",
  },
  {
    src: "wh-bipolar.jpg",
    alt: "bipolar faces",
    title: "Living With Bipolar Isn't At All Like What You Think",
    url: "https://www.womenshealthmag.com/health/a36636234/bipolar-misconceptions/",
    client: "Women's Health",
    category: "Health",
  },
  {
    src: "health-grief.webp",
    alt: "person with lights",
    title: "Grief Is Never Easy, but During the Holidays, It's Especially Tough--Here's How Others Got Through It",
    url: "https://www.health.com/mind-body/grief-during-the-holidays",
    client: "Health",
    category: "Health",
  },
  {
    src: "health-serotonin.webp",
    alt: "happy woman",
    title: "What Is Serotonin and How Does It Affect Your Mood?",
    url: "https://www.health.com/mind-body/what-is-serotonin",
    client: "Health",
    category: "Health",
  },
];

const RecentWorkSection = () => {
  let index = 0;
  let index2 = 0;

  const [category, setCategory] = useState<string>("All");

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
        {items.filter(item => (category === "All" || item.category === category)).map(item => <WorkItem key={index} item={item} index={index++}/>)}
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
    <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/1" data-aos="fade-up" data-aos-duration="900" data-aos-delay={index * 200}>
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