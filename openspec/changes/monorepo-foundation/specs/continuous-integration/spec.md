## ADDED Requirements

### Requirement: CI checks on every pull request
A GitHub Actions workflow SHALL run `npm ci`, then lint, typecheck and build for both workspaces, on every pull request and on every push to `main`. It SHALL use the Node version pinned in `.nvmrc`.

#### Scenario: Passing change
- **WHEN** a pull request builds and lints cleanly in both `app` and `cms`
- **THEN** the CI check reports success

#### Scenario: Type error blocks merge
- **WHEN** a pull request introduces a TypeScript error in `app`
- **THEN** the CI check fails at the typecheck step

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
