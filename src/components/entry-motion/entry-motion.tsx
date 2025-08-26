import { ReactNode, useEffect} from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { event } from "../../lib/gtag";

export interface IEntryMotionProps {
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  visible?: Record<string, any>;
  hidden?: Record<string, any>;
  immediate?: boolean;
  fullSize?: boolean;
  eventAction?: string;     //for the gtag event - action (defaults to "reveal")
  eventCategory?: string;    //for the gtag event - category (defaults to "section-viewed")
  eventLabel?: string;    //for the gtag event - if not set, no event triggered
  children: ReactNode;
}

const EntryMotion = (props: IEntryMotionProps) => {
  const {duration, delay, triggerOnce, threshold, visible, hidden, immediate, fullSize, eventAction, eventCategory, eventLabel, children} = props;

  const controls = useAnimation();
  const [ref, inView] = useInView({triggerOnce, threshold});

  useEffect(() => {
    if(immediate) controls.start("visible");
    else if(inView) controls.start("visible");

    if(inView && eventLabel) event({action: eventAction, category: eventCategory, label: eventLabel, value: null});
  }, [controls, immediate, inView, eventAction, eventCategory, eventLabel]);

  const motionVariants = {
    visible: { 
      opacity: visible?.opacity ?? 1,
      y: visible?.y ?? 0,
      x: visible?.x ?? 0,
      scale: visible?.scale ?? 1,
      transition: { duration, delay } 
    },
    hidden: { 
      opacity: hidden?.opacity ?? 0,
      y: hidden?.y ?? 0,
      x: hidden?.x ?? 0,
      scale: hidden?.scale ?? 1
    }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={motionVariants}
      className={fullSize ? "size-full" : ""}
    >
      {children}
    </motion.div>
  );
};

export default EntryMotion;

EntryMotion.defaultProps = {
  duration: 0.5,
  delay: 0,
  triggerOnce: true,
  threshold: 0.1,
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 35 },
  immediate: false,
  eventAction: "reveal",
  eventCategory: "section-viewed",
};

export const fadeInProps = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeLeft = (distance: number) => ({
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -distance }
});

export const fadeRight = (distance: number) => ({
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: distance }
});

export const fadeUp = (distance: number) => ({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: distance }
});

export const fadeDown = (distance: number) => ({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -distance, x: -distance }
});

export const fadeDownRight = (yDistance: number, xDistance: number) => ({
  visible: { opacity: 1, y: 0, x: 0 },
  hidden: { opacity: 0, y: -yDistance, x: -xDistance }
});

export const fadeDownGrowRight = (yDistance: number = 50, xDistance: number = 50, startScale: number = 0.5) => ({
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  hidden: { opacity: 0, y: -yDistance, x: -xDistance, scale: startScale }
});