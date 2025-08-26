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

const LogoImage = ({src, alt, url, hoverAnimation, size, hoverGrayscale, noLink}: ILogoImageProps) => {
  const isAuto = useMemo(() => size === "auto", [size]);
  const containerStyles = useMemo(() => isAuto ? "relative h-full w-full" : "", [isAuto]);
  const imageHeight = useMemo(() => 40 * sizeFactor[size ?? "md"], [size]);
  const imageWidth = useMemo(() => 132 * sizeFactor[size ?? "md"], [size]);
  const effects = useMemo(() => `${hoverAnimation ? styles.animateHover : ""} ${hoverGrayscale ? styles.grayEffect : ""}`, [hoverAnimation, hoverGrayscale]);
  
  return (
    <div className={`${styles.logoBox} ${effects} ${containerStyles} relative`}>
      {url && !noLink &&
        <a href={url} target="_blank" rel="noreferrer" className="h-full w-full">
          <div className="relative h-full w-full">
            {isAuto && (
              <Image 
                className={styles.clientLogo} 
                src={src} 
                alt={alt} 
                fill
                sizes="(max-width: 640px) 132px, 165px"
                style={{ objectFit: 'contain' }}
              />
            )}
            {!isAuto && (
              <Image 
                className={styles.clientLogo} 
                src={src} 
                alt={alt} 
                height={imageHeight} 
                width={imageWidth} 
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        </a>
      }
      {(!url || noLink) && 
        <>
          {isAuto && (
            <Image 
              className={styles.clientLogo} 
              src={src} 
              alt={alt} 
              fill
              sizes="(max-width: 640px) 132px, 165px"
              style={{ objectFit: 'contain' }}
            />
          )}
          {!isAuto && (
            <Image 
              className={styles.clientLogo} 
              src={src} 
              alt={alt} 
              height={imageHeight} 
              width={imageWidth} 
              style={{ objectFit: 'contain' }}
            />
          )}
        </>
      }
      
    </div>
  )
}

export default LogoImage;

LogoImage.defaultProps = {
  size: "md",
  hoverAnimation: false,
  hoverGrayscale: false,
};

export function clientToImageProps(client?: IClient): IImageProps {
  return {
    src: client?.logo ?? "",
    alt: client?.name ?? "",
    url: client?.url ?? ""
  };
}