## MODIFIED Requirements

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
