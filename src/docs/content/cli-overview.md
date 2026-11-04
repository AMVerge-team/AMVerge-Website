# AMVerge CLI

The AMVerge CLI is the backend of AMVerge, available as a command-line tool and Python library. Use it to split videos into scenes, export clips and build your own tools.

We made it because it makes fixing issues easier, and it lets us give back to the developer community as well. It's the [same code the app uses](/docs/architecture), so what works in the app works here too.

## Install

You need Python 3.11 or later, and `ffmpeg` and `ffprobe` on your PATH.

```bash
pip install amverge
```

This covers keyframe detection, export, merge and info. Add extras for other features:

| Install command | Adds |
|---|---|
| `pip install amverge[ml]` | TransNetV2 AI scene detection |
| `pip install amverge[edge]` | Edge detection |
| `pip install amverge[scout]` | Scene Scout search |
| `pip install amverge[upscale]` | AI upscaling |
| `pip install amverge[interpolation]` | Frame interpolation |
| `pip install amverge[depth]` | Depth maps |
| `pip install amverge[deadframes]` | Dead frame removal |
| `pip install amverge[all]` | Most of the above |

Check your setup with:

```bash
amverge doctor
```

## Try it

```bash
# detect scenes
amverge detect episode.mp4

# export three scenes
amverge export episode.mp4 --scenes episode_scenes/episode_scenes.json --select 0,2,5
```

Or from Python:

```python
from amverge import detect_scenes

result = detect_scenes("episode.mp4")
for scene in result.scenes:
    print(scene.index, scene.start, scene.end, scene.path)
```

Run `amverge` with no arguments for an interactive wizard.

## Next steps

- [CLI Quick Start](/docs/cli-quick-start)
- [Command Reference](/docs/cli-commands)
- [Python Library](/docs/cli-python)
- [Source code on GitHub](https://github.com/AMVerge-team/AMVerge-CLI)

AMVerge CLI is licensed under GPL-3.0-or-later.
