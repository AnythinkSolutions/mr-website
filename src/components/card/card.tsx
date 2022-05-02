import Image from "next/image";

import styles from "./card.module.scss";

export interface ICardProps {
  src: string;
  alt: string;
  url?: string;   //url for a click item
  onClick?: (item: any) => void;
}

const Card : React.FC<ICardProps> = ({src, alt, url, onClick, children}) => {

  
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
}

const LinkOrButtonWrapper : React.FC<ILinkOrButtonProps> = ({url, onClick, className, children}) => {

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