import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";

export default function NotFound() {
    useSEO({
        title: "404 - Page Not Found",
    });

    return (
        <div className="page page-notfound">
            <h1 className="page-title">
                <span>404</span>
            </h1>
            <p className="page-sub">
                This page doesn't exist or was moved.
            </p>
            <Link to="/" className="donate-btn">
                Back to Home
            </Link>
        </div>
    );
}
