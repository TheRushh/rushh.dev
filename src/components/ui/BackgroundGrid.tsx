import { cn } from "../../utils/cn";

export const BackgroundGrid = ({
  className,
  gridSize = 50,
}: {
  className?: string;
  gridSize?: number;
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--grid-color, 100, 100, 100), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--grid-color, 100, 100, 100), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />
    </div>
  );
};
