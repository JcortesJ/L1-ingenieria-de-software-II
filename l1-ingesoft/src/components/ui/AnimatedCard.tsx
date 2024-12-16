import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const AnimatedCard = ({
  children,
  className,
  contentClassName,
}: AnimatedCardProps) => {
  return (
    <Card
      className={cn(
        "mt-2 mb-2",
        "transition-all duration-400 ease-in-out",
        "hover:shadow-lg hover:scale-[1.02]",
        "active:scale-95",
        "animate-in fade-in-40 slide-in-from-bottom-4",
        className
      )}
    >
      <CardContent className={cn("w-90vw pt-5 pb-2 px-10", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};
