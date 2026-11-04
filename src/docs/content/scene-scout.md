# Scene Scout

Scene Scout lets you search your episodes by describing what you want, like "wide shot". It started as a standalone app by SonicFreak, who has since built it into AMVerge.

Search runs on your own PC. Your episodes are never uploaded.

## Before you begin

Turn on Scene Scout in **Settings > Features**. It downloads what it needs the first time. See [Turn On AI Features](/docs/ai-features).

## Create a database

A database stores what Scene Scout has learned about your episodes. A common setup is one database per show.

1. Open **Scene Scout** in the sidebar.
2. Click **+** and name your database.
3. Click **Add Episode**.
4. Choose how to add your episodes:
   - **Import a pre-cut episode** reuses an episode from your Library, so scenes aren't detected again.
   - **Import a full episode** lets you pick a video file and a detection method.

## Search for scenes

1. Add a database to the **Searching** list on the left. Double-click it or drag it there.
2. Type what you're looking for in the search bar.
3. Press **Enter**.

To search specific episodes, expand a database in the **Searching** list and select them.

Preview and export results like any other clip.

## Adjust your results

Click the settings icon in the toolbar.

| Setting | What it does |
|---|---|
| **Results** | How many scenes a search returns |
| **Skip openings and endings** | Leaves out the first and last 2:30 of each episode |
| **Unload model** | Frees the memory the search model is using |

> **Tip:** Openings and endings repeat in every episode, so they can fill your results. If a show's opening runs later than 2:30, some of its scenes may still appear.

## Find clips that flow

**Flow** finds scenes that look like they could come right after a clip, based on the clip's last frame.

1. Select one clip in your Library or in Scene Scout.
2. Click **Find clips that flow**.

You can also open the **Flow** tab and input a video file.

## Use an existing database

To open a database from somewhere else, click **Import a database file** in the Scene Scout panel and choose a `.scoutdb`, `.db` or `.scdb` file. If a result's source episode isn't on your PC, AMVerge offers to remove that episode from the database.
