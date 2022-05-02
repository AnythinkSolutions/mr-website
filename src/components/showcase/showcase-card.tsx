import Image from "next/image";
import { useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import EntryMotion, { fadeDownGrowRight } from "../entry-motion/entry-motion";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";

export interface IShowcaseCardProps {
  article: IArticle;
}

const ShowcaseCard : React.FC<IShowcaseCardProps> = ({article}) => {

  const logoProps = useMemo(() => clientToImageProps(article?.clientObject), [article?.clientObject]);

  return (
    <div className="rounded-lg relative w-full h-full overflow-hidden border border-slate-200">
      <Image priority={false} src={article.src} alt={article.alt} layout="fill" objectFit="cover" />
      <div className="absolute bottom-0 right-0 h-1/3 w-full bg-black/30 backdrop-blur-sm">
        <div className="flex flex-col justify-between items-center text-center h-full p-2">
          <span className="text-white text-elipses max-h-12">{article.title}</span>
          <LogoImage {...logoProps} noLink={true}/>
        </div>
      </div>
    </div>
  )
};

export default ShowcaseCard;