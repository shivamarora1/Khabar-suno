import { NewsContainerComponent } from "../../ui/NewsContainer/NewsContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; language: string }>;
}) {
  const { language, category } = await params;
  return (
    <NewsContainerComponent
      language={language || "en"}
      category={category || "national"}
    />
  );
}
