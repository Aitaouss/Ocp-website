"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  productionSummary,
  monthlyProductionACS,
  monthlyProductionACP29,
  monthlyProductionACP54,
} from "../../DummyData";

export default function Dashboard() {
  const filterMaxValueAcs = monthlyProductionACS.filter(
    (item) =>
      item.monthly === Math.max(...monthlyProductionACS.map((o) => o.monthly))
  );
  const MaxValueACP29 = monthlyProductionACP29.filter(
    (item) =>
      item.monthly === Math.max(...monthlyProductionACP29.map((o) => o.monthly))
  );
  const MaxValueACP54 = monthlyProductionACP54.filter(
    (item) =>
      item.monthly === Math.max(...monthlyProductionACP54.map((o) => o.monthly))
  );

  const chartConfig = {
    monthly: {
      label: "Production mensuelle (T)",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const maxProductions = [
    {
      title: `Max ${filterMaxValueAcs[0].product}/m`,
      data: filterMaxValueAcs[0],
    },
    { title: `Max ${MaxValueACP29[0].product}/m`, data: MaxValueACP29[0] },
    { title: `Max ${MaxValueACP54[0].product}/m`, data: MaxValueACP54[0] },
  ];

  const charts = [
    {
      title: "Production ACS",
      data: monthlyProductionACS,
      maxValue: filterMaxValueAcs,
    },
    {
      title: "Production ACP29",
      data: monthlyProductionACP29,
      maxValue: MaxValueACP29,
    },
    {
      title: "Production ACP54",
      data: monthlyProductionACP54,
      maxValue: MaxValueACP54,
    },
  ];

  return (
    <div className="h-full w-full p-10">
      <h1 className="text-black font-bold text-2xl">
        Dashboard d'évolution de la production | Chargement selon le planning
        actuel
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-5 py-10 w-full">
        {productionSummary.map((ac) => (
          <Card
            key={ac.name}
            className="bg-gradient-to-b from-primary to-teal-900 text-center text-background shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Total {ac.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{ac.valueTotal} T</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Max production cards */}
      <div className="grid grid-cols-4 gap-5 py-10 w-full">
        {maxProductions.map((item, index) => (
          <Card key={index} className="bg-secondary text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 text-xl">
                <span className="font-semibold">{item.data.site}</span>{" "}
                {item.data.monthly} T
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-4 gap-5 py-10 w-full">
        {charts.map((chart, index) => (
          <Card key={index} className="w-full h-auto">
            <CardHeader>
              <CardTitle>{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={chart.data}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="site" tickLine={false} axisLine={false} />
                  <YAxis
                    domain={[0, chart.maxValue[0].monthly + 1000]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="monthly" radius={6} fill="var(--primary)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
