# torrent_inspector# DarkPeers — Torrent Inspector · changelog

A standalone Tampermonkey script: the MediaInfo Inspector and the automatic naming
badges, with no theme, artwork, games or forum tools. It reads the page you are on and
makes no requests of any kind — every link opens only when you click it.

Newest first.

---
1.21.2 — three things reported from the trackers
Show the JSON answered an empty form with the save-time error about the key. It shows the draft now and says what is still needed; Save as file stays strict and says so.
The lookup row's own-tracker search was labelled "Search DarkPeers" on every tracker. It is named after the site you are on now, or the hostname, or "Search this tracker".
DarkPeers and Zenith are in the cross-check catalogue; the tracker you are standing on is skipped instead, with its reason. Writing that check found the host being lowercased after the www. prefix was stripped, so WWW.DarkPeers.org was not recognised.

Fixed in 1.21.1

Five bugs found in a code review of 1.21.0. Each was reproduced against the module before it was changed, and each fix carries a check confirmed to fail with the bug put back.

A bitrate or size with its thousands separated was read as its first group. MediaInfo writes 8 000 kb/s; the comparison read that as 8, so a 12.5 Mb/s release was reported as 100% higher than an 8 Mb/s one instead of 36%. The separators — space, no-break space, thin space, comma — now come out before the number is read.

The AKA position check could never fire on a resolution. \d{3,4}[pi] was written inside a regex literal, where it matches a backslash rather than digits, so a title whose only technical word before the AKA was 1080p passed silently while the same title with a year was caught.

A profile copied from a built-in carried a rule it did not describe. Every conditional group was exported with a WEB-DL pattern, so a copy of DarkPeers said HDT was allowed for Remuxes and then allowed it only on WEB-DLs.

Editing a banned list did nothing until a reload if the length did not change. The built list was cached on the lengths of a profile's lists plus its label, so renaming a group left the old list in force: the group just removed was still refused, and its replacement was not.

Three lines that did nothing are gone.

Three efficiency findings from the same review are done: the torrent page stamps its inputs cheaply instead of re-parsing the MediaInfo and re-reading the file table on every redraw; listingPage() is answered once per pass rather than two or three times (on a queue each answer walks every loose torrent link); and the audit store no longer rewrites itself when nothing has changed.

Three were measured and left alone, on purpose: precompiling the naming regexes (200 titles check in 19.5 ms, so there is nothing there worth the risk in the module with 61 checks on it), memoising the release-name search across modules (saves about 8 ms a burst, at the cost of a cached answer about a page that may have changed — which is the fault behind the last three visible bugs), and folding the duplicated el(), clipboard and dialog helpers, which is worth doing as its own job rather than beside five behaviour fixes.

## 1.21.0 — every UNIT3D tracker it can be pointed at, in a list you can walk

- 41 UNIT3D trackers, up from 11. Codebase from HDVinnie's Private Trackers Spreadsheet;
  addresses from each tracker's Jackett or Prowlarr indexer definition. Nine with no
  definition are left out rather than guessed.
- ReelFliX moved to reelflix.cc; the old address is marked outdated.
- The @match list is derived from the catalogue at build time and checked against it.
- The chooser: your trackers first and open, the rest folded into counted groups, a search
  box over name/language/software, and each address behind its own button.
  
## 1.20.2 — nothing appeared on a torrent page with a long cast list

- The release-name search read only the first 400 candidate elements. Cast, crew, company and
  keyword entries all carry "name" or "title" classes, so on a TV page the release name sat
  past the cut and nothing was found: no badge, no lookup row, no vs button, no cross-check.
- Bounded by how much is read and scored now (6000 read, 400 scored, short and long text
  rejected first) rather than by document position. 8 ms a pass on a 3045-candidate page.
- Reading a candidate's text no longer clones it unless something of this script's is inside.

## 1.20.1 — two torrents named the same release

- Same name, different file: the panel now concludes rather than compares. "Named the same
  release, and not the same file", with what they differ in named in one sentence.
- Names are matched on their words, so punctuation and case do not make two names different;
  a repack, another resolution or another group are different releases and get the ordinary
  comparison.
- It still refuses to say which of the two is the original, and says why: neither page
  carries that, and a report pasted incompletely can differ in wording on its own.

## 1.20.0 — thirteen trackers, shared slots, and the tags each file carries

- Runs on DarkPeers, Zenith and the eleven UNIT3D trackers already in the cross-check catalogue.
  A check asserts every matched host is one of those, so no domain is invented.
- On a tracker whose rules are not in hand nothing is badged until a rule set is chosen for it,
  and the bar says so. The choice is per tracker; an older single choice is moved to the tracker
  it was made on rather than spread to every new one.
- The two vs slots moved to Tampermonkey's per-script store, so a release captured on one tracker
  is there on the next. Three storage grants; no GM_xmlhttpRequest, no @connect.
- The vs comparison gained the tags and encode settings: muxer, muxing library, encoder, format
  settings, encoded and tagged dates, title tag, attachments, track titles, and the encode
  settings read option by option. It never calls a file altered.
  
## 1.19.1 — the comparison panel was being read as the page

- With the panel open, the lookup row, the other-versions row and the panel flashed in and
  out: the panel's own headings hold the two captured release names, and the release-name
  search did not exclude this script's own panels, so a heading inside it could win.
- The badge, lookup row and findings row were then built inside the panel and wiped by its
  next redraw. Same mistake as the blinking listing badge, in a new place.
- SKIP now names every container this script draws, not the handful it happened to list.
  
## 1.19.0 — the "vs" button: two releases compared, clipboard only

- A "vs" button in the lookup row on a torrent page: capture this release, capture another,
  compare. Both slots are kept in this browser's own storage.
- The payload follows HelperZ's block layout and itstwo flags, so a captured pair pastes into
  WinMerge, meld or any two-pane diff tool.
- Merged rather than swapped: the panel adds the file-level comparison a MediaInfo report
  cannot carry (file count, total size with the gap named, extraneous files, top folder)
  above the existing report comparison. Neither release is declared the better one.
- The Inspector's Compare panel gained "Load the captured A and B".

## 1.18.0 — the internal-groups directory, three sources merged

- 968 groups across 153 trackers, up from 433 across 35, merged from the two directories the
  user supplied and the one that shipped before. All three are cited and dated in the source.
- Group names with a space are quoted in the list, so "-Goki TAoE" resolves to OnlyEncodes+.
- Retired/disbanded entries are kept and marked; prose asides in the sources are not filed as
  groups; the "No Home tracker" block is left out.
  
## 1.17.3 — a group name can have a space in it

- "…x265-Goki TAoE" is one group tag. It was read as no tag at all, so those rows were asked
  why no group tag closed the title and the tag was never marked. A tag may now be up to four
  words, rejected if any word is a technical token — so a title that really has no tag still
  says so, and "x264-R-A-R-B-G" is still one group.
- A tag that *begins* with a banned name is raised as a question naming both spellings, never
  reported as the banned group itself.

## 1.17.2 — adding a group where you meet it

- The tag menu carries an **Add … to a tracker** field, so the menu that says a group has no
  home is where you give it one. Adding appends and redraws the menu.
- **Internal groups…** has an Add row of its own. Only **Save list** replaces the whole list,
  and it now reports what it did.

## 1.17.1 — the internal tracker is a link

- "Listed as internal at …" links to the tracker where its address is already known — from the
  cross-check tracker list, matched on the name or its key, so BTN finds BroadcasTheNet.
- Addresses are never invented: a tracker this script has no address for stays plain text.
  Give it one by adding the tracker to the cross-check list, or by putting the address on its
  line in **Internal groups…**: `BeyondHD|BHDStudio FLUX|https://beyond-hd.me`.
  
## 1.17.0 — the release group tag, and where it is internal

- The group at the end of a release name is marked, on listings and on a torrent's page.
  Click it for every tracker it is **listed as** internal at, a search for its other releases
  here, and the same on the trackers you have chosen.
- The list is the InviteHawk internal-encoders directory supplied by the user (433 groups,
  35 trackers, dated in `source/internals-data.js`). It is a community directory, so entries
  read "listed as", and **Internal groups…** lets you paste your own over it.
- Where another script has already made the tag a link, this one leaves it alone entirely.

## 1.16.2 — dead code out, and the per-pass DOM cost cut

- Deleted `source/files-core.js` and `source/srrdb.js`: neither was injected into this
  edition, and srrdb held the last network code in the tree. The check asserting the built
  script contains no srrDB request code stays.
- Reading a release name asked the DOM twice per row per pass whether this script's own
  elements were inside it. On a 200-row listing that was 413 `querySelector` calls a pass;
  it is now 5, because a name with no child elements cannot contain one.

## 1.16.1 — the site's NEW label read as part of the release name

- Rows carrying the red **NEW** label were asked *"No release group tag closes the title"*,
  because the label is printed inside the title element after the group tag. The row without
  one passed in the same screenshot.
- Site row labels at the end of a name are now dropped before the name is read: NEW,
  FREELEECH, 100/75/50/25% FREE, DOUBLE UPLOAD, HIGH SPEED, STICKY, FEATURED, PERSONAL
  RELEASE, BUMPED, REFUNDABLE. Upper case, at the very end, and only where a space separates
  it — so `x264-NEW` keeps its group tag and `x264-FREELEECH` is still a group called
  FREELEECH.

## 1.16.0 — the blinking badge on the grouped similar page

- On `/torrents/similar` the release name is an anchor laid out as a flex box, so the badge
  is placed inside it to stop it wrapping onto the row below. The pass that decides which
  links are release names still read the link's raw text, which then ended with the badge's
  tick and the whitespace around it — and a name with a line break in it does not score as a
  release name. So the next pass dropped the link, its badge came off, and the pass after put
  it back: a badge blinking about five times a second. Measured on the reported page at 162
  removals in ten seconds.
- A link's text is now read with this script's own elements excluded, in every place that
  decides whether something is a release name.
- A page that refreshes itself — a comment panel, a grouped listing — now has its badges put
  back on the next frame rather than on the ordinary debounce, so a re-render is not visible
  as a flicker. Rate-limited, so a page rewriting itself continuously falls back to the
  debounce.

## 1.15.3 — the duplicated lookup row, and a dotted name said properly

- The page-findings row shared a class with the lookup row, so a new lookup row was appended
  on every pass — thirteen deep on the reported page. It has its own class now.
- `Dead.Silence.2007…` was reported as a different film from “Dead Silence”. Dots and
  underscores are treated as word separators now, so that accusation is not made; instead a
  scene-style dotted title is reported as what it is — the guide writes display titles with
  spaces — with the title written out, keeping the dots that belong (`H.264`, `DDP5.1`).

## 1.15.2 — the badge in the row icons

- A row's icons — comments, request reseed, bookmark — link to the *same torrent*, and since
  1.10.1 a queue page accepted any torrent link in a row as a release. Each icon got a badge
  of its own with nothing to judge, hence the *“Insufficient category/title information.”*
  tooltip. A release name now has to look like one wherever it is found: eight characters or
  more, with letters, and a space or a digit. A queue row still uses its own name link, so an
  audiobook that reads like nothing is still checked — an icon never is.

## 1.15.1 — two badges on one row

- On a film's own page every row got a second badge among the row's own icons, and the bar
  counted it. A `rowspan` on the Type column shifts every column index on the rows below it,
  so reading the name cell by its header position landed on the wrong cell and the row was
  badged twice. The name cell is now found by the torrent link it holds, whatever its index,
  and a container holding an already-badged link is never badged itself.

## 1.15.0 — what the torrent page itself says

Four checks that need the page rather than the title, under the release name on a torrent page:

- **The title the page names.** The TMDB title and year are compared with the release name —
  a different film is an error, a missing “The” is a question, the `X AKA Y` form matches on
  either half, and a year the name lacks is asked about rather than corrected.
- **What the uploader filed it as.** The Type and Resolution chosen on the page against what
  the name says: filed Encode with `REMUX` in the name, or filed 720p with `1080p`, is an error.
- **The file list**: container, a lone film wrapped in a folder, samples in the torrent, and
  **pack uniformity** — a pack whose files disagree on resolution, source, codec or group,
  reported with exactly what differs.
- **The languages the page knows**: `Dual-Audio` and `MULTi` become decidable against the
  reported audio languages and the page's original language, and non-English audio with no
  English subtitles is raised.

Where a rule is in hand it is cited and the finding is an error (Zenith's 3.5 container, 3.4
MediaInfo); where none is, the finding says so and asks you to check that tracker's rules.

## 1.14.0 — the reply builder, and three fixes to how rows are read

- **Reply to the uploader**: a draft message written from what the check found — corrections
  numbered in the guide's own words, four outcomes with one suggested from the findings, and
  the manual checks carried as *worth confirming* rather than as faults. Editable before you
  copy it; nothing is sent.
- **A shortened title is no longer judged as if it were whole.** A row that cuts a long name
  off with an ellipsis was reporting a cut-off group tag as a missing one. The full name is
  taken from the element's `title` where the page gives one; otherwise the badge says the
  name is shortened here.
- **The badge no longer hides behind the ellipsis** on a row that clips a long name: it
  leads the name instead of being cut off after it.
- **Decisions are on moderation queues only**, not on every page under `/torrents/`, and
  they survive leaving a queue and coming back.
- **A release listed without its media title** — a film's own page shows rows as
  `2160p MA WEB-DL …-BYNDR` — is checked with the title from the page heading.

## 1.13.0 — moderating, and checking your own upload before you make it

- **A decision log on the queue.** Every pending row gets *Approved / Rejected / Asked the
  uploader / Left for someone else*, ticked with the decision and its date so a sweep does
  not repeat itself. Rejecting or asking prompts for a note. The bar counts, copies and
  clears the log. It records what *you* decided — it changes nothing on the tracker and
  never leaves this browser. A row with no link is remembered by its release name.
- **Compare two releases** in the Inspector, for a trump decision: paste a report on each
  side and it names what they differ on — resolution, codec, bitrates, HDR, size, chapters,
  audio tracks and subtitle languages — marking the larger of two numbers with the
  percentage. It does not pick a winner, and says why it cannot.
- **More title claims checked against the report**: the audio codec against the default
  track, the channel layout against the reported count, `HDR10+` claimed but absent,
  `Dual-Audio` with one language, non-English audio with no subtitles, and a `REMUX` with no
  chapters.
- **Already uploaded?** The naming box now offers the *exact* release name searched on every
  tracker you have chosen, so you find out before you spend the effort. Nothing is fetched.

## 1.12.1 — badges that wrapped onto the row below

- On a season-grouped page the release name is rendered as a block, so a badge placed after
  it wrapped onto the next line and sat over the row below. A new badge now measures where
  it landed and, if it wrapped away from its name, moves inside the name where it cannot be
  separated from it. Measured once per badge, so no reflow is forced while you read.

## 1.12.0 — add a tracker yourself, as rules rather than as code

- **Tracker rules…** beside the *Rules* dropdown, in the legend bar and at the top of the
  naming box. A tracker you add joins that dropdown, is chosen for you on its own site, and
  brings its own banned release group list, exceptions, accepted resolutions and any number
  of rules of your own — a pattern that must or must not appear, for the categories you
  name, with your severity and wording.
- **The generator does the tedious part**: paste the tracker's banned list straight off its
  page and it is read whatever shape it is in — a tab-separated table, pipes, runs of
  spaces, one name per line, or commas — carrying the reason and any real date into the
  badge, dropping placeholder dates such as `01-01-1969`, and listing repeats once. Nine
  ready-made rules are there to tick.
- **Show the JSON** before adding; save a profile as a `.json` file, load one back, copy an
  installed one out, or start from a copy of DarkPeers' or Zenith's own.
- A profile is data: patterns are compiled as regular expressions and matched, nothing is
  executed, nothing is fetched, and one that will not compile is refused with the reason.
- See **TRACKER-RULES.md** for the format.

## 1.11.1 — a site icon inside the title is not part of the name

- `… H.264-AnoZu` was asked about for a missing tag with the tag right there: the tracker
  renders a personal-release icon *inside* the title element, so the name read as
  `…-AnoZu🔥` and every check anchored to the end broke. The serious half is that the
  banned-group list matches the trailing tag, so it was blind to any release carrying such
  an icon.
- Leading and trailing decoration — icon glyphs, flames, stars, zero-width characters — is
  stripped wherever a release name is read, before normalising as well as after (NFKC turns
  a trailing `™` into `TM`). Stored, copied and audited titles are clean too.

## 1.11.0 — a missing release group tag is a question

- `Vigil S02 1080p AMZN WEB-DL DD+ 5.1 H.265` ends at the video codec and was passing
  green. The guide allows the tag to be omitted only where the release has none, which a
  title cannot say, so it is an amber **?** now with the reason — never a red ✕, since an
  untagged release is legitimate.
- A hyphen inside `WEB-DL`, `DTS-HD` or `Blu-ray` is not mistaken for a tag: a tag runs
  unbroken to the end.

## 1.10.2 — the badge was reading itself

- Introduced by 1.10.1: a queue badge sits *inside* the name cell, so the next pass read
  the cell's text with the badge's own ✕ / ✓ / ? on the end. `… M4B AAC 128kbps` became
  `… M4B AAC 128kbps✕`, and every conforming Zenith audiobook flipped to *Include the
  bitrate as xxxkbps*. A DarkPeers queue row's group tag was corrupted the same way. The
  title is now read with this script's own badge left out.

## 1.10.1 — the pending name is not a link

- Why both queues still came up bare: a pending torrent is not published, so its name is
  rendered as plain text in the cell, and every version so far looked for release-name
  *links*. On a queue the row is the unit now — the cell under the **Name** header is read
  whether or not it holds a link, and the badge goes inside that cell rather than after it
  (after a `<td>` it would land in the next column). With no link there is no *Open
  torrent* button rather than an invented address, and a table with no Name header and no
  torrent links is left alone.

## 1.10.0 — Zenith's books and music, against Zenith's own templates

- They share nothing with DarkPeers', so on Zenith the DarkPeers book and music checks no
  longer run; its own do instead. DarkPeers is untouched.
- **Audiobooks**: `Author - Title (Year) Language Edition {Narrator} [Source] Container
  Codec Bitrate` — the parenthesised year, an ISO-639-3 language code, one narrator in
  braces, a source of `[WEB]`, `[CD]`, `[VINYL]` or `[Cassette]`, `M4B` present for
  AAC/USAC/DDP and absent for MP3 and FLAC, a codec from the list, and a lossy bitrate
  written `128kbps`.
- **Ebooks**: no brackets in the torrent title, a three-letter language code that is not a
  format word (`PDF` is a format), a format from EPUB, PDF, DJVU, MOBI, AZW3, and a series
  number written as `Series #4`.
- **Music**: Zenith calls its shape suggested, so not following it is a note rather than an
  error. Scene-style dot separators are still an error.
- Zenith's audiobook rule says ISO-639-3 (`ENG`) while both its own examples write `EN`.
  The check follows the rule and says so.
- Fixed: the scene-separator test only matched single characters between dots, so
  `Salem.King.Night.2010.FLAC` slipped through on both sites.

## 1.9.1 — the moderation queue, actually

- 1.9.0 widened the route but still looked for rows the way it does everywhere else: a
  link whose text reads as a *release name*. A queue that is all audiobooks —
  `Brandon Sanderson - The Sunlit Man (2024) ENG {GraphicAudio} [WEB] M4B AAC 128kbps` —
  scores nothing on that test, so the page came up bare. On a queue the table *is* the
  listing, so every torrent link in one of its rows is checked now.
- The category comes from the column under the **Category** header, since those tables
  label their columns instead of classing their cells.
- **A bracketed year is a year.** Those rows were getting a red *Include the release year*
  with `(2024)` in the title. On DarkPeers it now names the real problem — the template is
  `Author - Name Year Format ISBN-Tag` — and on Zenith it says nothing about the form.

## 1.9.0 — badges on the moderation queue

- `/torrents/pending` (and its siblings — rejected, postponed) is a listing too, but its
  table is not the search table, so nothing was checked there. Rows on those pages are now
  found by the release names themselves: any link to a torrent whose text reads as a
  release name gets a badge, with the legend bar and its *Rules* picker above them. A link
  that does not read as a release name is left alone, and `/torrents/<number>` is still the
  detail page rather than a listing.

## 1.8.2 — Zenith's own reason for each banned group

- Its list gives a reason per entry, and the badge now says it: *The release group BiTOR
  is on Zenith’s banned release groups list (Zenith’s reason: Faking DV/Atmos, Falsifying
  Mediainfo, added 03-06-2026)*. `Hi10` reads *Re-encoding*, `SPDVD` *Modified
  full-discs*, `OFT` *Quality, nikt0 alt*. Only that one date is real on the list, so the
  01-01-1969 placeholders are not shown. DarkPeers' list came without reasons and gains
  no invented ones.

## 1.8.1 — a resolution that was there was reported as missing

- `The Adventures Of Bottle Top Bill S01 540p AMZN WEB-DL DD+ 2.0 H.264-SiLK` got a red ✕
  reading *Include the video resolution*, with `540p` sitting right there in the title.
  Only the nine labels DarkPeers lists were recognised as resolutions at all, so anything
  else read as none. Any well-formed label is recognised now, and one the guide does not
  list is reported as the wrong value and named. Zenith takes progressive labels
  DarkPeers does not list, so `540p` and `1440p` pass there; a malformed `720i` is still
  wrong on both.

## 1.8.0 — Zenith's rules, and a dropdown to choose whose rules apply

- **Choose the tracker whose rules are checked.** A *Rules* dropdown in the listing
  legend bar and at the top of the naming box: DarkPeers or Zenith. It is remembered, and
  on a site the script recognises it starts on that site's rules. The naming guide is
  shared, so switching does not change how a title is spelled — it changes which upload
  rules and which banned list are applied to it.
- **Zenith's own banned release groups**, 42 plus `BRrip`, kept separate from DarkPeers'
  65. The lists are not the same: `Goki`, `ARCADE`, `PSA`, `HorribleSubs` and
  `SubsPlease` are DarkPeers-only, while `4K4U`, `BiTOR`, `SPDVD`, `Telly`, `FRDS` and
  `AROMA` are Zenith-only. `EVO` is a WEB-DL exception on DarkPeers and banned outright
  on Zenith, whose list grants no exceptions at all.
- **The Zenith upload rules that can be read from a page**: no movie boxsets (2.2), no
  season collections with the full-disc exception the rule names (2.3, 2.3.1), a single
  episode raised as a question rather than an error (2.4), the banned authors and works
  lists matched however the name is punctuated (5.6, 5.7), a TrueHD REMUX with no AC-3 or
  E-AC-3 compatibility track in the MediaInfo already on the page (3.8), and a container
  the report says is not MKV, MP4 or AVI (3.5). The rules it cannot check are said once
  as a standing note and never colour a badge red.
- **The AKA name.** `Original Title AKA English Title` is checked for its form (spaced
  ` AKA `, not `aka` or `A.K.A.`), its position before the year and technical block, an
  empty or repeated half, both halves being the same title, and — when you fill in the
  *Original-language title* reference field — a missing AKA where one is needed or one
  that contradicts what you entered. Nothing is looked up.
- It now matches `znth.cx` as well as `darkpeers.org`.

## 1.7.3 — TorrentLeech's search address

- It searches under `/torrents/browse/index/query/`, not the `/browse/list/` the built-in
  list carried, so that cross-check led nowhere useful. Corrected — and an old address
  already saved from an earlier version is dropped on read so the new one takes over. An
  address you edited yourself is still yours.

## 1.7.2 — badge size, and two fixes

- **Smaller badges.** They were 36px boxes with vertical margins, taller than a row in
  the grouped and compact listing views, so each one overflowed onto the release name
  below it. Now 22px (26px on a phone), with no vertical margin and no more height than
  the line of text beside them. The torrent-page badge went from 30px to 24px to match.
- **The search box no longer closes itself.** Alt+Shift+T and the selection search open
  the tracker search on any page, but the script tidies its page additions away when you
  are not on `/requests` — and it was closing that dialog along with them. On the torrent
  list the search opened and vanished a quarter-second later. Only leaving the page it
  was opened on closes it now.
- **A film is no longer searched as a book.** A row's category was taken from the first
  `[class*="category"]` or image found, which could be a format icon or a neighbouring
  row, so a 1080p WEB-DL went out as a *book request* and every tracker that carries
  films was skipped. The category cell is read properly now, a format label is not
  mistaken for one, and the title outranks a category that contradicts it.

## 1.7.1 — Search all, when the browser refuses a burst

- Browsers allow one tab per click and silently block the rest, so *Search all* opened
  one tab and reported the others blocked. The blocked trackers are now offered one at a
  time — *Open Aither ▸ (5 left)* — one click each, needing no browser permission.
- A browser that refused a burst is remembered, so the next cross-check offers that route
  first, with *Try Search all again* beside it for when you have allowed pop-ups.

## 1.7.0 — banned groups, and searching every tracker at once

- **Banned and low-quality groups.** The tracker's list is built in: 65 groups, its two
  exceptions and the one listed source. A title whose group tag is on the list gets a red
  badge marked *banned release group* rather than an ordinary naming mistake. Bracketed
  tags count (`[SubsPlease]`, `[YTS.MX]`), case and punctuation do not hide a group, EVO
  passes for WEB-DLs and HDT for REMUXes as the list allows, and `BRrip` is caught
  anywhere in the title.
- **Search all trackers** in one button, with an honest count of what your browser opened
  and blocked, and *Copy every link* as the fallback.
- **Cross-check on a torrent page**: the same tracker searches under the lookup rows.
- **Ticks for requests you have checked**, with the date, cleared from the bar.
- **Alt+Shift+T** opens an editable search box for any title, prefilled from whatever you
  have selected or from the release name on the page.
- The chatbox and ticker no longer wake the badge and request modules, so a chat-driven
  script on the same page costs nothing here.

## 1.6.0 — request cross-check, and a fix for the page slowdown

- **Request cross-check.** On `/requests` every row gets a search button, and a request's
  own page shows the links under its title. The request name is reduced to a title, a
  year and a season, then offered as a search on each tracker you have ticked. 26
  trackers are built in with each one's own search address — editable if a site moved —
  and anything missing can be added by name and address. Only https search addresses are
  accepted, a tracker that cannot carry the request is left out with the reason, and no
  login, cookie or API key is read or stored.
- **Fixed: the page slowdown.** Since 1.2.0 the torrent page redrew itself in a loop —
  the badge was rewritten on every pass, that write counted as a page change, and the
  module watched the page for changes — and each pass re-read the whole page with a
  release-name search that compared every candidate against every other one. Measured on
  the offline fixture: 20 page changes in three seconds before, none after.

## 1.5.0 — other versions, and an audit that spans pages

- **Other versions** under the lookup row: every version of the title on the tracker,
  plus 2160p, REMUX, BluRay and WEB-DL searches, minus whichever the release already is.
- **Collected audit**: results are remembered as you browse, so an audit can cover a
  sweep of pages rather than one. Only pages you open are recorded, and the record stays
  in this browser.

## 1.4.0 — paste-ready text

- **Copy report text** in every badge explanation: the release name, its link, the
  category and service, the corrections in the guide's words, and the guide-form rewrite
  where there is one.
- **Audit loaded titles** in the legend bar lists every release title on the page with a
  fault summary and a copy button. Text only — nothing is reported or sent.

## 1.3.0 — badges wherever releases are listed

- Badges now appear in any panel that links a torrent by its release name, such as the
  home page's Top torrents box, not only the main listing and the detail page. A link
  qualifies only if its text reads as a release name.
- A row labelled by format (`FLAC`, `MP3`, `ALAC`, `Vinyl`) is read as music.

## 1.2.2 — better lookups

- Blu-ray.com is searched by the IMDb ID when the page shows one, matching the site's own
  link, and a TVDb ID is recognised in the `?tab=series&id=` form as well as the slug form.

## 1.2.1 — the right title

- On a real torrent page the first heading is the *media* title (`Shiny Happy People
  (2023)`) with the release name lower down, so 1.2.0 badged the heading and reported
  naming errors against a show name. The release name is now located by its own shape,
  and the Inspector reads the same value.

## 1.2.0 — the torrent page itself

- The naming badge now sits beside the release name on a torrent page, with the same
  click-through explanation.
- A **lookup row** underneath: a tracker search for the same title, then IMDb, TMDB,
  TVDb, Trakt, Letterboxd, JustWatch, Blu-ray.com and srrDB — MyAnimeList for anime,
  MusicBrainz for music, Open Library for books, IGDB for games. An ID already shown on
  the page becomes a direct link; otherwise it is a search. Nothing is fetched and no ID
  is invented.
- Listing badges also run on other pages that render the same rows, such as a member's
  uploads.

## 1.1.2

- The recognised streaming service is shown in the panel under the status line
  (`Service: NF — Netflix`), not only in the copied or saved review.

## 1.1.1

- A music title that does not match `Artist - Album (Year) - Format` now names the parts
  that differ and offers the same title rewritten in the guide's form. Bit depths and
  sample rates such as `16-44` or `24-bit` are no longer mistaken for a group tag.

## 1.1.0 — streaming service abbreviations

- The supplied abbreviation list (261 services, 277 accepted spellings, including
  alternates such as `HMAX / MAX` and `DSNP / DSPA`) is bundled with the checker. The
  abbreviation before `WEB-DL` / `WEBRip` is matched against it: a listed service is
  named in the review and the report, a mis-cased spelling is a correction (`AMZN, not
  amzn`, while `iP`, `iQ`, `iT` and `LeTV` keep their own capitalisation), and an
  unlisted abbreviation is raised for review rather than passing quietly. The naming
  section has a searchable copy of the list.
- Spellings only: the list cannot confirm that a release actually came from that service.

## 1.0.0 — first release

- The Torrent Inspector and the automatic listing naming badges, extracted from DKOKTO
  Scene Edition 1.6.1 as a script of their own. MediaInfo review, the DP naming guide
  check, private per-torrent notes, and ✕ / ✓ / ? badges on the listing.

---

## What it never does

No requests, posts, uploads or downloads of any kind. No `@grant`, no `@connect`, no
account or API access; it matches HTTPS `darkpeers.org` only. Notes and settings live in
your own browser. A green badge means the supported title checks passed — not that the
media, the source history or tracker approval were verified.

If both this and the full DKOKTO Scene Edition are installed, this one detects the other
on page load, stays inactive and logs a note to the console instead of doubling every
badge. Run one or the other.
