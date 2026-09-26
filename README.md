# Torrent Inspector 1.44.11

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
2. Use **Findings**, **MediaInfo**, **Find releases**, **Source check**, **Season check**, and **My notes**
   in the same panel. Notes save locally as you type.
3. Tick **Reviewed by me** and use **Next unchecked** to continue through the loaded
   queue. This records your progress; it does not approve the torrent or hide errors.

**Find other releases** opens an editable search with Title / Exact title modes,
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
torrent’s saved report evidence and labels it. **TorrentLeech** has no MediaInfo section,
so its comparison uses filenames and sizes — and the Unique ID when the uploader pasted
a report into the NFO. A name/size match does not confirm HDR
or an identical file. Evidence is remembered for two weeks, shared across trackers
by the same installed Tampermonkey script; the browser-storage fallback is per site.

## Supported trackers and limits

It runs on **46 UNIT3D trackers** and can search **65**, with additional lookup and
source-check support on TorrentLeech and FileList. CinemaZ, AvistaZ, PrivateHD and AnimeZ
also offer Review and MediaInfo checks on their torrent pages. Built-in naming rules cover
DarkPeers, Zenith, LUME, OnlyEncodes+, HomieHelpDesk, MidnightScene, and InfinityHD.
Use [tracker rules profiles](TRACKER-RULES.md) to add rules for another tracker.

Checks use the page and posted reports; they do not verify the media file itself.
A green badge means the supported checks passed. Missing evidence stays unknown,
and trackers without a naming rule set are not judged. Request searches, torrent
navigation, templates, and the advanced Inspector are covered in the [guide](GUIDE.md).

## Latest release

**1.44.11:** a film called *The Collection* is no longer a Zenith boxset. The rule 2.2 check
now steps aside when the page's own title carries the word, and on a listing, where there
is no page title, one year straight after "Collection" makes it a question rather than a
red cross.

**1.44.10:** a way to report a group for everyone. The group popup's last line opens the
project's report form on GitHub with the tag filled in (scene, or internal at which
tracker, and where it can be checked); accepted reports go into the next update's
directory as "reported to this project, date (#issue)". Nothing reaches anyone's script
without a release.

**1.44.9:** the group popup offers the srrDB search only for a group with no home tracker
— a group internal somewhere is not scene — and a group you add with **Scene** as its
tracker is shown as *Listed as scene*, linked to its srrDB search. The script still asks
srrDB nothing; the scene mark is yours.

**1.44.8:** the release-group popup (click a group tag) now also offers an srrDB search for
the group, beside its releases on this tracker and the searches on your chosen trackers.
A link, opened only when you click it. (1.44.7's link used a search keyword srrDB's
browse page refuses; this one searches the tag as a word, as the title link does.)

**1.44.6:** on FileList, the Source check tab now says under the current fingerprint that
the Unique ID is on the torrent's Media Info page, with the link, instead of leaving that
hint only on the page behind the panel. Nothing is opened for you.

**1.44.5:** the source check no longer passes over a TorrentLeech pack. A remembered
upload with no Unique ID, main file or folder — a TorrentLeech season pack is exactly that
— counts as being about the page when every one of its file names is on it, and a MediaInfo
report pasted into a TorrentLeech NFO is now read, Unique ID included.

**1.44.4:** Season check no longer gives up on a tracker that prints only rounded sizes.
Against an exact byte count from the other tracker, a row now says "consistent with
2.97 GB" or "not consistent with 1.96 GB" — never "same size", which still needs exact
bytes on both sides. GB is read as GiB, which is how TorrentLeech writes it.

**1.44.3:** when the source check finds the other tracker's top folder is not on this
page, the line now says what that folder is — "folder ✗ (yu-scene.net has Breaking Bad
(2008) S01 …)" — so a renamed folder can be read off rather than guessed at.

**1.44.2:** Season check now finds the same show whether or not its title carries a
year — "Breaking Bad (2008) S04" on one tracker and "Breaking.Bad.S04" on another are
the same season; two titles with different years still are not.

**1.44.1:** Season check kept the episode list of only the most recently visited
tracker when several tracker tabs were open: every redraw of every tab wrote its own
older copy of the shared memory over the others. A tab now writes only when its own
evidence changes, and a write merges with what is stored instead of replacing it.
The memory also lasts two weeks rather than three, and holds sixty uploads within a
fixed size, so a season visited early in the week is still there to compare against.
The Season check tab also lists its trackers in a fixed order instead of redrawing and
reshuffling whenever any tab refreshed a visit.
1.44.0 added the extra-file and subfolder findings and the automatic Season check.
