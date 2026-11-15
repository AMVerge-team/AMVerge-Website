# After Effects Extension

The AMVerge extension brings scene detection into After Effects. Detect scenes, preview them in a panel and import the clips you want straight into your composition.

It uses the [same backend](/docs/architecture) as the AMVerge app, and it can work alongside the app or on its own.

## What you can do

- **Detect scenes** with keyframe or AI detection.
- **Preview clips** in a grid without leaving After Effects.
- **Import clips as layers**, placed one after another in your timeline.
- **Scale automatically** so clips fit your composition.
- **Open episodes from the app** in the History tab.

## Requirements

- After Effects CC 2018 or later (version 15.0+)
- Windows
- Python 3.11 or later. The extension offers to install the `amverge` package when you first open it.

> **Note:** macOS isn't supported yet.

## Install

### Use a ZXP installer

1. Download `AMVerge.zxp` from the [latest release](https://github.com/AMVerge-team/AMVerge-Extension/releases/latest) (one universal build for After Effects CC 2018+).
2. Install the free [ZXP Installer](https://aescripts.com/learn/post/zxp-installer).
3. Drag `AMVerge.zxp` onto the ZXP Installer window.
4. Restart After Effects.
5. Open **Window > Extensions > AMVerge**.

### Use the setup wizard

Run `AMVergeSetup.exe` from the [latest release](https://github.com/AMVerge-team/AMVerge-Extension/releases/latest), follow the steps, then open **Window > Extensions > AMVerge** in After Effects.

## Choose a mode

The first time you open the extension, it asks how you want to run it:

| Mode | What it does | Best for |
|---|---|---|
| **Sync with AMVerge App** | Shares episodes, scene information and theme with the desktop app | People who use both |
| **Standalone Extension** | Runs on its own, using the `amverge` package on your PC | People who only use After Effects |

## Next steps

- [Import clips into After Effects](/docs/extension-use)
- [Source code on GitHub](https://github.com/AMVerge-team/AMVerge-Extension)
