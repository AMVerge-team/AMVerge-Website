import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import "../css/pages.css";

export default function SiteLayout() {
    const { pathname } = useLocation();

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar />
            <main className="page-main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
