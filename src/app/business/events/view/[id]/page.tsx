import EventViewClient from "./index";

// Required for static export
export async function generateStaticParams() {
  // Return empty array since we can't pre-generate all possible event IDs
  return [{ id: "test" }];
}

export default function EventViewPage() {
  return <EventViewClient />;
}
