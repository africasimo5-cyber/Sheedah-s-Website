export type Wig = {
  id: string;
  name: string;
  category: string;
  lengths: string[];
  price: string | null;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
};

export const CATEGORY_OPTIONS = [
  "All",
  "Straight",
  "Body Wave",
  "Deep Wave",
  "Curly",
  "Kinky",
  "Closure & Frontals",
] as const;

export type CategoryFilter = (typeof CATEGORY_OPTIONS)[number];

export type StockFilter = "all" | "in_stock" | "out_of_stock";
