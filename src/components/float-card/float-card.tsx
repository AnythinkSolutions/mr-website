import { useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import Image from "next/image";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";

interface IFloatCardProps{
  item: IArticle;
  index: number;
}

const FloatCard: React.FC<IFloatCardProps> = ({item, index}) => {

  const path = useMemo(() => getImgSrc(item.src), [item.src]);
  const logoProps = useMemo(() => clientToImageProps(item?.clientObject), [item?.clientObject]);
  
  return (
    <div className="hover:bg-white hover-float">
      <a href={item.url} target="_blank" rel="noreferrer">
        <div className="flex flex-col p-4">
          <Image priority={false} src={path} alt={item.alt} height={252} width={315} objectFit="cover" />
          <h3 className="mt-2 text-center font-light text-slate-500">{item.title}</h3>
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
}

export default FloatCard;

const basePath = "/assets/images";
// const gdBase = "https://drive.google.com/uc?id=";

function getImgSrc(imgUrl: string){
  if(!imgUrl) return `${basePath}/placeholder-3.jpg`;
  else if(imgUrl.startsWith("https://res.cloudinary.com")){
    return imgUrl;
  }
  // else if(imgUrl.startsWith("https://drive")){
  //   const src = imgUrl.replace("https://drive.google.com/file/d/", gdBase).replace("/view?usp=sharing", "");
  //   console.log("drive image: ", src);
  //   return src;
  // }
  else return imgUrl;
}