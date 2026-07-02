import type { IconType } from "react-icons";
import {
    SiPython,
    SiTypescript,
    SiJavascript,
    SiReact,
    SiJson,
    SiRust,
    SiToml,
    SiYaml,
    SiHtml5,
    SiCss,
    SiMarkdown,
    SiGnubash,
} from "react-icons/si";
import { FiTerminal, FiCode } from "react-icons/fi";

export type LangDef = {
    label: string;
    Icon: IconType;
    color: string;
    terminal?: boolean;
};

// Language token (from `language-xxx`) -> display def. Add new languages here.
const REGISTRY: Record<string, LangDef> = {
    python: { label: "Python", Icon: SiPython, color: "#4B8BBE" },
    py: { label: "Python", Icon: SiPython, color: "#4B8BBE" },
    typescript: { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    ts: { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    tsx: { label: "TSX", Icon: SiReact, color: "#61DAFB" },
    javascript: { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    js: { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    jsx: { label: "JSX", Icon: SiReact, color: "#61DAFB" },
    json: { label: "JSON", Icon: SiJson, color: "#cbcbcb" },
    rust: { label: "Rust", Icon: SiRust, color: "#DEA584" },
    rs: { label: "Rust", Icon: SiRust, color: "#DEA584" },
    toml: { label: "TOML", Icon: SiToml, color: "#9C4221" },
    yaml: { label: "YAML", Icon: SiYaml, color: "#CB171E" },
    yml: { label: "YAML", Icon: SiYaml, color: "#CB171E" },
    html: { label: "HTML", Icon: SiHtml5, color: "#E34F26" },
    css: { label: "CSS", Icon: SiCss, color: "#1572B6" },
    md: { label: "Markdown", Icon: SiMarkdown, color: "#cbcbcb" },
    markdown: { label: "Markdown", Icon: SiMarkdown, color: "#cbcbcb" },

    // terminal / shell
    bash: { label: "Bash", Icon: SiGnubash, color: "#9aa0aa", terminal: true },
    sh: { label: "Shell", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    shell: { label: "Shell", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    zsh: { label: "Zsh", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    console: { label: "Console", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    terminal: { label: "Terminal", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    powershell: { label: "PowerShell", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    ps: { label: "PowerShell", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
    ps1: { label: "PowerShell", Icon: FiTerminal, color: "#9aa0aa", terminal: true },
};

const FALLBACK: LangDef = { label: "Code", Icon: FiCode, color: "#9aa0aa" };

export function getLangDef(token?: string | null): LangDef {
    if (!token) return FALLBACK;
    return REGISTRY[token.toLowerCase()] ?? FALLBACK;
}
