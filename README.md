# Torrent Inspector 1.43.9

![Torrent Inspector](images/banner.png)

A Tampermonkey userscript for checking release names, reviewing posted MediaInfo,
comparing source evidence, and finding releases on your other trackers.
It reads the loaded page and stores your settings locally. It makes no background
network requests and does not post, submit, or act on your tracker account.

[Website & screenshots](https://torrent.dkokto.dev/) · [Try the demo](https://torrent.dkokto.dev/torrents/) · [Full guide](GUIDE.md) · [Release history](CHANGELOG.md)

## Install or update

1. Install Tampermonkey in your browser.
2. Open the [userscript installer](https://torrent.dkokto.dev/Torrent-inspector.user.js)
   and install or update your existing entry. The file is also included in this repository
   as [Torrent-inspector.user.js](Torrent-inspector.user.js).
3. Reload your tracker tabs. Keep only one edition active: standalone or Scene.

Do not run the JavaScript file as a Windows script. Tampermonkey checks for updates
on its own schedule. Use **Settings & tools → Backup** before moving your setup.
For older installations and upgrades across the script rename, see the [guide](GUIDE.md#installing).

## Your review workflow

1. On a listing, choose **Review loaded titles**. On an individual torrent, choose
   **Inspect torrent** or click its naming badge.
2. Use **Findings**, **MediaInfo**, **Find releases**, **Source check**, and **My notes**
   in the same panel. Notes save locally as you type.
3. Tick **Reviewed by me** and use **Next unchecked** to continue through the loaded
   queue. This records your progress; it does not approve the torrent or hide errors.

**Find other releases** opens an editable search with Title / Exact release modes,
quality choices, and your selected trackers. **Compare releases** compares two captures.
**Settings & tools** contains setup, rules, audits, and backups; advanced inspection
and naming templates remain under **Findings → More tools & naming template**.

![The unified Review panel with its queue, evidence tabs and review actions](screenshots/16-review-panel.png)

## Source comparisons

Open the release on another supported tracker, then use **Source check**. It shows
each upload’s filename, Unique ID, and size, with separate labels for ID matches,
name/size-only matches, and differences. The panel updates as page evidence changes
and when you return to the tab. The quiet checkbox hides automatic notices.

On **FileList**, open its **Media Info** page once; returning to details uses that
torrent’s saved report evidence and labels it. **TorrentLeech** provides no MediaInfo,
so its comparison uses filenames and sizes. A name/size match does not confirm HDR
or an identical file. Evidence is remembered for three days, shared across trackers
by the same installed Tampermonkey script; the browser-storage fallback is per site.

## Supported trackers and limits

It runs on **45 UNIT3D trackers** and can search **63**, with additional lookup and
source-check support on TorrentLeech and FileList. Built-in naming rules cover
DarkPeers, Zenith, LUME, OnlyEncodes+, HomieHelpDesk, MidnightScene, and InfinityHD.
Use [tracker rules profiles](TRACKER-RULES.md) to add rules for another tracker.

Checks use the page and posted reports; they do not verify the media file itself.
A green badge means the supported checks passed. Missing evidence stays unknown,
and trackers without a naming rule set are not judged. Request searches, torrent
navigation, templates, and the advanced Inspector are covered in the [guide](GUIDE.md).

## Latest release

**1.43.9:** documentation cleanup. The README now focuses on getting started;
older release notes live in the [changelog](CHANGELOG.md). Script behavior is
unchanged from 1.43.8, including shared FileList evidence and automatic source refresh.

For walkthroughs use [GUIDE.md](GUIDE.md); for older fixes and features use
[CHANGELOG.md](CHANGELOG.md). The [website](https://torrent.dkokto.dev/) has the full
screenshot gallery and interactive demos.

With thanks to T.R.A.V.I.S and Chungus Edition, where this work began. The standalone
uses this project’s own modules; the separate Scene Edition retains its upstream credits.
