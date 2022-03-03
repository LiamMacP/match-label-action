# Check/ Retrieve Specified Labels

Action that fails a GitHub job if specified labels are not present within Pull Requests.

## Pull Request Action

### All input options

| Input                                                               | Description                                                                 | Default               | Required |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------- | -------- |
| [labels](#labels) | Labels that you want to validate with | | Yes |
| [mode](#mode) | Specifies the mode to use | any | No |


### Detailed inputs

#### labels

A comma seperated list of values that you want to use within the action against a Pull Request. This option is case-insensitive as underlying it converts to lowercase.

If this is set to empty - it fails the job.

#### mode

Indicates the checking mode that's used against the Pull Request labels.

Available options:
* `all` - ensures all labels are present
* `any` - ensures at least one matching label is present
* `singular` - ensures only one matching label is present

Any other value results in the default option taking effect.

Default Option: `any`

### List of outputs

| Output | Description |
| --- | --- |
| matchedLabels | Comma-seperated list of matched labels |

### Usage

This action can only be triggered on the following events: `pull_request` and `pull_request_target`. If used on other events the job will fail.

#### Block pull requests without labels

```yaml
name: 'Block pull request without single labels'
on:
  pull_request:
    types: [ labeled, unlabeled, opened, reopened, synchronize ]

jobs:
  build:
    name: PR Label Checker
    runs-on: ubuntu-latest
    steps:
      - uses: UKHomeOffice/match-label-action@main
        with:
          labels: minor,major,patch
          mode: singular
```

#### Output matched labels on merge

```yaml
name: 'Output matched labels on merge to main'
on:
  pull_request:
    types: [ closed ]

jobs:
  build:
    name: Merge Main PR Labels
    runs-on: ubuntu-latest
    if: github.event.pull_request.merged == true && github.base_ref == 'main'
    steps:
      - uses: UKHomeOffice/match-label-action@main
        with:
          labels: minor,major,patch
```

### Generating dist/index.js

We use [ncc](https://github.com/vercel/ncc) to package the action into an executable file. 
This removes the need to either check in the node_modules folder or build the action prior to using.

We need to ensure that the dist folder is updated whenever there is a functionality change, otherwise we won't be running the correct version within jobs that use this action.

Before checking creating your Pull Request you should ensure that you have built this file by running `npm run build` within the root directory. 

A blocking workflow called [check-dist](.github/workflows/check-dist.yml) is enabled that checks this dist folder for changes happens at both push to main and on pull request events.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
