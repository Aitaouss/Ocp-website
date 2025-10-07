"use client";

const goDashboard = () => {
  window.location.href = "/dashboard";
};

export default function Home() {
  return (
    <div className="flex-1 h-full overflow-auto flex items-center justify-center flex-col gap-4 p-4">
      <h1 className="text-foreground tex-4xl font-semibold">Home</h1>
      <button
        onClick={goDashboard}
        className="bg-foreground text-black rounded hover:bg-gray-200 transition p-3 cursor-pointer"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
