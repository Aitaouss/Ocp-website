"use client";

import { useState } from "react";
import LayoutComponent from "./LayoutComponent";
import Dashboard from "./DashboardPage";
import FerrtilizerPage from "./FertilizerPage";
import ProductionPage from "./ProductionPage";
import StockPage from "./StockPage";
import TransferPage from "./TransferPage";
import VesselPage from "./VesselPage";
import SenariosPage from "./ScenariosPage";
import AdminPage from "./AdminPage";

export default function Items() {
  const [itemActive, setItemActive] = useState<string>("dashboard");

  return (
    <>
      <div className=" h-full">
        <LayoutComponent
          itemActive={itemActive}
          setItemActive={setItemActive}
        />
      </div>
      <div className=" h-full bg-white flex-1">
        {itemActive === "dashboard" && <Dashboard />}
        {itemActive === "production" && <ProductionPage />}
        {itemActive === "ferrtilizer" && <FerrtilizerPage />}
        {itemActive === "stocks" && <StockPage />}
        {itemActive === "transfers" && <TransferPage />}
        {itemActive === "vessell" && <VesselPage />}
        {itemActive === "scenarios" && <SenariosPage />}
        {itemActive === "admin" && <AdminPage />}
      </div>
    </>
  );
}
