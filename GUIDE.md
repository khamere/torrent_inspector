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

- **Automatic naming checks** — the on/off switch for the badges. The group tag in each
  name is not a check and stays marked with the box cleared.
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
sizes — for three days. Open the same release on any other tracker the script runs on, by
the lookup row or on your own, and a banner at the top of that page says whether it is the
same thing, item by item, with a link back. On the first page the badge's dialog then
carries the answer under **Source check**, and a Unique ID that turned out different is a
red finding. Nothing is fetched or opened for you; the script reads the page you went to.

The section starts by listing what it remembered — the Unique ID, the file name, the folder
and the size — so you can compare them with the other page by eye; the banner there shows
the ID it found beside the one it was looking for. The Unique ID itself is on the page's
own MediaInfo, under General, and the hex in brackets is the form the script matches.
The other page is read whole, including a MediaInfo tab you have not opened; if it truly
has no Unique ID in it, the banner says *Unique ID – (none on this page)* and only the
file name and size are compared. The file name sits under the title in the banner, as the
file is named, so spaces and dots show. The summary line prints the size it compared —
*size ✓ (20.40 GiB, 21,904,512,000 bytes)* — so a tick can be checked against the page,
to the byte where the page prints bytes, and a cross says which size it was looking for.

When no banner appears, the dialog's Source check section says why: how many uploads from
other trackers it looked for on this page and whether any was about it. A page that is a
different encode of the same title — H.264 where you remembered the H.265 — is not about
them, and stays quiet on purpose.

Two things it checks on the report itself while it is there: a Unique ID whose decimal and
hex halves are different numbers (someone typed it), and a file size that is not the size
of the file in the page's own list (the report is from another file).

### TorrentLeech and FileList

These two are not UNIT3D, so there are no badges and nothing is judged there. What you get
on their torrent pages is a panel under the name with the lookups and the Source check
section, and the banner when you arrive from another tracker with the same release
remembered. TorrentLeech has no MediaInfo on the page, so only the name, files and size can
be compared; it prints file names in lower case, and the check says so rather than failing
them. On FileList the MediaInfo is on its own page — the panel links to it — and opening it
fills in the Unique ID for that torrent. **Choose trackers…** in the panel opens the same
"Trackers you are on" dialog as the Details button does elsewhere.

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
- **A lookup row** — this tracker's own search for the title, **Exact name** (this tracker's
  search for the release name as it stands), then the other trackers you are a member of,
  then **Search all**, which opens one tab per tracker when you press it. Under the
  cross-check, **This exact name:** searches the whole release name on those same trackers,
  with a **Search all** of its own. The **srrDB** link searches the title words and the
  release group, which is how a scene record is found.
- **vs** — capture this release, capture another on a second page, and compare the two side by
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

Added trackers, rule sets, the internal-groups list, your templates, your private notes,
the record of what you have looked at, the checks you have ticked, and the uploads
remembered for the source check with what the source said. All of it on your machine: Tampermonkey's own per-script
store where the manager has it, so the setup is the same on every tracker it runs on, and
ordinary browser storage otherwise. Nothing is sent anywhere, and every list can be exported as
JSON and taken with you.
