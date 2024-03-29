import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/page";
import ReduxProvider from "@/store/ReduxProvider";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#e0dbd4]">
        <ReduxProvider>
          <Header />
          <div className="h-full flex flex-row box-border px-8 py-4 gap-8 w-full">
            <Sidebar />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
