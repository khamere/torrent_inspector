# Contributing to Torrent Inspector

Bug reports, clear examples, documentation improvements, and focused feature requests are welcome.

## Report a bug

Search existing issues, then use the bug report template. Include your script version and edition, browser and userscript manager, tracker and page type, exact steps, and expected versus actual behavior.

For naming or MediaInfo problems, include the relevant release name, report fields, or filenames as text. A cropped screenshot helps explain the interface. Remove account details and private tracker information that is not needed to reproduce the issue.

## Suggest a feature

Describe the workflow problem and a concrete example. Explain the result you want rather than only listing a new button. Use the feature request template and note any related existing tools.

## Documentation changes

Keep the README short. Detailed walkthroughs belong in GUIDE.md or the Wiki, historical release notes in CHANGELOG.md, and the screenshot gallery on the website. Use the current interface labels and check your links.

## Code and tracker-rule changes

The published userscript is a generated release artifact. Discuss behavior changes in an issue so they can be applied to the maintained source and rebuilt. Do not assume the public distribution repository contains the development build tools.

Keep changes focused and explain how they were checked. Preserve these project boundaries:

- No background network requests or automatic tracker submissions.
- Tracker links open through explicit user actions.
- Local storage stays bounded and validates what it reads.
- Missing evidence stays unknown; do not fabricate tracker rules, filenames, IDs, or results.
- Changes to tracker rules need the rule text and its source or supplied date.
- Respect the tracker’s appearance; style the script’s own controls.

Reproductions should use synthetic or suitably redacted data. A maintainer with the development workspace can run the shared checks and both editions’ browser fixtures before integrating a release.

## Pull requests

Describe the problem, resulting behavior, and validation in the PR template. Include before/after screenshots for visible changes. Keep unrelated cleanup separate. Mention any unavailable validation rather than reporting it as passed.

For a possible security vulnerability, request a private reporting channel without posting exploit details in a public issue, or use GitHub’s private vulnerability reporting if the repository has enabled it.
