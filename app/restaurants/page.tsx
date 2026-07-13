import { RestaurantsClientPage } from "@/components/pages/RestaurantsClientPage";

const allowedCategories = new Set([
  "all",
  "sushi",
  "pharmacy",
  "grocery",
  "cafe",
  "autoparts",
  "flowers"
] as const);

type RestaurantsPageProps = {
  searchParams?: Promise<{
    category?: string;
    query?: string;
  }>;
};

export default async function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialCategory = allowedCategories.has((resolvedSearchParams.category ?? "all") as never)
    ? resolvedSearchParams.category ?? "all"
    : "all";
  const initialQuery = resolvedSearchParams.query ?? "";

  return <RestaurantsClientPage initialCategory={initialCategory} initialQuery={initialQuery} />;
}
