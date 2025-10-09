"use client";

import LayoutComponent from "./LayoutComponent";
import Dashboard from "./pages/DashboardPage";
import NaviresPage from "./pages/NaviresPage";
import ProductionPage from "./pages/ProductionPage";
import ProductionACSPage from "./pages/ProductionACSPage";
import ProductionACP29Page from "./pages/ProductionACP29Page";
import ProductionACP54Page from "./pages/ProductionACP54Page";
import StockPage from "./pages/StockPage";
import TransferPage from "./pages/TransferPage";

import { useEffect, useState } from "react";
import { authAPI } from "@/lib/api";
import Loading from "./Loading";
import EngraisPage from "./pages/EngraisPage";
export default function Items() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemActive, setItemActive] = useState<string>("dashboard");
  useEffect(() => {
    const startCheck = async () => {
      try {
        const data = await authAPI.getCurrentUser();
        console.log("successful:", data);
        setLoading(false);
      } catch (err: any) {
        window.location.href = "/login";
        setError(err.message || "failed");
      }
    };
    startCheck();
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="h-full">
        <LayoutComponent
          itemActive={itemActive}
          setItemActive={setItemActive}
        />
      </div>
      <div className="h-full bg-white flex-1 overflow-auto">
        <div className="min-h-full bg-[#F4F7FE]">
          {itemActive === "dashboard" && <Dashboard />}
          {itemActive === "production" && <ProductionPage />}
          {itemActive === "production-acs" && <ProductionACSPage />}
          {itemActive === "production-acp29" && <ProductionACP29Page />}
          {itemActive === "production-acp54" && <ProductionACP54Page />}
          {itemActive === "navires" && <NaviresPage />}
          {itemActive === "stocks" && <StockPage />}
          {itemActive === "transfers" && <TransferPage />}
          {itemActive === "engrais" && <EngraisPage />}
        </div>
      </div>
    </>
  );
}
