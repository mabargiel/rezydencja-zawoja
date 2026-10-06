# continuous-integration Specification

## Purpose
TBD - created by archiving change monorepo-foundation. Update Purpose after archive.
## Requirements
### Requirement: CI checks on every pull request
A GitHub Actions workflow SHALL run `npm ci`, then Prettier check, ESLint, Stylelint, the unused-code check (knip), typecheck and build for both workspaces, on every pull request and on every push to `main`. It SHALL use the Node version pinned in `.nvmrc`.

#### Scenario: Passing change
- **WHEN** a pull request builds and lints cleanly in both `app` and `cms`
- **THEN** the CI check reports success

#### Scenario: Style violations block merge
- **WHEN** a pull request contains a file not formatted with Prettier, or CSS that breaks a Stylelint rule
- **THEN** the CI check fails at the `format:check` or `lint:styles` step

#### Scenario: Type error blocks merge
- **WHEN** a pull request introduces a TypeScript error in `app`
- **THEN** the CI check fails at the typecheck step

#### Scenario: Unused code blocks merge
- **WHEN** a pull request leaves an unused file, export or dependency in `app` or `cms`
- **THEN** the CI check fails at the knip step

#### Scenario: Entry points are not reported
- **WHEN** knip runs on the repository
- **THEN** the CMS scripts run with `sanity exec`, the Next image loader and the generated Sanity types are not reported as unused

### Requirement: Studio deployment from main
A GitHub Actions workflow SHALL run `sanity deploy` when a push to `main` changes files under `cms/`, authenticated with the `SANITY_AUTH_TOKEN` repository secret.

#### Scenario: CMS change deploys Studio
- **WHEN** a commit that changes `cms/schemaTypes/` is pushed to `main`
- **THEN** the deploy workflow runs and the hosted Studio shows the change

#### Scenario: App-only change skips Studio deploy
- **WHEN** a commit that only changes `app/` is pushed to `main`
- **THEN** the Studio deploy workflow does not run

### Requirement: Vercel builds the app from the monorepo
The Vercel project SHALL be linked to the monorepo with Root Directory `app/`, the Sanity environment variables SHALL be set, and every pull request SHALL get a preview deployment.

#### Scenario: Preview deployment
- **WHEN** a pull request is opened
- **THEN** Vercel builds `app/` and posts a preview URL where `/` renders

