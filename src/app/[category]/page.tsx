import { NewsContainerComponent } from "../ui/NewsContainer/NewsContainer";

export default function Page({ params }: { params: { category: string } }) {
  return <NewsContainerComponent category={params.category || "home"} />;
}
