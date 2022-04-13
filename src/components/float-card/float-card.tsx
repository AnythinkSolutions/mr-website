import { forwardRef, Ref, useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import Image from "next/image";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";
import styles from "./float-card.module.scss";

interface IFloatCardProps{
  item: IArticle;
  index: number;
  size?: "sm" | "md" | "lg";
}

const FloatCard: React.FC<IFloatCardProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const {item, size} = props;
  const path = useMemo(() => getImgSrc(item.src), [item.src]);
  const logoProps = useMemo(() => clientToImageProps(item?.clientObject), [item?.clientObject]);

  return (
    <div className={`bg-slate-50 border border-slate-200 hover:bg-white mx-2 my-4 pb-2 ${styles.hoverFloat} ${styles[size ?? "md"]}`} ref={ref}>
      <a href={item.url} target="_blank" rel="noreferrer">
        <div className="flex flex-col h-full">
          <div className="flex">
            <Image priority={false} src={path} alt={item.alt} height={300} width={348} objectFit="cover" />
          </div>

          <div className="flex flex-col h-full items-center justify-between">
            <div className="flex">
              <h3 className="py-2 px-4 text-center font-light text-slate-800">{item.title}</h3>
            </div>
            
            {item.clientObject?.logo && 
              <div className="flex mt-1">
                <LogoImage index={0} {...logoProps} size="sm"/>
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
FloatCard.defaultProps = {
  size: "md",
};

const basePath = "/assets/images";

function getImgSrc(imgUrl: string){
  if(!imgUrl) return `${basePath}/placeholder-3.jpg`;
  else if(imgUrl.startsWith("https://res.cloudinary.com")){
    return imgUrl;
  }
  else return imgUrl;
}