# `github-upsert-pr-comment`

![](https://img.shields.io/npm/v/@vivianhealth/github-upsert-pr-comment?v=20230303)
![](https://img.shields.io/github/package-json/v/nursefly/github-upsert-pr-comment?v=20230303)
![](https://img.shields.io/node/v/@vivianhealth/github-upsert-pr-comment?v=20230303)
![](https://img.shields.io/npm/types/@vivianhealth/github-upsert-pr-comment?v=20230303)

This utility will post a comment to a GitHub PR if an expecting matching comment
doesn't exist; otherwise it will update the existing comment.

## Prerequisites

- Node >=18

## Usage

The following command will allow you run the CLI tool without having to explicitly
install it as long as `npm` is installed.

```bash
npx -y -p @vivianhealth/github-upsert-pr-comment@latest \
  github-upsert-pr-comment -- \
    -t <github-personal-access-token> \
    -o <owner> \
    -r <repository> \
    -n <pr-number> \
    -c <comment> \
    -p <pattern>
```

See all options with:

```bash
npx -y -p @vivianhealth/github-upsert-pr-comment@latest \
    github-upsert-pr-comment -- --help
```

To install and lock in a specific version into your project dependencies (recommended):

```bash
npm install --save-dev @vivianhealth/github-upsert-pr-comment
```

And then to run the CLI tool inside your project directory:

```bash
npx github-upsert-pr-comment -- \
  -t <github-personal-access-token> \
  -o <owner> \
  -r <repository> \
  -n <pr-number> \
  -c <comment> \
  -p <pattern>
```

## Publishing

This package is automatically published to npm via CI. Versions are bumped automatically based on commits
since the last release using `semantic-release` and `conventional-changelog`.

Commit message format is important. See [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
This format is enforced via git hooks.

## License

This package is [MIT licensed](./LICENSE).
