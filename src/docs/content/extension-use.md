# Import Clips into After Effects

In this guide, you detect scenes in a video and import clips into a composition.

## Before you begin

- [Install the extension](/docs/extension-overview#install).
- Open a composition in After Effects.

## Steps

### 1. Open the extension

Go to **Window > Extensions > AMVerge**.

### 2. Import a video

Import a video from the **Home** tab. The extension detects the scenes and shows them in a grid.

### 3. Preview clips

Click a clip to preview it.

### 4. Import to After Effects

Select the clips you want, then click the **Import** button. Each clip becomes a layer, placed right after the previous one and trimmed to its scene.

## Change settings

Open the **Settings** tab.

| Setting | What it does |
|---|---|
| **Scene Detection** | Keyframe Detection (fast) or AI Scene Detection (TransNetV2) |
| **Output Directory** | Where clips are saved. The default is `Downloads/AMVerge/<video name>` |
| **Layer Name Prefix** | Text added to the start of each layer's name |
| **Auto-Scale to Comp** | Scales clips to fit your composition |
| **Python Path** | Which Python install to use |
| **Sync with AMVerge App** | Follows the desktop app's theme |

## Use episodes from the app

Open the **History** tab to see the episodes you imported in the AMVerge desktop app, so you don't have to detect them again.
