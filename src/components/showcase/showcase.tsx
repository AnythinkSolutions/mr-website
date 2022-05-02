import Image from "next/image";
import { useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import EntryMotion, { fadeDownGrowRight } from "../entry-motion/entry-motion";
import ShowcaseCard from "./showcase-card";
// import FloatCard from "../float-card/float-card";


export interface IShowcaseProps {
  articles: IArticle[];
}

const Showcase: React.FC<IShowcaseProps> = ({articles}) => {

  const highlights = useMemo(() => {
    const items = articles.filter(art => art.isHighlighted);
    return items;
  }, [articles]);

  return (
    <div id="showcase" className="grid md:grid-cols-4 md:grid-rows-2 gap-2 h-96">
      
      <div className="md:row-span-2 md:col-span-2 rounded">
        <EntryMotion threshold={0} immediate={true} delay={0.1} {...fadeDownGrowRight(50, 50)} fullSize>
          <ShowcaseCard article={highlights[0]} />
        </EntryMotion>
      </div>

      <div  className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.2} {...fadeDownGrowRight(50, 50)} fullSize>
          <ShowcaseCard article={highlights[1]} />        
        </EntryMotion>
      </div>

      <div className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.3}{...fadeDownGrowRight(50, 50)} fullSize>
          <ShowcaseCard article={highlights[2]} />
        </EntryMotion>
      </div>

      <div className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.3}{...fadeDownGrowRight(50, 50)} fullSize>
          <ShowcaseCard article={highlights[3]} />
        </EntryMotion>
      </div>

      <div className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.4}{...fadeDownGrowRight(50, 50)} fullSize>
          <ShowcaseCard article={highlights[4]} />
        </EntryMotion>
      </div>

    </div>
  )
}

export default Showcase;