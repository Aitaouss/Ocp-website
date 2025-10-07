import { RootLayoutProps } from "../types/interfaces";
import Items from "../components/Items";

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className="h-full w-full flex">
      <Items />
    </div>
  );
}
