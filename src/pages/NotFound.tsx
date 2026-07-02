import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiHelpCircle, FiDownload, FiCoffee, FiClock } from "react-icons/fi";
import useSEO from "../hooks/useSEO";

export default function NotFound() {
    useSEO({
        title: "404 - Page Not Found",
    });

    return (
        <div className="page page-notfound">
            <div className="section-head">
                <span className="section-eyebrow">Error 404</span>
                <h1 className="page-title" style={{ fontSize: "clamp(80px, 12vw, 140px)", lineHeight: 1 }}>
                    <span>404</span>
                </h1>
            </div>

            <p className="page-sub">
                This page doesn't exist or was moved. The scene you're looking for
                might have been cut from the timeline.
            </p>

            <div className="notfound-links fade-in-children">
                <Link to="/" className="feature-card">
                    <div className="feature-icon"><FiHome /></div>
                    <h2>Home</h2>
                    <p>Back to the landing page</p>
                </Link>
                <Link to="/features" className="feature-card">
                    <div className="feature-icon"><FiDownload /></div>
                    <h2>Features</h2>
                    <p>See what AMVerge can do</p>
                </Link>
                <Link to="/docs" className="feature-card">
                    <div className="feature-icon"><FiFileText /></div>
                    <h2>Docs</h2>
                    <p>Read the documentation</p>
                </Link>
                <Link to="/faq" className="feature-card">
                    <div className="feature-icon"><FiHelpCircle /></div>
                    <h2>FAQ</h2>
                    <p>Frequently asked questions</p>
                </Link>
                <Link to="/changelog" className="feature-card">
                    <div className="feature-icon"><FiClock /></div>
                    <h2>Changelog</h2>
                    <p>See what's new in each release</p>
                </Link>
                <Link to="/donate" className="feature-card">
                    <div className="feature-icon"><FiCoffee /></div>
                    <h2>Donate</h2>
                    <p>Support the project</p>
                </Link>
            </div>
        </div>
    );
}
