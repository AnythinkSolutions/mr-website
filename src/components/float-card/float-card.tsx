import { forwardRef, Ref, useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import Image from "next/image";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";
import styles from "./float-card.module.scss";
import { getImgSrc } from "../../utilities/image-utilities";
import { event } from "../../lib/gtag";

interface IFloatCardProps{
  item: IArticle;
  size?: "sm" | "md" | "lg";
}

const FloatCard = forwardRef(({ item, size = "md" }: IFloatCardProps, ref: Ref<HTMLDivElement>) => {
  const path = useMemo(() => getImgSrc(item.src), [item.src]);
  const logoProps = useMemo(() => clientToImageProps(item?.clientObject), [item?.clientObject]);

  const trackClick = () => {
    event({action: "highlight-clicked", category: "open-article", label: item.url, value: null});
  }

  return (
    <div className={`bg-slate-50 border border-slate-200 hover:bg-white mx-2 my-4 pb-2 ${styles.hoverFloat} ${styles[size ?? "md"]}`} ref={ref}>
      <a href={item.url} target="_blank" rel="noreferrer" onClick={trackClick}>
        <div className="flex flex-col h-full">
          <div className="flex relative">
            <Image 
              priority={false} 
              src={path} 
              alt={item.alt} 
              height={300} 
              width={348} 
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="flex flex-col h-full items-center justify-between">
            <div className={`flex ${styles.titleDiv}`}>
              <h3 className="py-2 px-4 text-center font-light text-slate-800">{item.title}</h3>
            </div>
            
            {item.clientObject?.logo && 
              <div className="flex mt-1 h-10 w-28">
                <LogoImage {...logoProps} noLink={true} size="auto"/>
              </div>
            }
            {!item.clientObject?.logo && 
              <div className="flex mt-1">
                <h4 className="mt-2 text-center italic">{item.client}</h4>
              </div>
            }
          </div>
        </div>
      </a>
    </div>
  );
});

export default FloatCard;

FloatCard.displayName = "FloatCard";

// const basePath = "/assets/images";

// function getImgSrc(imgUrl: string){
//   if(!imgUrl) return `${basePath}/placeholder-3.jpg`;
//   else if(imgUrl.startsWith("https://res.cloudinary.com")){
//     return imgUrl;
//   }
//   else return imgUrl;
// }