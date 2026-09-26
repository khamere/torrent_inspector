<!-- Source check workflow updated in 1.43.8. -->

**Retro Movies Club:** install this update and reload retro-movies.club to enable
the standard UNIT3D review tools. Add Retro Movies Club in Find releases → Choose
your trackers for cross-tracker searches. Its public login identifies UNIT3D 9.2.0;
the standard search URL and authenticated page layouts have not been verified
against a logged-in page. No Retro Movies naming rules are bundled.


**Extra files and subfolders (TV and movies only):** open **Inspect torrent →
Findings**. The section reads the loaded Files list and shows filenames that match
the selected tracker’s supplied extra-file rules, with the source of each rule.
Open Files normally if it has not loaded yet. Results update as the list changes.

Every tracker, including DarkPeers, gets a subfolder review: one shared outer
torrent folder is set aside, then folders beneath it are listed. Multiple top-level
folders are also shown. Disc structures and season folders can be legitimate;
nesting alone is not a rule violation. Flat file lists can hide directory paths.

The file rules currently cover HHD movie/TV extras, OnlyEncodes+ NFOs/images/stray
files, and Zenith archives. No new DarkPeers ban was added. An unavailable rule
means “not checked,” not approval. Possible samples and ambiguous files need human
judgement, as do disc structures and files inside containers. At most 2,000 loaded
entries are checked, with the first 100 flagged files and 100 folder paths shown.
Naming badges and Reviewed marks are separate. Books, audiobooks, music, games
and software do not get this new section; their existing checks are unchanged.

**Automatic season comparison:** open **Inspect torrent → Season check**. Visit
another torrent of the same show and season. File lists already present in the
page are read automatically, even inside closed dialogs. On the supplied DarkPeers
and upload.cx pages, all 12 episodes and exact byte counts were read without
opening Files. If
a tracker only loads its list after a click, open Files normally on that tracker.
Return to Season check: the loaded file lists are remembered and compared without
pressing Capture A or B. It refreshes when file lists load and when you return from
another tracker tab, like Source check. Visits made before 1.44.0 need to be revisited
to save episode rows. Use the same userscript edition on both trackers for shared memory.
Since 1.44.1 the memory lasts two weeks and holds sixty uploads, and keeping several
tracker tabs open no longer loses the lists the other tabs saved.

Candidates share a normalized show title and season number (S01, S01E01 or 1x01).
A year in the title separates two shows that both carry one, but a title without a year
("Breaking.Bad.S04") is the same show as one with it ("Breaking Bad (2008) S04");
aliases and multi-season ranges are not guessed.
Rows show episode filenames, exact sizes where supplied and entries only on one
side. Unloaded file lists and missing exact sizes stay unknown. Samples and subtitles
are excluded. Up to 200 video files per torrent and ten matching torrents are shown,
within Source check's 25-torrent, three-day memory. Limits are labelled. This does
not establish identical content or an official season episode count. Manual Compare
releases still compares two captured file/report summaries; its episode table has
moved to Season check.

**Source sizes:** Source check prints torrent and individual-file byte counts.
Only explicit byte values or complete sums of exact file sizes are shown. Rounded
GB/GiB values stay unavailable as byte counts. On the supplied CinemaZ page, the
File Size row and file tree show 25.60 GB and MediaInfo shows 25.6 GiB; none supplies
an exact count. Old stored sizes are discarded; revisit sources to refresh them.

**Screenshot dimensions:** in Review → MediaInfo, expand Screenshot dimensions.
Each result names the loaded image host and, separately, any linked-image host.
Only the hostname is shown; the linked original remains unchecked.
It compares up to four visible candidates from recognized description sections with
the posted video dimensions. Posters and known decorative images are filtered, but
description art may remain. Only already-loaded natural dimensions are read. Linked
full-size images are not opened or fetched, and unloaded images stay unknown. After
opening a collapsed or lazy-loaded screenshot section normally, refresh page evidence.
Dimension agreement alone does not establish image provenance or screenshot quality.
Description selectors come from supplied UNIT3D pages and the ZenGuard excerpt;
unrecognized layouts show no candidates instead of scanning unrelated page images.


**Move Review:** drag its title bar. Double-click the title bar to centre it.
Reopening or resizing also restores the centred position.

**Exact title searches:** games keep their release group once. Books use the
compact title/year/group query; automatic ISBN selection for tracker searches is
disabled. Goodreads and Google Books still use a valid ISBN from the title or
loaded description. Either tracker search query can be edited.

MidnightScene accepts AV1, confirmed 24 September 2026. Its shipped rules no longer
raise the unconfirmed-codec warning for AV1.

# Torrent Inspector — using it

**Current lookups:** srrDB sits beside Compare releases. Books expose Goodreads and
Google Books, using a valid ISBN from the title or loaded UNIT3D description when present.
Music exposes Discogs and games expose IGDB. Searches open only when clicked.
Choose your trackers includes CinemaZ, AvistaZ, PrivateHD and AnimeZ.
On TorrentLeech/FileList, Inspect torrent, Find other releases and Source check open
the same Review panel; the old inline source listing and automatic popup are removed.


For a quick start, see the [README](README.md). This guide holds the detailed
walkthrough; older version notes are in the [changelog](CHANGELOG.md).

The website’s install link downloads the script from that same site release. Check its
version against this release’s README, install it in your userscript manager and reload
the tracker. Updating the local preview does not publish changes to the public site.


Language checks accept the page’s **Primary Language** label and known ISO codes:
`es` and `spa` match Spanish audio. A missing-original warning should remain only
when the reported original language does not match the listed audio.


**Source check:** the tools-bar button opens the unified panel's Source check tab.
Current torrent details appear expanded at the top. Every related remembered upload
appears in a row that starts expanded, showing its filename, ID evidence and return link. The counts
distinguish ID matches from name/size-only matches; a missing ID is not a verified ID
match. Read each row's exact evidence and use its link to open the tracker yourself.
**Current torrent fingerprint** starts open above the comparisons. **Last saved check
on another page** stays in a separate disclosure. On individual torrent pages, the open panel updates when page evidence changes and
when you return from another tracker tab. You do not need to close and reopen it.
Refresh page evidence is also available to reread the loaded page manually.
The optional automatic notice uses the same compact rows; the existing quiet checkbox
keeps it hidden until requested. On pages without unified Review, the button opens a
matching source dialog. No lookup or tracker request runs in the background.


Everything here is reading. The script looks at the page in front of you and tells you what it
sees. It makes no request of any kind, uses no account, posts nothing and submits nothing.
Every link opens when you click it. Nothing it stores leaves your machine.

---

## Installing

Install `Torrent-inspector.user.js` as a Tampermonkey script. There is nothing to configure
and nothing to sign in to. Do not double-click the file as a Windows script.

Tampermonkey will offer updates on its own, because the script carries the address it is
published at.

**Coming from a version before 1.26.0?** It used to be called *DarkPeers - Torrent Inspector*.
The rename can appear as a second entry in your script list rather than as an update to the
first — if you see two, delete the old one, or you will get two of every badge. See
"If you had it installed before 1.26.0" in the README for what happens to your settings.

---

## On a listing page

Every release name gets a badge:

| Badge | Meaning |
| --- | --- |
| ✓ | the title checks that are supported passed |
| ✕ | a naming error — something the tracker's rules say plainly |
| ? | needs a person to look: something the title alone cannot settle |

Green is not approval. It means the checks this script can make on a **display title** passed
— not that the media is what it says, not that the source is what it claims, and not that any
tracker has accepted it.

Click a badge to open **Review**. **Findings** shows the naming errors and manual
checks; **MediaInfo**, **Find releases**, **Source check**, **Season check** and **My notes** keep the other work in this panel.
**Copy report text** stays in the footer. Open **More tools & naming template** for the
template, the separate conforming action and the full Inspector.

Above the results, **Rules**, **Review loaded titles** and counts stay visible.
**Settings & tools** contains the occasional controls, including **Audit loaded titles**.
**Choose trackers…** there opens your saved search-tracker choices.

### Working through a queue

1. Choose **Review loaded titles** on a listing with naming checks enabled. It saves up to
   200 linked titles from this loaded page, in their listed order, and starts with the first
   unchecked one. Unlinked pending rows still have their existing findings, but cannot be
   queue destinations. Loading another list does not silently replace your queue; choosing
   Review there does.
2. Read **Findings**. Tick the checks you have made. On a listing, **Open torrent and continue
   review** opens the real torrent link to read its MediaInfo and source evidence.
3. Use **My notes** as you work. Changes save locally as typed. Existing Inspector notes are
   read first unless a newer Review note exists; the full Inspector also reads and updates
   these notes. Clearing a note stays cleared.
4. Tick **Reviewed by me** when you have looked. This is a local progress marker, independent
   of the red/amber/green naming verdict. It approves nothing and never invokes **Mark as
   conforming**.
5. Choose **Next unchecked** or **Previous**. Only saved same-origin torrent links are used;
   no torrent IDs are guessed. The next page continues the panel once, if opened within two
   minutes. Next unchecked wraps through remaining queue items and is disabled when none
   remain except the current item. Refreshing normally keeps the panel closed until you
   open it again, with your saved tab and notes restored.

On a supported torrent page, **Inspect torrent** opens this same panel directly (also
Alt+Shift+I in the standalone edition). The extra Review torrent button is no longer
needed. No rule set is required to inspect MediaInfo, source evidence or notes. Without
rules, Findings and copied reports explicitly say naming checks were not run; no badge
is manufactured. Review progress made without rules is separate from progress made
under a selected rule set. Notes remain the same across those contexts.

The MediaInfo tab shows summary cards, video details and audio/subtitle track tables.
Missing fields say Not reported. The Technical report disclosure keeps the full parsed
summary available. Use
**Refresh page evidence** if the tracker loads or changes a report while the panel is open.
MediaInfo on a listing is never attributed to a selected torrent. Source checks remain
unavailable for release types the existing source reader does not support.

Progress and tabs belong to the tracker origin, torrent ID, rule set and release name. A
changed name needs a new review. Notes belong to the tracker origin and torrent ID.
Storage keeps eight queues, 500 progress records and up to 200 notes, with 20,000 characters
per note and 200,000 note characters total; the oldest records are removed at those limits.
Use **Backup…** before switching installations. **Leave my private notes out** also excludes
the new notes. Browser storage failures are shown in the panel; copy unsaved notes before
leaving if that happens.

The controls are:

- **Automatic naming checks** — the on/off switch for the badges. The group tag in each
  name is not a check and stays marked with the box cleared.
- **Rules** — whose rules the badges are applying. On a tracker whose rules are not in hand
  this says so, and nothing is judged until you choose.
- **Internal groups…** — the directory of which tracker a group is internal to. A group's tag
  in a release name is clickable; the popup says *listed as internal at* and, on the same
  line, **where that came from** — the community directories with their date, a report to
  this project with its date, or your own addition. A directory's word can be months stale
  and is nobody's staff list, so check before acting on it. Under that the popup offers the
  group's releases on this tracker and a search for it on each tracker you have chosen —
  each a link, opened only when you click it. A group with no home anywhere also gets an
  srrDB search; a group internal somewhere is not scene, so it does not. The script cannot
  ask srrDB whether a group is scene (it makes no requests), but you can record it: add the
  group with **Scene** as its tracker, in the popup or under Internal groups…, and the popup
  says *Listed as scene*, linked to its srrDB search, with your name and date beside it.
  The last line of the popup, *Report … to the project*, opens the project's report form on
  GitHub with the tag filled in: reports are read by a person, and the ones that check out
  reach everyone's directory in the next update as *reported to this project, date (#issue)*.
- **Tracker rules…** — add a tracker of your own.
- **Audit loaded titles** — everything on the page at once, as a table you can copy.
- **Copy moderation log** — the record of what you have looked at and decided, kept locally.

### An amber ? you have checked

Amber means the checks could not decide, not that anything is wrong. When you have gone
through the manual checks in its dialog and the name conforms, press **Mark as conforming**.
The badge turns green with a dotted ring — that ring means *your* verdict, not the check's —
and the dialog says when you marked it and offers **Undo**. The counts read *3 passed (1 marked
by you)*.

Red is never marked over: a definite rule error stays red whatever you mark, and if a rule
change later turns a marked name red, red wins. The mark is per rule set, so marking a name
under DarkPeers' rules says nothing about it under Zenith's. It verifies nothing and changes
nothing on the tracker; it records that you looked.

### Checking a release against its source tracker

Most of what a moderator wants to know about an upload comes down to one question: is this
the same file the source tracker has? The torrent page now remembers what makes the upload
what it is — the report's Unique ID, the file name, the folder, the file names and the
sizes — for two weeks. Open the same release on any other tracker the script runs on, by
Find releases or on your own, then open Source check for the item-by-item evidence
and a link back. On the first page the badge's dialog then
carries the answer under **Source check**, and a Unique ID that turned out different is a
red finding. Nothing is fetched or opened for you; the script reads the page you went to.

The section starts with **Current torrent fingerprint**, open with this torrent's
remembered evidence. The tracker rows below also start open, showing filenames and the
IDs compared. Collapse rows when finished. **Last saved check on another page** holds the older answer
from a tracker you visited. The Unique ID itself is on the page's
own MediaInfo, under General, and the hex in brackets is the form the script matches.
The other page is read whole, including a MediaInfo tab you have not opened; if it truly
has no Unique ID in it, Source check says *Unique ID – (none on this page)* and only the
file name and size are compared. Expand a tracker row to see its file name, as the
file is named, so spaces and dots show. The summary line prints the size it compared —
*size ✓ (20.40 GiB, 21,904,512,000 bytes)* — so a tick can be checked against the page,
to the byte where the page prints bytes, and a cross says which size it was looking for.

A **Source check** button sits in the tools bar beside *Nav* and *Inspect torrent*: it
opens the unified panel's Source check tab with every current comparison. On pages without
Review, it opens a matching source dialog. To hide automatic notices, tick **Only show this
when I press Source check** in the panel or notice; the page is still read and remembered.
Untick the box to have the notice appear by itself again on UNIT3D pages. TorrentLeech
and FileList always keep the evidence in Review, without an automatic popup. The setting holds across
every tracker and goes with **Backup…**. The Source check tab also reports how many uploads from
other trackers it looked for on this page and whether any was about it. A page that is a
different encode of the same title — H.264 where you remembered the H.265 — is not about
them, and stays quiet on purpose.

Two things it checks on the report itself while it is there: a Unique ID whose decimal and
hex halves are different numbers (someone typed it), and a file size that is not the size
of the file in the page's own list (the report is from another file).

### TorrentLeech and FileList

These two are not UNIT3D, so there are no badges and nothing is judged there. What you get
on their torrent pages is a compact set of actions under the name. Inspect torrent,
Find other releases and Source check open the same Review panel. The old inline source
listing and automatic popup are gone. TorrentLeech has no MediaInfo section, so the name, files and size are compared, plus
the Unique ID when the uploader pasted a report into the NFO (many do); it prints file names in lower case, and the check says so rather than failing
them. On FileList the MediaInfo is on its own page — the panel links to it — and opening it
fills in the Unique ID for that torrent. **Choose trackers…** in the panel opens the same
"Trackers you are on" dialog as the Details button does elsewhere.

### CinemaZ, AvistaZ, PrivateHD and AnimeZ

On a torrent detail page, **Inspect torrent** opens Review’s **MediaInfo** tab directly.
The report can stay collapsed on the tracker: its loaded text is enough. Video, audio
and subtitle details are shown, with warnings when the release name conflicts with
the report. **Source check** includes its Unique ID; **Find releases** uses the site’s
own search format. Private notes work in the same panel. No naming rules are applied.

CinemaZ’s saved detail/listing pages supplied the selectors. The other three network
sites use the same adapter, tested against that shared structure rather than live
signed-in pages. Missing or changed report markup shows **No readable MediaInfo**.
Reload the tracker after updating the userscript so its new site matches take effect.

### Ticking off the manual checks

Every check ends with a list of things only you can settle. Each one has a tick box when
the script knows which torrent you are looking at — on a torrent page, or from a listing
row's own link — and the heading keeps score: *Manual checks (9) · 6 done*. Ticks stay with
that torrent under the rules in force, so they are there when you come back and gone on any
other torrent, tracker or rule set.

A rule set's standing reminders are the same text on every torrent, so those get **Hide this
note** instead. They stay hidden for that rule set, the heading says *· 1 hidden*, and
**Restore** under *Hidden notes* brings one back.

A tick means you looked. It doesn't verify anything, it never turns the badge green, and it
never leaves your machine.

### Whose rules?

Seven rule sets ship: **DarkPeers**, **Zenith**, **LUME**, **OnlyEncodes+**, **HomieHelpDesk**,
**MidnightScene** and **InfinityHD**. Each is the default on its own tracker: the badges appear
there without any setup, and the *Rules* list carries all seven. HomieHelpDesk names books its own way
(`Author Name - Title.epub`), so on it the naming box checks a book against its rules and
says so, rather than against DarkPeers' book template; MidnightScene names music its own
way, and its music is checked the same way. All seven are listed under *Tracker rules… →
Added trackers → Built into the script*, each saying where it is in force. To change one,
press **Edit a copy**: the copy appears under *Your trackers*, applies instead of the
built-in until you remove it, and can be reset to the built-in from the same row.

Every other tracker is added by pasting its rules. A profile is **data**: nothing in one is
executed, patterns are compiled as regular expressions and matched against a title, and one
that will not compile is refused with the reason rather than swallowed. `TRACKER-RULES.md` has
the format.

You do not have to write the JSON by hand. <https://torrent.dkokto.dev/rules.html> builds one
in a browser, checks a profile you already have — telling you exactly why it was refused — and
runs a release name through it so you can see what a badge would say. It needs nothing
installed, which makes it the thing to send a tracker's staff.

---

## On a torrent page

Under the release name:

- **The badge**, as on the listing, with the same explanation behind it.
- **`[ MULTIPLE FILES ]`** on a pack, or **`[ SINGLE FILE · 2449415267 B ]`** on one file.
  Click it and the file list goes to the clipboard: the top folder as the page's file tree
  names it, with its total, then every file with the folders above it and the exact byte
  count the page carries. A torrent whose files sit in no folder gets no folder line — the
  display title is never written in place of one. Where the page only rounded, its own
  wording is copied rather than a number nobody printed. Read on the DarkPeers-shaped dialog, on
  upload.cx's and on OnlyEncodes+'s (each laid out differently); a tracker whose Files
  dialog is another shape again shows no marker, and its markup is what is needed to add it.
- **Find other releases** — opens **Find releases** in the unified panel. Start with the
  title, year or episode already filled in, or choose **Exact title** for title, season/episode or year, and group.
  Edit the search if needed. In Title mode, a quality button adds 2160p, 1080p, REMUX,
  BluRay or WEB-DL to the search. Each tracker runs its own text matching; these buttons
  do not guarantee results or apply a tracker-specific quality filter.
  The current tracker has its own search button; your other enabled trackers share one
  grid. **Search all** opens those displayed trackers only when clicked. If the browser
  blocks tabs, use the individual links. **Choose your trackers** reuses your saved choices.
  **More lookup sites** holds srrDB and other category-appropriate reference sites and
  **Copy title**. Metadata lookups refer to the original torrent, even if you edit the
  tracker-search query. TorrentLeech, FileList and the four AvistaZ-family sites use these
  same controls in Review, alongside MediaInfo, source evidence and notes.
- **Compare releases** — capture this release, capture another on a second page, and compare the two side by
  side: the names, the sizes to the byte, the file counts, the MediaInfo. If one page never
  rendered its file list, it says so rather than reporting nothing as zero.
- **From this page** — what the page itself says about the release, and where it disagrees
  with the name.

The badge on a torrent page reads more than the name: the page's own heading, its original
language, its MediaInfo — and, for a TV name, its **file list**. The `S##E##` numbers on the
file names say which episodes the torrent holds, so *verify episode mapping and pack
completeness* stops being a reminder and becomes a finding: a name that says **S02** over
files E01–E10 with E04 missing gets an amber ? naming the gap; a name that says **S02E03**
over files E03–E05 is a red ✕ (by the file list that is a season pack); a pack name over one
episode, a numbered episode no file carries, or a file from another season is a red ✕ too.
Specials (S00) and video files with no episode number are questions. Where the file names
carry no `S##E##` at all, the reminder stays and says so. The dialog lists *its file list*
among what it read only when it read one for this.

On HomieHelpDesk an audiobook's file list is read as well, against its Audiobook Naming and
Folder Standard (pasted in on 22 September 2026): the name has to read
`Author - Title (Read by Narrator)`, every file has to sit in one root folder named like the
release, the tracks have to be numbered with two digits (three once there are a hundred or
more), and an NFO, a text file or a URL file among them is flagged. A URL in the name is a
red ✕; a group tag is an amber ?. Tags, companion files and the like are yours to look at,
and a standing note in the dialog says so. Until now no book got a badge on a torrent page
at all: book names never look like releases to the script, so it had nothing to hang one
on. On a page filed under Audiobooks or E-Books it now takes the page's own name heading,
on every tracker, so Zenith's and DarkPeers' book rules reach the torrent page too.

### The comment templates

Beside the comment box, next to *Write · Preview*, is a **⤵** button and **Templates…**.

⤵ fills your comment template into the box. It does not post it, does not submit anything, and
does not throw away a draft — the template goes in at your cursor, or under what you have
already typed. You press post yourself.

**Templates…** opens the editor: a Description and a Comment template, each with a tick. Write
any of these in a template and the button fills it in from the page you are on:

| Token | Filled with |
| --- | --- |
| `{title}` | the release name as the page prints it |
| `{size}` | the size the page displays, its own wording |
| `{bytes}` | the exact byte count, where the page carries one |
| `{files}` | the file list: the folder and its total, then every file with its size |
| `{count}` | how many files the torrent holds |
| `{url}` | the address of this torrent page |
| `{id}` | the torrent number |
| `{date}` | today, as YYYY-MM-DD |

Anything else in braces is left exactly as typed, so BBCode like `[spoiler=Release Notes]` is
safe. A token the page cannot answer is left blank and named back to you when you insert —
never posted as the word `{bytes}`.

The **Description** template has no insert button, and the editor says so: descriptions are
written where you upload, and this script stays out of the upload form. Copy it from the
editor instead.

---

## The Inspector

On a supported torrent page, choose **Inspect torrent**, then open
**Findings → More tools & naming template → Open Inspector for advanced tools**.
On other pages the inspection button opens these advanced tools directly.
Paste a MediaInfo report — text or JSON — and it reads
it back to you in plain language, checks the release name against what the report actually
says, and names the streaming service it recognises.

It interprets what it is given. It does not download, transcode or verify media. A source or
REMUX claim cannot be proven from MediaInfo, and missing metadata stays unknown rather than
being guessed at. Text labels need to be English, or use the JSON.

Private notes are per torrent, kept in your browser only.

---

## Moving around: the nav panel

**Nav**, in the launcher bar, or `Alt+Shift+N`.

Two modes. **Page** steps through the torrent listing — set a step size and the arrows take
you that many pages forward or back, with your filters, sorting and search kept exactly as
they are. **ID** steps through torrent IDs on a torrent page. **Jump** goes straight to a page
number, or to a torrent ID, whichever mode you are in; in ID mode it also takes a pasted
address from the same site.

It works on every tracker this script runs on, because the addresses are UNIT3D's own:
`/torrents?page=` for the listing, `/torrents/{id}` for a release.

Two honest limits, both of which the panel tells you about rather than leaving you to work
out:

- **Torrent IDs are not consecutive.** Stepping by ID is arithmetic on the address, not a
  list of what exists, so a gap lands you on the tracker's own not-found page. Nothing is
  broken when that happens.
- **A step that cannot apply is disabled, and says why** — page stepping needs the listing,
  ID stepping needs a torrent page. Jump works in both.

An address you paste that points at another site is refused. The panel follows a link, the
same as typing the address yourself; it fetches nothing and reads no page you did not open.

Your mode, step size and whether the panel is open are remembered in your own browser.

---

## On the requests page

Each request gets the same treatment: the name reduced to a title, a year and a season, and a
search link for each tracker that can carry that kind of request. A tracker that cannot is
left out with the reason, rather than given a link that finds nothing.

---

## What it will never do

- Send a network request, of any kind, to anywhere.
- Read or use an account, a cookie or an API key.
- Post, reply, submit, upload or download.
- Open a link you did not click.
- Fill in an upload form.
- Claim a rule it was not given. Where a rule is quoted it is the tracker's own; where none is
  in hand, the finding says so and no badge is coloured by it.

## Taking it with you

**Backup…** under **Settings & tools** in the listing bar saves everything this script has kept — the trackers you are on,
the trackers you added and their rules, which rule set applies on which tracker, whether the
automatic checks are on, your internal-groups changes, your templates, your private notes, the
nav settings, and the records of what you have looked at — as one file, copied or saved by your
own browser. Tick *leave my private notes out* for a file you might hand to someone.

Restoring reads a file you give it. It says what the file holds and when it was taken **before**
writing anything, and it can fill only the gaps rather than replacing what you are already
using. Only the keys this script owns are ever written back; anything else in the file is
ignored and named.

If you have the fuller DKOKTO Scene Edition, its reading toolkit used to have an export of its
own. That is gone; a file it wrote still restores here, and the panel says so when it reads one.

Worth doing before you change script managers, move machines, or update across a rename.

## What it stores, and where

Added trackers, rule sets, the internal-groups list, your templates, your private notes,
the record of what you have looked at, the checks you have ticked, and the uploads
remembered for the source check with what the source said. All of it on your machine: Tampermonkey's own per-script
store where the manager has it, so the setup is the same on every tracker it runs on, and
ordinary browser storage otherwise. Nothing is sent anywhere, and every list can be exported as
JSON and taken with you.

On FileList, open the torrent’s **Media Info** page once to remember its ID and full
filename. Return to details: Source check compares that saved ID with other trackers
and labels it as remembered evidence. FileList and TorrentLeech panels also update
when you return from another tracker tab. Evidence is kept for two weeks in the same
userscript’s shared Tampermonkey storage. Each tracker retains its own filename, ID
and size; missing fields are not filled with another tracker’s values.
