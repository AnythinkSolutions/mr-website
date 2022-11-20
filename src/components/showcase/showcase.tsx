import Image from "next/image";
import { useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import EntryMotion, { fadeDownGrowRight } from "../entry-motion/entry-motion";
import FlatCard from "../flat-card/flat-card";

export interface IShowcaseProps {
  articles: IArticle[];
  delayStart?: number;
}

const Showcase = ({articles, delayStart = 0}: IShowcaseProps) => {

  const highlights = useMemo(() => {
    const items = articles.filter(art => art.isHighlighted && !!art.url);
    return items;
  }, [articles]);

  return (
    <div id="showcase" className="grid md:grid-cols-4 md:grid-rows-2 gap-2 h-96">
      
      <div className="md:row-span-2 md:col-span-2 rounded">
        <EntryMotion threshold={0} immediate={true} delay={0.1 + delayStart} {...fadeDownGrowRight(50, 50)} fullSize>
          <FlatCard config={highlights[0]} url={highlights[0].url} priority={true}/>
        </EntryMotion>
      </div>

      <div  className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.2 + delayStart} {...fadeDownGrowRight(50, 50)} fullSize>
          <FlatCard config={highlights[1]} url={highlights[1].url} />        
        </EntryMotion>
      </div>

      <div className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.3 + delayStart}{...fadeDownGrowRight(50, 50)} fullSize>
          <FlatCard config={highlights[2]} url={highlights[2].url} />
        </EntryMotion>
      </div>

      <div className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.3 + delayStart}{...fadeDownGrowRight(50, 50)} fullSize>
          <FlatCard config={highlights[3]} url={highlights[3].url} />
        </EntryMotion>
      </div>

      <div className="rounded hidden md:block text-xs">
        <EntryMotion threshold={0} immediate={true} delay={0.4 + delayStart}{...fadeDownGrowRight(50, 50)} fullSize>
          <FlatCard config={highlights[4]} url={highlights[4].url} />
        </EntryMotion>
      </div>

    </div>
  )
}

export default Showcase;

Showcase.defaultProps = {
  delayStart: 0,
};