"use client";
import {
  Drawer,
  DrawerContent,
  DrawerSelectEvent,
} from "@progress/kendo-react-layout";
import React from "react";
import { useRouter } from "next/navigation";

export const Navigation = ({
  children,
  expanded,
}: Readonly<{
  children: React.ReactNode;
  expanded: boolean;
}>) => {
  const router = useRouter();

  const items = [
    { text: "India", selected: false, route: "/india" },
    { text: "Business", route: "/business" },
    { text: "Sports", route: "/sports" },
    { text: "Technology", route: "/technology" },
    { text: "Startups", route: "/startups" },
    { text: "Entertainment", route: "/entertainment" },
    { text: "Hatke", route: "/hatke" },
    { text: "International", route: "/international" },
    { text: "Automobile", route: "/automobile" },
    { text: "Science", route: "/science" },
    { text: "Travel", route: "/travel" },
    { text: "Miscellaneous", route: "/miscellaneous" },
    { text: "Fashion", route: "/fashion" },
    { text: "Education", route: "/education" },
    { text: "Health & Fitness", route: "/health" },
  ];
  const [selected, setSelected] = React.useState(
    items.findIndex((x) => x.selected === true)
  );

  const onSelect = (e: DrawerSelectEvent) => {
    router.push(e.itemTarget.props.route);
    setSelected(e.itemIndex);
  };
  return (
    <Drawer
      expanded={expanded}
      position={"start"}
      mode={"push"}
      items={items.map((item, index) => ({
        ...item,
        selected: index === selected,
      }))}
      onSelect={onSelect}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};
