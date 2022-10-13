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
    visible: { ...visible, transition: { duration, delay } },
    hidden: { ...hidden }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={motionVariants}
      style={fullSize ? {height: "100%", width: "100%"} : {}}
      >
        {children}
    </motion.div>
  )
};

export default EntryMotion;

EntryMotion.defaultProps = {
  duration: 0.5,
  delay: 0,
  triggerOnce: true,
  threshold: 0.1,
  visible: { opacity: 1, translateY: 0 },
  hidden: { opacity: 0, translateY: 35 },
  immediate: false,
  eventAction: "reveal",
  eventCategory: "section-viewed",
};

export const fadeInProps = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
};

export const fadeLeft = (xDistanceAbsolute: number) => {
  return {
    visible: { opacity: 1, translateX: 0 },
    hidden: {opacity: 0, translateX: -xDistanceAbsolute }
  };
}

export const fadeRight = (xDistanceAbsolute: number) => {
  return {
    visible: { opacity: 1, translateX: 0 },
    hidden: {opacity: 0, translateX: xDistanceAbsolute }
  };
}

export const fadeUp = (yDistanceAbsolute: number) => {
  return {
    visible: { opacity: 1, translateY: 0 },
    hidden: {opacity: 0, translateY: yDistanceAbsolute }
  };
}

export const fadeDown = (yDistanceAbsolute: number) => {
  return {
    visible: { opacity: 1, translateY: 0 },
    hidden: {opacity: 0, translateY: -yDistanceAbsolute }
  };
}

export const fadeDownRight = (yDistanceAbsolute: number, xDistanceAbsolute: number) => {
  return {
    visible: { opacity: 1, translateY: 0, translateX: 0},
    hidden: {opacity: 0, translateY: -yDistanceAbsolute, translateX: -xDistanceAbsolute }
  };
}

export const fadeDownGrowRight = (yDistanceAbsolute: number = 50, xDistanceAbsolute: number = 50, startScale: number = 0.5) => {
  return {
    visible: { opacity: 1, translateY: 0, translateX: 0, scaleX: 1, scaleY: 1},
    hidden: {opacity: 0, translateY: -yDistanceAbsolute, translateX: -xDistanceAbsolute, scaleX: startScale, scaleY: startScale }
  };
}