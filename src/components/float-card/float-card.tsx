import { useMemo } from "react";
import { IArticle } from "../../utilities/app-types";
import Image from "next/image";
import ClientLogo from "../client-logo/client-logo";

interface IFloatCardProps{
  item: IArticle;
  index: number;
}

const FloatCard: React.FC<IFloatCardProps> = ({item, index}) => {

  const path = useMemo(() => getImgSrc(item.src), [item.src]);
  
  return (
    <div className="hover:bg-white hover-float">
      <a href={item.url} target="_blank" rel="noreferrer">
        <div className="flex flex-col p-4">
          <Image priority={false} src={path} alt={item.alt} height={252} width={315} objectFit="cover" />
          <h3 className="mt-2 text-center text-slate-500">{item.title}</h3>
          {item.clientObject?.logo && 
            <div className="flex justify-center mt-1">
              <ClientLogo index={0} client={item.clientObject} noAnimation={true}/>
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
const gdBase = "https://drive.google.com/uc?id=";
// const gdImage = "https://drive.google.com/file/d/{src}/view?usp=sharing"

function getImgSrc(imgUrl: string){
  if(!imgUrl) return `${basePath}/placeholder-3.jpg`;
  else if(imgUrl.startsWith("https://res.cloudinary.com")){
    return imgUrl;
  }
  else if(imgUrl.startsWith("https://drive")){
    const src = imgUrl.replace("https://drive.google.com/file/d/", gdBase).replace("/view?usp=sharing", "");
    console.log("drive image: ", src);
    return src;
  }
  else return imgUrl;
}