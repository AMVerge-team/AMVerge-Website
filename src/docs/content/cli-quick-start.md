# CLI Quick Start

In this guide, you split a video into scenes and export some of them from the terminal.

## Before you begin

[Install the CLI](/docs/cli-overview#install), then check your setup:

```bash
amverge doctor
```

## Steps

### 1. Detect scenes

```bash
amverge detect episode.mp4
```

This creates an `episode_scenes` folder with a clip and thumbnail per scene, plus an `episode_scenes.json` index.

### 2. Export the scenes you want

Pass scene numbers with `--select`. Use commas and ranges.

```bash
amverge export episode.mp4 --scenes episode_scenes/episode_scenes.json --select 0,2,5-8
```

Clips are saved to `./export`.

By default, `export` uses stream copy, which keeps the original quality but widens each cut to the nearest keyframes.

### 3. Choose a codec (optional)

Re-encode for exact cuts:

```bash
amverge export episode.mp4 --scenes episode_scenes/episode_scenes.json --codec h264_high --audio aac_320
```

### 4. Merge clips (optional)

```bash
amverge export episode.mp4 --scenes episode_scenes/episode_scenes.json --select 0-10 --merge
```

## Use AI detection

```bash
pip install amverge[ml]
amverge detect episode.mp4 --method transnetv2
```

If cuts are missed in dark scenes, lower the confidence threshold:

```bash
amverge detect episode.mp4 --method transnetv2 --threshold 0.3
```

## Search with Scene Scout

```bash
pip install amverge[scout]
amverge scout create my-show
amverge scout add episode.mp4 --db my-show
amverge scout search "wide shot" --db my-show
```

## Next steps

- [Command Reference](/docs/cli-commands)
- [Python Library](/docs/cli-python)
