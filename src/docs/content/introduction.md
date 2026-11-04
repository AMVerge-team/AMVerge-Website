# What is AMVerge?

AMVerge is a free, open-source tool that turns an episode into a grid of scenes, so you can pick the clips you want without scrubbing through a timeline.

It comes in three forms, all built on the same backend:

| Product | What it's for | Who it's for |
|---|---|---|
| [AMVerge App](/docs/install-app) | Import episodes, browse scenes and export clips | Editors |
| [AE Extension](/docs/extension-overview) | Detect scenes and import clips from inside After Effects | Editors working in After Effects |
| [AMVerge CLI](/docs/cli-overview) | Run the same features from a terminal or Python | Developers |

## What you can do

- **Split an episode into scenes** using fast keyframe detection or AI scene detection.
- **Browse scenes in a grid**, with hover previews and multi-select.
- **Search by description** with Scene Scout, like "wide shot".
- **Export clips** losslessly or in H.264, H.265 and ProRes.

## Why there are three products

Most editing tools keep their logic inside a single app. We built AMVerge's backend to be shared, so a fix in one place reaches every product. We also wanted to give something back to developers as well as editors, which is why the backend is available as its own CLI and Python library.

To learn how this works, see [Shared Backend](/docs/architecture).

## Next steps

- [Install AMVerge](/docs/install-app)
- [Cut your first episode](/docs/quick-start)
