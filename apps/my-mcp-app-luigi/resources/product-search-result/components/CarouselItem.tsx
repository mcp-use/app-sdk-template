import { Button } from "@openai/apps-sdk-ui/components/Button";
import { HeartFilled, HeartXs } from "@openai/apps-sdk-ui/components/Icon";
import React from "react";

export interface CarouselItemProps {
  fruit: string;
  color: string;
  isFavorite?: boolean;
  onClick: () => void;
  onToggleFavorite?: () => void;
}

export const fruitEmoji = (fruit: string) => {
  const emojis: Record<string, string> = {
    mango: "🥭", pineapple: "🍍", cherries: "🍒", coconut: "🥥", apricot: "🍑", blueberry: "🫐", grapes: "🍇", watermelon: "🍉", orange: "🍊", avocado: "🥑", apple: "🍎", pear: "🍐", plum: "🟣", banana: "🍌", strawberry: "🍓", lemon: "🍋",
  };
  return emojis[fruit.toLowerCase()] ?? "🍽️";
};

export const CarouselItem: React.FC<CarouselItemProps> = ({
  fruit,
  color,
  isFavorite,
  onClick,
  onToggleFavorite,
}) => {
  return (
    <div
      className={`carousel-item size-52 rounded-xl border border-subtle ${color} cursor-pointer`}
      onClick={onClick}
    >
      {onToggleFavorite && (
        <Button
          color="secondary"
          pill
          size="md"
          uniform
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-2 right-2 z-10 ${isFavorite ? "text-danger/80" : "text-secondary"}`}
        >
          {isFavorite ? <HeartFilled /> : <HeartXs />}
        </Button>
      )}
      <div className="carousel-item-bg text-8xl opacity-20 flex items-center justify-center">
        {fruitEmoji(fruit)}
      </div>
      <div className="carousel-item-content text-7xl flex items-center justify-center">
        {fruitEmoji(fruit)}
      </div>
    </div>
  );
};
