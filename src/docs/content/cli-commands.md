# Command Reference

Run `amverge <command> --help` to see every option for a command.

## Scene detection

| Command | What it does |
|---|---|
| `amverge detect` | Splits a video into scenes |
| `amverge keyframes` | Lists a video's keyframe timestamps |
| `amverge scenes` | Shows scenes from a TransNetV2 cache |
| `amverge cache` | Lists or clears TransNetV2 caches |
| `amverge bench` | Benchmarks keyframe scanning and TransNetV2 |

### Common `detect` options

| Option | Default | Description |
|---|---|---|
| `--output`, `-o` | `<name>_scenes/` | Output folder |
| `--method`, `-m` | `keyframe` | `keyframe`, `edge` or `transnetv2` |
| `--decode-method` | `ffmpeg` | TransNetV2 decoder: `ffmpeg` or `nelux` (GPU, Windows) |
| `--format`, `-f` | `table` | `table`, `json` or `paths` |
| `--min-duration` | `0.25` | Merges scenes shorter than this many seconds |
| `--threshold` | | TransNetV2 confidence from 0 to 1. Lower finds more cuts |
| `--no-thumbnails` | off | Skips thumbnails |

## Export

| Command | What it does |
|---|---|
| `amverge export` | Exports scenes from a detect run |
| `amverge merge` | Joins clips into one file |

### Common `export` options

| Option | Default | Description |
|---|---|---|
| `--scenes`, `-s` | | The JSON file `detect` created, like `episode_scenes/episode_scenes.json` |
| `--output`, `-o` | `export` | Output folder |
| `--select` | all | Scenes to export, like `0,2,5-8` |
| `--merge` | off | Joins the selection into one file |
| `--codec` | `copy` | `copy`, or a codec profile below |
| `--audio` | `copy` | `copy`, `aac`, `aac_320`, `pcm16`, `pcm24`, `flac`, `alac`, `opus`, `mp3` or `none` |
| `--container` | `mp4` | `mp4`, `mov` or `avi` (`avi` is copy only) |
| `--hardware` | `auto` | `auto`, `gpu` or `cpu` |
| `--workers` | `1` | Clips to export at once |
| `--exact-copy` | off | With `--codec copy`, re-encodes scenes a copy can't cut exactly. Requires version 1.2.0 |

### Codec profiles

| Family | Profiles | GPU encoding |
|---|---|---|
| H.264 | `h264_main`, `h264_high`, `h264_high10`, `h264_high422` | NVENC for `main` and `high` |
| H.265 | `h265_main`, `h265_main10`, `h265_main12`, `h265_main422_10` | NVENC for `main` and `main10` |
| AV1 | `av1_main` | NVENC |
| ProRes | `prores_422_lt`, `prores_422`, `prores_422_hq`, `prores_4444`, `prores_4444_xq` | None. Use `--container mov` |

## Scene Scout

| Command | What it does |
|---|---|
| `amverge scout create` | Creates a database |
| `amverge scout add` | Indexes a video into a database |
| `amverge scout search` | Searches by description or reference image |
| `amverge scout motion` | Measures motion tags for scenes that lack them |

### Common `scout search` options

| Option | Default | Description |
|---|---|---|
| `--db` | all | Database to search. Repeatable |
| `--video` | all | Limits the search to specific videos |
| `--image` | | Searches by a reference image |
| `--top-k` | `24` | Maximum results |
| `--flow-from` | | Finds scenes that could follow this clip |
| `--skip-edges-ms` | `0` | Leaves out scenes this close to a video's start or end. Requires version 1.2.0 |
| `--json` | off | Prints JSON |

## Video processing

| Command | What it does | Install |
|---|---|---|
| `amverge upscale` | AI upscaling with ShuffleCUGAN, ArtCNN or Anime4K | `[upscale]` |
| `amverge interpolate` | Frame interpolation with RIFE | `[interpolation]` |
| `amverge depth-map` | Depth maps with Depth-Anything-V2 | `[depth]` |
| `amverge deadframes` | Removes frames where the subject doesn't move | `[deadframes]` |
| `amverge pipeline` | Chains dead frame removal, upscaling and interpolation | |
| `amverge models` | Manages model files | |

## Diagnostics

| Command | What it does |
|---|---|
| `amverge doctor` | Runs a full health check |
| `amverge gpu` | Shows PyTorch, CUDA and GPU details |
| `amverge info` | Shows a video's stream details |
| `amverge probe` | Shows codec, keyframe and cache details |
| `amverge version` | Shows CLI, Python and dependency versions |
