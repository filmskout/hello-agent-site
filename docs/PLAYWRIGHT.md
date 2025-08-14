# Playwright Setup

This project uses [Playwright](https://playwright.dev/) for end-to-end tests. A fresh clone does not include browser binaries, so `pnpm test` will fail until the browsers are downloaded.

## Installing Browsers Locally

1. Install the required browsers:
   ```bash
   pnpm exec playwright install --with-deps
   ```
2. Run the tests:
   ```bash
   pnpm test
   ```

## Running in Restricted or Offline Environments

If the install command fails with a `Domain forbidden` or similar error, the environment cannot reach Playwright's CDN.

### Option 1: Pre-download and Cache

1. On a machine with internet access, run `pnpm exec playwright install`.
2. Copy the resulting `.cache/ms-playwright` directory to your CI or deployment environment.
3. Set the environment variable `PLAYWRIGHT_BROWSERS_PATH` to point to that directory before running `pnpm test`.

### Option 2: Skip Download in Vercel Builds

1. When deploying to Vercel, set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` to avoid failing installs during `pnpm install`.
2. Run Playwright tests in a separate CI job (for example GitHub Actions) where browsers can be downloaded normally.

### Option 3: Use a Mirror

Set the `PLAYWRIGHT_DOWNLOAD_HOST` environment variable to a mirror that is reachable from your network.

```bash
export PLAYWRIGHT_DOWNLOAD_HOST="https://playwright.azureedge.net"
# Or try a reachable mirror, for example:
# export PLAYWRIGHT_DOWNLOAD_HOST="https://github.com/microsoft/playwright"
pnpm exec playwright install
```

## Verifying Installation

After installation, you can verify the browsers are available:

```bash
pnpm exec playwright --version
```

If the command prints a version without errors, the tests should be able to launch browsers.

