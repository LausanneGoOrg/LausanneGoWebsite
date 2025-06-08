import ActivityViewClient from "./index";

// Required for static export
export async function generateStaticParams() {
  // Return empty array since we can't pre-generate all possible activity IDs
  return [{ id: "test" }];
}

export default function ActivityViewPage() {
  return <ActivityViewClient />;
}
