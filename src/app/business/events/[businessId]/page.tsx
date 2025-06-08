import BusinessEventsClient from "./index";

// Required for static export
export async function generateStaticParams() {
  // Return empty array since we can't pre-generate all possible business IDs
  return [{ businessId: "test" }];
}

export default function BusinessEventsPage() {
  return <BusinessEventsClient />;
}
