import Image from "next/image";
import { useMemo } from "react";
import { IClient } from "../../utilities/app-types";
import styles from "./logo-image.module.scss";

export interface IImageProps {
  src: string;
  height?: number;
  width?: number;
  alt: string;
  url?: string;
}
export interface ILogoImageProps extends IImageProps {
  index: number;
  noAnimation?: boolean;
  size?: "sm" | "md" | "lg";    //default to md;
}

const sizeFactor = {
  sm: 0.7,
  md: 1.0,
  lg: 1.25
};

const LogoImage: React.FC<ILogoImageProps> = ({src, height, width, alt, url, index, noAnimation, size}) => {
  const animation = noAnimation ? null : "fade-in";
  const logoStyle = noAnimation ? styles.logoBoxNoAnimate : styles.logoBox;

  const imageHeight = useMemo(() => (height ?? 32) * sizeFactor[size ?? "md"], [height, size]);
  const imageWidth = useMemo(() => (width ?? 108) * sizeFactor[size ?? "md"], [width, size]);
  
  return (
    <div className={logoStyle} data-aos={animation} data-aos-duration="700" data-aos-delay={index * 200}>
      {url && 
        <a href={url} target="_blank" rel="noreferrer">
          <Image className={styles.clientLogo} src={src} alt={alt} height={imageHeight} width={imageWidth}/>
        </a>
      }
      {!url && 
        <Image className={styles.clientLogo} src={src} alt={alt} height={imageHeight} width={imageWidth}/>
      }
      
    </div>
  )
}

export default LogoImage;

LogoImage.defaultProps = {
  noAnimation: false,
  size: "md",
  height: 32,
  width: 108
};


export function clientToImageProps(client?: IClient): IImageProps {
  return {
    src: client?.logo ?? "",
    alt: client?.name ?? "",
    height: client?.height ?? 32,
    width: client?.width ?? 108,
    url: client?.url ?? ""
  };
}