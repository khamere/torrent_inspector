# Contributing to Torrent Inspector

This repository is a description of the script and the home of its group-report form. The
script itself, its guide and its release notes are distributed privately; the source is not
published. Two kinds of contribution are welcome here.

## Report a group

Use the group-report form under Issues: the group's tag, whether it is scene or internal at
which tracker, and where that can be checked. A person reads each report, and the ones that
check out go into the next release with the report's date and issue number.

## Report a problem or suggest a change

Open an issue describing what you saw and what you expected — script version and edition,
browser and userscript manager, tracker and page type, and exact steps. For naming or
MediaInfo problems include the release name, the report fields or the file names as text,
and a cropped screenshot with the badge's tooltip visible. Remove account details and any
private tracker information that is not needed to reproduce it; use synthetic or redacted
data in examples.

Changes are made to the maintained source and released from there; the boundaries every
change keeps are: no request the person has not chosen (the only ones the script makes are
a read of the tracker's own API with the person's own key, and none without it); nothing
posted or submitted to a tracker; links open only when clicked; local storage stays
bounded and validates what it reads; missing evidence stays unknown — no invented rules,
file names, IDs or results; a tracker rule is cited with its text and its source or the
date it was supplied; the tracker's appearance is left alone.

For a possible security problem, ask in an issue for a private channel rather than posting
details publicly.
