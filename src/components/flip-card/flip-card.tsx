import { ReactElement } from "react";
import styles from "./flip-card.module.scss";

export interface IFlipCardProps {
  title: string;
  description?: string;
  children: ReactElement;
  backColor: string;
}

const FlipCard: React.FC<IFlipCardProps> = ({title, description, backColor, children}) => {
  return (
    <div className={`${styles.flipCard}`}>
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
