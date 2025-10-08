import { RootLayoutProps } from "../types/interfaces";
import Items from "../components/Items";

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-gray-50 to-gray-100">
      <Items />
    </div>
  );
}
