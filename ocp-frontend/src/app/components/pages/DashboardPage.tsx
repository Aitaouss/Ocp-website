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

  return (
    <div className="h-full w-full p-10">
      <h1 className="text-black font-semibold text-2xl">
        Dashboard d'évolution de la production | Chargement selon le planning
        actuel
      </h1>
      <div className="grid grid-cols-4 gap-5 py-10 w-full">
        {productionSummary.map((ac) => (
          <div
            key={ac.name}
            className="bg-gradient-to-b from-emerald-800 to-teal-900 px-10 py-5 rounded shadow-lg flex flex-col items-center gap-3 w-auto"
          >
            <h1 className="text-xl text-foreground font-semibold">
              Total {ac.name}
            </h1>
            <h1 className="text-gray-200 text-xl">{ac.valueTotal} T</h1>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 py-10 w-full">
        <div className="bg-orange-200 px-10 py-5 rounded shadow-lg flex flex-col items-center gap-3 w-auto">
          <h1 className="text-xl text-black font-semibold">
            Max {filterMaxValueAcs[0].product}/m
          </h1>
          <h1 className="text-orange-700 text-xl">
            <span className="font-semibold">JFC1</span>{" "}
            {filterMaxValueAcs[0].monthly} T
          </h1>
        </div>
        <div className="bg-orange-200 px-10 py-5 rounded shadow-lg flex flex-col items-center gap-3 w-auto">
          <h1 className="text-xl text-black font-semibold">
            Max {MaxValueACP29[0].product}/m
          </h1>
          <h1 className="text-orange-700 text-xl">
            <span className="font-semibold">JFC1</span>{" "}
            {MaxValueACP29[0].monthly} T
          </h1>
        </div>
        <div className="bg-orange-200 px-10 py-5 rounded shadow-lg flex flex-col items-center gap-3 w-auto">
          <h1 className="text-xl text-black font-semibold">
            Max {MaxValueACP54[0].product}/m
          </h1>
          <h1 className="text-orange-700 text-xl">
            <span className="font-semibold">JFC1</span>{" "}
            {MaxValueACP54[0].monthly} T
          </h1>
        </div>
      </div>
    </div>
  );
}
