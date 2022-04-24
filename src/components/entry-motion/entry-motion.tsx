import { useEffect} from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface IEntryMotionProps {
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  visible?: Record<string, any>;
  hidden?: Record<string, any>;
  immediate?: boolean;
}

const EntryMotion : React.FC<IEntryMotionProps> = (props) => {
  const {duration, delay, triggerOnce, threshold, visible, hidden, immediate, children} = props;

  const controls = useAnimation();
  const [ref, inView] = useInView({triggerOnce, threshold});

  useEffect(() => {
    if(immediate) controls.start("visible");
    else if(inView) controls.start("visible");
  }, [controls, immediate, inView]);

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
  threshold: 0.25,
  visible: { opacity: 1, translateY: 0 },
  hidden: { opacity: 0, translateY: 35 },
  immediate: false,
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