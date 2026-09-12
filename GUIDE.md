# Torrent Inspector — using it

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

Click a badge and it tells you what it found, quotes the rule it is applying, and offers
**Copy report text** — a paste-ready summary for a comment or a report.

Above the results is a bar with:

- **Automatic naming checks** — the on/off switch.
- **Rules** — whose rules the badges are applying. On a tracker whose rules are not in hand
  this says so, and nothing is judged until you choose.
- **Internal groups…** — the directory of which tracker a group is internal to. A group's tag
  in a release name is clickable; the popup says *listed as internal at* and, on the same
  line, **where that came from** — the community directories with their date, a report to
  this project with its date, or your own addition. A directory's word can be months stale
  and is nobody's staff list, so check before acting on it.
- **Tracker rules…** — add a tracker of your own.
- **Audit loaded titles** — everything on the page at once, as a table you can copy.
- **Copy moderation log** — the record of what you have looked at and decided, kept locally.

### Whose rules?

Four rule sets ship: **DarkPeers**, **Zenith**, **LUME** and **OnlyEncodes+**. LUME and
OnlyEncodes+ are offered rather than applied — open *Tracker rules… → Added trackers*, and
press **Add** beside one. Adding a rule set changes what a badge cites, so it waits to be
asked. Once added it is an ordinary added tracker: editable, exportable, removable, and it
selects itself on its own site.

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
  Click it and the file list goes to the clipboard: the folder and its total, then every file
  with the exact byte count the page carries. Where the page only rounded, its own wording is
  copied rather than a number nobody printed.
- **A lookup row** — this tracker's own search for the title, then the other trackers you are
  a member of, then **Search all**, which opens one tab per tracker when you press it.
- **vs** — capture this release, capture another on a second page, and compare the two side by
  side: the names, the sizes to the byte, the file counts, the MediaInfo. If one page never
  rendered its file list, it says so rather than reporting nothing as zero.
- **From this page** — what the page itself says about the release, and where it disagrees
  with the name.

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

**Inspect torrent**, or `Alt+Shift+I`. Paste a MediaInfo report — text or JSON — and it reads
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

**Backup…** in the listing bar saves everything this script has kept — the trackers you are on,
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

Added trackers, rule sets, the internal-groups list, your templates, your private notes and
the record of what you have looked at. All of it on your machine: Tampermonkey's own per-script
store where the manager has it, so the setup is the same on every tracker it runs on, and
ordinary browser storage otherwise. Nothing is sent anywhere, and every list can be exported as
JSON and taken with you.
