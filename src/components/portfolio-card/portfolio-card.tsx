import Image from "next/image";
import { useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";

import styles from "../flat-card/flat-card.module.scss";
import { getImgSrc } from "../../utilities/image-utilities";
import { event } from "../../lib/gtag";

export interface IPortfolioCardProps {
  article: IArticle;
}

const PortfolioCard = ({article}: IPortfolioCardProps) => {
  const imagePath = useMemo(() => getImgSrc(article.src), [article.src]);
  const logoProps = useMemo(() => clientToImageProps(article?.clientObject), [article?.clientObject]);

  if(!article || !article.url) return null;

  const trackClick = () => {
    event({action: "portfolio-clicked", category: "open-article", label: article.url, value: null});
  }

  return (
    <div className={`rounded-lg relative w-full h-28 overflow-hidden border border-slate-200 bg-slate-50 ${styles.hoverFloat}`}>
      <a href={article.url} target="_blank" rel="noreferrer" onClick={trackClick}>
        <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-1">
          <div className="row-span-3 rounded-lg relative">
            <Image priority={false} src={imagePath} alt={article.alt ?? "article image"} layout="fill" objectFit="cover" />
          </div>
          <div className="col-span-3 row-span-2 p-2 overflow-hidden">
            <span className="font-light">{article.title}</span>
          </div>
          <div className="col-span-3 p-2 flex center-items justify-end">
            {article.clientObject && <LogoImage {...logoProps} size="sm" noLink={true}/>}
          </div>
        </div>
      </a>
    </div>
  )
};

export default PortfolioCard