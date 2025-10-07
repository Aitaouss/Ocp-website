"use client";
import Image from "next/image";
import {
  LayoutDashboard,
  Factory,
  FlaskConical,
  Boxes,
  ArrowLeftRight,
  Ship,
  Workflow,
  Settings,
} from "lucide-react";
interface LayoutProps {
  itemActive: string;
  setItemActive: (item: string) => void;
}

export default function LayoutComponent({
  itemActive,
  setItemActive,
}: LayoutProps) {
  const handleItemClick = (item: string) => {
    setItemActive(item);
  };

  const items = [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: null,
    },
    {
      name: "Production",
      key: "production",
      icon: null,
    },
    {
      name: "Ferrtilizer",
      key: "ferrtilizer",
      icon: null,
    },
    {
      name: "Stocks",
      key: "stocks",
      icon: null,
    },
    {
      name: "Transfers",
      key: "transfers",
      icon: null,
    },
    {
      name: "Vessell",
      key: "vessell",
      icon: null,
    },
    {
      name: "Scenarios",
      key: "scenarios",
      icon: null,
    },
    {
      name: "Admin",
      key: "admin",
      icon: null,
    },
  ];
  return (
    <div className="h-full bg-foreground flex flex-col items-center w-[200px] gap-10 border-r border-background shadow-lg">
      <div className="flex items-center justify-center px-10 mt-10">
        <Image src={"/LogoWhite.png"} alt="logo" width={50} height={50} />
        {/* <h1 className="text-background font-semibold ">Dashboard</h1> */}
      </div>
      <div className="flex flex-col w-full transiton-all duration-300">
        {items.map((item) => (
          <div className="flex items-center px-2 gap-1" key={item.key}>
            {item.icon}
            <div
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              className={` w-full cursor-pointer py-2 rounded ${
                itemActive === item.key
                  ? "border-r-4 border-background text-background font-semibold"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
