import { useEffect, useCallback } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getLangDef } from "./codeLanguages";

// Injects a header bar (language icon + label, or terminal traffic-lights)
// into each docs code block. Mirrors CopyCodeButton's decorator pattern.
export default function CodeBlockHeader() {
    const attach = useCallback(() => {
        document.querySelectorAll(".docs-content pre").forEach((pre) => {
            if (pre.querySelector(".code-header")) return;

            const code = pre.querySelector("code");
            const match = (code?.className ?? "").match(/language-([a-z0-9]+)/i);
            const def = getLangDef(match?.[1]);

            const header = document.createElement("div");
            header.className = "code-header" + (def.terminal ? " terminal" : "");

            if (def.terminal) {
                header.innerHTML = `<span class="code-dots"></span><span class="code-lang">${def.label}</span>`;
            } else {
                const Icon = def.Icon;
                const icon = renderToStaticMarkup(<Icon />);
                header.innerHTML = `<span class="code-ic" style="color:${def.color}">${icon}</span><span class="code-lang">${def.label}</span>`;
            }

            pre.insertBefore(header, pre.firstChild);
        });
    }, []);

    useEffect(() => {
        attach();
        const observer = new MutationObserver(attach);
        const content = document.querySelector(".docs-content");
        if (content) observer.observe(content, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [attach]);

    return null;
}
