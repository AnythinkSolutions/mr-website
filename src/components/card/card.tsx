import { ReactNode } from "react";
import Image from "next/image";
import styles from "./card.module.scss";

export interface ICardProps {
  src: string;
  alt: string;
  url?: string;   //url for a click item
  onClick?: (item: any) => void;
  children: ReactNode;
}

const Card = ({src, alt, url, onClick, children}: ICardProps) => {

  
  return (
    <div className={`rounded-lg relative w-full h-full overflow-hidden border border-slate-100 ${styles.hoverFloat}`}>
      <LinkOrButtonWrapper url={url} onClick={onClick} className="w-full h-full">
        <div className="w-full h-full grayscale hover:grayscale-0">
          <div className="absolute inset-0 h-full w-full z-0">
            <Image priority={false} src={src} alt={alt} layout="fill" objectFit="cover" />
          </div>
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </div>
      </LinkOrButtonWrapper>
    </div>
  )
};

export default Card;

interface ILinkOrButtonProps {
  url?: string;
  onClick?: (item: any) => void;
  className?: string;
  children: ReactNode;
}

const LinkOrButtonWrapper = ({url, onClick, className, children}: ILinkOrButtonProps) => {

  return (
    <>
      {url && 
        <a href={url} target="_blank" rel="noreferrer">
          {children}
        </a>
      }
      {(!url && onClick) && 
        <div onClick={onClick} className={className}>
          {children}
        </div>
      }
      {(!url && !onClick) &&
        <>
          {children}
        </>
      }
    </>
  )
}