import { AnimatePresence, motion } from 'framer-motion';

export const AnimatedBodySection = ({ children, keyName, className, animationVariant }) => (
  <div className={className}>
    <AnimatePresence mode='wait'>
      <motion.div
        key={keyName}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationVariant}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
);
