# Torrent Inspector · changelog

A Tampermonkey userscript for release naming: the badges, the MediaInfo Inspector, the
cross-tracker lookup and the release-notes templates. It reads the page you are on and makes
no request of any kind — every link opens only when you click it.

Newest first. Older entries call the script *DarkPeers — Torrent Inspector*, which is what it
was named until 1.25.0.

---

## 1.43.15 — screenshot hosts and exact source sizes

- Show the loaded image hostname and linked-image hostname separately, alongside
  natural dimensions. Paths, query strings and credentials are not displayed.
- Stop converting rounded tracker sizes into byte counts in source fingerprints
  and external Compare captures. Explicit byte values or complete file-row sums
  are required. Partial lists never produce a torrent total.
- CinemaZ's supplied page shows 25.60 GB in the size row/file tree and 25.6 GiB
  in MediaInfo. These are not exact counts; Source check now says unavailable.
- Discard legacy stored size counts/results without precision provenance while
  retaining IDs, names and notes. Revisit source pages for fresh exact evidence.
- Shared with personal Scene Edition 1.49.15.

## 1.43.14 — stable comparison, season episodes and screenshot dimensions

- Stop UNIT3D cleanup from removing the external adapters' Compare releases panel.
  FileList and CinemaZ/AvistaZ/PrivateHD/AnimeZ keep it through page changes and focus.
- Capture adapter filenames, displayed sizes, canonical URLs and posted reports with
  the existing saved-page CSS selectors. Rounded sizes remain text in compare slots.
- Compare season episodes by SxxEyy or 1x02 filename tokens, including bounded ranges
  and combined episodes. Show one-sided entries, duplicate matches, unnumbered videos
  and known byte differences; exclude samples and subtitles. No season length guessed.
- Source check displays source torrent and individual file byte counts, with a reminder
  that sizes converted from rounded tracker values are approximate.
- Add a collapsible Screenshot dimensions section under MediaInfo, using the supplied
  ZenGuard reference's description selectors and natural image dimensions. Inspect up
  to four loaded image candidates; keep unloaded images, missing reports and linked
  originals unknown. No image loads, external requests or invented tracker rules.
- Shared with personal Scene Edition 1.49.14.

## 1.43.13 — draggable Review panel

- Drag the header with mouse, pen or touch; keep the dialog within the viewport.
- Ignore header buttons, stop on pointer release/cancel, and double-click to centre.
- Reopening or resizing recentres the dialog. No storage or dependency added.
- Shared with personal Scene Edition 1.49.13.

## 1.43.12 — book search rollback and MidnightScene AV1

- Remove automatic ISBN selection from Exact title in Review and legacy tracker
  search links. Restore the compact title/year/group query. Goodreads and Google
  Books retain their validated title/description ISBN lookups.
- Retain the fix that includes game release groups only once.
- MidnightScene permits AV1, as confirmed on 24 September 2026. Remove its
  unconfirmed-codec warning for AV1 and update the source note and codec wording.
  VP9 keeps its existing review warning; other tracker rules are unchanged.
- Shared with personal Scene Edition 1.49.12.

## 1.43.11 — Exact title fixes for games and books

- Strip the identified trailing group before parsing an Exact title query, then
  append it once. Preserve title words that happen to match the group name.
- Exact title for books uses a checksum-valid ISBN-10/13 from the title first,
  then the current torrent's loaded description. Without an ISBN, retain the
  compact title/year/group fallback. Other media never use a description ISBN.
- Pass category and description into both Review and legacy exact-search links;
  keep editable queries and existing movie/TV search behavior.
- Shared with personal Scene Edition 1.49.11. No tracker rules changed.

## 1.43.10 — cleaner review and reference lookups

- Add CinemaZ, AvistaZ, PrivateHD and AnimeZ torrent-page adapters. Inspect torrent
  opens MediaInfo directly and reads the posted report even when its panel is collapsed.
  Include video/audio/subtitle details, title/report warnings, source evidence and notes.
  Selectors are confirmed against supplied CinemaZ detail and listing HTML; the other
  three use the same shared markup and have been tested with matching offline fixtures.
  Missing reports remain unknown. No naming rules are invented for these sites.
- Keep one local decision dropdown per moderation row, including when its badge moves
  inside the title or a row changes. Tracker approval buttons are untouched.
- Replace TorrentLeech/FileList inline source evidence and automatic popup with compact
  page actions opening the same five-tab Review panel, including private notes.
- Put srrDB next to Compare releases on the torrent page.
- Exact title searches use title + season/episode or year + release group, omitting
  resolution, source, codec and audio tags. Queries remain editable.
- Show Goodreads and Google Books for books/audiobooks, preferring a checksum-valid
  ISBN-10/13 in the title, then the loaded UNIT3D description, otherwise title/author.
  Discogs is available for music and IGDB for games. These are click-to-open links.
- Add AnimeZ to the tracker picker and verify the existing CinemaZ, AvistaZ and PrivateHD
  templates against the user-supplied format. There are now 64 searchable trackers.
- Shared with personal Scene Edition 1.49.10. No background requests or site submissions.

## 1.43.9 — a shorter README

- Keep installation, the current Review workflow, source comparisons and one panel
  screenshot in the README. Link to the guide, website gallery and this changelog
  instead of repeating detailed instructions and historical release notes.
- Preserve an exact pre-cleanup README in the development archive. All removed
  version sections already have entries in this changelog.
- Script behavior is unchanged from 1.43.8; both edition numbers advance together.

## 1.43.8 — shared source evidence on FileList and TorrentLeech

- Compare parsed adapter evidence, including FileList tooltip filenames and the ID
  saved from this same torrent’s separate Media Info page. Label remembered IDs.
- Preserve and share the report’s complete filename separately from the file list.
- Refresh inline source panels and open source dialogs on tab return and page changes,
  preserving disclosure choices. Exclude script output from page observations.
- Observed IDs take precedence over remembered IDs; expired report evidence is not
  revived by returning to details. No cross-tracker copying of missing facts.

## 1.43.7 — keep open source comparisons current

- Refresh the open Source check panel after page evidence changes, when returning
  to the tracker tab, and on local source-storage notifications.
- Update filenames, current fingerprint and comparison counts without reopening
  Review. Preserve notes, disclosure choices, focus and scroll position.
- Leave unchanged evidence untouched and keep excluding the script’s own text from
  source comparisons. No new network requests, storage keys or tracker actions.

## 1.43.6 — website and release synchronization

- Put the unified Review panel first on the website; update queue, lookup, source and
  setup tutorials, captions and demo introductions to use the current controls.
- Share navigation and version labels across the home page, rules builder and demos.
- Ship the userscript, GUIDE.md and CHANGELOG.md with the website. Install links use
  that local userscript so the download cannot silently point to an older GitHub build.
- Version screenshot URLs and constrain the workflow gallery on narrow screens.
- Remove references to the retired legacy walkthrough and older grouped change notes
  from the public documentation, as requested.
- Userscript behavior is unchanged from 1.43.5; this release synchronizes delivery.

## 1.43.5 — original-language comparison correction

- Strip the Primary Language label before passing the page value to naming and page
  checks. Treat existing ISO language aliases (including es/spa/Spanish) consistently.
- Fix the false missing-original warning reported for Queen of Coal / Miss Carbón,
  with Spanish and English audio. Keep genuine mismatches and English-original
  Dual-Audio findings, including after the page changes.
- Invalidate cached page findings when loaded evidence changes, and update wording
  when a finding keeps its code but names a different language or track.

## 1.43.4 — source details visible immediately

- Open current torrent details above the comparisons, preserving the full filename
  when the loaded file list provides one. Keep ID, folder and size visible.
- Start tracker comparison rows expanded in Source check, showing filename, exact ID
  evidence and return link without another click. Rows can still be collapsed.
- Keep automatic notices compact and the older saved answer separately labelled.

## 1.43.3 — one complete Source check view

- Route the tools-bar Source check button into the unified Source check tab on supported
  UNIT3D detail pages. Other pages use a matching source dialog instead of reviving the
  old unbounded popup. Dismiss the current automatic notice when opening the full view.
- Show all comparisons against the current loaded page using the existing source
  matcher, not only the last saved answer about this torrent. Separate ID matches,
  name/size-only matches, ID mismatches and cases needing review.
- Use shared expandable evidence rows in the panel and optional automatic notices.
  Keep exact filenames, sizes, IDs and safe tracker links inside each row. Bound the
  automatic notice's height; preserve the existing quiet preference and storage format.
- Label the current fingerprint and last saved check on another page separately.
  Stop claiming that every match displayed a banner when notices were suppressed.
- Reproduce eight remembered trackers plus one older saved result in both browser
  editions. Cover mismatch refresh, missing evidence, empty state, mobile width,
  preference preservation and exclusion of the panel's own text from comparisons.
- Shared with personal Scene Edition 1.49.3. No tracker rule or matching threshold changed.

## 1.43.2 — shared lookup controls and a quieter torrent page

- Replace the four torrent lookup rows with compact metadata links and three actions:
  Inspect torrent, Find other releases and Compare releases. Keep comparison capture,
  source checking, file markers and the advanced Inspector working through their existing tools.
- Add Find releases as the fifth Review tab, including keyboard navigation and restored
  tab selection. Use one shared search pane on UNIT3D, TorrentLeech and FileList pages.
- Build searches from an editable title or exact release name. Keep the episode in title
  searches and apply quality terms to every destination. Edited searches use the text
  query instead of an IMDb shortcut. Retain catalogue addresses and category eligibility.
- Show every eligible enabled tracker in a responsive grid, with the existing chooser,
  Search all and blocked-popup feedback. Move reference sites and Copy title into More
  lookup sites. Read metadata IDs only from the actual torrent page, never a listing.
- Remove the obsolete lookup-row builders, exact-name row and unused variants helper.
  Remove the description-copy prototype modules, sample, tests and guarded Scene hook:
  neither build shipped that feature. Keep the legacy storage exclusion; erase no data.
- Shared with personal Scene Edition 1.49.2. No tracker rules or network operations added.

## 1.43.1 — the unified panel on individual torrent pages

- Route the normal Inspect torrent launcher and the standalone Alt+Shift+I shortcut
  into the unified Review panel on supported UNIT3D detail pages. Remove the extra
  Review torrent launcher. Other pages retain the existing pasted-report Inspector.
- Open Review without a selected naming rule set. The neutral Findings state and
  copied report explicitly say checks were not run; no foreign naming guide, badge or
  conforming action is applied. MediaInfo, source evidence and private notes remain usable.
- Keep progress made without rules in a reserved context distinct from every valid
  tracker-profile key. Notes remain available when the rule set changes.
- Present MediaInfo using the existing parser: four summary cards, video details,
  audio/subtitle tables and a collapsible technical report. Track tables scroll on narrow
  screens and show at most 100 rows; the report retains the parsed tracks.
- The Scene Edition's home and away launchers follow the same flow. Advanced pasted
  reports and comparisons remain inside More tools. Shared with Scene Edition 1.49.1.
- Extend navigation regressions to cover the default detail launcher, no-rules mode,
  truthful copied reports, rule-context changes and a locally fulfilled YU-Scene-shaped
  fixture. No live tracker was contacted and no tracker rules or new selectors were added.

## 1.43.0 — one Review panel and a saved queue

- review-core.js and review-ui.js: bring the existing findings, MediaInfo reader, source
  section and private notes into four tabs. Copy report and local review progress stay in
  the footer. Templates and advanced tools are folded away. Keyboard tabs, focus and
  narrow-screen layout use the script's own dialog.
- listing.js and detail.js: Review loaded titles captures up to 200 actual same-origin
  torrent links; Review torrent opens the panel on a supported detail page. Explicit queue
  navigation reopens it once on the selected destination, with a two-minute continuation
  limit. No numeric ID guessing, crawling or added requests.
- Local progress and tab state are isolated by origin, torrent, rule set and release name.
  Reviewed by me never changes a verdict or calls the older Mark as conforming feature.
- Notes save as typed and remain compatible with the old Inspector. New note overrides
  include the tracker origin; clearing one does not resurrect its legacy note. Backup
  includes both new keys and omits private review notes when asked.
- Storage bounds: eight queues, 200 links per queue, 500 progress records, 200 note entries,
  20,000 characters per note and 200,000 note characters in total. Oldest entries leave
  first. Reads validate data and writes report failure. No tracker rules changed.
- New core checks and full-page browser navigation checks cover restoration, sparse links,
  note compatibility, unchanged red verdicts, keyboard use and mobile layout. Fixture
  runners now fail on uncaught errors and counts below the recorded baseline.
- Shared implementation also ships in personal Scene Edition 1.49.0.

## 1.42.7 — fewer controls between you and the review

- listing.js: group automatic checks, tracker choices, internal groups, tracker rules,
  backup and log actions in a closed native Settings & tools disclosure. Keep the active
  rules, audit action and result counts visible. The tracker chooser uses the existing
  settings dialog and storage. No new storage keys.
- listing.js and detail.js: place report/open actions before the long findings.
- capture.js and inspector-ui.js: label the capture entry point Compare releases and
  use that wording in the Inspector's empty-capture message.
- inspector.css and scene.css: wrap the settings controls on narrow screens; keep all
  styling inside the script's own UI. Shared modules copied to Scene 1.48.3.
- Local browser runners accept PYTHON and PLAYWRIGHT_CHROMIUM_EXECUTABLE overrides,
  allowing verification with installed runtimes on Windows.
- Existing checks exposed three workspace inconsistencies: the unbuilt description
  prototype's key was missing its backup exclusion, Scene startup called its absent UI,
  and the title finder missed a known heading after 6,000 candidates. The prototype is
  explicitly excluded, its optional startup call guarded, and known name headings and
  their inner text checked before the bounded general walk.

## 1.42.6 — the profile builder learns books, music, audiobooks and resolutions

- profiles.js `build()` takes `ownBooks`, `ownMusic`, `audiobookFolders` and
  `resolutions` (a string or list; entries not of the form `\d{3,4}[pi]` dropped) and
  writes `books`, `music`, `audiobooks` and `resolutions` accordingly — before, it wrote
  none of the three and an empty list. profiles-ui.js: a "Where this tracker goes its own
  way" fieldset with the three boxes and a resolutions field; the *Added trackers* summary
  adds "audiobook folder standard" and the resolution list. site/rules-page.html: the same
  fieldset and field, wired into the draft and the untouched test; the Check summary's
  Templates line names the folder standard and the resolutions. profiles-check: the builder test gains the defaults and the all-four-set case (938 in all); rules-page-check +3 (55). Both seen red first.

## 1.42.5 — the demo: a page for every torrent and request

- site/build-site.mjs: `TORRENTS` (101–106) and `REQUESTS` (12–14) tables; a shell()
  shared by the listing, the requests page, six torrent pages (`torrents/<id>/index.html`,
  each with the release, the UNIT3D meta spans, a `.dialog__form[data-tab="list"]` file
  list with byte counts in the size's title, and a MediaInfo whose Unique ID decimal and
  hex agree) and three request pages (`requests/<id>/index.html`, h1 + `.request__category`).
  101 carries the remembered upload; 102 is an S02 pack missing E04 with DDP5.1 in the
  name; 103 is -RARBG; 104 is music (badge from the heading); 105 has original language
  Japanese and an English-only report; 106 is untagged 576p. tools/demo/listing.html row
  106 is now that untagged name (was "Unknown Release"); screenshots regenerated.
  Checked in Chromium: badges pass/error/error/pass/review/review on 101–106, the file
  marker on each, the banner on 101, the E04 gap in 102's dialog, request links on 12–14;
  no page errors. Script unchanged; Scene stays 1.48.1.

## 1.42.4 — tools/check-list.mjs: a list of torrents against one tracker's rules

- `node tools/check-list.mjs <in.csv|in.txt> [--rules zenith] [--out out.csv] [--only
  missing,possible]` — repository tool, not part of the script. Reads a CSV with a name
  column (the report zenith_fill.py writes, or any other) or a plain list, writes the same
  rows with `verdict` (blocked / check / ok / unclear / skipped), `blocks`, `questions`,
  `display_name`, `category_used` and `cosmetic_ua_fixes`. The verdict comes only from the
  tracker's own rules (rules.js `check()`, the standing reminders left out) and its banned
  list (groups.js `find()`); the shared template's findings — dots, spacing, DDP — go in
  their own column because Upload-Assistant rewrites the title anyway ("remember that UA
  will fix the titles", 23 Sep 2026). Category guessed from the name (S## → TV; year and
  source → Movies; "Artist - Album (Year)" → Music) unless the CSV has one. Offline; a
  throwaway store; nothing fetched. Script unchanged; Scene stays 1.48.1.

## 1.42.3 — the demo pages at real addresses

- site/build-site.mjs writes the demo to `torrents/index.html`, `torrents/101/index.html`
  and `requests/index.html` (folders GitHub Pages serves at `/torrents/`, `/torrents/101/`,
  `/requests/`; the script's page tests accept the trailing slash) instead of faking the
  address with replaceState, which left a reload on the host's 404 (seen 23 Sep 2026,
  `torrent.dkokto.dev/torrents/101`). `demo.html`, `demo-listing.html` and
  `demo-requests.html` are now one-line redirects. `<meta name="robots" content="noindex">`
  on the demo pages. Checked in Chromium: each page draws, survives a reload, the listing's
  row link lands on the torrent page with the banner up, the redirect works.

## 1.42.2 — the site: a live demo, a shorter front page, source-check screenshots

- site/build-site.mjs builds `demo.html` (torrent page), `demo-listing.html` and
  `demo-requests.html` from the three offline demo pages in tools/demo, with common.css,
  a shell strip, a shim (GM_info / GM_registerMenuCommand / GM_addStyle stubs, the `dp`
  rule set for the host, four trackers ticked if none are, and on the torrent page a
  remembered upload whose Unique ID, file name and size match the page's MediaInfo) and
  the current built script inlined. Each page sets the address the script reads with
  replaceState (`/torrents`, `/torrents/101`, `/requests`) and puts the real one back on
  pagehide. Checked in Chromium: badges, the lookup rows, the banner, Close + Source check,
  the request buttons; no page errors.
- site/index-page.html rewritten: 790 → ~560 lines; a "What you get" fourth card and a
  section for the source check; the stale numbers (60/43 trackers, 47 @match, "six badge
  out of the box", the 1.25.0 / 1.26.0 / 1.34.0 asides, the internal-groups history) gone;
  seven rule sets throughout; tutorials 7 → 6 with a new one for the source check; a
  "Try it without installing" button.
- tools/demo: the torrent page's MediaInfo carries a Unique ID and Complete name; the
  pages link `/tools/demo/common.css` (the bare `common.css` under `<base href="/">` had
  stopped resolving, so the shots came out unstyled). tools/screenshots.mjs seeds the
  remembered upload and takes `14-source-banner.png`, `15-source-section.png`, and
  `13-tools-bar.png` with the third button; all fifteen regenerated, halved and quantised
  into pkg/…/screenshots and site/screenshots. README gains the three.
- Script unchanged; the Scene edition stays at 1.48.1.

## 1.42.1 — the banner can wait for the Source check button

- source.js: `options.quiet` in the `dkokto_source_v1` record (read() takes only `true`,
  write() always carries it, every write goes through read() so it survives remember()
  and check()); `quiet()` / `setQuiet(on)` exported. source-ui.js: `banner()` records the
  rows and returns without drawing when quiet is on and the call is not from the button;
  `quietBox()` — a labelled checkbox "Only show this when I press Source check" — sits in
  the footer of the banner and of the "looked for" box. inspector.css (shared) and
  scene.css: `.dk-source-quiet`. Asked 23 Sep 2026 ("I want that setting please").
  source-check +1 test (Node 938); detail fixture +6 (255): off by default, ticking is stored, a new
  answer stays quiet, the button shows it, unticking restores. Red with the quiet return
  removed (229, at "a new answer does not put the banner up by itself").

## 1.42.0 — a Source check button in the tools bar

- source-ui.js: `toolsButton()` adds `.dk-source-launch` ("Source check") after
  `.dk-inspector-launch` in `#dkokto-tools` / `#dp-inspector-tools`, once; `reveal()`
  redraws the last banner (`banner(rows, again=true)` lifts the closed mark and skips the
  same-key shortcut) or, with no rows, puts a `.dk-source-banner` box holding `looked()`
  and a Close. `banner()` now leaves the page alone when nothing was found and nothing
  is shown (`!key && !shown`), so a redraw does not sweep that box away; the fixed-position
  fallback moved into `pin()`. detail.js draw() and elsewhere.js run() call
  `toolsButton()` on every pass. Asked 23 Sep 2026 ("this page shows up with a button
  press next to the torrent inspector button"). Detail fixture +6 (249): the button before
  any banner; the "looked for" box and its Close; the banner back after Close and closed
  again. Red with the detail.js call removed (212, the first new check).

## 1.41.3 — music torrent pages get a badge

- detail.js `draw()`: the 0-score allowance from 1.40.0 covers `music` as well as
  `audiobook`/`ebook`, and accepts the fallback node when it is `.torrent__name` or the
  page's `h1` (release-title.js falls back to those two in that order). Seen 23 Sep 2026
  on a MidnightScene torrent page ("Dope (FR) ft. Lydia Scarfo-Concrete Groove-(DH134)-
  SINGLE-WEB-2026-PTC": no badge, no rows). Detail fixture +2 (red under `mns`, the
  dialog quotes the guest-credit rule); it went red with the allowance narrowed back.

## 1.41.2 — images for the repository

- `images/`: `logo.svg` with PNGs at 512/256/128/64/32 (rounded tile, lens, green tick),
  `banner.svg` + `banner.png` (1600×420, at the top of README.md), `social-preview.png`
  (1280×640, for GitHub's Settings → Social preview; set by hand). All drawn as SVG in the
  site's palette and rendered with the checks' own Chromium; no third-party artwork.
  site/: `images/logo.svg` and a `<link rel="icon">` on both pages. Script unchanged; the
  Scene edition stays at 1.47.1.

## 1.41.1 — the group after a music title's bracketed format is a tag

- groups.js `trailingTag()`: `] - Word` at the end of a title returns `Word` before the
  hyphen loop runs (one word of up to 30 tag characters; "] - Deluxe Edition" is not a
  tag). group-tag.js `mark()`: the tag may follow "-" or "- " — it wraps only the tag and
  keeps the hyphen and any space in the text node; the already-marked test and the
  written-back test accept both spellings. 1.40.1's entry said the two Zenith rows were
  right with no mark; they were not ("its 1.47.0 and still showing no orange for the
  craftwork part", 23 Sep 2026). groups-check rewritten for the new answer (+1 subtitle
  case); listing fixture +2 (the mark on that row, the name unchanged).

## 1.41.0 — InfinityHD; the HDTV codec list made reachable

- **InfinityHD** (infinityhd.net; banned list and Naming Guide supplied as text 23 Sep
  2026, verbatim in `notes/infinityhd-rules-2026-09-23.md`). trackers.js
  `unit('ihd','InfinityHD','infinityhd.net')` — the host is the one given; the name-search
  path is UNIT3D's like every unit() entry, with no page seen to confirm it (recorded in
  TRACKER-ADDRESSES.txt). tracker-guides.js `INFINITYHD`: base `dp`, 126 banned names
  (128 printed, less BRrip → groups.sources and the NhaNc3/nhanc3 duplicate), no reasons
  (the page gives none per name), resolutions `1080i 1080p 2160p 4320p`, 19 rules
  (no-group, acodec-ddp, acodec-ac3, acodec-dolby, object-atmos, hdr-vocab incl. bare
  "DV HDR", vcodec-dot, vcodec-web, vcodec-webrip, vcodec-remux, type-webdl, type-webrip,
  web-service, remux-source, encode-source, edition-name (review), dub-dual-audio,
  repack-number, multi-season) and two notes (naming-details, not-supplied).
  guides-check: +2 tests (7 template-shaped titles pass its rules and the shared ones; a
  case per rule; the banned list through groups.find with "in" matched only as a closing
  tag); links-check +1 (catalogue entry and @match line); the key lists in guides-,
  profiles- and rules-check gain `ihd`. Counts: 45 UNIT3D hosts, 63 searchable, 48 @match.
- **naming.js**: the HDTV/UHDTV/SDTV video-codec allow list tested those words against
  `releaseKind`, which for a capture is the string "TV capture", so the branch was
  unreachable and captures were held to the encode list. It now also matches
  `releaseKind==='TV capture'`. naming-check +1 test.
- Docs: README, GUIDE, TRACKER-RULES (row; "seven"), TRACKER-ADDRESSES, dk/README, site
  index page (counts and the shipped list), CLAUDE.md.

## 1.40.1 — the byte count beside the rounded size

- source.js `sizeText()`: `20.40 GiB, 21,904,512,000 bytes` — the exact count grouped in
  threes after the rounded form, in the summary line's three shapes (✓, ✗, none shown).
  Asked 23 Sep 2026 ("I want the byte size to be able to compare as well"). source-check's
  four size assertions and the elsewhere fixture's size check now expect both.
- groups.js `trailingTag()`: a tail containing a spaced " - " is not a tag, and the
  per-word technical test strips a closing `]` or `)` before matching. Two rows on Zenith's
  moderation queue (23 Sep 2026) had `44kHz] - craftwork` marked as the group: the hyphen
  in `16bit-44kHz` opened a tag, `44kHz]` did not read as technical with the bracket on, and
  the tail ran to the end. groups-check +4 (three no-tag titles, one tags() result).

## 1.40.0 — HomieHelpDesk's audiobook standard; the size on the banner line; a group tag after Zenith's music format

- **HomieHelpDesk audiobooks** (its Audiobook Naming and Folder Standard, supplied 22 Sep
  2026, now at the end of `notes/homiehelpdesk-rules-2026-09-20.md`). Profiles gain an
  `audiobooks` field (`base` | `folder-standard`; profiles.js validates it, rules.js
  `audiobooksOf(key)` reads it) and the HHD profile sets it. tracker-guides.js: rules
  `ab-form` (review: `Author - Title (Read by Narrator)`, optionally `.m4b`), `ab-url`
  (error) and `ab-group` (review) on the audiobook profile; the `books:'own'` note now
  covers ebooks only, and a new `audiobook` note carries the tags / companion-files / junk
  reminders. naming.js `audiobookPayload(files, add)` runs when the profile is `audiobook`,
  the tracker's `audiobooksOf` is `folder-standard` and a file list was handed in:
  `ab-root-folder` (more than one audio file not under one root folder), `ab-track-numbers`
  (audio names not starting with two digits, or three once there are 100 or more),
  `ab-junk` (`.nfo`, `.txt`, `.url`). detail.js `draw()`: a name that release-title.js
  scores 0 is accepted when the page's category is audiobook or ebook and the fallback is
  the page's own `.torrent__name` (HomieHelpDesk torrent 78628, seen 22 Sep 2026) — before
  this no book or audiobook name ever got a badge on a torrent page. Checks: guides-check
  (+1 test, 4 firing cases), naming-check (+1 test), detail fixture (+4).
- **source.js `summary()`** prints the compared size beside the mark: `size ✓ (20.40 GiB)`,
  `size ✗ (20.40 GiB)`, `size – (none shown; 20.40 GiB here)`; GiB from a gibibyte up,
  MiB below; `entry.bytes` first, `entry.totalBytes` when there is no one file; nothing in
  brackets when neither is known. source-check (+6 assertions), elsewhere fixture (+1).
- **rules.js Zenith music** (`zenith-mu-form`): the suggested-shape pattern allows one
  `- Tag` after the bracketed format. Seen on a Zenith listing 22 Sep 2026: `Aphex Twin -
  ...I Care Because You Do (2009) - [CD FLAC 16bit-44kHz] - craftwork` was amber only for
  ending in a group tag; Zenith's rule 1.4 keeps the original group tag and only artist and
  album are required. Two words after the bracket still get the note. The leading dots are
  the album's own title; listing-core.js's shortened-title test is end-anchored and never
  fired on it (moderation-check now says so, +2). rules-check +4.
- tools/run-fixtures.mjs: the detail fixture's wait is 95 s (was 75; the audiobook block
  pushed the run over).
- Counts: Node 928 per edition (was 924); fixtures — see VALIDATION-1.40.0.txt.

## 1.39.5 — the README cut down; the source-check modules made readable

- **README.md**: 90 KB → 15 KB. Everything above "Fixed in 1.39.0" is kept (intro,
  screenshots, install, what to read, the 1.39.x notes); the 75 older version sections are
  gone, with a pointer to CHANGELOG.md; the tail ("What it does", "What it will not do",
  "Scope and limits", "Run only one copy", "Source and checks") is rewritten for the script
  as it stands — the old "What it does" still described 1.8, listed 20 check commands by
  hand and named the transcript files removed in 1.39.4. The coverage sentences the
  links-check reads are unchanged.
- **source.js**, **source-core.js**, **source-ui.js**, **elsewhere.js**,
  **elsewhere-core.js**: reformatted one statement per line with spaces, comments rewritten
  as explanations (what, why, and which saved page a selector came from); `verdict()` and
  `lookups()` split out of `banner()` and `panel()` for legibility. No behaviour change:
  Node 924, every fixture at its 1.39.4 count, 82 shared modules. Two comments that said
  "the user" were reworded — the built-script check refuses that phrase — and no comment in
  the published file names a person.

## 1.39.4 — cleanup

- Every `*-check.cjs` (both editions) and `dk/source/check.cjs` stop writing their
  `*-CHECKS.txt` transcript; the 67 committed transcripts are deleted (29 in the package
  root, 38 in dk/, among them `MOBILE-1.3-CHECKS.txt` and the `*-BROWSER-CHECKS.txt` files
  that nothing had written for some time). run-checks.mjs's comment updated.
- **source-ui.js**: `pageText()` and `OWN` (the selector for everything this script draws,
  now including `[id^="dp-inspector"]`) live here; **detail.js** and **elsewhere.js** call
  it instead of carrying their own copies, which had drifted by that one selector.
- **elsewhere-core.js**: the unread `lowercases` field removed. **elsewhere.js**: a no-op
  `.map()` on the trackers row removed; `run` and `pageText` no longer exported.
- `PENDING-NEXT-VERSION.txt` → `TRACKER-ADDRESSES.txt` (both editions, identical), with a
  new heading saying what it is and the FileList entry of 22 Sep 2026 added. CLAUDE.md
  rule 4 points at the new name; its "Open items" is condensed to what is open.
- Checks unchanged in count: Node 924, all fixtures as at 1.39.3, 82 shared modules.

## 1.39.3 — the FileList panel sits inside the content box

- **elsewhere.js** `anchor()`: on FileList the panel is prepended to `.cblock-innercontent`
  of the name's `.cblock` rather than inserted after `.cblock-header` — the header strip is
  `.cblock-headerleft` / `.cblock-header` / `.cblock-headerright` and a clearfix, and a
  block between them broke the frame (Khamere's screenshot, 22 Sep 2026: "We broke the
  html slightly, look past the star"). TorrentLeech unchanged (after `#torrentnameid`).
- Checks: elsewhere fixture updated (first child of `.cblock-innercontent`, no previous
  sibling); red with the module reverted. Probe of the real details page: parent
  `DIV.cblock-innercontent`. Node 924, elsewhere 31, 82 shared modules.

## 1.39.2 — the release name is not read out of the description

- **release-title.js**: `.bbcode-rendered` added to SKIP (UNIT3D's rendered description;
  HomieHelpDesk torrent 78628, saved 22 Sep 2026, quoted the NFO in Release Notes and its
  `<b>Full.Dive….S01E01….REMUX-FraMeSToR</b>` scored 13 like the real name and was shorter,
  so it won the tie); `h1.torrent__name` (`OWN_NAME`) gets +1 when it reads like a release,
  so the page's own name element wins ties. On the saved page the badge moves from the NFO
  line to the h1 and the "page disagrees" finding goes away.
- Checks: detail fixture +1 (a release-looking `<b>` inside `.panel__body.bbcode-rendered`
  does not take the badge; red with the module reverted). tools/saved-page probe on the
  real page: badge on `H1.torrent__name`, state pass. Node 924, detail 237 (236), 82 shared
  modules.

## 1.39.1 — Choose trackers… on the TorrentLeech / FileList panel

- **elsewhere.js**: a `Choose trackers…` button (`aria-haspopup=dialog`) calling
  `DKOKTO_REQUESTS.settings()` with a redraw callback (the signature is cleared so the panel
  is rebuilt with the new choice). Khamere, 22 Sep 2026, from the live FileList page: "can
  we make it so that FileList is one of the searchable things" — it was in the catalogue
  since 1.39.0 but unticked, and the panel offered no way to tick it.
- Checks: elsewhere fixture +2 (the button; the dialog it opens lists FileList). Red with
  the label changed; restored. Node 924, elsewhere 31, 82 shared modules.

## 1.39.0 — TorrentLeech and FileList torrent pages

- **elsewhere-core.js** (new): one adapter per non-UNIT3D site, every selector from the
  pages Khamere saved on 22 Sep 2026 (TorrentLeech torrent 241837762; FileList details
  975915 and 976307 with their Media Info pages). `where(url)` — TL `/torrent/{id}`; FL
  `details.php?id=` and `mediainfo.php?id=`, the same torrent; `read(doc,url)` — title
  (`#torrentnameid`; `.cblock-header h4`, the link's text on the Media Info page), files
  (`#fileListTable`; the `Files` tooltip's title HTML), total (`td.description` Size;
  `<b>Size</b>`), report (FL `font` block, `<br>`→newline, `&nbsp;`→space), the Media
  Info link; the main file is the report's Complete name, else the one non-sample video.
  `hosts()` feeds both build headers.
- **elsewhere.js** (new): on those pages, remember → check → banner → one panel
  (`.dk-elsewhere`: Look up with the site's own catalogue search first and no
  UNIT3D-relative searches, On your trackers, This exact name, Copy title, the Source check
  section, and a note about the Media Info page or the absence of MediaInfo). Its own
  page-text walker, its own row class (detail.js clears `.dk-detail-links` off-UNIT3D). On
  loopback the page names its address in `data-dk-elsewhere-url` for the preview.
- **source.js**: `remember()` merges into an existing entry (non-empty fields win), so a
  FileList details visit and a Media Info visit are one upload; `entryFor()`; an upload with
  files but no name or ID is still remembered; `byNameOnly()` and `allGood()` accept a
  name-and-size match where there is no ID; `caseOnly` kept in results and shown in
  `summary()`. **source-core.js** `compare()`: case-insensitive fallback for names, folder
  and files with `caseOnly`. **source-ui.js**: "✓ Same name and size as … (no Unique ID to
  compare)" / "Matched by name and size on …".
- **trackers.js**: `fl` FileList, `https://filelist.io/browse.php?search={q}&cat=0&searchin=1&sort=2`
  (given 22 Sep 2026). **build.mjs** (both): `ELSEWHERE` hosts appended to `@match` (47
  lines). **host.js**, **away.js**: `DKOKTO_ELSEWHERE.mount()`. **inspector.css**,
  **scene.css**: the panel and its rows.
- Checks: elsewhere-check.cjs (5: hosts, addresses incl. the Media Info page, merge on
  remember, case-only match, no network); elsewhere-preview + elsewhere-fixture.js (29, both
  editions: TL read/remember/banner/panel/lookups/idempotence; FL details then Media Info
  with the ID filled in and the banner by ID; own output not page text); inspector-check /
  check.cjs and links-check extended for the two extra `@match` lines; README/site counts
  62 searchable. tools/saved-page.mjs against all four real pages, Scene build: TL "same name
  and size (case differs there)", FL details "file name ✓ · size ✓", FL Media Info "Unique
  ID ✓", the ten-file season remembered with its files. Node 924 (914), 82 shared modules
  (78), elsewhere 29.

## 1.38.3 — a missing banner explains itself; the script's own output is not page text

- **detail.js** `pageText()`: a TreeWalker over body text nodes, rejecting anything under
  `[class^="dk-"],[class*=" dk-"],[id^="dkokto-"]` — the badges, dialogs, hub, tools and the
  source banner. Found with tools/saved-page.mjs on Khamere's saved OnlyEncodes page: a
  planted H.265 fingerprint came up "file name ✓" on the H.264 page because the first
  banner had printed the name and the redraw read it back.
- **source.js**: `check()` records `last()` — host, how many other trackers' uploads were
  looked for, their hosts, how many matched, whether the page prints a Unique ID.
  **source-ui.js** `looked()`: that as a sentence at the end of the dialog's Source check
  section (`.dk-source-looked`), or "Nothing is remembered from other trackers yet".
- **source-ui.js** `banner()`: after appending, if the computed position is not `fixed` the
  placement is set on the element (`style.position` etc.) — CSSOM writes are not subject
  to a page's stylesheet policy.
- **tools/saved-page.mjs**: runs a built edition against a saved torrent page at its own
  address with every request intercepted (nothing leaves the machine), a remembered upload
  planted from a JSON file; prints banner, badge state, store and page errors.
- Checks: detail fixture +5 (the "nothing remembered yet" line; the banner's top is 12px;
  a remembered name not on the page is ✗ and stays ✗ after a redraw with its own banner
  present; the looked-for sentence with counts). Red with source.js/source-ui.js reverted
  (209) and with detail.js's pageText reverted; restored. Node 914, detail 236 (231), 78
  shared modules.

## 1.38.2 — hidden MediaInfo is read; no ID is a dash; the file name in the banner

- **detail.js**: the page text handed to the source check is `document.body.textContent`,
  not `innerText` — trackers keep the MediaInfo in a panel that is `display:none` until
  clicked, and innerText leaves hidden text out (Khamere's banner on a third tracker read
  "this page shows none" with the report plainly on the page, 22 Sep 2026).
- **source-core.js** `compare()`: `idMatch` is `null` when the page prints no Unique ID at
  all (was `false`); `idsOnPage` says why. `source-id` is unchanged (it already needed
  `idsOnPage`). **source.js** `summary(r, entry, page)`: the dash reads "(none here)" when
  the upload had no ID and "(none on this page)" / "(none on <host>)" when the other page
  had none.
- **source-ui.js** `banner()`: the file name (the only file, else the remembered base) under
  the title as `.dk-source-file`, monospace, `white-space:pre-wrap`; a name containing a
  space gets `.dk-source-spaces` "The file name has spaces in it." (Khamere: "display the
  filename under the title, that way we can check easily for spaces").
- **source-ui.js** `banner()`: drawn only when its key (host|id|verdicts per row) changes;
  rows sorted by host then id; a Close is remembered per key for the page's lifetime
  (Khamere's 14 s recording: rows reordering on every redraw, and "the close button didn't
  work" — draw() reran on each DOM change and re-appended it).
- **inspector.css**, **dk/source/scene.css**: `.dk-source-file`, `.dk-source-spaces`.
- Checks: detail fixture +4 (…and the banner stays closed across a redraw; the hidden-panel
  step uses its own id 557 so a closed answer does not mask it) (a hidden `.torrent-mediainfo-dump` is still read; a page with
  no ID says dash, not cross; the file name under the title). source-check +5 assertions
  (`idMatch` null with `idsOnPage` 0; both dash wordings). Red with the four modules
  reverted (detail 213, two assertion errors); the Close logic alone mutated: red at 217
  on the stays-closed check; restored. Node 914, detail 231 (227), 78 shared modules.

## 1.38.1 — the source check shows its Unique IDs

- **source-ui.js**: `section()` opens with a small list of what was remembered (Unique ID,
  file name, folder, size — `.dk-source-what`); `banner()` rows carry a line with the
  remembered ID and the ID(s) found on the page (`.dk-source-ids`, up to three). A kept
  "different" answer prints the source's ID in the dialog and in the `source-id` finding.
- **source.js**: results gain `idFound` (the first ID the source page showed when the match
  failed; 32 hex chars, validated on read, '' otherwise); `check()` returns the page's IDs
  alongside each found entry (not stored).
- **inspector.css**: `.dk-source-what`, `.dk-source-ids`. **dk/source/scene.css**: the checklist and
  source styles were never copied in for the Scene edition (1.43.0/1.44.0 shipped the tick
  boxes and the banner unstyled there); copied now, guarded by a fixture check that the
  banner is `position:fixed` in whichever edition runs it.
- Checks: detail fixture +6 (banner styled in this edition) (the dialog shows the remembered ID and file name; the banner
  shows the matched ID; a differing page shows both IDs and keeps `idFound`; the home dialog
  prints the source's ID). source-check: `idFound` kept and named in the finding; a malformed
  kept ID is dropped. Both red with source.js/source-ui.js reverted. Node 914, detail 227
  (221), 78 shared modules.

## 1.38.0 — the source check: is this the same file the source tracker has?

- **source-core.js** (pure): `uniqueId()` (decimal/hex → 32 hex chars; `{bad:true}` when the
  halves disagree), `bytesOf()`, `reportAgainstFiles(file, rows)` (the report's File size
  and Complete name against the page's file rows, matched by name or the only video file;
  2% tolerance), `idsIn(text)` and `compare(text, entry)` (Unique ID, file name, folder,
  file names, exact bytes or a rounded size within 0.5%, and whether the page mentions the
  upload at all). Loaded before naming.js, which now takes `options.fileRows` and
  `options.sourceIssues` and adds `unique-id-bad` (error), `report-size` (error) and
  `report-name` (review). A Matroska report with no Unique ID is deliberately not asked
  about. The page's Type field was left to page-core.js, which already does it.
- **source.js**: key `dkokto_source_v1` — `pending` fingerprints (`host|id`, ≤25, three
  days) and `results` per fingerprint (≤100), every field validated on read; `remember()`,
  `pending()`, `check(pageText, {host,url})` (skips fingerprints from this host; keeps an
  answer for each the page mentions), `resultFor()`, `issues()` (`source-id` error when the
  page's IDs exist and none match; `source-name` / `source-folder` / `source-size` /
  `source-files` review), `summary()`, `allGood()`. In backup-core.js KEYS.
- **source-ui.js**: the banner (`.dk-source-banner`, one row per upload the page is about,
  a link back opened only on click, Close) and the dialog section (`.dk-source`).
- **detail.js**: `fingerprint()` from `checklist.where()`, the page's report and
  `DKOKTO_FILES_UI.list()`; `known()` hands `fileRows` and the kept `sourceIssues` to the
  check; `draw()` remembers this page and runs `check()` on the page's text; the dialog
  shows the section for video. inspector.css: the banner and section styles.
- **Checks.** source-check.cjs (6): the ID forms, the hand-edited case through naming, the
  report against the rows, `compare()` on a synthetic page, the store (remember, answer from
  another host, no answer from the same host, a differing ID as a red finding, bounds, a
  hand-broken store, the Backup key, no network). Detail fixture +16: red badge and dialog
  text for a hand-edited ID; an honest one remembered under `localhost|1761533513`; the
  Source check section; the banner as the source page (✓ same release, kept under
  `midnightscene.cc|555`, Close); a differing ID told apart and kept; a kept "different"
  answer turning the home badge red with the tracker and date in the dialog; the report's
  size against the file list (red) and a Complete name not on the page (question). Red with
  detail.js's remember/issues wiring reverted. Planted fetch in source.js refused.
  Node 914 (902), detail 221 (205), 78 shared modules.
- **site/build-site.mjs**: source-core.js added to the rules page's bundle before naming.js
  (its NEEDS guard caught the missing global: naming.js now takes it as its fifth argument).

## 1.37.2 — a named special is not asked for its name

- naming.js `special`: fired on any `S00E##` / `S##E00`. Now the text after the token, up to
  the first technical element (resolution, REPACK/PROPER/RERip, Hybrid, NTSC/PAL/DVD,
  BluRay, WEB-DL/WEBRip, HDTV, REMUX) and with a bare year removed, must contain a letter;
  otherwise the review says the token "carries no special name". Seen 22 Sep 2026 on a named
  BYU special. naming-check.cjs: one test rewritten (a named special no longer fires; a bare
  one does) and one added (the Dwight title, a bare S00E01, a year-only S03E00, a named
  S03E00, an ordinary episode). Node 902 (900).

## 1.37.1 — the "names it its own way" notes no longer colour a badge

- rules.js BUILTIN_BASELINE gains `book-own` and `music-own`: naming.js adds those review
  lines when a profile says `books:'own'` / `music:'own'`, and listing-core.js colours a
  badge by every review that is not a standing note, so on midnightscene.cc every music
  row was amber with that line as its only reason (screenshot, 22 Sep 2026). As standing
  notes they show, count as hideable in the checklist, and never move the badge.
- profiles-check.cjs: a conforming MidnightScene music name and a conforming HomieHelpDesk
  book name assess as `pass`; both codes are in `rules.baseline()`; a real profile finding
  still assesses as `error`. Red before the change. Node 900 (898).
- profiles-ui.js `installedTab()` rewritten ("this page also makes no sense anymore",
  22 Sep 2026): two fieldsets, *Your trackers* and *Built into the script*. The second lists
  DarkPeers and Zenith (in force on `rules.hostsOf(key)`, **Copy … as JSON**) and then the
  four tracker-guides.js sets (in force on their hosts; **Edit a copy of …**, or **Reset
  your copy to the built-in** once a copy exists, plus **Copy JSON**). A copy under *Your
  trackers* is labelled "your edited copy of the built-in", says where it applies, and its
  Remove reads **Remove your copy**; removing it does not forget the host's rule choice.
  The old *Start from a built-in* fieldset is folded in. rules.js gains `hostsOf()`. Listing
  fixture: six checks rewritten and six added — the legend, no Add/ship wording, the six rows
  with DarkPeers and Zenith first, the four Edit a copy buttons and none for the built-ins,
  the copy's label under Your trackers and on the built-in row, the Reset button, Remove
  your copy, and the built-in back in the Rules list afterwards. Listing 215 (209); red
  (104) with the old tab.

## 1.37.0 — the manual checks can be ticked off

- Two new modules, `checklist.js` and `checklist-ui.js`, slotted in after reviewed-ui.js in
  both builds. The first keeps the data: a tick is stored as `host|torrent id|rule set` with
  the day and the codes ticked, and a hidden standing note as `rule set` → its codes. It
  works out which torrent you are on from the address (`/torrents/<number>`) and does nothing
  on a listing or a queue. Limits: 500 torrents (oldest by day go first), 60 ticks per
  torrent, 200 hidden notes per rule set, and everything read back is checked before it is
  trusted. The key is `dkokto_checklist_v1`, listed in backup-core.js so Backup… carries it.
- The second draws the list, and all three places that show manual checks now use it: the
  badge dialog on a torrent page, the row dialog on a listing (it takes the torrent from the
  row's link) and the naming panel. A per-torrent check gets a tick box when the torrent is
  known; a standing note — anything `rules.baseline()` lists — gets **Hide this note**; a
  short line under the boxes says a tick records that you looked and nothing more; hidden
  notes sit at the bottom with **Restore**. The heading reads *Manual checks (n) · d done ·
  h hidden*. None of it touches the badge.
- Checks. checklist-check.cjs has five: ticks are per torrent, per rule set and dated, and
  unticking the last one removes the record; a note hides once per rule set; `where()` on
  six addresses; the caps, and a store broken by hand is read safely; the Backup key is
  there and the module makes no request. It was red before the module existed and red again
  before the key was in the Backup list (backup-check.cjs refuses a key it does not know).
  The detail fixture has thirteen new checks — the heading, the boxes and the Hide buttons,
  the note, a tick moving the count and landing under the right id, the badge unchanged,
  hide / hidden list / restore, the tick still there on reopening, nothing ticked under
  another rule set — and went red when the dialog wiring was reverted. The inspector
  fixture has four. Node 898 (was 888), detail 205 (was 192), inspector 26 (was 22), 74
  shared modules.

## 1.36.0 — MidnightScene's rules ship with the script

- **MidnightScene in tracker-guides.js.** Key `mns`, host midnightscene.cc, base `dp`,
  `music: own`. Built from the Upload Naming Guide and the Banned Release Groups list,
  supplied as text on 21 Sep 2026 and kept verbatim in `notes/midnightscene-naming-2026-09-21.md`;
  the page has no section numbers, so rules cite its headings; no upload-rules page was
  supplied and a `not-supplied` note says so. 21 video rules: group-tag (review), nogrp
  (error — NOGROUP is the guide's word), acodec-ddp, acodec-ac3, acodec-dolby, acodec-ddex
  (DD-EX hyphenated), object-atmos, hdr-vocab (PQ10 not on its list), vcodec-dot,
  vcodec-list (review: AV1/VP9 not on the list while the site's listing carries AV1),
  vcodec-web, vcodec-webrip, vcodec-remux, type-webdl, type-webrip, web-service,
  remux-source, encode-source, edition-name, dub-dual-audio, repack-only (review: PROPER /
  RERip are not on its templates). 5 music rules: music-form (review; the three layouts),
  music-underscore, music-guest, music-single, music-live (review). Three notes. Banned:
  the page's 64 rows less BRrip (to `groups.sources`) and the msd/mSD duplicate, 62 names,
  no reasons because the page gives none; EVO is a flat ban here. Resolutions to 2160p.
  A Language-case rule was tried and dropped: profile patterns match case-insensitively, so
  FRENCH and French cannot be told apart; the note says so.
- **`music: own` in the profile format**, the twin of `books: own` (1.33.0): profiles.js
  validates base/own and round-trips it; rules.js `musicOf()`; naming.js adds a review
  note `music-own`, shows no template, and applies only the profile's rules; the profile
  dialog and the site's validator say "its own music names". TRACKER-RULES.md documents it.
- **Checks.** guides-check.cjs: three new tests (the four listing rows and the twelve music
  examples pass, AV1 is a question, the "Wrong" example is caught; every rule fires on the
  form the guide does not use and none on what it allows; the banned list is the page's,
  no reason invented, EVO flat, BRrip a source marker, no 4320p). profiles-check.cjs: a
  `music:"own"` profile. Three fixed lists gain `mns`. Listing fixture: the fourth Add button
  and 21 Sep 2026. Node 888 (880); listing 209 unchanged.

## 1.35.0 — MidnightScene

- trackers.js: `unit('mns','MidnightScene','midnightscene.cc','general')`. Address from
  Khamere, 21 Sep 2026, with a screenshot of the site's /torrents page (UNIT3D's search
  page); the `/torrents?name={q}` path is UNIT3D's, as on every unit() entry. Not on the
  9 Sep 2026 HDVinnie list. The @match line comes from the catalogue at build, so the script
  runs there; the cross-check searches it. No rule set is claimed for it. Catalogue 60 → 61,
  @match hosts 43 → 44; README, GUIDE, dk/README, the site's pill, "Which trackers it runs
  on" and FAQ updated, and PENDING-NEXT-VERSION.txt records where the address came from.
- Checks: links-check.cjs — the entry, its label, its search address and the built header's
  @match line (red before the entry); the coverage-claim check went red on its own at 43/60
  until the documents moved. Node 880.

## 1.34.1 — Dual-Audio with two default tracks

- naming.js `default-audio`: where the title carries Dual-Audio and every default audio
  track shares a format and channel count, the first stands for all of them and the review
  is not raised; the audio-conflict / channel-conflict comparisons still run against it.
  Different shapes, or no Dual-Audio in the title, are unchanged. Seen on a HomieHelpDesk
  anime pack with Japanese and English both `Default: Yes` (20 Sep 2026). One Node check in
  naming-check.cjs (red before: the review fired); Node 878.

## 1.34.0 — a tracker's own rules are the default on that tracker

- Asked 20 Sep 2026: "if we have rules for the site, those rules are the default … and if
  no naming rules just the group tags as normal". profiles.js: `shipped()` validates the
  tracker-guides.js sets once and keeps them as the same frozen objects (groups.js keys its
  banned-list cache on the object); `get(key)` falls back to the shipped set when nothing is
  added under that key; `available()` is what you added plus the shipped sets not yet
  copied; `baseline()` reads notes from `available()`. rules.js `added()` uses
  `available()`, so `list()`, `siteFor()`, `labelOf()`, `guideDate()`, `booksOf()` and
  `check()` all see the shipped sets, and `settled()` self-selects them by host. `all()` is
  unchanged: Added trackers stays what you added. Nothing changes on a tracker with no rule
  set. profiles-ui.js: the shipped fieldset says each set is in force on its host, Add reads
  "copies it into your added trackers", a copy is marked "your copy applies", and removing
  the copy falls back.
- Checks. guides-check.cjs, red first: with nothing added the Rules list is dp, zenith,
  lume, oe, hhd; homiehelpdesk.net / onlyencodes.cc / luminarr.me resolve to their sets and
  an unknown host to none; HomieHelpDesk's rules, notes and banned list are in force there;
  the same object each time; an added copy wins and its removal falls back. Three fixed
  lists in profiles-check.cjs and rules-check.cjs now expect the shipped sets after the
  built-ins. Listing fixture 209 (206). Node 876 (874). Reverting `available()` to added-only:
  red. A planted fetch() in profiles.js: refused.

## 1.33.1 — the count line on a tracker with no rule set

- listing.js `updateCounts()`: with the checks on and no rule set chosen for the tracker,
  `assess()` never creates an entry, so the count line fell through to "No release titles
  found. Use List or Card view…" — seen on homiehelpdesk.net over 25 rows (screenshot,
  20 Sep 2026). It now says "No rule set chosen for this tracker, so nothing is judged."
  One listing browser check in the no-rules block (listing 206); red with the line reverted.

## 1.33.0 — HomieHelpDesk's rules ship with the script

- **HomieHelpDesk in tracker-guides.js.** Key `hhd`, host homiehelpdesk.net, base `dp`
  (both of its templates are the element order the shared templates check, and its five
  worked examples pass them unchanged). Built from the Upload rules page (pages/7), the
  Banned Release Groups list (wikis/8) and the naming standard (wikis/30), supplied as text on
  20 Sep 2026 and kept verbatim in `notes/homiehelpdesk-rules-2026-09-20.md`; the rules page
  numbers only its sections, so a rule is cited by section (§4, §5, §6, §9, §10), never by a
  bullet number the page does not carry. 27 rules: the element vocabulary (acodec-ddp,
  acodec-ac3, acodec-dolby, object-atmos, hdr-vocab, vcodec-dot, type-webdl, type-webrip,
  dub-dual-audio, repack-number), the VCodec per type (vcodec-web, vcodec-webrip,
  vcodec-remux), DVD omissions (dvd-resolution, dvd-vcodec), the source spellings
  (remux-source, encode-source), edition-name, web-service, multi-season, group-tag and
  nogroup, and the rules page's thresholds — encode-sd (§4, error), web-sd and dvd-remux (§4,
  review), hevc-sdr (§5, review: its own example is 1080p x265) and single-episode (§6,
  review, pilot excepted). Five standing notes (naming-details, content, format, description,
  trumping). Banned list: the page's 47 table names, all under its one reason *Low-Quality
  Releases*, BRrip moved to `groups.sources` as a source marker; EVO conditional on WEB-DL;
  HDT conditional — refused where the title says REMUX, nothing else of its claimed; FGT
  banned with the page's own condition as its reason. Resolutions as the standard lists them.
- **Its books, comics and magazines.** The E-book Naming Standard, the Comic, Manga and
  Magazine Naming Standard and the Trumping & Quality Tiers page, supplied later the same
  day, are in the same notes file. HomieHelpDesk's book names carry no year, format word or
  ISBN (`Author Name - Title.epub`), which DarkPeers' book template would mark wrong on every
  conforming name, so the profile format gains an optional `books` field: `"own"` stands the
  shared book checks down for ebooks and audiobooks (naming.js adds a review note `book-own`
  saying whose naming applies and shows no template; rules.js `booksOf()`; profiles.js
  validates `base`/`own` and round-trips it; the profile dialog and the site's validator say
  "its own book names"). Eight ebook-category rules for HomieHelpDesk: book-form (review — the
  four layouts the two pages give), book-underscore, book-tags, book-url, book-archive (CBZ /
  CBR excepted), book-group (review), book-series-pad, comic-pad; a `books` note carrying the
  loose-file, junk-file and container rules. Comics, manga and magazines are told by their
  CBZ / CBR / PDF and land in the ebook category. The Audiobook Naming and Folder Standard
  was not supplied, and the note says so. 35 rules in all.
- **Checks.** guides-check.cjs: four new tests — the seven names the text gives as examples
  raise no error under its rules or the shared ones (and the two review-level questions they
  do raise are the intended ones), every rule fires on the form the standard does not use
  and none fires on what it allows, and the banned list is the page's with its three
  qualified names kept apart. A shipped message over the profile's 600-character limit is now
  refused at the source rather than cut short. Listing fixture: the third Add button and the
  20 Sep 2026 date; the six example names of the two book pages pass, the nine forbidden
  forms fire. profiles-check.cjs: a `books:"own"` profile keeps the shared book findings
  out, its own rule fires, audiobooks follow, music does not, and anything but base/own is
  refused. Node 874 (864 before), listing 205 unchanged.
- Versions from here go up with each delivered change (Khamere, 20 Sep 2026); the handoff
  notes were removed at the same request, CLAUDE.md is the state of play.

## 1.32.0 — episodes read from the file list; the built-in guides get their date

- **Episodes from the file list, against the name.** `naming.check()` takes `options.files`
  (paths, or `{path}` rows, at most 2,000) and, for a TV name that is not a daily-show date,
  reads the `S##E##` numbers off the video files. The torrent page hands the list in through
  `known()` in detail.js, read by `DKOKTO_FILES_UI.list()` — the reader the `[ MULTIPLE
  FILES ]` marker copies from — so the badge and the marker cannot disagree about the page.
  Where the list answers the question the `episode-verify` reminder is replaced: `episode-gap`
  and `episode-partial` (a pack that skips an episode, or starts after E01) are amber;
  `episode-single` (a pack name over one episode), `episode-extra` (an episode name over more
  files than it numbers — a season pack by the file list), `episode-missing` (a numbered
  episode no file carries) and `episode-season` (a file from another season) are red;
  `episode-specials` (S00 in the list) and `episode-unnumbered` (video files with no number)
  are amber. Where the list holds no video file, or none of its video files carries an
  `S##E##`, the reminder stays and says why. The dialog adds *its file list* to what it read,
  for a TV name only.
- The reading is ZenGuard 1.9.1's `_tvEpisodes` and `_isSeasonPack`, from
  `notes/zenguard-1.9.1-excerpts.js` as pasted 12 Sep 2026, not verified against any live
  page, and exposed as `naming.episodes()` and `naming.isSeasonPack()`. Two steps past its
  pattern, and only two: the guide's double and range forms (S01E02E03, S01E02-04, and
  E02-E04 as it is sometimes written) are read as every episode they span, and a token glued
  to a letter or digit is not read. A range that runs backwards or into something that is not
  an episode number (S02E05-1080p) is its first episode only; a range is capped at 100.
- Seven Node checks per edition (the reading, the season-pack rule, the reminder untouched
  without a list, gaps and partial packs, pack/episode names the wrong way round, other
  seasons and specials, unnumbered files and lists with no numbers) and twelve browser checks
  on the torrent page: no list means no claim and the old reminder; a list with E04 missing
  turns the badge amber and the dialog names the run and the gap and says it read the list; the
  complete run is green; a single-episode name over the pack is red; the list gone is green
  again. Confirmed by reverting: without the module change the Node suite fails on the first
  new check, and without the detail.js change the fixture fails at the amber badge. A planted
  `fetch()` in naming.js is refused by both built-script checks.
- **The exact release name as a search.** `links()` adds an `exact` link right after the
  title search — `/torrents?name=<the name, trimmed>` — and on a torrent page requests.js
  builds a second row, `.dk-request-exact` ("This exact name:"), from
  `requests-core.search(request,{exact:true,host})`, one link per chosen tracker, with a
  Search all of its own; the tracker you are on is skipped there as it always was. Rebuilt
  and removed with the cross-check row (its URLs are in the signature). Asked 15 Sep 2026,
  folded into 1.32.0 as unshipped. One Node check (the link, its place, its URL, the title
  search unchanged, trimming) and six torrent-page browser checks (the lookup-row link, the
  row under the cross-check, one link per tracker carrying the whole name in a new tab, no
  ID search among them, its Search all, one row each); the UNIT3D-shape fixture now expects
  two relative links. Confirmed by reverting each module alone; a planted `fetch()` in
  requests.js is refused by the built-script check.
- **srrDB by title and group.** The srrDB lookup was the title words alone; a scene record
  is found by the title and the release group, so `links()` now appends the group read by
  `DKOKTO_GROUPS.trailingTag()` (the badge's own reader; required in Node, taken from the
  page in the browser), one path segment per word, and says so in the link's note. No tag,
  no change. Asked 16 Sep 2026, folded into 1.32.0. One Node check (W4NK3R; a spaced and a
  hyphenated group; no tag; WEB-DL's hyphen is not a tag) and one torrent-page browser
  check; confirmed by reverting.
- **upload.cx's Files dialog is read.** files.js gains `LIST_ROWS` and `TREE_NAMES`
  (exported, and used by detail.js's `filesOf()` and page stamp so the readers agree):
  `.data-table-wrapper[data-tab="list"] table tbody tr` for the List tab and
  `.dialog__form[data-tab="hierarchy"] .file-tree__name` for the tree, whose size sits beside
  it in `.file-tree__size` with the count in its `title`. Seen on upload.cx, markup pasted
  19 Sep 2026. OnlyEncodes+ (markup pasted the same day) has no `data-tab` at all — tree as
  `.dialog__form details summary span[style*="word-break"]` with the count in a sibling
  span's title (found by the existing `nearBytes`), list as `.data-table-wrapper
  table.data-table tbody tr` — so both selectors were widened to that; not verified on any
  other tracker. Five torrent-page browser checks for each shape: both tabs present (the
  hidden one not doubled), List alone, Hierarchy alone, the copied line, and the marker
  going with the dialog; the upload.cx set is: both
  tabs present (the hidden one not doubled), List alone, Hierarchy alone, the copied line,
  and the marker going with the dialog. Confirmed by reverting; a planted `fetch()` in
  files.js is refused.
- **A `.data-table` without sizes is not the file list.** Widening the List-tab selector
  for OnlyEncodes+ let another table on LUME's torrent page count as files (seen 20 Sep
  2026: a one-file torrent marked `[ MULTIPLE FILES ]`). A row from such a table now counts
  only if it carries a size; the DarkPeers-shaped list tab is read as before. Two browser
  checks (a decoy table of formats and scores gives no marker; the real one-file list beside
  it is still one file). Which LUME table it was is not recorded — it was not read from here.
- **The file tree read by its icons; the top folder first; no title in its place.** files.js
  `treeRows()`: in any `.dialog__form` holding `details > summary` with a file/folder icon,
  the root folder is the bare `<span>` with a folder icon at the top, folders are summaries
  with a folder icon, files are summaries with a file icon (name in `.file-tree__name` or the
  leaf span that is neither count nor size; bytes in the size's `title`), and each path is
  `root/folder…/file`. Read from the Files dialogs of DarkPeers (a nested two-disc set),
  upload.cx, Zenith, OnlyEncodes+ and LUME (one file and a pack), all pasted 19–20 Sep 2026;
  no other tracker is claimed. The List tab is read only where no tree is, and only from a
  table headed `# / Name / Size` (a page can carry other `.data-table`s — the LUME one-file
  torrent that read as several; which table that was is still not recorded). `files-core
  .listing()` and `templates-core`'s `{files}` no longer put the display title where a
  folder would go: no common folder, no first line (asked 20 Sep 2026). detail.js's
  `filesOf()` is the same reader; the page stamp uses `count()`. Two Node checks changed to
  the new rule; eleven torrent-page browser checks with the five sites' markup (DarkPeers
  disc set kept apart, upload.cx, Zenith with its List tab beside it, OnlyEncodes+, LUME
  one-file, loose files). Confirmed by reverting the four modules; a planted `fetch()` in
  files.js is refused.
- **The group tag stays marked with the automatic checks off.** listing.js `scan()` returned
  before judging anything once the *Automatic naming checks* box was cleared, and the group
  tag is marked inside `assess()`, so clearing the box also took every tag off the listing —
  seen on OnlyEncodes+ (screenshots 20 Sep 2026: bar reading *Checks disabled*, no tags on
  any row). The tag is the internal-groups directory, not a naming check, so `scan()` now
  marks it on every release link before returning, checks off or on; badges stay off. Two
  listing browser checks (a marked row keeps its tag when the checks are turned off; a row
  loaded while they are off gets its tag and no badge). Confirmed by reverting listing.js;
  a planted `fetch()` in listing.js is refused.
- **The DarkPeers and Zenith guides carry a date.** Khamere gave both as supplied on 9 Sep
  2026 (answered 12 Sep 2026), so `rules.guideDate('dp')` and `('zenith')` are `9 Sep 2026`
  and the panel reads *in hand 9 Sep 2026*. The 1.31.0 entry below was right when written:
  no date had been recorded then. The no-date wording is kept for a rule set that has none.
- Counts: 864 Node checks (846 before); detail fixture 192 (153 before), UNIT3D-shape 25
  (24 before); every other fixture count unchanged; 70 shared modules identical.

## 1.31.0 — mark an amber badge as conforming; the torrent-page badge reads the page

- **Mark as conforming.** An amber ? badge's dialog offers to mark the name as conforming;
  the badge turns green with a dotted ring, its tooltip and dialog say it was you and when,
  and Undo puts it back. The tool's own finding is carried alongside, not replaced; the
  manual checks stay listed; the counts read *N passed (M marked by you)*. Red is never
  marked over. Per rule set, bounded (2,000), oldest out first, stored in the shared
  per-script store under `dkokto_reviewed_v1` — which the rewritten backup check caught on
  the module's first run, before anything else did, and which Backup… now carries.
- Eight Node checks (amber becomes yours, red does not, green needs no help, per rule set,
  undo, whitespace-insensitive names, bounds and junk, no DOM or network) and twelve browser
  checks on the listing plus six on the torrent page: mark, ring, tooltip, counts, dialog,
  storage under the rule set, undo, and that a red badge's dialog offers no such button.
- **The torrent-page badge is handed what the page states** — media title and year from the
  heading, original language, and the parsed MediaInfo — through `assess(title, category,
  known, file)`, the same readers the findings row uses. "Verify the title against TMDB" is
  now a comparison with the heading; "audio languages not confirmed" is now the Inspector's
  own language check. The dialog names what was read. Where the page's heading is not under
  the class the reader knew, the media title is taken from a heading by its shape — "Title
  (Year)" and nothing technical — rather than by a guessed class name; a heading that IS the
  release name is left alone.
- **Guide dates at the point of use.** `rules.guideSince()`: *in hand 10 Sep 2026*, or *as
  supplied; the date it was supplied was not recorded*. The profile format gains an optional
  `source` line, which the two shipped profiles carry inside the profile (so an install keeps
  it) and which `validate()` keeps. The naming panel and the Rules chooser's tooltips show it.
  The DarkPeers and Zenith guides have no recorded date, and the panel says so.
- **"Kind not recognised" gives its reason**, true of the title: what the row's category was
  (or that there was none) and what the title lacked — or, for a title that has a year, that a
  year alone does not decide film, series or album.

---

## 1.30.1 — the cross-check's stuck "blocked last time" mode

- Reported with a screenshot on 1.36: the same dialog as before the wording fixes, still
  reading *Try Search all 5 again* and *This browser blocked a burst of tabs last time*. The
  wording fixes had landed; the **state** was the fault, in three ways.
- **It never cleared.** The flag reset only when a full burst of tabs succeeded — and a
  default browser allows one tab per click, so it never did. After the first *Search all*,
  every request dialog opened in this mode, for good.
- **It was the wrong scope.** One string in the shared per-script store, for all 43 trackers.
  Pop-up permission is granted per site: allowing pop-ups on DarkPeers changed nothing
  because the flag had been set on Zenith. It is per site now, keyed by host with `www.`
  dropped, and an old global value is discarded on read rather than carried into the new
  form — it *was* the stuck state.
- **It narrated history.** "Last time" could have been weeks ago on another tracker, and the
  note never said how to leave the state. It now says what browsers do and how to change it:
  one tab per click, so this site's trackers are offered one at a time; allow pop-ups for
  this site and *Search all* opens them in one go. The button keeps its plain name in either
  state — *Try … again* made every dialog read like a retry of some old failure.
- The stepper-first layout on a site that refused before is unchanged: that part was right.
- Checked in Node (per-site memory, `www.` folded, another site unaffected, old value
  dropped, junk ignored) and in the browser fixture (plain button name, the new note with no
  "last time" in it, the flag stored under this page's own host and nothing else).

---

## 1.30.0 — the backup carries everything, and a sweep for checks that could not fail

- **Backup… carried 9 of 13 keys.** Left behind on every restore: `dp_torrent_inspector_v1`
  (your private notes), `dkokto_rules_host_v1` (which rule set applies on which tracker),
  `dkokto_listing_checks_v1` (whether the automatic checks are on) and `dkokto_torrent_nav_v1`.
  The Scene Edition additionally lost the game helper's settings. All eighteen keys across the
  two editions are listed now, each marked with the edition that writes it.
- **The check that should have caught it could never fail.** It found keys with
  `/KEY\s*=\s*'dkokto_…'/` — the uppercase convention that exactly the nine listed modules
  follow — so it confirmed what was already true and never once said no. It now scans every
  shipped module for anything shaped like a storage key, and each must be carried or be on a
  short list of keys deliberately not carried, with a reason. Planting a new key fails it;
  listing a key nothing writes fails it; both name the file.
- **One backup, not two.** The Scene toolkit's own *Export settings JSON* covered the very
  things Backup… omitted, under a different format. It is retired; Backup… reads its old
  `dkokto-settings` files section by section and says so, and gains the one thing the toolkit
  export had that it lacked — *leave my private notes out*, for a file you might share.
- **Provenance in the internal-groups popup.** Each *Listed as internal at* line now says
  whether it came from the community directories (with their date), was reported to this
  project (with that date), or was added by you. The reported entries are data, not only
  comments, and a check confirms each one is actually on the list it is cited for.
- **Request cross-check wording**, corrected against a screenshot: "blocked the other 5" when
  all five were blocked (now *all* or *the other*, by what happened); "one at a time below"
  for a button that sits above (no direction now); "unknown request" (now *kind not
  recognised*); "the rules of the other tracker" (now *that tracker's rules*). The fixture had
  asserted the wrong wording as correct; it asserts the right one now, and covers the
  realistic first-tab-opens case as well.
- **The no-request guarantee, checked by mutation.** Nineteen modules have a check that they
  make no request, and every one catches a planted `fetch()`. The built-script check covered
  one slice — CAPTURE to PAGE — so fourteen modules, including nav, requests and templates,
  could have gained one unnoticed. It covers the whole built file now (in the Scene Edition,
  the whole added region, with the game helper's one same-origin fetch carved out and pinned
  to exactly one). 19 of 19 and 47 of 47 planted fetches are caught.

---

## 1.29.0 — torrent nav, on every tracker this runs on

- **The nav panel is no longer one tracker's feature.** It was written beside DarkPeers and
  Zenith and mounted only there, but nothing in it was ever specific to them: it reads
  `/torrents?page=` and `/torrents/{id}`, which are UNIT3D's own addresses. It now mounts
  wherever this script runs — 43 trackers in the standalone edition, and in the Scene Edition
  on the other 41 as well as the two it started on.
- Step by any number of listing pages or torrent IDs, jump to a page number or an ID, with
  **Alt + Shift + N** or the **Nav** button in the launcher bar. Filters, sorting and search
  stay on the address; only the page number is rewritten.
- It follows a link and nothing more: no background request, no page read that you did not
  open, nothing submitted. A pasted address is refused unless it belongs to the site you are
  on. Where a step cannot apply the arrows are disabled *and say why*; jump still works.
- The claim is checked where it matters rather than only in the panel's own fixture: the
  vanilla-UNIT3D page fixture — built from UNIT3D's published templates, not this project's
  idea of them — now asserts in both editions that the launcher appears in the bar, opens,
  reads `Torrent #9910` out of the page's own address, is styled by this script, and says why
  page stepping is unavailable on a torrent page.
- **Screenshots**, in the README and on the front page. Every one is rendered from this
  project's own offline demo pages and regenerated from the current build, so they cannot
  drift from what the script does. Synthetic release names throughout: no tracker branding,
  no usernames, no ratios, nothing from a real site — which is the only sane way to publish
  pictures of a private tracker's pages. A gallery is the easiest thing on a site to break
  silently, so six checks cover it: every image loads, nothing 404s, each has alt text and a
  caption, each carries its dimensions and loads lazily. Removing one file fails two of them.
- **j3rico** is listed as internal at **Zenith**, reported 11 Sep 2026. Zenith had no line on
  that list at all before now — the community directories the rest of it is drawn from do not
  carry it — so it is named in the sources note and given a check of its own, because an entry
  no directory carries is exactly the kind that disappears when a list is regenerated.
- **The author credit is accurate now.** The header credited the Chungus Edition, and none of
  its code is in this script: no upstream file in its source tree, no line of 45 characters or
  more shared with it, and the only identifiers in common are words like `options` and
  `container`. The credit stays — this project began inside a fork of it — but it now says
  that, rather than implying the code is there. The fork itself is a separate edition, and it
  does carry that code, its credit, and the MIT notice for the *Enhanced Chat Unit3D* code by
  **ZukoXZoku** that the Chungus Edition ported.
- The README stated the wrong tracker count in four places: it gave the number of `@match`
  lines instead, and DarkPeers gets one with `www.` and one without, so the lines are one more
  than the trackers. Corrected to **43**, and checked now rather than left to drift — the
  counts are read out of `trackers.js`, the `@match` lines are counted out of the built script
  and must be one more, and every sentence claiming coverage in the README and the guide must
  state one of the two numbers. Dated entries in this file are left as they were written: they
  are a record of what was true at the time, and editing them to match today's catalogue would
  make them wrong in a different way.
---

## 1.28.5 — housekeeping

- A dead selector removed from `release-title.js`: it excluded an element (`#dkokto-banner`)
  that only ever existed in the Scene Edition, and no longer exists there either. Nothing
  behaves differently; the two editions share this module and it is kept byte-identical
  between them, which is what makes a difference in it worth looking at.

---

## 1.28.4 — the Dub element, read off the matrix rather than half of it

- **A finding said something about the page that the page contradicted.** Reported against
  `The Wrong Trousers … 1993 1080p BluRay Dual-Audio Opus 5.1 AV1-AV1ato`, whose page lists
  English and Russian audio. The finding read: *“Dual-Audio is named, but the page gives the
  original language as English, so there is no second language for it to mean.”* There plainly
  is one. The verdict was right and the reason was wrong, which is the worse of the two
  failures: a moderator checking the claim finds it false and has no reason to trust the rest.
- The guide's Dub matrix has a row for this: **English original + one other language is
  `Russian MULTi`** — Dual-Audio is for a non-English title carrying its original audio and an
  English dub. The finding now says that, names the language it read, and names the tag the
  guide asks for. An English original with two or more others, or with no English track at
  all, gets a separate finding rather than being forced through the same sentence.
- **Two more rows of that matrix were silent.** A bare `MULTi` where the page reports an
  English original and exactly one other language is the same mistake in the other direction,
  and a title with **no Dub element at all** where the page reports two languages was never
  mentioned. Both are raised now — the first as a finding, the second as a question.
- `Russian MULTi` itself carries the word MULTi, so the two rows are told apart by whether the
  language the page reports is named in front of it. A correctly tagged title says nothing at
  all, which is a check; so is `BluRay MULTi`, where the word in front is the source.

---

## 1.28.3 — a hyphen inside a word is not a separator

- **Music titles on DarkPeers were cut open at the bit depth.** Reported against
  `DJ Ötzi - Hey Baby (Uh Ah) 2010 WEB FLAC 16-bit 44.1kHz Single-StellarRift`, which gave
  back `bit 44.1kHz Single-StellarRift` as the release group. The hyphen in `16-bit` belongs
  to that word, but the matcher tries each hyphen in turn, and what follows this one is four
  short words — nothing technical among them, because everything technical about a bit depth
  sits on the **left** of its hyphen. So the tail passed every test and was handed back whole.
- Bit depth and sample rate are technical tokens now, like resolution or codec. That title
  gives `StellarRift`, and one ending `16-bit 44.1kHz Single` with no group still has none.
- Nothing else moves: `R-A-R-B-G`, `YTS.MX`, `Goki TAoE`, `seedpool`, `SPx`, `VARYG`,
  `BLEEDiNG`, `NTb`, `10bit … x265-DKOKTO` and every other name already covered come back
  exactly as before. Twenty-nine names across the four conventions are checks now.

---

## 1.28.2 — the third way a release name separates its tokens

- **Scene-style music titles still gave back most of the name.** 1.28.1 taught the group-tag
  matcher that a dotted run holds tokens too, which fixed SeedPool's films and series. Its music
  uses a third convention — `Artist-Album-EP-WEB-2018-BLEEDiNG`, separated by **hyphens** — so
  `WEB` and the year were still invisible and `EP-WEB-2018-BLEEDiNG` came back as the group.
  Candidate tails are split on hyphens as well now: that title gives `BLEEDiNG`, and a
  catalogue number in brackets is not mistaken for the group either.
- A group whose own name carries hyphens is unaffected, because none of its pieces is a
  technical token: `R-A-R-B-G` still comes back whole. So do `YTS.MX`, `Goki TAoE` and every
  spaced and dotted title. Twenty-three names from the three conventions are checks now.

---

## 1.28.1 — frames, and scene-style titles

- **Three "Inspect torrent" buttons on OnlyEncodes.** A tracker page can carry widgets of its
  own in iframes — OE has a radio player and an Auto-DJ box — and this script is matched by
  host, so it loaded inside each one and mounted its own launcher there. The header now carries
  `@noframes`, and the code refuses to mount in a frame as well, for a manager that does not
  honour the key. A fixture loads it inside two real iframes and fails if anything appears in
  either.
- **Half a release name offered as the group, on SeedPool.** Their titles are scene-style, with
  tokens separated by dots rather than spaces. The group tag is whatever runs to the end from a
  hyphen, skipping any tail that holds a technical token — but the tail was split on spaces
  only, so `HD.MA.5.1.DV.HDR10.REMUX-seedpool` read as one word with nothing technical in it,
  and that whole run was called the group. Tails are split on dots as well now: the four
  examples give `seedpool`, `SPx`, `VARYG` and `OFT`. Spaced titles, groups with hyphens of
  their own (`R-A-R-B-G`) and dotted tags (`YTS.MX`) are unchanged, and each is a check.

---

## 1.28.0 — back up the lot, and a fixture in UNIT3D’s own markup

- **Take your whole setup with you.** *Backup…*, beside *Internal groups…* and *Tracker rules…*
  in the listing bar. It shows what it would save — the trackers you are on, the trackers you
  added and their rules, which rules apply where, your internal-groups changes, your templates,
  the audit, the decision log, requests you have checked, the comparison slots — and hands you
  one file, copied or saved by your own browser. Restoring reads a file you give it, says what
  it holds and when it was taken *before* writing anything, and can fill only the gaps rather
  than replacing what you are using.
- Why it exists: there was no way to take the lot with you, and a script manager that decides a
  renamed script is a new one hands it an empty store. Nothing is sent anywhere; a backup is
  the text already saved on your machine, and restoring writes back only the keys this script
  owns — anything else in the file is ignored and named.
- **The backup cannot go stale.** A check reads every module for the storage keys they actually
  use and fails if one is not on the backup list, or if the list names a key nothing saves. A
  new thing to save is a failing test until it is included.
- **A fixture in UNIT3D's own markup.** Every fixture until now was shaped like DarkPeers, where
  the `<h1>` is the media title and the release name sits elsewhere. Vanilla UNIT3D is not
  shaped that way — the `<h1 class="torrent__name">` *is* the release name, the size is a
  `<span class="torrent__size-link">` with the byte count in its title, the category an `<a>`
  inside `<li class="torrent__category">` — and that is the shape 41 of the 43 trackers serve.
  17 checks now run against it, built from the published templates rather than from an
  assumption: the badge attaches to the heading, the marker reads the exact count out of
  UNIT3D's own title attribute, the category is read rather than guessed, every link that
  leaves the site opens in a new tab while the tracker's own search stays relative, and the
  template button finds the Livewire comment box.
- **Versions cannot drift.** A check compares the build's version against the README title and
  the newest changelog entry, and fails if they disagree — which they have, three times.

---

## 1.27.1 — the published file names no one

- **The file you install no longer says who supplied what.** The built userscript is what is
  published and what Tampermonkey shows on its install screen, so its comments are read by
  everyone who installs it. Eleven lines across five modules said *"the user, as a DarkPeers
  moderator"*, *"supplied by the user"*, *"confirmed by the user"* and *"kept exactly as he
  tested it"*. Every one now records the same fact without the person: what was in hand, and
  when.
- **Every citation is still there** — InviteHawk, rentry.org/internals, pastes.io, the LUME and
  OnlyEncodes wiki pages, and the dates. A check asserts both halves: that no line names a
  person, and that the citations are still present, so it cannot be satisfied by deleting them.
- The same guard runs over the published web pages, which inline these modules and can be
  view-sourced by anyone.

---

## 1.27.0 — it names the rules it is applying

- **The Inspector announced the wrong tracker's rules.** Its panel was headed *"DP naming guide
  check"* on every tracker it ran on — so on Zenith it said DarkPeers and then applied Zenith's
  rules. It now heads itself with the rule set actually in use (*"Zenith naming check"*) and
  names that guide underneath. Where no rules are in hand it says so instead of naming one.
- **A copied naming report claimed the wrong rulebook.** Its first line read *"DP display-title
  naming review"*, its footer *"against the supplied DP naming guide"*, and its Rules line
  *"supplied DP Naming Guide for beginners"* — all three regardless of where you were. Of the
  things a report can be wrong about, the rulebook a finding cites is the worst. All three now
  name the rule set that was applied.
- **A copied request report said *"On DarkPeers:"*** next to a Zenith address. It names the
  tracker the request is actually on, read from the address itself.
- **The shortcut field said *"Use a page on this DarkPeers site"*** on Zenith. It names the site
  you are on.
- **The launcher tooltip** said *"MediaInfo review and DP naming check"*; it no longer names a
  tracker at all, since it is the same button everywhere.
- **A standing sweep, so the class cannot come back.** A check now reads every module and fails
  if any string shown to a reader names DarkPeers, Zenith or DP — except in the modules whose
  strings are *about* a named tracker and are supposed to be: its own rules, its own lists, its
  own templates. A new module is scanned automatically; nothing has to be remembered. Each of
  the fixes above was confirmed to fail it when put back.
- Checked and found correct, not changed: the Zenith container and MediaInfo findings in
  `page-core.js` are gated on Zenith's own rule set, the banned-group wording in `groups.js` is
  keyed per list, and the two `darkpeers.org` strings left in the source are URL parsing bases
  that are never shown.

---

## 1.26.4 — this edition tests its own torrent page

- **A torrent-page fixture of its own.** This edition shipped `detail-fixture.js` but no page to
  run it in, so every validation record said the browser evidence came from the Scene Edition,
  "over the same modules". True as far as it went — but the two editions do not share a
  stylesheet, and a good deal of what those 144 checks measure is geometry: that the template
  button lands on the tab row and clear of the comment box. A styling regression in
  `inspector.css` alone would have passed unnoticed.
- `detail-preview.html` now loads this edition's own build and its own CSS, and the 144 checks
  pass against it. Confirmed the stylesheet really is in play rather than assumed: the button
  comes back styled from `inspector.css`, not from the browser default.
- It runs with the other three fixtures as a matter of course now, and its report ships as
  `DETAIL-BROWSER-CHECKS.txt` beside the rest.
- **The guide points at the rules builder**, which it did not — `TRACKER-RULES.md` and the site
  had the link and the document people are handed first did not.
- **A version in the guide was wrong**: it said the rename landed in 1.25.0. It was 1.26.0, as
  the README says. Corrected in both places it appeared.

---

## 1.26.3 — the button, put where it belongs

- **The button sat behind the comment box instead of up by the tabs.** It looked for a *row*
  element holding Write · Preview that did not also contain the box — and where a theme gives
  the tabs no wrapper of their own, every candidate contains the box too, so nothing matched
  and it fell back to sitting immediately before the box, under the floating label. It now
  anchors on the **Preview control itself**, which exists whatever is or is not wrapped around
  it, and goes directly after it.
- **Inside a tab list it is now a list item.** A `<span>` dropped straight into a `<ul>` is
  invalid, and a horizontal tab row lays it out on a line of its own rather than beside the
  tabs. Where there is no list it stays inline as before.
- **It survives the Write / Preview switch.** Switching to Preview hides the box, and a hidden
  textarea was treated as no box at all, so the button disappeared. The button belongs to the
  tab row rather than to the box: it now stays put, what it writes is there when you switch
  back, and a framework redraw that strips it out gets it put back on the next pass.
- **Placement is measured now, not eyeballed.** The suite checks that the button lands
  immediately after Preview, on the same line as the tabs (within 24px), and entirely clear of
  the comment box — the two things that actually went wrong. The fixture also lays its tabs out
  horizontally, the way a theme does, so a placement that only looks right in a plain vertical
  list cannot pass.

---

## 1.26.2 — attribution taken out of the documents

- **The documents no longer say who supplied what.** The README, CHANGELOG, GUIDE and
  TRACKER-RULES carried lines like *"from the user as a DarkPeers moderator"*, *"each confirmed
  by the user"* and *"you say they are not HUNO's"* — where a list or an address came from, and
  in whose capacity. Every one of those now reads impersonally: reported, confirmed from a
  working search, or simply stated. What is cited is unchanged; who supplied it is no longer
  part of the record.
- **Correspondence phrasing gone with it.** Passages written as replies — *"I read your 'HDB,
  TBD, BLU'"*, *"say the word and I will move it"*, *"adopted from your 1.24.1"* — now read as
  documentation rather than as half of a conversation.
- Nothing in the script changed. The name, the namespace `dkokto.torrent.inspector`, the
  `dkokto-tracker-rules` profile format and the install and update addresses are all untouched,
  so this is an ordinary update with no reinstall and no saved profile invalidated.

---

## 1.26.1 — the template button, which was never appearing

- **The template button never appeared on a real page.** UNIT3D posts a comment through
  Livewire — `<form wire:submit="postComment">`, with no `method` and no `action` attribute at
  all — so a form whose `method` reads back as `"get"`. The detector required `"post"` and
  refused the box outright, on every tracker. Nothing showed up beside *Write · Preview*.
- **Why the suite did not catch it:** the fixture wrote `method="post"` on its own form, so it
  agreed with the assumption instead of testing it. The fixture now uses the markup UNIT3D
  actually ships — the Livewire form, `name="comment"`, `id="new-comment__textarea"`,
  `class="form__textarea"` — and the old code fails against it.
- **What identifies the box now** is what the page says it is, not how its form is wired: an
  editable, on-screen textarea that is not inside this script's own panels, and that the page
  calls a comment in its name, id, placeholder, label, class or its form's. A form aimed at
  another site is still refused; having no action is not a reason to refuse anything.
- **An edit box no longer takes the button.** A page can hold both the new-comment box and an
  edit box on a comment already posted; the one that says *new-comment* is preferred, and the
  rest are left alone rather than guessed between.

---

## 1.26.0 — just Torrent Inspector

- **Renamed.** `@name` is now **Torrent Inspector** and `@namespace` is
  `dkokto.torrent.inspector`. It was *DarkPeers - Torrent Inspector*, which was never right —
  it runs on 44 trackers and carries rule sets for four. The file it builds is
  `Torrent-inspector.user.js`, the same name it is published under, so what `@downloadURL`
  fetches and what you hand someone are the same thing. There is a check that neither the name
  nor the namespace carries a tracker's name, and one that it still runs on DarkPeers, where
  that belongs.
- **Upgrading:** Tampermonkey identifies an installed script by its header, so this can land as
  a second entry in your script list rather than as an update. If you see two, delete the old
  one — two copies means two of every badge. Your settings should survive: everything this
  script saves is written both to Tampermonkey's per-script store and to ordinary browser
  storage on the tracker you were using, and a fresh install adopts the second, per site.
  Export your added trackers first if you have set up a lot.
- **A new GUIDE.md**, written for this script rather than for the fuller Scene Edition: the
  badges, the rules, the torrent page, the templates, the Inspector, what it stores and what it
  will never do.
- **The README was rewritten at both ends.** A real front page — what it is, how to install it,
  what to read — and the module list, the suite list and the check reports brought up to date.
- **A correction.** The README claimed the script "matches only HTTPS darkpeers.org and
  www.darkpeers.org". That stopped being true when it started running on the UNIT3D catalogue:
  it is 44 hosts, written into the header from the catalogue itself at build time. It also
  claimed no `@grant` permissions, while it asks for three storage ones. Both now say what is
  actually in the file.
- `TRACKER-RULES.md` now names all four shipped rule sets rather than two.

---

## 1.25.0 — release notes templates, and update checks

- **MoreThanTV and FearNoPeer are gone from both lists.** Both trackers closed. They are out of
  the cross-check catalogue — 62 searchable trackers to 60 — so no click opens a site that is not
  there, and `fearnopeer.com` is off the `@match` list, 45 lines to 44. They are out of the
  internal-groups directory too, rather than being marked closed and left in place. That
  costs something and it is worth knowing: SMURF, WDYM, TEPES, Dracula, GBL, MOLY, SOIL, VLAD,
  EiNSTEIN_SiR23, onlyfaffs and HiFiWiFi are now listed nowhere. E.N.D keeps HD-Torrents; SM737
  keeps AlphaRatio and ReelFliX. (This bullet was missing from the 1.25.0 entry when it shipped
  and was added in 1.26.0 — the change itself was in 1.25.0.)
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

## 1.24.3 — the directory, and bytes on the single-file marker

- **SiGLA and SMURF are off HUNO.** The community directories this ships carried them there;
  they were reported as not HUNO's, so they are gone from that line. SMURF is still listed at
  MoreThanTV, which is where those directories also put it — taking a group off one tracker
  is not deleting it, and there is a check for exactly that. SiGLA was listed nowhere else,
  so nothing claims it now.
- **ZoroSenpai is added at HDBits, TorrentBD and Blutopia.** That is how "HDB, TBD, BLU" was
  read; TorrentBD is the only tracker on the list whose abbreviation is TBD.
- **The single-file marker shows the count**, not the rounded figure:
  `[ SINGLE FILE · 2449415267 B ]`. Where the page carries no exact count — no `title` on the
  size and no plain number that converts back to what is displayed — it falls back to the
  page's own rounded wording rather than showing a number that was never there.
- Checks: 21 internal-group and 107 torrent-page browser checks, each new one confirmed to
  fail with its change taken back out. Everything else unchanged and green.

---

## 1.24.2 — the size of a single file, and two things that read the page wrongly

- **A one-file torrent now says so, with its size.** The marker under the release name reads
  `[ SINGLE FILE · 2.28 GiB ]` where it reads `[ MULTIPLE FILES ]` on a pack, and clicking it
  copies one line: the file name and the exact byte count. That count is only ever the one
  the page itself carries — either in the `title` of the size it rounded for display, or, as
  DarkPeers prints it, as plain text under the rounded figure. A bare number on a page proves
  nothing on its own, so one is believed only when converting it back gives the very figure
  shown, to the same number of decimals; a seeder count, a torrent id or a year can never be
  mistaken for the size. Where no exact count is on the page, the rounded size is what gets
  shown and nothing is invented.
- **The marker's wording follows the page.** It was written once, when the marker was first
  put there, and then left alone — so a page that redrew a pack into one file kept saying
  `[ MULTIPLE FILES ]`. It is now re-read on every redraw, and what was read for the old
  shape of the page is dropped rather than carried over.
- **"Files in the torrent: 1 / 0" on the comparison panel.** A page whose file list had never
  been rendered was being read as a torrent with no files, which then counted as a difference
  and fed the same-name verdict. A list that was not read now says so — *no file list on that
  page — open "Show files" there, then capture again* — is not flagged as a difference, and
  the verdict no longer claims everything matches when the files were never compared.
- **A dialog the site took away with it.** Where a tracker redraws its own page, this
  script's dialog can go out of the document with it; reusing that detached one would open
  the explanation onto nothing. A dialog is now reused only while it is still in the page.
  (Adopted from the 1.24.1 build — see the note at the end of this entry.)
- Checks: 12 file-list, 17 capture and 106 torrent-page browser checks, each new one
  confirmed to fail with its fix taken back out. Everything else unchanged and green.
- **On 1.24.1:** it carries the detached-dialog guard above, which is now in here. Three
  things in it are worth knowing: the audit timestamp fix is missing, so the moderation log
  rewrites `seen` on every redraw; the host list in `rules.js` has markdown link syntax in
  it (`'[www.darkpeers.org](https://www.darkpeers.org)'`) — survivable only because the bare
  `darkpeers.org` entry still matches; and `pageInputs` was changed to re-read the file list
  and the whole page on every call, which is the exact work its own comment says it exists to
  avoid. All three are right in this build.

---

## 1.24.0 — two tracker rule sets that ship with the script, and four addresses

- **LUME** (luminarr.me) and **OnlyEncodes+** (onlyencodes.cc), built from the guides as they
  were supplied, offered under *Added trackers* → *Rule sets that ship with this script*.
  Press Add and the profile becomes an ordinary added tracker: editable, exportable,
  removable, and pickable in the Rules list. Nothing is added until you press it, because
  adding one changes which rules a badge cites.
- **LUME** carries its resolution list and the vocabulary its Naming Guide sets for each
  title element: DD+ rather than DDP or E-AC-3, DD rather than AC3, H.264/H.265 with the dot,
  WEB-DL with the dash and WEBRip as one word, Atmos on its own, Dual-Audio hyphenated,
  Director's Cut with its apostrophe, the resolution omitted for DVDs, and the Full Disc
  spelling Blu-ray told apart from the remux spelling BluRay. All seven of the guide's own
  examples pass its rules and the shared naming checks unchanged — that is a check in the
  suite, not a claim.
- **OnlyEncodes+** checks the title only for what its Upload Guide actually states: no tags
  referencing other trackers (6.3.1), NOGRP needing staff approval and every encode carrying
  a tag (6.3.2), season packs only after the season has aired (9), and a remux without the
  eac3to log being trumpable (1.1). The rest of that guide is about the upload rather than
  the title — screenshots, MediaInfo, piece sizes, seeding — and is carried as standing
  notes.
- **OnlyEncodes' naming standard and banned list** (wikis/18 and wikis/1) are in the profile
  too: 16 rules and 136 banned groups. The naming rules are the ones its standard is specific
  about — a WEB-DL names the format (H.264/H.265/VP9/MPEG-2), a WEBRip names the encoder
  (x264/x265), a remux names the format again (AVC/HEVC/MPEG-2/VC-1); DD+ not DDP; Resolution
  and VCodec both omitted for DVD sources; the Edition kept out of the name; S01-S03 COMPLETE
  for a multi-season pack; REPACK2 with the number joined on; and a missing service between
  the resolution and WEB-DL.
- **The banned list keeps its reasons and dates**, so a badge cites the tracker's own words.
  BHDStudio and Trix are marked removed on that page and are NOT on the list. EVO is not a
  flat ban but a conditional group — its WEB-DLs are allowed and nothing else is. BRrip is a
  source marker, matched anywhere in a title rather than as a tag.
- All four of OnlyEncodes' own examples raise no error; the two review notes that do fire on
  them (the eac3to log, a season pack) are meant to.
- **Four addresses added to the tracker catalogue**, each confirmed from a working search on
  the site itself: LUME
  (luminarr.me, UNIT3D — the script now runs there and picks the LUME rules by itself), and
  AvistaZ, CinemaZ and PrivateHD, kept exactly as they were tested. 58 entries to 62.
- **Luminarr's provider list** is in hand: all 195 general abbreviations were already known;
  its Japanese broadcasters and anime services were added (288 services). MX, TBS and ABC
  mean something else on the existing list and were deliberately left alone.
- Adding them found a real gap: the service token before WEB-DL was matched as letters and
  digits only, so AT-X, B-Global, NHK-BSP and the BS channels read as no service at all. A
  hyphenated abbreviation is now one abbreviation; a hyphenated word that is not a service is
  still reported.
- **LUME carries no banned list**, because none was supplied, and the profile says so.

## 1.23.0 — the group list stopped ageing, and a pack hands you its file list

- **"No home tracker recorded" for a group that ships on the list.** Adding one group used to
  save a copy of the whole directory beside it, and from then on nothing added to the shipped
  list in a later version ever reached you. What is kept now is what you *changed* — your
  additions and the rows you took out — layered over the directory the script ships, so new
  versions bring their new groups with them and what you did stays done on top of them. A list
  saved by an older version is read as additions only: nothing is deleted on a guess.
- **New on the shipped list**, reported to the project (cited in the data file):
  JBENT, "JBENT TAoE", OnlyMux and WhiskeyJack at OnlyEncodes+, and DOOBS at DarkPeers. Kitsune
  at Aither, and twelve other names reported at the same time, were already there.
- **The empty first bullet in the group menu.** A row that is only a note was drawn as an empty
  span with the note underneath it, so the bullet pointed at a blank line. It is one line now.
- **[ MULTIPLE FILES ]**, under the release name of any torrent that holds more than one file.
  Click it and the whole list goes to the clipboard: the folder and its total, then every file
  with the exact byte count — the form a season pack has to be pasted in when it is checked.
  Asked for by dreadful.
- **The exact byte size on the vs panel.** UNIT3D puts the byte count in the title of every
  size it rounds for display, so "17.56 GiB" now reads "17.56 GiB · 18855538688 B", and the
  difference between two totals is given in bytes. Two files that both show "5.70 GiB" but
  differ by a megabyte are now reported as differing — before, the rounded figures matched and
  the difference was invisible. Where a page carried no byte count, none is invented from the
  rounded one.
- A page that re-renders its release name in place could write it back over the group tag,
  leaving the name reading "…H.264-DKOKTODKOKTO" and every lookup built from it carrying that.
  It is put right on the next pass.

## 1.22.0 — the settings are the same settings on every tracker

- The trackers you are on, added trackers and their rules, the internal-groups list and the
  per-tracker rule choice moved to Tampermonkey's per-script store, shared by every site the
  script runs on. Browser storage is per domain and could not do it. No new permission.
- The audit, the decision log, private notes and seen requests stay per site: they are a
  record of work on that tracker, not a setting.
- A setup made before this version is carried up the first time it is read; writes reach both
  stores, so an older copy of the script still reads what the newer one did.

## 1.21.2 — three things reported from the trackers

- Show the JSON answered an empty form with the save-time error about the key. It shows the
  draft now and says what is still needed; Save as file stays strict and says so.
- The lookup row's own-tracker search was labelled "Search DarkPeers" on every tracker. It is
  named after the site you are on now, or the hostname, or "Search this tracker".
- DarkPeers and Zenith are in the cross-check catalogue; the tracker you are standing on is
  skipped instead, with its reason. Writing that check found the host being lowercased after
  the www. prefix was stripped, so WWW.DarkPeers.org was not recognised.

## 1.21.1 — five bugs from a code review

- A bitrate or size with its thousands separated ("8 000 kb/s") was read as its first group,
  so a 12.5 Mb/s release was reported as 100% higher than an 8 Mb/s one instead of 36%.
- The AKA position check could never fire on a resolution: the marker list held \d{3,4}[pi]
  inside a regex literal, where it matches a backslash rather than digits.
- A profile copied from a built-in exported every conditional group with a WEB-DL pattern, so
  a copy of DarkPeers said HDT was allowed for Remuxes and then allowed it only on WEB-DLs.
- Editing a banned list took effect only after a reload when the length did not change: the
  built list was cached on the lengths of the profile's lists plus its label.
- Three no-op lines removed.
- Redraw work: the torrent page stamps its inputs before re-parsing the MediaInfo and
  re-reading the file table, listingPage() is answered once per pass, and the audit store
  stops rewriting itself when nothing changed.
- Each fix carries a check confirmed to fail with the bug put back.

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
- The payload follows HelperZ's block layout (Torrent Moderation Helper, by MagnetZ) and its
  two flags, so a captured pair pastes into WinMerge, meld or any two-pane diff tool.
- HelperZ's companion server on 127.0.0.1:5123 is deliberately not used: this script still
  declares "@grant none" and lists no @connect address, and a check asserts both.
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
- The list is the InviteHawk internal-encoders directory (433 groups,
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
