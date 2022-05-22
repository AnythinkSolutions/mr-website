import Image from "next/image";
import { useMemo } from "react";
import { IClient } from "../../utilities/app-types";
import LogoImage, { clientToImageProps } from "../logo-image/logo-image";

import styles from "./flat-card.module.scss";

export interface ICardProps {
  title: string;
  src: string;   //image source
  alt?: string;  //
  clientObject?: IClient;
}

export interface IShowcaseCardProps {
  config: ICardProps;
  // size?: "sm" | "md";
  url?: string;   //url for a click item
  onClick?: (item: any) => void;
  priority?: boolean;
}

const ShowcaseCard : React.FC<IShowcaseCardProps> = ({config, url, onClick, priority = false}) => {

  const logoProps = useMemo(() => clientToImageProps(config?.clientObject), [config?.clientObject]);

  return (
    <div className={`rounded-lg relative w-full h-full overflow-hidden border border-slate-100 ${styles.hoverFloat}`}>
      <LinkOrButtonWrapper url={url} onClick={onClick}>
        <div className="w-full h-full relative">
          <Image priority={priority} src={config.src} alt={config.alt} layout="fill" objectFit="cover" />
          <div className="absolute bottom-0 right-0 w-full bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center h-full p-2">
              <span className="text-white text-elipses max-h-12">{config.title}</span>
            </div>
          </div>
          {(config.clientObject) && 
            <div className="absolute top-0 right-0 bg-white/50 backdrop-blur-sm p-1 rounded-bl-lg rounded-tr-lg">
              <LogoImage {...logoProps} noLink={true} size="sm"/>
            </div>
          }
        </div>
      </LinkOrButtonWrapper>
    </div>
  )
};

export default ShowcaseCard;

ShowcaseCard.defaultProps = {
  // size: "md",
  priority: false,
};

interface ILinkOrButtonProps {
  url?: string;
  onClick?: (item: any) => void;
}

const LinkOrButtonWrapper : React.FC<ILinkOrButtonProps> = ({url, onClick, children}) => {

  return (
    <>
      {url && 
        <a href={url} target="_blank" rel="noreferrer">
          {children}
        </a>
      }
      {(!url && onClick) && 
        <div onClick={onClick}>
          {children}
        </div>
      }
    </>
  )
}