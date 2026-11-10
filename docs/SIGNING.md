# Code Signing Policy / Release Integrity

## Project

| | |
|---|---|
| Name | WoWS Launcher |
| Repository | https://github.com/dingy6607-ops/wows-third-party-launcher |
| License | MIT |
| Type | Community-made, non-official launcher shell for World of Warships |

This project is a hobby project and is **not affiliated with Wargaming.net or Lesta Studio**. Game names and trademarks belong to their respective owners. The game client itself is distributed and updated by the official Game Center; this project only provides a launcher shell.

## Current status: releases are UNSIGNED

An application was made to the **SignPath Foundation** free code-signing program for open-source software, but it was **not approved** (the project does not meet the prominence / visibility requirement). As a result, **official releases are currently published without an Authenticode signature**.

This means:

- Windows SmartScreen may show an "unknown publisher" warning on first run. Users must choose **More info → Run anyway**.
- `Get-AuthenticodeSignature` reports `NotSigned` for official installers. This is expected, not a sign of tampering.
- The publisher has no code-signing certificate and stores none in the repository or CI.

We do not claim that releases are signed. If a future version becomes signed, this document and the release notes will be updated accordingly.

## Artifacts

Each GitHub Release contains exactly three assets:

| File | Purpose |
|------|---------|
| `WoWS-Launcher-Setup-<version>.exe` | Windows NSIS installer (x64), currently unsigned |
| `latest.yml` | electron-updater version manifest: installer URL, SHA-512, size, release date |
| `WoWS-Launcher-Setup-<version>.exe.blockmap` | differential update block map |

## Build process

All official release binaries are built **from source in a clean, trusted CI environment**. Pre-built or locally built binaries are never published as releases.

Pipeline: [`.github/workflows/release.yml`](../.github/workflows/release.yml)

1. Triggered **only** by pushing a `v*` tag (e.g. `v1.0.0`). Branch pushes and pull requests do not trigger a release.
2. Runs on `windows-latest`, a GitHub-hosted runner.
3. Steps: `actions/checkout` → `npm ci` (lockfile-pinned, reproducible) → `electron-builder` producing an **unsigned** installer → upload as a GitHub Actions artifact → optional signing branch (disabled by default) → rebuild `latest.yml` and `.blockmap` against the final installer → verify → create the GitHub Release.
4. The tag version is verified to match `package.json`'s `version` before any build.
5. The CI build disables local code signing (`signExecutable: false`) and removes the local self-signed certificate configuration. No certificate or PFX exists in CI.

### Optional signing branch

The pipeline retains a signing branch using `signpath/github-action-submit-signing-request@v2`. It is **disabled by default** and is activated only when the repository sets the variable `SIGNPATH_ENABLED=true` and all five SignPath secrets are present. All SignPath identifiers and the API token come from GitHub Actions secrets; nothing is hard-coded. If any secret is missing, the workflow automatically falls back to an unsigned release.

If signing is ever enabled, this policy will be revised to describe the issuing CA, the verification procedure, and the private-key handling.

### Why update metadata is rebuilt

`electron-builder` computes `latest.yml` (SHA-512 / size) and the block map from the installer at build time. External signing would modify those bytes, so the workflow always recalculates the SHA-512 and size and regenerates the block map against the **final published installer**, then verifies the match before creating the Release. This keeps `electron-updater` working regardless of whether the optional signing branch is used.

### Unsigned updates

Since installers are unsigned, the CI build sets `verifyUpdateCodeSignature: false`. This prevents electron-builder from writing a `publisherName` into `app-update.yml`, which would otherwise make electron-updater reject every unsigned update on Windows. Integrity is still protected by the SHA-512 in `latest.yml` and by HTTPS delivery from GitHub Releases.

## Local / internal builds

Local development builds (`npm run dist`) use a **locally generated self-signed certificate** (`build/wows-launcher.pfx`), which is excluded by `.gitignore` and never committed. These builds are for internal testing only; they are never published as a GitHub Release and are not official builds.

## How to verify a release

1. Download the installer from the repository's **Releases** page only — not from mirrors, file-sharing sites, or third-party re-uploads.
2. Confirm the SHA-512 matches the value in `latest.yml` from the same release:
   ```powershell
   $b = [IO.File]::ReadAllBytes(".\WoWS-Launcher-Setup-1.0.0.exe")
   [Convert]::ToBase64String([Security.Cryptography.SHA512]::Create().ComputeHash($b))
   ```
   The size must also match the `size:` field in `latest.yml`.
3. Confirm all three assets (`exe`, `latest.yml`, `.blockmap`) are present in that release.
4. `Get-AuthenticodeSignature` returning `NotSigned` is expected at present; it does not by itself indicate a problem. Integrity is established by the hash check above and by the source of the download.

Because the binary is unsigned, **the hash check plus the trusted download source are the only integrity controls**. Take both seriously.

## Reporting issues

If you find a binary that claims to be an official release but fails the checks above, please open an issue in this repository with the download URL and verification output.
