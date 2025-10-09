export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <img
          src="/LogoOcp.png"
          alt="logo"
          width={50}
          height={50}
          className="animate-spin"
        />
        <h1 className="text-xl text-primary font-semibold ">Loading ...</h1>
      </div>
    </div>
  );
}
