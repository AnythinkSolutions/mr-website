import Image from "next/image";
import { useMemo } from "react";
import { IClient } from "../../utilities/app-types";
import styles from "./logo-image.module.scss";

export interface IImageProps {
  src: string;
  alt: string;
  url?: string;
  noLink?: boolean;
}
export interface ILogoImageProps extends IImageProps {
  size?: "sm" | "md" | "lg" | "auto";    //default to md;
  hoverAnimation?: boolean;
  hoverGrayscale?: boolean;
}

const sizeFactor = {
  sm: 0.7,
  md: 1.0,
  lg: 1.25,
  auto: 1,
};

const LogoImage: React.FC<ILogoImageProps> = ({src, alt, url, hoverAnimation, size, hoverGrayscale, noLink}) => {
  const isAuto = useMemo(() => size === "auto", [size]);
  const containerStyles = useMemo(() => isAuto ? "relative h-full w-full" : "", [isAuto]);
  const imageHeight = useMemo(() => 40 * sizeFactor[size ?? "md"], [size]);
  const imageWidth = useMemo(() => 132 * sizeFactor[size ?? "md"], [size]);
  const effects = useMemo(() => `${hoverAnimation ? styles.animateHover : ""} ${hoverGrayscale ? styles.grayEffect : ""}`, [hoverAnimation, hoverGrayscale]);
  
  return (
    <div className={`${styles.logoBox} ${effects} ${containerStyles}`}>
      {url && !noLink &&
        <a href={url} target="_blank" rel="noreferrer">
          {isAuto && <Image className={styles.clientLogo} src={src} alt={alt} layout="fill" objectFit="contain"/>}
          {!isAuto && <Image className={styles.clientLogo} src={src} alt={alt} height={imageHeight} width={imageWidth}/>}
        </a>
      }
      {(!url || noLink) && 
        <>
          {isAuto && <Image className={styles.clientLogo} src={src} alt={alt} layout="fill" objectFit="contain" />}
          {!isAuto && <Image className={styles.clientLogo} src={src} alt={alt} height={imageHeight} width={imageWidth} objectFit="contain" />}
        </>
      }
      
    </div>
  )
}

export default LogoImage;

LogoImage.defaultProps = {
  size: "md",
  // height: 32,
  // width: 108,
  hoverAnimation: false,
  hoverGrayscale: false,
};

export function clientToImageProps(client?: IClient): IImageProps {
  return {
    src: client?.logo ?? "",
    alt: client?.name ?? "",
    // height: client?.height ?? 32,
    // width: client?.width ?? 108,
    url: client?.url ?? ""
  };
}