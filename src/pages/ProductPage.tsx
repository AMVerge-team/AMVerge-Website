import { Link } from "react-router-dom";
import { FiArrowRight, FiGithub } from "react-icons/fi";
import CopyCodeButton from "../docs/CopyCodeButton";
import DocMarkdown from "../docs/DocMarkdown";
import { builtInDocSource } from "../docs/builtInDocs";
import useSEO from "../hooks/useSEO";
import "../css/docs.css";
import "../css/product.css";
import "highlight.js/styles/github-dark.css";

type Props = {
    title: string;
    description: string;
    /** the docs page this shows, so the two can never disagree */
    docSlug: string;
    moreDocsSlug: string;
    moreDocsLabel: string;
    githubUrl: string;
};

function ProductPage({ title, description, docSlug, moreDocsSlug, moreDocsLabel, githubUrl }: Props) {
    useSEO({ title, description });

    return (
        <div className="page page-product">
            <div className="docs-content">
                <div className="docs-content-inner">
                    <article className="docs-article-anim">
                        <DocMarkdown source={builtInDocSource(docSlug)} />
                        <CopyCodeButton />
                        <div className="product-links">
                            <Link className="product-link-primary" to={`/docs/${moreDocsSlug}`}>
                                {moreDocsLabel} <FiArrowRight aria-hidden="true" />
                            </Link>
                            <a className="product-link" href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <FiGithub aria-hidden="true" /> GitHub
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export function CliPage() {
    return (
        <ProductPage
            title="CLI"
            description="AMVerge CLI: the AMVerge backend as a command-line tool and Python library. Split videos into scenes, export clips and build your own tools."
            docSlug="cli-overview"
            moreDocsSlug="cli-quick-start"
            moreDocsLabel="Read the CLI docs"
            githubUrl="https://github.com/AMVerge-team/AMVerge-CLI"
        />
    );
}

export function ExtensionPage() {
    return (
        <ProductPage
            title="After Effects Extension"
            description="The AMVerge After Effects extension: detect scenes and import clips into your composition from inside After Effects."
            docSlug="extension-overview"
            moreDocsSlug="extension-use"
            moreDocsLabel="Read the extension docs"
            githubUrl="https://github.com/AMVerge-team/AMVerge-Extension"
        />
    );
}
