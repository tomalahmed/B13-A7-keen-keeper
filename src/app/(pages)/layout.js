import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineProvider } from "@/context/TimelineContext";
import { ToastProvider } from "@/context/ToastContext";

export default function PagesGroupLayout({ children }) {
  return (
    <ToastProvider>
      <TimelineProvider>
        <div className="flex min-h-full flex-1 flex-col">
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </TimelineProvider>
    </ToastProvider>
  );
}
