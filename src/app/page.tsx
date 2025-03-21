import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function Home() {
  const categories = ["Pizza", "Burger", "Pasta", "Burrito"];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>Choose food category</div>
        <DropDownList
          style={{ width: "300px" }}
          data={categories}
          defaultValue="Pizza"
        />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        This is Footer
      </footer>
    </div>
  );
}
