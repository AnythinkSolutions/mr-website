import Image from "next/image";
import { ReactNode, useMemo } from "react";
import { event } from "../../lib/gtag";
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

const ShowcaseCard = ({config, url, onClick, priority = false}: IShowcaseCardProps) => {

  const logoProps = useMemo(() => clientToImageProps(config?.clientObject), [config?.clientObject]);

  return (
    <div className={`rounded-lg relative w-full h-full overflow-hidden border border-slate-100 ${styles.hoverFloat}`}>
      <LinkOrButtonWrapper url={url} onClick={onClick}>
        <div className="w-full h-full relative">
          <Image
            priority={priority}
            src={config.src}
            alt={config.alt}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover"
            }} />
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
  );
};

export default ShowcaseCard;

ShowcaseCard.defaultProps = {
  // size: "md",
  priority: false,
};

interface ILinkOrButtonProps {
  url?: string;
  onClick?: (item: any) => void;
  children: ReactNode;
}

const LinkOrButtonWrapper = ({url, onClick, children}: ILinkOrButtonProps) => {

  
  const trackClick = () => {
    event({action: "showcase-clicked", category: "open-article", label: url, value: null});
  }

  return (
    <>
      {url && 
        <a href={url} target="_blank" rel="noreferrer" onClick={trackClick}>
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