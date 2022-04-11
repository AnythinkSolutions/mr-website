import { forwardRef, Ref, useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import Image from "next/image";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";
import styles from "./float-card.module.scss";

interface IFloatCardProps{
  item: IArticle;
  index: number;
}

const FloatCard: React.FC<IFloatCardProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const {item} = props;
  const path = useMemo(() => getImgSrc(item.src), [item.src]);
  const logoProps = useMemo(() => clientToImageProps(item?.clientObject), [item?.clientObject]);

  return (
    <div className={`bg-slate-50 border border-slate-200 hover:bg-white mx-4 my-4 pb-2 ${styles.hoverFloat}`} ref={ref}>
      <a href={item.url} target="_blank" rel="noreferrer">
        <div className="flex flex-col">
          <Image priority={false} src={path} alt={item.alt} height={300} width={348} objectFit="cover" />
          <h3 className="py-2 px-4 text-center font-light text-slate-800">{item.title}</h3>
          {item.clientObject?.logo && 
            <div className="flex justify-center mt-1">
              <LogoImage index={0} {...logoProps} noAnimation={true} size="sm"/>
            </div>
          }
          {!item.clientObject?.logo && 
            <h4 className="mt-2 text-center italic">{item.client}</h4>
          }
        </div>
      </a>
    </div>
  );
});

FloatCard.displayName = "FloatCard";
export default FloatCard;

const basePath = "/assets/images";

function getImgSrc(imgUrl: string){
  if(!imgUrl) return `${basePath}/placeholder-3.jpg`;
  else if(imgUrl.startsWith("https://res.cloudinary.com")){
    return imgUrl;
  }
  else return imgUrl;
}