# DKOKTO 1.22 — using it

Replaces GUIDE-1.6. Install `DarkPeers-DKOKTO.user.js` into your existing Tampermonkey
entry, save, reload. Keep one copy enabled. It runs on `darkpeers.org` and `znth.cx`.

The standalone **Torrent Inspector** is the same tool without the theme, artwork, chat games
or forum tools. Run one or the other, not both — the standalone stands aside if it finds the
full edition on the page.

---

## 1. Which tracker's rules

A **Rules** dropdown sits in the listing legend bar and at the top of the naming box.
DarkPeers or Zenith, plus any tracker you have added. On a site it recognises it starts on
that site's rules; your choice is remembered.

This changes the **upload rules** and the **banned release group list**, not the naming
guide, which the two share. So the same title can be clean on one and rejected on the other:
`…x265-Goki` is fine on Zenith and banned on DarkPeers; `…-BiTOR` is the reverse.

**Tracker rules…** beside the dropdown adds one of your own. Fill in a name and address,
paste the tracker's banned list straight off its page, tick the rules that apply, add it.
`TRACKER-RULES.md` has the full format; or send me the tracker's rules page and I will write
the profile.

## 2. Badges on a listing

Open `/torrents` in **List** or **Card** view. Every loaded release name gets a badge:

- **✕** the supported checks found corrections.
- **✓** the supported title checks passed — *not* that the media, source history, episode
  mapping or tracker approval were verified.
- **?** something needs your judgement: an uncertain category, a standing rule the title
  cannot settle, or a missing release group tag.

Hover for a one-line reason, click for the full explanation, corrections, the applicable
template, a **Copy report text** button and the **reply builder**. Tab and Enter work;
Escape closes.

Badges also appear on a member's uploads, bookmarks, requests, playlists, the home page's
panels, a film's own page, and the **moderation queues**.

**On a film's own page** the rows carry no media title — just `2160p MA WEB-DL …-BYNDR`. The
title is taken from the page heading and checked with the row; the badge's tooltip says
*Checked as:* with the full name it used.

**Where a page shortens a long name** with an ellipsis, it says the name is shortened rather
than judging what is left — a cut-off group tag is not a missing one.

**Audit loaded titles** in the bar lists every release name on the page with its faults, as
text you can copy. It also keeps what you have checked while browsing, so an audit can span
a sweep of pages. Nothing is fetched: only pages you actually open are recorded.

## 3. Moderating a queue

On `/torrents/pending`, `/torrents/rejected` and `/torrents/postponed` each row also gets a
**decision**: *Approved / Rejected / Asked the uploader / Left for someone else*. The row is
ticked with the decision and its date, so a sweep does not repeat itself. Rejecting or asking
prompts for a note kept against that row.

The bar counts what you have recorded, **Copy moderation log** gives it as text, **Clear
log** forgets it. It records what *you* decided — it changes nothing on the tracker, and it
never leaves your browser.

**Reply to the uploader** is inside the badge dialog. It writes the findings up: the
corrections numbered in the guide's own words, the release name and its link, and a closing
line. Four outcomes with one suggested from the findings — a banned group suggests a
rejection rather than a rename. The manual checks appear as *worth confirming*, never as
faults. Edit it in the box before you copy it; nothing is sent from here.

## 4. On a torrent page

Under the release name you get the badge, a **lookup row** (this tracker, IMDb, TMDB, Trakt,
Letterboxd, JustWatch, Blu-ray.com, srrDB, and MyAnimeList / MusicBrainz / Open Library /
IGDB as the category warrants), **Other versions** on this tracker, and **On your trackers**
— the cross-check.

And a **findings row** built from the page itself:

| It reads | It checks |
| --- | --- |
| The TMDB title and year | Does the release name start with the title the page names? |
| Type, Resolution, Category | Filed as an Encode with `REMUX` in the name? Filed 720p with `1080p`? |
| The file list | Container, a lone film in a folder, samples, and whether a pack's files agree |
| MediaInfo / BDInfo | Is either posted, and the right one for a full disc? |
| The original language | `Dual-Audio` and `MULTi` against the audio actually reported |

**Where a rule is in hand it is cited and the finding is an error. Where none is, the finding
says so** — *"the guide in hand states no container rule for this tracker, so check its
upload rules."* Nothing invents a rule to sound authoritative.

## 5. The Inspector

**Inspect torrent** (Alt+Shift+I) reads the MediaInfo already on the page, or one you paste.
It reports the tracks, and checks what the title claims against them: resolution against
pixels, progressive against scan type, the video codec, HDR and DV, Atmos, **the audio codec
against the default track** (DD and DD+ kept apart), **the channel layout against the
reported count**, `Dual-Audio` against the languages, subtitles for non-English audio, and a
`REMUX` with no chapters.

**Compare two releases** — paste a report on each side, or load the page's as A. It names
what the two differ on and marks the larger number with the percentage. It does **not** pick
a winner: source, encode quality and provenance are not in a report, and it says so.

The **naming box** checks a title against the chosen tracker's rules, with reference fields
(official title, original-language title, service) to make the manual checks decidable, a
searchable copy of the 261 streaming-service abbreviations, and **Already uploaded?** — the
exact release name searched on every tracker you have chosen, so you find out before you
spend the effort.

**Private notes** per torrent, kept in your browser.

## 6. Requests and the cross-check

On `/requests` every row gets a search button, and a request's own page shows the links under
its title. 26 trackers are built in, each with its own search address, editable; anything
missing can be added. Only `https` addresses are accepted, a tracker that cannot carry the
request is left out with the reason, and no login, cookie or API key is read or stored.

**Search all** opens them in tabs. Browsers allow one tab per click and silently block the
rest, so if yours refuses a burst they are offered one at a time — *Open Aither ▸ (5 left)* —
with **Copy every link** as the fallback. Checked requests are ticked with the date.

**Alt+Shift+T** opens a search box for any title anywhere on the site, prefilled from your
selection or the release name on the page.

## 7. Appearance and the rest

**DKOKTO** (Alt+Shift+D) — purple styling, banner, compact tables, reading size, motion,
glowing icons, oversized-icon fitting, and the **chat games helper (CTI, Tug of War)** toggle,
remembered per site and off by default on a tracker with no such forum.

**Feature settings** keeps the original Chungus Edition options. Particles, sounds, watermark
and ticker are off by default in this fork.

## 8. What it does not do

No requests, posts, uploads, downloads or edits of any kind. No `@grant` beyond the
originals, no API access, no cookies or passkeys read. Every link opens only when you click
it. Notes, settings, the audit, the decision log and any tracker profiles live in your own
browser, bounded, and are never sent anywhere.

A **✓ means the supported title checks passed** — not that the media, the source history or
tracker approval were verified. Where the tool cannot know something it says so rather than
guessing, and where it is applying a rule it names the rule.

## 9. If something looks wrong

Send a screenshot with the badge's tooltip visible. Three of the bugs fixed in this line were
found that way, and each one is now a fixture built from the exact row that showed it up —
the audiobook queue, the film page with a `rowspan`, and the row whose comment icon was being
badged.
