# Torrent Inspector 1.26.4

A Tampermonkey userscript for release naming. It reads the page you are on and tells you
whether a release name is written the way the tracker you are on says it should be — on the
listing, on the torrent page, and in a MediaInfo panel you can paste a report into. It also
looks a release up on the other trackers you are a member of, compares two releases side by
side, and keeps the templates you paste over and over.

**It reads. It does not act.** No network request of any kind, no account, no cookie, no API
key, nothing posted, submitted, uploaded or downloaded. Every link opens when you click it and
not before. What it stores, it stores on your own machine.

It runs on **44 UNIT3D trackers** and can search **60**. Naming rules for DarkPeers, Zenith,
LUME and OnlyEncodes+ ship with it; any other tracker is added by pasting its rules, as data,
never as code.

## Install

1. Install Tampermonkey, if you have not.
2. Open **`Torrent-inspector.user.js`** and let Tampermonkey install it. Do not double-click
   the file as a Windows script.
3. That is all. Nothing to sign in to, nothing to configure before it works.

Updates come to you: the script carries `@updateURL` and `@downloadURL`, so Tampermonkey
checks for a new version on its own schedule and offers it.

### If you had it installed before 1.26.0

It was called *DarkPeers - Torrent Inspector* and its file was
`DarkPeers-Torrent-Inspector.user.js`. From 1.26.0 it is just **Torrent Inspector**, because it
is not DarkPeers' script and never was — it runs on 44 trackers.

Tampermonkey identifies an installed script by what is in its header, so the rename can land
as a **second entry in your script list** rather than as an update to the first. If you see
two, keep the new one and delete the old — running both at once means two copies of every
badge.

Your settings should survive that. Everything this script saves — added trackers, rule sets,
the internal-groups list, your templates — is written to two places at once: Tampermonkey's
own per-script store, and ordinary browser storage on the tracker you were using at the time.
A fresh install reads the second one and adopts it, per site. If you have set up a lot and
want to be certain, open **Tracker rules… → Added trackers**, press **Export**, and keep the
JSON somewhere before you update.

## What you need to read

- **This file** — what it does, and what changed in each version.
- **GUIDE.md** — the walkthrough, written for this script: the badges, the rules, the torrent
  page, the templates, the Inspector, and what it will never do. Start people here.
- **GUIDE-1.22.md** — the older walkthrough, written for the fuller DKOKTO Scene Edition. Kept
  for reference; its theme, artwork and chat-game sections do not apply to this script.
- **TRACKER-RULES.md** — how to add a tracker of your own, as a rules profile.
- **CHANGES-1.12.4-to-1.22.3.md** — what changed across the older versions, grouped by what
  it does.
- **CHANGELOG.md** — every version, newest first.

## Changed in 1.26.4

**This edition tests its own torrent page now.** It shipped the fixture but no page to run it
in, so the evidence came from the Scene Edition's run. The two editions do not share a
stylesheet, and much of what those 144 checks measure is geometry — so a regression in
`inspector.css` alone could have gone unnoticed. `detail-preview.html` now runs them against
this build and this CSS, with the other three fixtures, and its report ships as
`DETAIL-BROWSER-CHECKS.txt`.

`GUIDE.md` now links the rules builder, and a version number in it was wrong: the rename landed
in 1.26.0, not 1.25.0.

---

## Fixed in 1.26.3

**The button sat behind the comment box instead of up by the tabs**, and vanished when you
switched to Preview. It looked for a row element holding Write · Preview that did not also
contain the box; where a theme gives the tabs no wrapper of their own, nothing matched and it
fell back to sitting in front of the box, under the floating label. It now anchors on the
Preview control itself and goes straight after it — as a list item where the tabs are a list,
inline where they are not.

Switching to Preview hides the box, and a hidden textarea was being read as no box at all. The
button belongs to the tab row rather than to the box, so it stays put across the switch, what
it writes is there when you go back to Write, and a redraw that strips it out gets it back on
the next pass.

Placement is measured in the suite now rather than eyeballed: immediately after Preview, on the
same line as the tabs, and clear of the box.

---

## Changed in 1.26.2

**Attribution taken out of the documents.** Lines recording who supplied a list or confirmed an
address — and in what capacity — are gone from this file, the changelog, the guide and
`TRACKER-RULES.md`. What is cited is unchanged; who supplied it is no longer part of the
record. Passages written as replies read as documentation now.

Nothing in the script changed: same name, same namespace, same profile format, same install and
update addresses, so this is an ordinary update.

---

## Fixed in 1.26.1

**The template button never appeared on a real page.** UNIT3D posts a comment through Livewire
— `<form wire:submit="postComment">`, with no `method` and no `action` — so the form's method
reads back as `"get"`. The detector required `"post"` and refused the comment box outright, on
every tracker. The fixture had written `method="post"` on its own form, so it agreed with the
assumption rather than testing it; it now uses the markup UNIT3D actually ships, and the old
code fails against it.

What identifies the box now is what the page says it is — an editable, on-screen textarea the
page calls a comment, in its name, id, placeholder, label, class or its form's. A form aimed at
another site is still refused; having no action is not a reason to refuse anything. And where a
page holds an edit box on an existing comment as well, the new-comment box is the one that gets
the button.

---

## New in 1.26.0

**Renamed to just Torrent Inspector.** `@name` is **Torrent Inspector**, `@namespace` is
`dkokto.torrent.inspector`, and the file is `Torrent-inspector.user.js` — the same name it is
published under. It was never DarkPeers' script: it runs on 44 trackers and ships rule sets for
four. A check now fails if either the name or the namespace picks up a tracker's name again.

**A guide of its own.** `GUIDE.md` is written for this script — the badges, the rules, the
torrent page, the templates, the Inspector, what it stores and what it will never do.
`GUIDE-1.22.md` stays for reference and says at the top that it was written for the fuller
Scene Edition.

**A missing entry restored.** The 1.25.0 notes never mentioned that MoreThanTV and FearNoPeer
had been removed — the change shipped, the note did not. It is written up under 1.25.0 now.

**Two corrections in this file.** It claimed the script "matches only HTTPS darkpeers.org and
www.darkpeers.org" — untrue since it started running on the UNIT3D catalogue, which is 44 hosts
written into the header from the catalogue itself at build time. And it claimed no `@grant`
permissions, while it asks for three storage ones. The module list, the suite list and the
check reports were also years out of date and are now generated from what is actually there.

---

## New in 1.25.0

**MoreThanTV and FearNoPeer are gone from both lists.** Both closed. They are out of the
cross-check catalogue (62 searchable trackers to 60) so no click opens a site that is not there,
`fearnopeer.com` is off the `@match` list, and both are out of the internal-groups directory
rather than marked closed. What that costs, said rather than hidden: SMURF, WDYM, TEPES,
Dracula, GBL, MOLY, SOIL, VLAD, EiNSTEIN_SiR23, onlyfaffs and HiFiWiFi are now listed nowhere.
E.N.D keeps HD-Torrents; SM737 keeps AlphaRatio and ReelFliX. (Supersedes what the 1.24.3 note
below says about SMURF at MoreThanTV.)

- **Release notes templates.** A button beside the comment box on a torrent page — the ⤵ next
  to *Write · Preview* — fills your comment template into the box, and *Templates…* opens the
  editor: a Description and a Comment template, each with a tick to turn it on.
- **Tokens filled from the page you are on**: `{title}`, `{size}`, `{bytes}`, `{files}`,
  `{count}`, `{url}`, `{id}`, `{date}`. `{files}` writes the listing the `[ MULTIPLE FILES ]`
  copy already builds — the folder and the torrent's own total, then every file with its exact
  byte count. Anything else in braces is left exactly as typed, and a token the page cannot
  answer is left blank and named when you insert rather than posted as `{bytes}`.
- **It never posts.** The button writes into the box and stops: no submit, no touching the
  form's own buttons, and an existing draft is added to rather than written over. Kept in this
  script's own storage, so it is the same template on every tracker it runs on.
- **The description template has no insert point** — the description is written where you
  upload, and this script stays out of the upload form. The editor says so, and offers a copy
  button instead of pretending otherwise.
- **`@updateURL` and `@downloadURL`** now carry
  `https://raw.githubusercontent.com/khamere/torrent_inspector/main/Torrent-inspector.user.js`,
  so Tampermonkey can check for updates and offer the new version. There is a check that it is
  the raw file rather than the GitHub page, and that the header version matches the build's.
- Checks: 12 release-notes template checks (new suite), 26 inspector, 128 torrent-page browser
  checks. Everything else unchanged and green.

---

## New in 1.24.3

**Internal groups.** SiGLA and SMURF are off HUNO — the community directories this ships
carried them there; they were reported as not HUNO's, so they are gone from that line.
SMURF is still listed at MoreThanTV, which is where those directories also put it: taking a
group off one tracker is not deleting it, and there is a check for exactly that. SiGLA was
listed nowhere else, so nothing claims it now. **ZoroSenpai** is added at HDBits, TorrentBD
and Blutopia — the abbreviations "HDB, TBD, BLU" read as those three, TorrentBD being the
only tracker on the list whose abbreviation is TBD.

**The single-file marker shows the count.** It reads `[ SINGLE FILE · 2449415267 B ]` rather
than the rounded figure. Where the page carries no exact count — no `title` on the size and
no plain number that converts back to what is displayed — the marker falls back to the
page's own rounded wording rather than showing a number that was never there. Both are
checks in the suite.

---

## New in 1.24.2

**1.24.2 — the size of a single file, and two things that read the page wrongly.**

**A one-file torrent now says so, with its size.** Where a pack is marked
`[ MULTIPLE FILES ]` under its release name, a single file is marked
`[ SINGLE FILE · 2.28 GiB ]`, and clicking it copies one line — the file name and the exact
byte count. The count is only ever the one the page itself carries: the `title` on the size
it rounded for display, or, as DarkPeers prints it, the plain number under the rounded
figure. A bare number proves nothing by itself, so one is believed only when converting it
back gives the very figure shown, to the same number of decimals — a seeder count, a torrent
id or a year is never mistaken for a size. Where the page carries no exact count, the rounded
size is what you get, and nothing is made up.

**The marker's wording now follows the page.** It was written once, when the marker was first
put there, so a page that redrew a pack into one file went on saying `[ MULTIPLE FILES ]`.
It is re-read on every redraw now, and what was read for the page's old shape is dropped
rather than carried across.

**"Files in the torrent: 1 / 0" on the comparison panel.** A page whose file list had never
been rendered was read as a torrent with no files — which then counted as a difference and
fed the same-name verdict. A list that was not read says so now (*no file list on that page
— open "Show files" there, then capture again*), is not flagged as a difference, and the
verdict no longer claims everything matches when the files were never compared at all.

**A dialog the site took away with it.** Where a tracker redraws its own page it can carry
this script's dialog out of the document with it; reusing that detached one opens the
explanation onto nothing. A dialog is reused only while it is still in the page.

Every new check was confirmed to fail with its fix taken back out. Everything else is
unchanged and green.

---

## New in 1.24.0

**Two tracker rule sets ship with the script.** Open *Tracker rules…* → **Added trackers**
and they sit under *Rule sets that ship with this script*:

| Rule set | Built from | What it does not have |
| --- | --- | --- |
| **LUME** (luminarr.me) | its Naming Guide — both title templates and the vocabulary for every element | no banned-group list: none was supplied |
| **OnlyEncodes+** (onlyencodes.cc) | its Upload Guide + Rules (wikis/2), its naming standard (wikis/18) and its banned list (wikis/1) — 16 rules, 136 groups | — |

Press **Add** and the profile becomes an ordinary added tracker — editable, exportable,
removable, and pickable in the Rules list. Nothing is added until you press it: adding one
changes which rules a badge cites.

LUME's rules are its vocabulary, element by element: DD+ rather than DDP or E-AC-3, DD
rather than AC3, H.264 and H.265 with the dot, WEB-DL with its dash and WEBRip as one word,
Atmos on its own, Dual-Audio hyphenated, Director's Cut with its apostrophe, the resolution
omitted for DVDs, Edition as a Full Disc element, and the Full Disc spelling Blu-ray told
apart from the remux spelling BluRay. All seven of the guide's own examples pass its rules
unchanged, and that is a check in the suite rather than a claim.

OnlyEncodes' rules are where its standard is specific about which spelling belongs to which
kind of release: a WEB-DL names the format (H.264, H.265, VP9, MPEG-2), a WEBRip names the
encoder (x264, x265), and a remux names the format again (AVC, HEVC, MPEG-2, VC-1). Also
DD+ not DDP, Resolution and VCodec both omitted for DVD sources, the Edition kept out of the
name, `S01-S03 COMPLETE` for a multi-season pack, and a missing service between the
resolution and WEB-DL. Screenshots, MediaInfo, piece sizes, seeding and the moderation flow
stay standing notes.

Its banned list keeps the reasons and dates the page gives. BHDStudio and Trix are marked
removed there and are not on it; EVO is a conditional group — its WEB-DLs are allowed and
nothing else is; BRrip is matched anywhere in a title rather than as a tag.

**Also in this version:** LUME, AvistaZ, CinemaZ and PrivateHD in the tracker catalogue (58
entries to 62), Luminarr's Japanese and anime broadcasters added to the streaming-service
list (288 services), and a fix for the service token before WEB-DL, which was matched as
letters and digits only — so `AT-X`, `B-Global` and `NHK-BSP` read as no service at all.

## New in 1.23.0

**[ MULTIPLE FILES ], under the release name.** Any torrent holding more than one file says
so, and one click copies the whole list to the clipboard: the folder and its total, then
every file with its exact byte count —

```
Bureau.Burgwallen.S01.720p.WEB-DL.AAC.2.0.x264-DDF 9974836899 B
Bureau.Burgwallen.S01E01.720p.WEB-DL.AAC.2.0.x264-DDF.mkv 1221811248 B
Bureau.Burgwallen.S01E02.720p.WEB-DL.AAC.2.0.x264-DDF.mkv 1278590592 B
```

**The exact byte size on the vs panel.** UNIT3D writes the byte count into the title of every
size it rounds for display, so the comparison now reads `17.56 GiB · 18855538688 B` and gives
the gap between two totals in bytes as well as a percentage. Two torrents that both show
`5.70 GiB` and differ by a megabyte are now reported as differing — before, the rounded
figures matched and nothing was said. Where the page carried no byte count, none is made up
from the rounded figure.

## Fixed in 1.23.0

**"No home tracker recorded" for a group that ships on the list.** Adding a single group used
to save a copy of the whole directory beside it, which pinned you to that day's list: every
group added to the shipped directory afterwards was invisible to you. What is kept now is what
you *changed* — your additions, and the rows you took out — layered over the shipped list, so
new versions bring their groups with them and your own work stays on top. A list saved by an
older version is read as additions only; nothing is deleted on a guess. Clear list still
brings the shipped directory back whole.

**New on the shipped list**, reported to the project and cited in the data
file: JBENT, "JBENT TAoE", OnlyMux and WhiskeyJack at OnlyEncodes+, and DOOBS at DarkPeers.
Kitsune at Aither, and twelve other names reported at the same time, were already there.

**The empty first bullet in the group menu.** A row that is only a note ("No home tracker
recorded for …") was drawn as an empty span with the note on the line beneath, so the bullet
pointed at nothing. It is one line now.

**A name written back over the group tag.** A page that re-renders its release name in place
could leave it reading `…H.264-DKOKTODKOKTO`, and every lookup built from the name carried
that. It is put right on the next pass.

## New in 1.22.0

**Your settings are the same settings on every tracker.** The trackers you are on, the
trackers you have added and their rules, the internal-groups list, and which rules apply on
which tracker now live in Tampermonkey's own per-script store — shared by every site the
script runs on — instead of browser storage, which is kept per domain. No new permission; the
three storage grants have been in the header since 1.20.0.

What each site keeps to itself, on purpose: the collected audit, the decision log, private
torrent notes, and the requests you have already seen. Those are a record of work on that
tracker rather than a setting.

Nothing is lost in the move: a setup made before this version is carried up the first time it
is read, and writes reach both stores.

## Fixed in 1.21.2

**Show the JSON answered a look with a refusal.** On an empty form it replied with the
save-time error about the key. It now shows the draft and says what is still needed. Save as
file stays strict, and says that is what it is refusing.

**“Search DarkPeers” on every tracker.** The first lookup link is this tracker's own search —
a relative address, so right everywhere, with a hardcoded label. It is now named after the site
you are on, or the hostname, or “Search this tracker” when it cannot be named.

**DarkPeers and Zenith are in the cross-check list.** They were left out when the script ran
only on them. The cross-check now leaves out whichever tracker you are standing on instead,
with “is the tracker you are on” as the reason.

## Fixed in 1.21.1

Five bugs found in a code review of 1.21.0. Each was reproduced against the module before it
was changed, and each fix carries a check confirmed to fail with the bug put back.

**A bitrate or size with its thousands separated was read as its first group.** MediaInfo
writes `8 000 kb/s`; the comparison read that as `8`, so a 12.5 Mb/s release was reported as
**100% higher** than an 8 Mb/s one instead of 36%. The separators — space, no-break space,
thin space, comma — now come out before the number is read.

**The AKA position check could never fire on a resolution.** `\d{3,4}[pi]` was written inside
a regex *literal*, where it matches a backslash rather than digits, so a title whose only
technical word before the AKA was `1080p` passed silently while the same title with a year was
caught.

**A profile copied from a built-in carried a rule it did not describe.** Every conditional
group was exported with a WEB-DL pattern, so a copy of DarkPeers said HDT was allowed for
Remuxes and then allowed it only on WEB-DLs.

**Editing a banned list did nothing until a reload** if the length did not change. The built
list was cached on the *lengths* of a profile's lists plus its label, so renaming a group left
the old list in force: the group just removed was still refused, and its replacement was not.

**Three lines that did nothing** are gone.

Three efficiency findings from the same review are done: the torrent page stamps its inputs
cheaply instead of re-parsing the MediaInfo and re-reading the file table on every redraw;
`listingPage()` is answered once per pass rather than two or three times (on a queue each
answer walks every loose torrent link); and the audit store no longer rewrites itself when
nothing has changed.

Three were measured and left alone, on purpose: precompiling the naming regexes (200 titles
check in 19.5 ms, so there is nothing there worth the risk in the module with 61 checks on
it), memoising the release-name search across modules (saves about 8 ms a burst, at the cost
of a cached answer about a page that may have changed — which is the fault behind the last
three visible bugs), and folding the duplicated `el()`, clipboard and dialog helpers, which is
worth doing as its own job rather than beside five behaviour fixes.

## New in 1.21.0

**41 UNIT3D trackers in the catalogue**, up from 11. Which sites run UNIT3D comes from
HDVinnie's Private Trackers Spreadsheet; the addresses come from each tracker's own Jackett or
Prowlarr indexer definition, since that list carries none. Nine of the 51 have no definition to
read and are left out rather than guessed at: BrSociety, DanishBytes, eShareNet, Gemini Tracker,
LegacyHD, PuroVicio, The Shinning, TorrentLand, Unwalled.

**ReelFliX has moved** from reelflix.xyz to reelflix.cc — corrected, with the old address marked
outdated so a saved override pointing at it is dropped.

**The @match list is derived from the catalogue at build time**, so the two can no longer drift.

**The chooser is navigable**: the trackers you are on come first and open, everything else is
folded into counted groups, a search box filters by name, language or software, and each
tracker's address is behind its own button instead of a box on every row.

## Fixed in 1.20.2

**Nothing appeared on a torrent page with a long cast list** — no badge, no lookup row, no vs
button, no cross-check. The release name is found by scoring the page's candidate elements,
and only the first 400 were read; a page with cast, crew, companies and keywords above the
release name pushed it past the cut. The work is now bounded by how much is read and scored,
not by where it sits. Measured at 8 ms a pass on a page with 3045 candidates.

## New in 1.20.1

**Two torrents named the same release are judged as one release, not compared as two.** A
release is one file, so if the names match and the files do not, one of them is not that
release — the panel says so at the top, and names what they differ in. Where nothing
disagrees it says that too, without calling it proof. It still will not say which of the two
is the original, and it says why.

## New in 1.20.0

**It runs on thirteen trackers now** — DarkPeers, Zenith and the eleven UNIT3D trackers whose
addresses it already holds (Aither, Blutopia, FearNoPeer, LST, Upload.cx, OnlyEncodes+,
OldToonsWorld, ReelFliX, HUNO, Cinematik, Shareisland). Each is a `// @match` line at the top of
the file; delete one to stop running there, copy one to add your own.

**On a tracker whose rules are not in hand, nothing is judged.** No badges, and the bar says which
tracker it has no rules for. Choose DarkPeers or Zenith from the Rules picker, or add the tracker
under Tracker rules…, and badges start there. The choice is now kept per tracker.

**The vs slots are shared between trackers.** They live in Tampermonkey's own per-script store,
which every tracker the script runs on can see — ordinary browser storage is kept per domain and
cannot. That costs three permissions, `GM_setValue`, `GM_getValue` and `GM_deleteValue`, all of
them storage. The header no longer reads `@grant none`; there is still no `GM_xmlhttpRequest`
anywhere in the build and no `@connect` line, and a check asserts both.

**The vs comparison reads the tags and encode settings** — the muxer, the encoder, the settings it
ran with option by option, the dates, the title tags. None of it proves a file was altered:
remuxing is normal, tags can be stripped, and plenty of tools write nothing at all.

## Fixed in 1.19.1

**The comparison panel was being read as the page.** It shows both captured release names in
its headings, and the release-name search did not know those headings were its own — so one
could win, and the badge and lookup row were then built inside the panel, wiped by its next
redraw. That was the flashing. The exclusion list now names every panel this script draws.

## New in 1.19.0

**A “vs” button on a torrent page**, for comparing two releases. Capture this one, open the
other and capture that; the panel then shows what they differ on and offers the text on the
clipboard.

It follows the block layout of **HelperZ** (Torrent Moderation Helper, by MagnetZ) — host
bar, *Title*, *Filename(s)* with sizes, *Filesize*, *MediaInfo* or *BDInfo* — so **Copy both
blocks** pastes straight into WinMerge, meld or any two-pane diff tool, with its two flags
(**⛔ [ HAS EXTRANEOUS FILES ]**, **⛔ [ HAS TOP FOLDER ]**) carried over.

**What is not carried over: the companion server.** HelperZ posts its payload to
`127.0.0.1:5123`, which needs `GM_xmlhttpRequest` and a `@connect` line. Both slots stay in
your browser here, so this script still declares `@grant none` and connects nowhere — a
check asserts it.

On top of the raw blocks, two tables: **the files and the sizes** (file count, total size
with the gap named, extraneous files, top folder) and **the reports** (the MediaInfo
comparison you already had). Neither release is called the better one — source, encode
quality and provenance are not in a file list or a MediaInfo report.

The Inspector's Compare panel gained **Load the captured A and B** to work on the pair there.

## New in 1.17.0

**The release group tag is marked in the name** and opens where the group is listed as
internal — from the directory this ships with, or your own list in **Internal groups…**.
Another script's link on that tag is never taken over.

## Changed in 1.16.2

Dead modules removed (`files-core.js`, `srrdb.js` — neither shipped here), and the per-pass
DOM cost of reading release names cut from 413 lookups to 5 on a 200-row listing.

## Fixed in 1.16.1

**The site's NEW label was being read as part of the release name**, so every fresh upload
was asked why no group tag closed its title. Row labels at the end of a name are dropped
before the name is read — upper case, at the end, space-separated, so a group tag is never
lost.

## Fixed in 1.16.0

**The blinking badge on `/torrents/similar`.** The badge rides inside the release name there
(the name is a flex box, so a badge after it would wrap onto the row below) — and the tick
was then being read back as part of the name, which stopped the link scoring as a release,
which took the badge off, which made it a release again. About five times a second. Anything
this script puts inside a name is now taken out again before the name is read.

**A page that refreshes itself** — a comment panel, a grouped listing — gets its badges back
on the next frame rather than a fifth of a second later, so a re-render is not seen as a
flicker.

## Fixed in 1.15.3

**The lookup row repeated down the page** (a class collision), and **a dotted scene name** is
now reported as a spacing fault with the title written out, rather than as a different film.

## Fixed in 1.15.2

**The badge in the row icons.** A row's comments and reseed icons link to the same torrent,
and each was being badged with nothing to judge. A release name now has to look like one
wherever it is found.

## Fixed in 1.15.1

**Two badges on one row.** A `rowspan` on a Type column shifted the column indexes on the
rows below it, so the name cell was read wrongly and each row got a second badge among its
own icons. One release, one badge.

## New in 1.15.0

**What the torrent page itself says** — the TMDB title and year against the release name,
the Type and Resolution the uploader filed against what the name claims, the file list
(container, folder wrapper, samples, pack uniformity), MediaInfo and BDInfo presence, and
`Dual-Audio` / `MULTi` against the page's original language. Rules are cited where they are
in hand; where none is, the finding says so.

## New in 1.14.0

**Reply to the uploader** — a draft message built from the findings, with four outcomes and
one suggested. **A shortened title is not judged** as if it were whole, and its badge is no
longer clipped off the end of the row. **A release listed without its media title** is
checked with the title from the page heading.

## New in 1.13.0

**A decision log on the moderation queue** — approved / rejected / asked, with the date and
your note, ticked on the row and copyable as text. **Compare two releases** in the Inspector
for a trump decision, naming what the reports differ on without picking a winner. **More
title claims checked against the report** — audio codec, channel layout, HDR10+, Dual-Audio,
subtitles, chapters. **Already uploaded?** — the exact release name searched on the trackers
you are on, from the naming box.

## Fixed in 1.12.1

**Badges that wrapped onto the row below.** Where a page renders the release name as a
block, a badge placed after it had nowhere to go but the next line. It now measures where
it landed and moves inside the name when it would otherwise wrap away from it.

## New in 1.12.0

**Add a tracker yourself.** *Tracker rules…* beside the *Rules* dropdown opens a panel where
you name a tracker, **paste its banned group list straight off its page**, tick the rules
that apply, and add it. It joins the dropdown and is chosen for you on its own site. Profiles
can be shown as JSON, saved to a file, loaded back, or started from a copy of DarkPeers' or
Zenith's own. Everything is data — nothing is executed and nothing is fetched. The format is
in **TRACKER-RULES.md**.

## Fixed in 1.11.1

**A site icon inside the title is not part of the name.** A personal-release icon rendered
inside the title element made the release name read as `…-AnoZu🔥`, breaking the group tag
and every check anchored to the end of the title — including the banned-group list.
Decoration is stripped wherever a release name is read now.

## New in 1.11.0

**A missing release group tag is a question.** A title ending at the video codec was passing
green; the guide allows an omitted tag only where the release has none, so it is an amber
**?** now rather than silence — and never an error.

## Fixed in 1.10.2

**The badge was reading itself.** A queue badge sits inside the name cell, so the next pass
read the cell's text with the badge's own glyph on the end — `128kbps✕` is not a bitrate,
so conforming audiobooks flipped to an error. The title now excludes the badge.

## Fixed in 1.10.1

**A pending name is not a link.** That is why the queues came up bare: a pending torrent is
not published, so its name is plain text. On a queue the row is the unit now — the cell
under the **Name** header is read with or without a link, and the badge sits inside that
cell.

## New in 1.10.0

**Zenith's books and music follow Zenith's templates.** An audiobook there is
`Author - Title (Year) Language Edition {Narrator} [Source] Container Codec Bitrate`, and
all of it is read from the title; ebooks carry no brackets and a three-letter language
code; music is a suggested shape, so not following it is a note rather than an error.
DarkPeers' own templates are untouched.

## Fixed in 1.9.1

**The queue, actually.** 1.9.0 still looked for rows by release name, and a queue of
audiobooks scores nothing on that test, so those pages came up bare. Every torrent link in
a queue row is checked now, the category is read from the column under the **Category**
header, and a bracketed year such as `(2024)` is no longer called a missing release year.

## New in 1.9.0

**Badges on the moderation queue.** `/torrents/pending` and its siblings are listings too,
but their table is not the search table, so nothing was checked there. Rows are now found
by the release names themselves, with the legend bar and *Rules* picker above them. A link
that does not read as a release name is left alone.

## New in 1.8.2

**Zenith's own reason for each banned group** is carried into the badge and the copied
report — *Re-encoding*, *Modified full-discs*, *Quality, nikt0 alt*, and BiTOR's *Faking
DV/Atmos, Falsifying Mediainfo, added 03-06-2026*. DarkPeers' list came without reasons,
so none are invented for it.

## Fixed in 1.8.1

**A resolution that was present was reported as missing.** `540p` in a title produced
*Include the video resolution*, because only the nine labels DarkPeers lists counted as
resolutions at all. Any well-formed label is recognised now; one the guide does not list
is named as the wrong value instead. Zenith accepts progressive labels DarkPeers does
not list, so `540p` and `1440p` pass there, while `720i` is still wrong on both.

## New in 1.8.0

**Choose whose rules apply.** A *Rules* dropdown sits in the listing legend bar and at the
top of the naming box: **DarkPeers** or **Zenith**. Your choice is remembered, and on a
site the script recognises it starts on that site's rules. The naming guide is shared —
switching does not change how a title is spelled; it changes which upload rules and which
banned release group list are applied to it. The script now matches `znth.cx` as well as
`darkpeers.org`.

**Two banned lists, kept apart.** DarkPeers' 65 groups with its two exceptions, and
Zenith's own 42 plus `BRrip` with none. They overlap but are not the same: `Goki`,
`ARCADE`, `PSA`, `HorribleSubs` and `SubsPlease` are banned on DarkPeers and absent from
Zenith's list; `4K4U`, `BiTOR`, `SPDVD`, `Telly`, `FRDS` and `AROMA` are banned on Zenith
and absent from DarkPeers'. `EVO` is allowed for WEB-DLs on DarkPeers and banned outright
on Zenith.

**Zenith's checkable upload rules**: no movie boxsets (2.2), no season collections with
the full-disc exception the rule itself names (2.3, 2.3.1), a single episode raised as a
question rather than an error (2.4), the banned authors and works lists matched however
the name is punctuated (5.6, 5.7), a TrueHD REMUX missing an AC-3 or E-AC-3 compatibility
track in the MediaInfo already on the page (3.8), and a container the report says is not
MKV, MP4 or AVI (3.5). The rules that cannot be checked from a page — whether it already
exists there, exclusivity, keeping the original group tag, no archives, the screenshot and
MediaInfo requirements — are said once as a standing note and never colour a badge red.

**The AKA name** is checked as the rules describe it: the spaced ` AKA ` form, its
position before the year and technical block, an empty or repeated half, both halves being
the same title, and — when you fill in the *Original-language title* reference field — a
missing AKA where one is needed, or one that contradicts what you entered. Nothing is
looked up; it compares your title against what you told it.

## Fixed in 1.7.3

**TorrentLeech's search address.** It searches under `/torrents/browse/index/query/`, not the `/browse/list/` the built-in list carried. Corrected, and an old address already saved from an earlier version is dropped so the new one takes over — an address you edited yourself is left alone.

## Fixed in 1.7.2

**Smaller badges that stay off the titles.** They were 36px boxes with vertical margins — taller than a row in the grouped and compact listing views, so each one overflowed onto the release name below it. Now 22px (26px on a phone), with no vertical margin and no more height than the line of text beside them; the torrent-page badge went from 30px to 24px to match.

**The search box no longer closes itself.** Alt+Shift+T and the selection search open the tracker search on any page, but the module tidies its page additions away when you are not on `/requests` — and it was closing that dialog along with them, so on the torrent list the search opened and vanished a quarter-second later. Redraws no longer touch it; only leaving the page it was opened on closes it.

**A film is no longer searched as a book.** A row's category came from the first `[class*="category"]` or image found, which could be a format icon or a neighbouring row, so a 1080p WEB-DL went out as a *book request* and every tracker that carries films was skipped. The category cell is read properly now, a format label is not mistaken for one, and the title outranks a category that contradicts it.

## Fixed in 1.7.1

**Search all opens them all.** Browsers allow one tab per click and refuse the rest of a burst, so *Search all* opened one and reported the rest blocked. The blocked trackers are now offered one at a time — *Open Aither ▸ (5 left)* — one click each, no permission needed, and that route is offered first next time on a browser that refused before.

## New in 1.7.0

**Banned and low-quality groups.** The tracker's list is built in — 65 groups, the two exceptions and the one listed source. A title whose group tag is on the list gets a red badge saying so, wherever titles are checked, marked as a *banned release group* rather than an ordinary naming mistake. Bracketed tags count (`[SubsPlease]`, `[YTS.MX]`), case and punctuation don't hide a group, EVO passes for WEB-DLs and HDT for REMUXes as the list allows, and `BRrip` is caught anywhere in the title.

**Search all trackers**, in one button: every offered search in its own tab, with an honest count of what your browser opened and blocked, and *Copy every link* as the fallback. **Cross-check on a torrent page**: the same searches under the lookup rows on `/torrents/<id>`, built from the release name. **Ticks for requests you have checked**, with the date, cleared from the bar. **Alt+Shift+T** opens an editable search box for any title, prefilled from your selection or the page.

Also: the chatbox and ticker no longer wake the listing, torrent-page or request modules, so a chat-driven script on the same page costs nothing here.

## New in 1.6.0

**Request cross-check.** On `/requests` every row gets a search button, and a request's own page shows the links under its title: the request name is reduced to a title, a year and a season, and offered as a search on each tracker you have ticked, opened in a new tab when you click it. 26 trackers are built in with the address of each one's own search page — editable if a site has moved — and anything missing can be added by name and address (`https://example.org/torrents?name={q}`); only https search addresses are accepted. A tracker that cannot carry the request is left out with the reason. No login, cookie or API key is read or stored, nothing is fetched, and a search finding nothing is not proof the release is not there.

**Fixed: the page slowdown.** Since 1.2.0 the torrent page redrew itself in a loop — the badge was rewritten on every pass, that write counted as a page change, and the module watched the page for changes — and each pass re-read the whole page with a release-name search that compared every candidate against every other one. The badge is now written only when it changes, this script's own elements no longer count as page changes, the search reads each candidate once, and the redraw is capped at one pass per quarter second. The fixtures now fail if anything is redrawn while an unchanged page sits idle.

## New in 1.5.0

**Other versions** under the lookup row on a torrent page: all versions of the title on the tracker, plus 2160p, REMUX, BluRay and WEB-DL searches, minus whichever the release already is. **Collected audit**: results are remembered as you browse, so the audit can cover a sweep of pages rather than one page, with its own copy and clear buttons. Only pages you open are recorded, and the record stays in this browser.

## New in 1.4.0

**Copy report text** in every badge explanation — the release name, its link, the category and service, the corrections in the guide’s words, and the guide-form rewrite where there is one. **Audit loaded titles** in the legend bar lists every release title loaded on the page with a fault summary and a copy button. Text only: nothing is reported or sent.

## New in 1.3.0

Badges now appear in any panel that links a torrent by its release name — the home page’s Top torrents box and similar lists — not just the main listing and detail page. A link only qualifies if its text reads as a release name, and the legend bar still belongs to a real listing. A row labelled by format (`FLAC`, `MP3`, `ALAC`, `Vinyl`) is read as music.

## Changed in 1.2.2

The Blu-ray.com lookup searches by the IMDb ID when the page shows one, matching the site’s own link, and a TVDb ID is recognised in the `?tab=series&id=` form as well as the series-slug form.

## Fixed in 1.2.1

On a real torrent page the first heading is the media title (`Shiny Happy People (2023)`) and the release name sits lower down, so 1.2.0 badged the heading and reported naming errors against a show name. The release name is now located by its own shape, and the Inspector reads the same value.

## New in 1.2.0

On a torrent page: the naming badge now sits beside the release name with the same click-through explanation, and a lookup row underneath — a tracker search for the same title, then IMDb, TMDB, TVDb, Trakt, Letterboxd, JustWatch, Blu-ray.com and srrDB (MyAnimeList for anime, MusicBrainz for music, Open Library for books, IGDB for games). An ID already shown on the page becomes a direct link; otherwise it is a search. Nothing is fetched and no ID is invented. Listing badges also run on other pages that render the same release rows, such as a member's uploads.

## New in 1.1.2

The recognized streaming service is shown in the panel under the status line (`Service: NF — Netflix`), not only in the copied or saved review.

## New in 1.1.1

A music title that does not match the guide’s `Artist - Album (Year) - Format` now names the parts that differ and offers the same title rewritten in the guide’s form (bit depths and sample rates such as `16-44` or `24-bit` are not mistaken for a release-group tag).

## New in 1.1.0

The supplied streaming-service abbreviation list (261 services, 277 accepted spellings including alternates such as `HMAX / MAX` and `DSNP / DSPA`) is bundled with the checker. The abbreviation before `WEB-DL` / `WEBRip` is matched against it: a listed service is named in the review and the exported report (`Service: AMZN — Amazon Studios / Amazon Prime Video`), a mis-cased spelling is a correction (`AMZN, not amzn`, while `iP`, `iQ`, `iT` and `LeTV` keep their own capitalisation), and an unlisted abbreviation is raised for review rather than passing quietly. Listing badges follow the same result, and the naming section has a searchable copy of the list. Spellings only: the list cannot confirm that a release came from that service.

## Run only one copy

This script contains the same modules as the full DKOKTO Scene Edition. If the full edition is also active, this one detects it on page load, stays inactive and logs a note to the console instead of adding a second launcher and duplicate badges. Use one or the other.

## What it does

**Inspect torrent** (floating button, bottom right, or Alt+Shift+I)

- Reads the MediaInfo already rendered on the torrent page — no extra requests — and lists General, Video, Audio and Subtitle tracks.
- Compares the release name against the report: resolution, codec, scan type, HDR/DV, Atmos and channel claims. Missing metadata stays "unknown" rather than being guessed, and source/REMUX/release-group claims are reported as unverifiable.
- Runs the DP naming guide check on the display title (movie, TV, music, audiobook, eBook, game/software), with optional reference title/year/language, TV-year, downscale and collection answers.
- Copy or save a technical summary and a naming review as text. The complete local file path from the report is never included.
- Private notes per torrent ID, stored in this browser only. Notes previously saved by the full DKOKTO toolkit are read once and carried over; the toolkit's own entry is never modified.
- Paste box for a Text or JSON MediaInfo report when the page has no dump.
- Optional srrDB search link, which navigates only when clicked.

**Automatic listing badges** on `/torrents`

- Large red ✕ for supported naming errors, green ✓ for passing title checks, amber ? for uncertain or unsupported cases.
- Click a badge for the corrections, manual checks and the template.
- Legend bar with counts and a persistent on/off switch.
- Loaded List and Card titles update after filtering, pagination and dynamic row changes. No detail-page requests or site-wide crawling. Poster/group views without individual release titles cannot be checked.

## Fix in this build

Channel layouts written with a space, such as `DTS 3 1`, previously produced "Include the default track's discrete channel layout" — as if the layout were absent. They now produce a specific correction naming the separator, e.g. *Write the channel layout with a period: 3.1, not 3 1*. Discrete layouts including 1.0, 2.1, 3.0, 3.1, 4.1, 6.1 and 9.1 pass the same way as 2.0, 5.1 and 7.1 when they match the default audio track.

## Scope and limits

The inspector interprets supplied metadata; it does not download, transcode or independently verify media. Source and REMUX claims cannot be proven from MediaInfo. Missing metadata remains unknown. Naming checks are advisory, especially for cropped/aspect-ratio variants. Text field labels must be English, or use MediaInfo JSON. BDInfo is unsupported.

The naming rules are a snapshot of the supplied guide (`NAMING-GUIDE-REFERENCE.txt`), not a live tracker-rules feed. They check display titles, not every filename, folder, description or source-history claim. Auto category detection is provisional. Reference title/year/language are user-entered; no TMDB/TVDB requests are made. Multi-title ordering, provenance, full Dub matrix edge cases and book identifiers require manual verification. Passing supported checks is not a guarantee of tracker compliance.

Private notes are per torrent ID in browser storage, not account-wide or public.

The userscript matches HTTPS only, and only the 44 trackers whose addresses are in its own
catalogue — that list is written into the header at build time from the catalogue itself, so
the two cannot drift apart, and there is a check for it. It asks for `GM_setValue`,
`GM_getValue` and `GM_deleteValue`, which are storage on your machine rather than network, and
for no `@connect` host at all. It performs no network request, post, upload or download of any
kind; every lookup link, the srrDB link included, navigates only when you click it. No
authenticated account on any tracker was used to build or test it, so a site changing its
markup may need selectors adjusted.

## Source and checks

Every module is plain JavaScript, concatenated at build time. Nothing is fetched, nothing is
minified, and the build is deterministic — the same source gives the same file, byte for byte.

- `source/inspector.js` — the MediaInfo parser: text or JSON, summaries, terminology, and the
  name-against-report checks.
- `source/naming.js`, `source/services.js` — the display-title checks, and the streaming-service
  abbreviation list they use (data only, 288 entries).
- `source/rules.js`, `source/profiles.js`, `source/tracker-guides.js` — which tracker's rules
  are being applied, the profile format a tracker is added in, and the rule sets that ship
  (DarkPeers, Zenith, LUME, OnlyEncodes+).
- `source/groups.js`, `source/internals-data.js`, `source/internals.js`, `source/group-tag.js` —
  banned and low-quality groups, and the directory of which tracker a group is internal to.
- `source/listing-core.js`, `source/listing.js` — badge classification and batched DOM updates
  on a listing page.
- `source/detail.js`, `source/release-title.js`, `source/links-core.js` — the torrent page: the
  badge, the lookup row, and finding the release name in the first place.
- `source/files-core.js`, `source/files.js` — the file list, its exact byte counts, and the
  marker under the release name.
- `source/templates-core.js`, `source/templates.js` — the release-notes templates and the
  button beside the comment box.
- `source/capture-core.js`, `source/capture.js`, `source/compare-core.js` — capturing two
  releases and comparing them.
- `source/trackers.js`, `source/requests-core.js`, `source/requests-seen.js`,
  `source/requests.js` — the trackers you are on, the search each one gets, and the request-page
  cross-check.
- `source/report-core.js`, `source/reply-core.js`, `source/audit-store.js`,
  `source/decisions.js` — paste-ready report text, and the bounded record of what you have
  looked at.
- `source/store.js` — where settings live, and why they are the same on every tracker.
- `source/naming-ui.js`, `source/inspector-ui.js`, `source/profiles-ui.js`, `source/host.js`,
  `source/inspector.css` — the panels, the launcher and the styling, which touches only this
  script's own elements.
- `source/build.mjs` — the builder.

Run:

```text
node source/build.mjs
node --check Torrent-inspector.user.js
node source/audit-check.cjs
node source/capture-check.cjs
node source/files-check.cjs
node source/groups-check.cjs
node source/guides-check.cjs
node source/inspector-check.cjs
node source/internals-check.cjs
node source/links-check.cjs
node source/listing-check.cjs
node source/moderation-check.cjs
node source/naming-check.cjs
node source/page-check.cjs
node source/profiles-check.cjs
node source/report-check.cjs
node source/requests-check.cjs
node source/rules-check.cjs
node source/services-check.cjs
node source/store-check.cjs
node source/templates-check.cjs
python3 -m http.server 8804 --bind 127.0.0.1
```

Then open `inspector-preview.html`, `listing-preview.html` and `requests-preview.html` from
that server. The fixtures use synthetic data, block network access, and are not live-account
validation. The reports from the last run ship beside this file: `AUDIT-CHECKS.txt`, `CAPTURE-CHECKS.txt`, `FILES-CHECKS.txt`, `GROUP-CHECKS.txt`, `GUIDES-CHECKS.txt`, `INSPECTOR-BROWSER-CHECKS.txt`, `INSPECTOR-CHECKS.txt`, `INTERNALS-CHECKS.txt`, `LINK-CHECKS.txt`, `LISTING-BROWSER-CHECKS.txt`, `LISTING-CHECKS.txt`, `MODERATION-CHECKS.txt`, `NAMING-CHECKS.txt`, `PAGE-CHECKS.txt`, `PROFILE-CHECKS.txt`, `REPORT-CHECKS.txt`, `REQUEST-BROWSER-CHECKS.txt`, `REQUEST-CHECKS.txt`, `RULES-CHECKS.txt`, `SERVICE-CHECKS.txt`, `STORE-CHECKS.txt`, `TEMPLATE-CHECKS.txt`.

The validation record for each version — what was built, what was checked, and what was
confirmed to fail when the fix was taken back out — is in `VALIDATION-<version>.txt`.

Original credits: Chungus Edition 1.7.5 by 🤖T.R.A.V.I.S; DKOKTO Scene Edition personal customization.
