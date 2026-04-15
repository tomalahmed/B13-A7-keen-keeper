import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PagesGroupLayout({ children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
