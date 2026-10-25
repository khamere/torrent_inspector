# Torrent Inspector 2.2.0

On desktop, Torrent Inspector opens as a drawer at the right edge of the page.
A verdict line leads into three folded groups: **Automatic checks**, **Needs you**
and **Other trackers**. Open a group for its evidence or manual checks.
**Check this torrent** in the header searches your connected trackers.

**Set up trackers** opens one screen with Prowlarr import and manual tracker-key
forms visible together. Use either path, save/test a connection, then check.
Your setup is saved for later torrents.

Results show report/BBCode copy buttons directly; **Details** opens comparison
and report evidence. **Retry** repeats a failed tracker. **Search options** holds
filters, **Search more broadly** and **Search all trackers**. Website
search tabs and comparisons stay under **More** on the page.
Equivalent **Candidates to review** can share a card without becoming matches.
Each tracker keeps its own report, original BBCode, date and link; similar names
alone or conflicting identity evidence do not group results.

**Page checks passed** and **Review needed** describe loaded evidence and required
confirmations; they never approve an upload. The **Personal Release** check row
is separate from **Internal**. Expand any check row for its evidence and manual confirmations.

**Copy recommended name** is in the bottom action row. It copies a name reassessed
against the active guide. A **Suggested title** card above the groups explains
corrections; **Review reply** in that card combines selected findings into BBCode.
**Season-pack checks** under **Automatic checks** runs when
the local file list appears and flags **Missing episode numbers**, before
the main check. Your optional expected count/list takes precedence for partial
packs and can check leading or trailing absences. No official length is guessed.
**Check a local .torrent file** under **Other trackers** reads chosen metadata
locally. **Screenshots** under **Automatic checks** checks image count and loaded
sizes. Expand it for each image's details.

On requests, **Search trackers** opens the compact results box and starts the saved
API search in one click. Request lists have matching **Search trackers** and **Web
links** buttons. One compact request-page toolbar holds search and header **Set up
trackers**; **Website searches** stays folded. Results use at most two columns on
wide screens and one on phones.
**Matches request details** means an ID and the listed requirements agree; title-only
or incomplete results stay under **Check these releases**, and conflicts under
**Other editions**. Open a result or copy its returned report and BBCode directly.
These are request-detail comparisons, not MediaInfo/hash or same-file matches.
Searching never fills, claims or approves a request.

InfinityHD naming follows its movie, TV and music guide,
including **DV HDR** and bracketed music with an optional group tag. Metadata and
official retail box-set status still need manual confirmation. Music requirements
§10 add FLAC 16/24-bit report/file checks; missing evidence
stays for review. Completeness, tags, provenance, untouched WEB files, analog
lineage, log integrity and bundled videos remain manual. Secure CD ripping, logs,
cue sheets and a 100% score are recommendations. Original Scene/P2P names are kept.

**Hide ›** slides the drawer away to an edge tab; **Alt+I** brings it back.
The **▾** beside the title folds it to the verdict line. **In page** moves it below
the release name; **As drawer** returns it. Below 600px the panel stays in the page
with larger controls. Search results stay under **Other trackers**; **Other editions**
starts collapsed. The Nocturne palette gives the panel its blue-grey colours.

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

Optional inputs and tools stay collapsed. A local .torrent file is never announced,
uploaded or saved in settings. Screenshot checks read loaded counts and dimensions;
original-image links open only when clicked. Missing evidence stays unknown, and
no suggested name or review reply is posted automatically.

## Reporting a group

Use the [group-report form](https://github.com/khamere/torrent_inspector/issues/new?template=group-report.yml)
to suggest a home tracker or scene association with a source. Reports are reviewed manually.
