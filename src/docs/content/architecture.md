# Shared Backend

AMVerge is one backend with three front ends. The app, the After Effects extension and the CLI all run the same scene detection, cutting and export code.

## How it fits together

```txt
 AMVerge App          AE Extension         Your scripts
(Tauri + React)      (After Effects)      (terminal, Python)
       |                    |                    |
       +--------------------+--------------------+
                            |
                      amverge package
                            |
              FFmpeg, PyAV, PyTorch (optional)
```

| Product | How it uses the backend |
|---|---|
| **AMVerge App** | Ships with the CLI built in and starts it for imports and exports |
| **AE Extension** | Runs the `amverge` package installed on your PC |
| **AMVerge CLI** | Is the backend, available from a terminal or as a Python library |

## Why we built it this way

**One fix reaches everything.** Scene detection is hard to get right. If each product had its own copy, a bug fixed in one would stay broken in the others. With shared logic, improvements reach all three.

**Every backend change has to work everywhere.** When the backend changes, the products that use it have to keep working. We treat that as a rule: a change isn't finished until the app and the extension work with it.

**It gives back to developers.** We wanted to contribute to the developer community as well as the editing community. Because the backend is a separate package, anyone can build on it without touching our app.

## How changes are released

The CLI uses versions in the form `major.minor.patch`:

- A **patch** release fixes things without changing how other tools talk to the CLI.
- A **minor** release is required when commands, flags or output formats change.

The app's AI features update automatically to the newest patch of their minor version, so a patch must never break the app.

## Shared data

The products also share files. In sync mode, the AE extension reads the episodes you imported in the app, using the same `manifest.json` each episode folder contains. It can also follow the app's theme.

## Learn more

- [AMVerge CLI](/docs/cli-overview)
- [AE Extension](/docs/extension-overview)
- [Source code on GitHub](https://github.com/AMVerge-team)
