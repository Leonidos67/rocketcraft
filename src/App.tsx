import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { SmoothCursor } from "@/components/ui/cursor";
import Index from "./pages/Index";
import Beta from "./pages/Beta";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import Pricing from "./pages/Pricing";
import Process from "./pages/Process";
import Contacts from "./pages/Contacts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Trend from "./pages/Trend";
import BusinessSolutionsPage from "./pages/BusinessSolutionsPage";
import NotFound from "./pages/NotFound";
import AppBlog from "./blog/AppBlog";

const queryClient = new QueryClient();

const App = () => {
  // Для разработки проверяем blog.localhost
  const isBlogDomain = window.location.hostname === 'blog.localhost';
  
  if (isBlogDomain) {
    return <AppBlog />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/beta" element={<Beta />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/cases" element={<Cases />} />
                        <Route path="/cases/:id" element={<CaseDetail />} />
            {/* <Route path="/pricing" element={<Pricing />} /> */}
            <Route path="/process" element={<Process />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/trend" element={<Trend />} />
            <Route path="/business-solutions" element={<BusinessSolutionsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
