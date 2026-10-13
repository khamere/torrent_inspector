# Torrent Inspector 2.0

Check torrent naming and posted MediaInfo, search connected trackers and copy evidence
from one compact box. Easy mode is the default; Advanced mode keeps the original tools.

Use **Set up trackers** once, then **Check this torrent**. Matching results show their
titles, reported filenames, upload dates and separate **Copy MediaInfo**, **Copy BDInfo** and
**Copy description** buttons. Descriptions keep the original BBCode. PeerGarden direct
API support, automatic Prowlarr fallback and srrDB click lookups are included.

Supported formatting fixes have a **Suggested title** copy button. **Review reply**
combines selected findings into a BBCode preview. **Season-pack checks** compares
episode numbers and file sizes from returned or remembered lists, while keeping
missing evidence clear. These all stay inside Easy mode's compact box.

Full Blu-ray BDInfo can show **Matching disc report** when its disc label, exact
disc bytes, playlist, duration and tracks agree. Incomplete reports stay for review.
Matching reports do not prove that the actual disc files are identical.

**[torrent.dkokto.dev](https://torrent.dkokto.dev/)** shows the current workflow and
screenshots, with a [Rules builder](https://torrent.dkokto.dev/rules.html) for custom profiles.

## Getting the script

The script is handed out privately to moderators and staff of supported trackers.
Ask DKOKTO on your tracker for the installation address. No userscript or private
source directory is published in this public repository.

Updates keep your settings and keys already saved in Tampermonkey. Older page-only
credentials need to be entered once in setup. Keys stay out of backups.
Checks compare posted evidence, not the actual media, and never approve or submit
changes to a tracker. No usage telemetry is added.

The latest fixes keep the same interface. FileList tooltip parsing stays inert;
API results remain tied to the requested torrent and saved connection. Cancelled
searches stop, tools recover after page replacements, and failed group or template
saves keep the previously saved state.

## Reporting a group

Use the [group-report form](https://github.com/khamere/torrent_inspector/issues/new?template=group-report.yml)
to suggest a home tracker or scene association with a source. Reports are reviewed manually.
