import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="fixed left-0 top-0 w-80">
        <Logo />
        <NavMenu />

        <button className="mx-6 text-xs uppercase tracking-widest">
          Search
        </button>
      </div>

      <div className="flex min-h-screen flex-col">
        <main className="ml-80 mt-[88px] flex grow p-6 text-xs uppercase tracking-widest">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
