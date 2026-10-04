import React from "react";

/**
 * Replaces occurrences of 'AMVerge' with the stylized <span>AMV</span>erge wordmark,
 * respecting the rule where AMV is styled by the accent color and erge is neutral.
 */
export function formatBrandText(text: string): React.ReactNode {
  if (!text) return text;
  const parts = text.split(/(AMVerge)/g);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (part === "AMVerge") {
      return (
        <span key={index}>
          <span>AMV</span>erge
        </span>
      );
    }
    return part;
  });
}
