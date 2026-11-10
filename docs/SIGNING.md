# Code Signing Policy

## Project

| | |
|---|---|
| Name | WoWS Launcher |
| Repository | https://github.com/dingy6607-ops/wows-third-party-launcher |
| License | MIT |
| Type | Community-made, non-official launcher shell for World of Warships |

This project is a hobby project and is **not affiliated with Wargaming.net or Lesta Studio**. Game names and trademarks belong to their respective owners. The game client itself is distributed and updated by the official Game Center; this project only provides a launcher shell.

## Artifacts covered by this policy

Only one binary is signed with the SignPath Foundation open-source code signing certificate:

- `WoWS-Launcher-Setup-<version>.exe` — the Windows NSIS installer (x64).

Published alongside it, but **not** signed (metadata only):

- `latest.yml` — electron-updater version manifest (contains the installer's SHA-512 and size)
- `WoWS-Launcher-Setup-<version>.exe.blockmap` — differential update block map

## Build and signing process

All official release binaries are built **from source in a trusted CI environment**. Pre-built or locally built binaries are never submitted for signing.

Pipeline: [`.github/workflows/release.yml`](../.github/workflows/release.yml)

1. Triggered **only** by pushing a `v*` tag (e.g. `v1.0.0`). Branch pushes and pull requests do not trigger a release.
2. Runs on `windows-latest`, a GitHub-hosted runner (required by the SignPath OSS program).
3. Steps: `actions/checkout` → `npm ci` (lockfile-pinned, reproducible) → `electron-builder` producing an **unsigned** installer → upload as a GitHub Actions artifact → `signpath/github-action-submit-signing-request@v2` (waits for completion) → replace the installer with the signed one → rebuild `latest.yml` and `.blockmap` → create the GitHub Release.
4. The tag version is verified to match `package.json`'s `version` before any build.
5. Signing is performed **exclusively by SignPath Foundation**. The private key never leaves SignPath; no code-signing certificate or PFX file is stored in this repository or in CI. All SignPath identifiers and the API token are stored as GitHub Actions repository secrets and are never hard-coded.
6. Origin verification: the `GitHub.com` Trusted Build System is linked to the SignPath project and the SignPath GitHub App is installed. SignPath independently verifies that the artifact originates from this repository's workflow run.

### Why update metadata is rebuilt after signing

External signing modifies the installer bytes, while `electron-builder` computes `latest.yml` (SHA-512 / size) and the block map from the *unsigned* file. Without recomputation, electron-updater would reject the download on hash mismatch. The workflow therefore recalculates the SHA-512 and size and regenerates the block map against the **signed** installer, and verifies the match before publishing.

## Local / internal builds

Local development builds (`npm run dist`) use a **locally generated self-signed certificate** (`build/wows-launcher.pfx`), which is excluded by `.gitignore` and never committed. These builds are for internal testing only. They are:

- never signed with the SignPath certificate,
- never published as a GitHub Release,
- expected to trigger Windows SmartScreen "unknown publisher" warnings.

Only binaries produced by the tagged CI workflow and signed by SignPath are considered official releases.

## How to verify an official release

1. Download the installer from the repository's **Releases** page (not from third-party mirrors).
2. On Windows PowerShell:
   ```powershell
   Get-AuthenticodeSignature .\WoWS-Launcher-Setup-1.0.0.exe
   ```
   Expected: `Status: Valid`, signer issued to the SignPath Foundation open-source signing identity.
3. Confirm the SHA-512 in `latest.yml` equals the downloaded installer:
   ```powershell
   $b = [IO.File]::ReadAllBytes(".\WoWS-Launcher-Setup-1.0.0.exe")
   [Convert]::ToBase64String([Security.Cryptography.SHA512]::Create().ComputeHash($b))
   ```
4. All three assets (`exe`, `latest.yml`, `.blockmap`) must be present in the same release.

## Reporting issues

If you find a binary that claims to be an official release but fails the checks above, please open an issue in this repository with the download URL and verification output.
