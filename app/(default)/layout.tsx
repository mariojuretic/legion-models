import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <Header />
      <div className="flex flex-1">
        <NavMenu />
        {children}
      </div>
      <Footer />
    </div>
  );
}
