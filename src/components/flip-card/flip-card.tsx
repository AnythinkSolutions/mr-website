import { ReactNode } from "react";
import styles from "./flip-card.module.scss";

export interface IFlipCardProps {
  title: string;
  description?: string;
  backColor: string;
  children: ReactNode;
}

const FlipCard = ({title, description, backColor, children}: IFlipCardProps) => {
  return (
    <div className={`${styles.flipCard} h-full w-full`}>
      <div className={`${styles.innerCard}`}>
        <div className={`${styles.cardFront}`}>
          <div className={`${styles.backgroundImage}`}>
            {children}
          </div>
          <div className={`${styles.flipContent}`}>
            <h5 className={`${styles.title} `}>{title}</h5>
          </div>
        </div>
        <div className={`${styles.cardBack}`}>
          <div className={`${styles.flipContent}`}>
            <h5 className={`${styles.backTitle} `}>{title}</h5>
            <span className={`${styles.backDesc} `}>{description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard;
