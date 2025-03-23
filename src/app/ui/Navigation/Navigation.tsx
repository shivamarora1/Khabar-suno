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
  menuClickCallback,
  language,
}: Readonly<{
  children: React.ReactNode;
  expanded: boolean;
  menuClickCallback: () => void;
  language: string;
}>) => {
  const router = useRouter();

  const items = [
    {
      text: language == "hi" ? "भारत" : "India",
      selected: false,
      route: `/${language}/national`,
    },
    {
      text: language == "hi" ? "व्यापार" : "Business",
      route: `/${language}/business`,
    },
    { text: language == "hi" ? "खेल" : "Sports", route: `/${language}/sports` },
    {
      text: language == "hi" ? "प्रौद्योगिकी" : "Technology",
      route: `/${language}/technology`,
    },
    {
      text: language == "hi" ? "स्टार्टअप्स" : "Startups",
      route: `/${language}/startup`,
    },
    {
      text: language == "hi" ? "मनोरंजन" : "Entertainment",
      route: `/${language}/entertainment`,
    },
    { text: language == "hi" ? "हटके" : "Hatke", route: `/${language}/hatke` },
    {
      text: language == "hi" ? "अंतरराष्ट्रीय" : "International",
      route: `/${language}/world`,
    },
    {
      text: language == "hi" ? "ऑटोमोबाइल" : "Automobile",
      route: `/${language}/automobile`,
    },
    {
      text: language == "hi" ? "विज्ञान" : "Science",
      route: `/${language}/science`,
    },
    {
      text: language == "hi" ? "यात्रा" : "Travel",
      route: `/${language}/travel`,
    },
    {
      text: language == "hi" ? "विविध" : "Miscellaneous",
      route: `/${language}/miscellaneous`,
    },
    {
      text: language == "hi" ? "फैशन" : "Fashion",
      route: `/${language}/fashion`,
    },
    {
      text: language == "hi" ? "शिक्षा" : "Education",
      route: `/${language}/education`,
    },
    {
      text: language == "hi" ? "स्वास्थ्य और फिटनेस" : "Health & Fitness",
      route: `/${language}/Health___Fitness`,
    },
  ];

  const [selected, setSelected] = React.useState(
    items.findIndex((x) => x.selected === true)
  );

  const onSelect = (e: DrawerSelectEvent) => {
    router.push(e.itemTarget.props.route);
    setSelected(e.itemIndex);
    menuClickCallback();
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
