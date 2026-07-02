import { useEffect, useCallback } from "react";

export default function CopyCodeButton() {
    const attachButtons = useCallback(() => {
        const blocks = document.querySelectorAll(".docs-content pre");
        blocks.forEach((pre) => {
            if (pre.querySelector(".copy-btn")) return;
            const btn = document.createElement("button");
            btn.className = "copy-btn";
            btn.innerHTML =
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
            btn.setAttribute("aria-label", "Copy code");
            btn.addEventListener("click", async () => {
                const code = pre.querySelector("code");
                if (!code) return;
                await navigator.clipboard.writeText(code.textContent ?? "");
                btn.innerHTML =
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                btn.classList.add("copied");
                setTimeout(() => {
                    btn.innerHTML =
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
                    btn.classList.remove("copied");
                }, 2000);
            });
            pre.appendChild(btn);
        });
    }, []);

    useEffect(() => {
        attachButtons();
        const observer = new MutationObserver(attachButtons);
        const content = document.querySelector(".docs-content");
        if (content) observer.observe(content, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [attachButtons]);

    return null;
}
