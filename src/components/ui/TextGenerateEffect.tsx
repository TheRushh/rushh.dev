import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!hasAnimated && scope.current) {
      setHasAnimated(true);
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.5,
          delay: stagger(0.08),
        }
      );
    }
  }, [scope.current, hasAnimated]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div>
        <div className="text-base-content leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
