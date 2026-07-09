import { AppsSDKUIProvider } from "@openai/apps-sdk-ui/components/AppsSDKUIProvider";
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { HeartFilled, HeartXs } from "@openai/apps-sdk-ui/components/Icon";
import { McpUseProvider, useCallTool, useWidget, type WidgetMetadata } from "mcp-use/react";
import React, { useCallback } from "react";
import { Link } from "react-router";
import "../styles.css";
import type { ProductSearchResultProps } from "./types";
import { propSchema } from "./types";
import { fruitEmoji } from "./components/CarouselItem";

type FavoritesState = { favorites: string[] };

export const widgetMetadata: WidgetMetadata = {
  description: "Display fruit search results with favorites and tool interactions",
  props: propSchema,
  exposeAsTool: false,
  metadata: {
    prefersBorder: false,
    invoking: "Loading fruit search results...",
    invoked: "Fruit search results loaded",
  },
};

const ProductSearchResult: React.FC = () => {
  const { props, isPending, state, setState, sendFollowUpMessage, locale } =
    useWidget<ProductSearchResultProps, FavoritesState>();

  const {
    callTool: getFruitDetails,
    data: fruitDetails,
    isPending: isLoadingDetails,
  } = useCallTool("get-fruit-details");

  const favorites = state?.favorites ?? [];
  const selectedFruit = fruitDetails?.structuredContent as
    | { fruit: string; facts?: string[] }
    | undefined;

  const toggleFavorite = useCallback(
    (fruit: string) => {
      const current = state?.favorites ?? [];
      const next = current.includes(fruit)
        ? current.filter((f) => f !== fruit)
        : [...current, fruit];
      setState({ favorites: next });
    },
    [state, setState]
  );

  if (isPending) {
    return (
      <McpUseProvider>
        <div className="p-8 rounded-3xl border border-default bg-surface-elevated">
          <p className="text-secondary mb-2">MCP Apps Template</p>
          <h2 className="heading-xl mb-4">Lovely Little Fruit Shop</h2>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </McpUseProvider>
    );
  }

  const { query, results } = props;
  const lang = locale?.split("-")[0] ?? "en";

  return (
    <McpUseProvider>
      <AppsSDKUIProvider linkComponent={Link}>
        <div className="p-8 rounded-3xl border border-default bg-surface-elevated">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-secondary mb-1">MCP Apps Template · {lang}</p>
              <h2 className="heading-xl mb-1">Lovely Little Fruit Shop</h2>
              <p className="text-secondary">
                {query ? `Showing results for "${query}"` : "Tap a fruit to see details"}
              </p>
            </div>
            {favorites.length > 0 && (
              <Button color="secondary" pill size="lg" uniform variant="ghost" className="text-danger/80">
                <HeartFilled /> {favorites.length}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {results.map((item) => {
              const isFavorite = favorites.includes(item.fruit);
              return (
                <button
                  key={item.fruit}
                  type="button"
                  onClick={() => getFruitDetails({ fruit: item.fruit })}
                  className={`relative rounded-2xl border border-subtle p-5 text-left ${item.color} hover:scale-[1.02] transition-transform`}
                >
                  <span className="block text-6xl mb-3" aria-hidden="true">{fruitEmoji(item.fruit)}</span>
                  <span className="block font-semibold capitalize text-default">{item.fruit}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.fruit);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item.fruit);
                      }
                    }}
                    className={`absolute top-3 right-3 ${isFavorite ? "text-danger/80" : "text-secondary"}`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? <HeartFilled /> : <HeartXs />}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedFruit && (
            <div className="mt-6 rounded-2xl border border-default bg-surface p-5 flex gap-4 items-center">
              <div className="text-7xl">{fruitEmoji(selectedFruit.fruit)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg capitalize mb-2">{selectedFruit.fruit}</h3>
                {isLoadingDetails ? (
                  <p>Loading details...</p>
                ) : (
                  <ul className="space-y-1">
                    {(selectedFruit.facts ?? []).map((fact) => (
                      <li key={fact} className="text-sm text-secondary">• {fact}</li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => sendFollowUpMessage(`Tell me more interesting facts about ${selectedFruit.fruit}`)}
                  className="mt-3 px-3 py-1.5 text-xs font-medium rounded-lg bg-info/10 text-info hover:bg-info/20"
                >
                  Ask the AI for more
                </button>
              </div>
            </div>
          )}
        </div>
      </AppsSDKUIProvider>
    </McpUseProvider>
  );
};

export default ProductSearchResult;
