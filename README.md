# Torrent Inspector 1.24.1 — DarkPeers, Zenith and your own

The Torrent Inspector and the automatic listing naming badges from DKOKTO Scene Edition 1.6.1, packaged as a standalone userscript. None of the theme, artwork, game helper, forum reading tools, shortcuts or backup features are included.

Install **Torrent-inspector.user.js** as a Tampermonkey script. The project website is
[torrent.dkokto.dev](https://torrent.dkokto.dev/) (note the spelling: **dkokto**).

## Fixed in 1.24.1

- The launcher, styles and previously opened dialogs recover after Livewire replaces the
  page body. Page observers continue watching subsequent updates, without duplicating the launcher.
- Detail findings refresh when filenames, MediaInfo text, language flags or the selected
  rule set change. A warning's text updates even when its issue code stays the same.
- Eight browser compatibility checks cover these changes using synthetic tracker pages.
  These checks do not validate authenticated tracker markup or the accuracy of tracker rules.

Read **GUIDE-1.22.md** for the full walkthrough, **CHANGELOG.md** for what changed, and **TRACKER-RULES.md** to add a tracker of your own. (The guide is written for the full edition; the theme, artwork and chat-game sections do not apply here.) Do not double-click the JS file as a Windows script.

## New in 1.24.0

**Two tracker rule sets ship with the script.** Open *Tracker rules…* → **Added trackers**
and they sit under *Rule sets that ship with this script*:

| Rule set | Built from | What it does not have |
| --- | --- | --- |
| **LUME** (luminarr.me) | its Naming Guide — both title templates and the vocabulary for every element | no banned-group list: none was supplied |
| **OnlyEncodes+** (onlyencodes.cc) | its Upload Guide + Rules, its naming standard and its banned list — 16 rules, 136 groups | — |

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
list (290 services), and a fix for the service token before WEB-DL, which was matched as
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

Nothing is copied until you press it.

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

**New on the shipped list**, from the user as a DarkPeers moderator and cited in the data
file: JBENT, "JBENT TAoE", OnlyMux and WhiskeyJack at OnlyEncodes+, and DOOBS at DarkPeers.
Kitsune at Aither, and twelve other names asked for at the same time, were already there.

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

The userscript matches only HTTPS darkpeers.org and www.darkpeers.org, requests no `@grant` permissions and no `@connect` hosts. It performs no network requests, posts, uploads or downloads of any kind; the srrDB link navigates only when clicked. No authenticated DarkPeers account was used for testing, so site markup changes may require selector adjustments.

## Source and checks

- `source/inspector.js` — pure text/JSON MediaInfo parser, summaries, terminology, name-vs-report checks.
- `source/naming.js` — guide-based display-title checks (channel layout, service abbreviations).
- `source/services.js` — the supplied streaming-service abbreviation list (data only).
- `source/naming-ui.js`, `source/inspector-ui.js` — inspector panel, reference controls, review export, private notes.
- `source/listing-core.js`, `source/listing.js` — title-only badge classification and batched DOM updates.
- `source/report-core.js` — paste-ready report and audit text.
- `source/audit-store.js` — the bounded record of results collected while browsing.
- `source/links-core.js`, `source/release-title.js`, `source/detail.js` — lookup addresses, release-name detection, and the torrent-page badge and lookup row.
- `source/trackers.js`, `source/requests-core.js`, `source/requests-seen.js`, `source/requests.js` — the trackers you are on, the search each one gets, which requests you have checked, and the page additions.
- `source/groups.js` — the tracker's banned and low-quality group list (data only).
- `source/host.js` — standalone shell: dialog, launcher, note storage, duplicate-instance guard.
- `source/inspector.css` — styling for this script's own dialog, launcher and badges only.
- `source/build.mjs` — deterministic builder; concatenation only, nothing fetched or minified.

Run:

```text
node source/build.mjs
node --check DarkPeers-Torrent-Inspector.user.js
node source/inspector-check.cjs
node source/naming-check.cjs
node source/listing-check.cjs
node source/services-check.cjs
node source/links-check.cjs
node source/report-check.cjs
node source/audit-check.cjs
node source/requests-check.cjs
node source/groups-check.cjs
python -m http.server 8793 --bind 127.0.0.1
```

Then open `inspector-preview.html`, `listing-preview.html` and `requests-preview.html` from that server. The fixtures use synthetic data, block network access and are not live-account validation. Reports from the last run are included: `INSPECTOR-CHECKS.txt`, `NAMING-CHECKS.txt`, `LISTING-CHECKS.txt`, `SERVICE-CHECKS.txt`, `LINK-CHECKS.txt`, `REPORT-CHECKS.txt`, `AUDIT-CHECKS.txt`, `REQUEST-CHECKS.txt`, `GROUP-CHECKS.txt`, `REQUEST-BROWSER-CHECKS.txt`, `INSPECTOR-BROWSER-CHECKS.txt`, `LISTING-BROWSER-CHECKS.txt`.

Original credits: Chungus Edition 1.7.5 by 🤖T.R.A.V.I.S; DKOKTO Scene Edition personal customization.
