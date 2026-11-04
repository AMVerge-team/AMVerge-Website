# Export Clips

Export your selected clips as separate files or merge them into one.

## Before you begin

Select at least one clip. See [Browse and Select Clips](/docs/browse-clips).

## Steps

1. Choose a destination folder in the export panel.
2. Choose an export profile.
3. To join your clips into one file, turn on **Merge Clips**.
4. Click **Export Now**.

## Choose an export profile

| Profile | What you get | Best for |
|---|---|---|
| **Default MP4** | H.264 with exact cuts | Most editors |
| **H.265 Main10** | Smaller 10-bit files | Saving space |
| **ProRes 422 HQ** | Editing-friendly MOV files | Smooth timeline playback |
| **ProRes 4444** | Higher-quality ProRes | Maximum quality |
| **Fast Remux** | The original video, copied without quality loss | Speed and quality |

To create your own, open the export settings in **Settings**. You can save the codec, audio, container and hardware options as a profile.

## How Fast Remux works

Fast Remux copies video directly from your episode, so it doesn't lose quality. A direct copy can only start and end on a keyframe, so:

- **Separate clips:** Scenes that sit exactly on keyframes are copied. Other scenes are re-encoded at high quality in the source's codec, so every clip matches its scene exactly.
- **Merged clips:** Neighboring scenes are copied as one run, widened to the nearest keyframes.

> **Note:** Files saved as AVI can only be copied, so those clips are always widened to the nearest keyframes and may overlap their neighbors.

## Merge clips

**Merge Clips** joins your selection into one file. If your clips have different aspect ratios, AMVerge adds black bars rather than stretching them.

## Send clips to DaVinci Resolve

If you have DaVinci Resolve Studio, you can send exported clips straight to your timeline using the option in the export panel. This option doesn't work with the free version of Resolve.

## Use other editors

Clips are regular video files, so you can drag them into After Effects, Premiere Pro, CapCut or other editors. For After Effects, you can also use the [AE Extension](/docs/extension-overview).

## Learn more

- [Create depth maps](/docs/depth-maps)
