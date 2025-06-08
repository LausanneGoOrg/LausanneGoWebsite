import EditBusinessClient from "./index";

// Required for static export
export async function generateStaticParams() {
  // Return empty array since we can't pre-generate all possible business IDs
  return [{ id: "test" }];
}

export default function EditBusinessPage() {
  return <EditBusinessClient />;
}
