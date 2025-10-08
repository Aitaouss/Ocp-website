"use client";
import { useState } from "react";
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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
interface LayoutProps {
  itemActive: string;
  setItemActive: (item: string) => void;
}

export default function LayoutComponent({
  itemActive,
  setItemActive,
}: LayoutProps) {
  const [productionExpanded, setProductionExpanded] = useState(false);

  const handleItemClick = (item: string) => {
    setItemActive(item);
  };

  const toggleProduction = () => {
    setProductionExpanded(!productionExpanded);
    if (!productionExpanded) {
      setItemActive("production");
    }
  };

  const items = [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Fertilizer",
      key: "ferrtilizer",
      icon: <FlaskConical size={20} />,
    },
    {
      name: "Stocks",
      key: "stocks",
      icon: <Boxes size={20} />,
    },
    {
      name: "Transfers",
      key: "transfers",
      icon: <ArrowLeftRight size={20} />,
    },
    {
      name: "Vessel",
      key: "vessell",
      icon: <Ship size={20} />,
    },
    {
      name: "Scenarios",
      key: "scenarios",
      icon: <Workflow size={20} />,
    },
    {
      name: "Admin",
      key: "admin",
      icon: <Settings size={20} />,
    },
  ];

  const productionSubItems = [
    { name: "ACS", key: "production-acs" },
    { name: "ACP29", key: "production-acp29" },
    { name: "ACP54", key: "production-acp54" },
  ];
  return (
    <div className="h-full bg-gradient-to-b from-emerald-800 to-teal-900 flex flex-col w-[260px] shadow-2xl">
      <div className="flex flex-col items-center justify-center py-8 border-b border-white/10">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-3 shadow-lg">
          <Image src={"/LogoWhite.png"} alt="logo" width={50} height={50} />
        </div>
        <h1 className="text-white font-bold text-lg tracking-wide">
          OCP Dashboard
        </h1>
        <p className="text-emerald-200/60 text-xs mt-1">Management Portal</p>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => handleItemClick(item.key)}
            className={`
              cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${
                itemActive === item.key
                  ? "bg-white text-emerald-900 shadow-lg scale-105"
                  : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
              }
            `}
          >
            <span
              className={`transition-transform duration-300 ${
                itemActive === item.key ? "scale-110" : "group-hover:scale-110"
              }`}
            >
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.name}</span>
          </button>
        ))}

        {/* Production with sub-items */}
        <div className="flex flex-col">
          <button
            onClick={toggleProduction}
            className={`
              cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${
                itemActive.startsWith("production")
                  ? "bg-white text-emerald-900 shadow-lg scale-105"
                  : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
              }
            `}
          >
            <span
              className={`transition-transform duration-300 ${
                itemActive.startsWith("production")
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            >
              <Factory size={20} />
            </span>
            <span className="font-medium text-sm flex-1 text-left">
              Production
            </span>
            {productionExpanded ? (
              <ChevronDown
                size={16}
                className="transition-transform duration-300"
              />
            ) : (
              <ChevronRight
                size={16}
                className="transition-transform duration-300"
              />
            )}
          </button>

          {/* Sub-items */}
          {productionExpanded && (
            <div className="flex flex-col ml-8 mt-1 gap-1">
              {productionSubItems.map((subItem) => (
                <button
                  key={subItem.key}
                  onClick={() => handleItemClick(subItem.key)}
                  className={`
                    cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                    ${
                      itemActive === subItem.key
                        ? "bg-white/20 text-white font-semibold"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="text-sm">{subItem.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
          <p className="text-emerald-200/60 text-xs">v1.0.0</p>
          <p className="text-emerald-200/40 text-xs mt-1">
            {new Date().getFullYear()} OCP Innovation
          </p>
        </div>
      </div>
    </div>
  );
}
