# Adding a tracker

DarkPeers, Zenith, OnlyEncodes and Luminarr are built in. Any other tracker is added as a **profile**: a JSON
object holding who the tracker is, its banned release group list, and its rules. Nothing in
a profile is executed and nothing is fetched — patterns are compiled as regular expressions
and matched against a title, and one that will not compile is refused with the reason.

Open **Tracker rules…** beside the *Rules* dropdown, in the listing legend bar or at the
top of the naming box.

## The rule sets that ship with the script

Two are built from guides supplied in full, and sit in **Added trackers** under *Rule sets
that ship with this script*. Press **Add** and the profile becomes an ordinary added
tracker — editable, exportable, removable — and can be picked in the *Rules* list. Nothing
is added until you press it, because adding one changes which rules a badge cites.

| Rule set | Built from | What it does not have |
| --- | --- | --- |
| **LUME** (luminarr.me) | its Naming Guide — both title templates, and the vocabulary for every element | no banned-group list: none was supplied |
| **OnlyEncodes+** (onlyencodes.cc) | its Upload Guide + Rules, its naming standard and its banned list — 16 rules, 136 groups | — |

Where a page was not supplied, the profile says so in its own standing notes rather than
filling the gap with a guess. Paste it in and the checks can quote it instead.

## The quick way

The **Build one** tab is a form. Fill in the name and address, paste the tracker's banned
group list straight off its page, tick the rules that apply, and add it. The pasted list is
read in whatever shape the tracker publishes it:

| What you paste | What it reads |
| --- | --- |
| `4K4U⇥Quality⇥01-01-1969` | name, reason, and the date unless it is a placeholder |
| `EVO \| Quality` | name and reason |
| `RARBG    Quality` (runs of spaces) | name and reason |
| `RARBG, YTS, YIFY` | three names |
| one name per line | one name each |

Placeholder dates (`01-01-1969`, `1970-01-01`, `n/a`) are dropped rather than shown as if
they meant something. A repeated name is listed once.

**Show the JSON** prints what would be added, so you can copy it, keep it in a file, or
hand it to someone else. **Added trackers** lists what you have, with *Copy JSON*, *Save as
file* and *Remove*, and offers a copy of DarkPeers' or Zenith's own profile as a starting
point.

## The format

```json
{
  "format": "dkokto-tracker-rules",
  "version": 1,
  "key": "aither",
  "label": "Aither",
  "base": "dp",
  "hosts": ["aither.cc"],
  "groups": {
    "banned": [["RARBG", "Quality"], ["BiTOR", "Faking DV/Atmos", "03-06-2026"], ["SomeGroup"]],
    "conditional": [
      { "name": "EVO", "allowIf": "(?:^|[ ._])WEB-?DL(?=$|[ ._-])",
        "allowed": "WEB-DLs", "otherwise": "this title does not say WEB-DL" }
    ],
    "sources": [{ "name": "BRrip", "pattern": "(?:^|[ ._])BR-?rip(?=$|[ ._-])" }]
  },
  "resolutions": ["720p", "1080p", "2160p"],
  "rules": [
    { "code": "boxset", "severity": "error", "profiles": ["movie"],
      "forbid": "(?:^|[ .])Trilogy(?=$|[ .-])",
      "message": "Aither takes no movie boxsets: upload each film separately." }
  ],
  "notes": [
    { "code": "standing", "profiles": ["movie", "tv"],
      "message": "Check Aither's description requirements yourself." }
  ]
}
```

| Field | What it does |
| --- | --- |
| `key` | 2–24 characters, lowercase letters, digits and hyphens. Not `dp` or `zenith`. |
| `label` | What the *Rules* list shows, and the name used in every message. |
| `base` | `dp` or `zenith` — whose naming templates apply. See below. |
| `hosts` | Domains. On one of these, this tracker's rules are chosen for you. |
| `groups.banned` | `["Name"]`, `["Name", "reason"]` or `["Name", "reason", "since"]`. The reason appears in the badge. |
| `groups.conditional` | Allowed only for what `allowIf` matches — the EVO-for-WEB-DLs shape. |
| `groups.sources` | Matched anywhere in the title rather than as a trailing tag, the way `BRrip` is. Omit `pattern` and the name is matched as a word. |
| `resolutions` | Optional. Given, only these are accepted; omitted, the base's list applies. |
| `rules` | Your own checks. Each needs a `code`, a `message`, and a `forbid` or `require` pattern. |
| `notes` | Standing reminders. Always shown, never colour a badge. |

**`severity`** is `error` (red ✕) or `review` (amber ?). **`profiles`** limits a rule to
categories: `movie`, `tv`, `disc`, `music`, `ebook`, `audiobook`, `software`, or `any`.

**`forbid`** fires when the pattern matches; **`require`** fires when it does not. Patterns
are JavaScript regular expressions, matched case-insensitively, so escape backslashes for
JSON: `\\d{4}`, not `\d{4}`.

### What `base` decides

A profile carries its own lists and rules either way. `base` only says which built-in
naming templates the tracker's titles are checked against:

- **`dp`** — the scene-style video template (`Name Year Resolution Source Type Acodec
  Channels Vcodec-Tag`), DarkPeers' book templates, and `Artist - Album (Year) - Format`
  for music.
- **`zenith`** — the same video checks, but Zenith's audiobook, ebook and music templates
  (`Author - Title (Year) Language {Narrator} [Source] Container Codec Bitrate`, and so on).

Pick whichever the tracker's naming is closer to, then correct the differences with
`rules`.

## Limits

Twelve added trackers, 1000 groups and 150 rules each, patterns up to 300 characters, and
256 KB of profiles in total. Everything lives in your own browser; nothing is uploaded.

## If you would rather not write JSON

Send the tracker's rules page and banned list as text and I will produce the profile for
you — that is how DarkPeers' and Zenith's were built.
