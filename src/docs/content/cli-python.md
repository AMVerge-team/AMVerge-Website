# Python Library

Everything in the CLI can be used from Python. Import from the top-level `amverge` package.

## Install

```bash
pip install amverge
```

## Detect scenes

```python
from amverge import detect_scenes

result = detect_scenes("episode.mp4")

for scene in result.scenes:
    print(f"Scene {scene.index}: {scene.start:.1f}s to {scene.end:.1f}s")
```

### Common parameters

| Parameter | Default | Description |
|---|---|---|
| `video_path` | | The video to split |
| `output_dir` | `None` | Output folder |
| `method` | `"keyframe"` | `"keyframe"`, `"edge"` or `"transnetv2"` |
| `min_duration` | `0.25` | Merges scenes shorter than this many seconds |
| `thumbnails` | `True` | Creates thumbnails |
| `ai_threshold` | `0.5` | TransNetV2 confidence from 0 to 1 |

### What you get back

`detect_scenes` returns a `DetectResult`:

| Field | Description |
|---|---|
| `scenes` | A list of `Scene` objects |
| `similar_pairs` | Pairs of scenes that look alike |
| `output_dir` | Where clips were saved |
| `scenes_json` | The path to the scenes JSON file |

Each `Scene` has:

| Field | Description |
|---|---|
| `index` | Scene number, starting at 0 |
| `start`, `end`, `duration` | Timing in seconds |
| `path` | The clip file |
| `thumbnail` | The thumbnail file, or `None` |

## Inspect a video

```python
from amverge import check_if_hevc, get_video_duration, get_video_info

print(get_video_duration("episode.mp4"))
print(check_if_hevc("episode.mp4"))

for stream in get_video_info("episode.mp4")["streams"]:
    print(stream["type"], stream["codec"])
```

## Create a thumbnail

```python
from amverge import make_thumbnail

make_thumbnail("scene_0001.mp4", "thumb.jpg")
```

## Learn more

- [Command Reference](/docs/cli-commands)
- [Shared Backend](/docs/architecture)
