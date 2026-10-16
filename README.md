# Boss

Boss is a free, ad-free, offline-capable, mobile-first, endless leader simulation. You lead a three-person team through client work, learning, experimentation, dilemmas and company decisions. Hiring is deliberately unavailable. No sign-in, tracking, external libraries, fonts or network requests are required.

**Play:** https://bsavci1.github.io/Boss/ (once GitHub Pages is enabled).

## How to play
Tap a person’s name on a client deal to assign or unassign them. Use Study, Teach, Experiment or Rest to guide the team; respond to dilemmas, and combine discovered ideas into lasting breakthroughs. Choose 1x, 3x or 8x speed, Pause, or Restart. Progress saves automatically in the browser.

## How to change the game
All the HTML, CSS and JavaScript live in one file, [index.html](index.html). Edit this complete file and commit it to `main`; `.github/workflows/publish-pages.yml` then packages and deploys only `index.html` through GitHub Actions. The browser save key is `tl3`, so take care with save compatibility. Also record each change in [CHANGELOG.md](CHANGELOG.md) and the Boss Notion page.

## Publishing

To activate this new Pages site once, open [Settings → Pages](https://github.com/BSAVCI1/Boss/settings/pages) and select **GitHub Actions** as the **Build and deployment → Source**. The automated `Publish Boss` workflow is already installed. After activation, rerun its latest failed job from [Actions](https://github.com/BSAVCI1/Boss/actions/workflows/publish-pages.yml) or commit an update to `index.html`. This initial account-level Pages setting cannot be changed using the current GitHub integration token.
