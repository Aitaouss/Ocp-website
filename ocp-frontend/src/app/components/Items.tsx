"use client";

import { useState } from "react";
import LayoutComponent from "./LayoutComponent";
import Dashboard from "./pages/DashboardPage";
import FerrtilizerPage from "./pages/FertilizerPage";
import ProductionPage from "./pages/ProductionPage";
import ProductionACSPage from "./pages/ProductionACSPage";
import ProductionACP29Page from "./pages/ProductionACP29Page";
import ProductionACP54Page from "./pages/ProductionACP54Page";
import StockPage from "./pages/StockPage";
import TransferPage from "./pages/TransferPage";
import VesselPage from "./pages/VesselPage";
import SenariosPage from "./pages/ScenariosPage";
import AdminPage from "./pages/AdminPage";

export default function Items() {
  const [itemActive, setItemActive] = useState<string>("dashboard");

  return (
    <>
      <div className="h-full">
        <LayoutComponent
          itemActive={itemActive}
          setItemActive={setItemActive}
        />
      </div>
      <div className="h-full bg-white flex-1 overflow-auto">
        <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
          {itemActive === "dashboard" && <Dashboard />}
          {itemActive === "production" && <ProductionPage />}
          {itemActive === "production-acs" && <ProductionACSPage />}
          {itemActive === "production-acp29" && <ProductionACP29Page />}
          {itemActive === "production-acp54" && <ProductionACP54Page />}
          {itemActive === "ferrtilizer" && <FerrtilizerPage />}
          {itemActive === "stocks" && <StockPage />}
          {itemActive === "transfers" && <TransferPage />}
          {itemActive === "vessell" && <VesselPage />}
          {itemActive === "scenarios" && <SenariosPage />}
          {itemActive === "admin" && <AdminPage />}
        </div>
      </div>
    </>
  );
}
