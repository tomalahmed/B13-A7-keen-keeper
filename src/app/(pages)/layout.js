import Navbar from "@/components/Navbar";

export default function PagesGroupLayout({ children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
