"use client";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Factory,
  Boxes,
  ArrowLeftRight,
  Workflow,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { authAPI } from "@/lib/api";
interface LayoutProps {
  itemActive: string;
  setItemActive: (item: string) => void;
}

export default function LayoutComponent({
  itemActive,
  setItemActive,
}: LayoutProps) {
  const [productionExpanded, setProductionExpanded] = useState(false);

  const handleLogout = () => {
    authAPI.logout();
    window.location.href = "/login";
  };

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
      name: "Chargement des navires",
      key: "navires",
      icon: <Workflow size={20} />,
    },
  ];

  const productionSubItems = [
    { name: "ACS", key: "production-acs" },
    { name: "ACP29", key: "production-acp29" },
    { name: "ACP54", key: "production-acp54" },
  ];

  const SettingsItems = [
    { name: "Admin", key: "admin", icon: <Settings size={20} /> },
    { name: "", key: "", icon: <></> },
  ];
  return (
    <div className="overflow-auto h-full bg-white flex flex-col w-[260px] shadow-2xl items-center justify-between pb-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center py-8 pb-5 border-b border-white/10">
          <Image src={"/LogoOcp.png"} alt="logo" width={50} height={50} />
          <h1 className="text-primary font-bold text-lg tracking-wide">
            Interface Supply Chain
          </h1>
        </div>
        <div className="w-[80%] h-[2px] bg-black/10 text-center"></div>
        <div>
          <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            <h1 className="text-xs text-black/70 pb-3">MAIN</h1>
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                className={`
              cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
              ${
                itemActive === item.key
                  ? "bg-gray-100 text-black font-semibold scale-105"
                  : "text-black/40 hover:bg-white/10 hover:text-black hover:translate-x-1"
              }
            `}
              >
                <span
                  className={`transition-transform duration-300 ${
                    itemActive === item.key
                      ? "scale-110"
                      : "group-hover:scale-110"
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
              cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
              ${
                itemActive.startsWith("production")
                  ? "bg-gray-100 text-black font-bold scale-105"
                  : "text-black/40 hover:bg-white/10 hover:text-black hover:translate-x-1"
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
                    cursor-pointer flex items-center gap-2 px-4 py-2 rounded transition-all duration-300
                    ${
                      itemActive === subItem.key
                        ? "bg-white/20 text-black font-semibold"
                        : "text-black/40 hover:bg-white/10 hover:text-black"
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
          <div className="p-4">
            <h1 className="text-xs text-black/70 pb-3">SETTINGS</h1>
            <div className="flex flex-col gap-1">
              {SettingsItems.map((item) =>
                item.name ? (
                  <button
                    key={item.key}
                    onClick={() => handleItemClick(item.key)}
                    className={`
              cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
              ${
                itemActive === item.key
                  ? "bg-gray-100 text-black font-bold shadow-lg scale-105"
                  : "text-black/40 hover:bg-white/10 hover:text-black hover:translate-x-1"
              }
            `}
                  >
                    <span
                      className={`transition-transform duration-300 ${
                        itemActive === item.key
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </button>
                ) : (
                  <div key={item.key} className="h-4"></div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 border-t border-black/10 pt-4 w-full flex justify-center items-center gap-2 cursor-pointer text-red-500 hover:text-red-700 transition-all duration-300"
      >
        <LogOut size={20} className="inline text-base" />
        <h1 className="text-base">Logout Account</h1>
      </button>
    </div>
  );
}
