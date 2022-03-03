const github = require("@actions/github");

const isPullRequest = ({ eventName } = github.context) => {
  return eventName === "pull_request" || eventName === "pull_request_target";
};

const getPullRequestLabels = ({ payload } = github.context) => {
  return parsePullRequestLabels(payload.labels);
};

const parsePullRequestLabels = (labels) => {
  if (labels === undefined || !Array.isArray(labels)) {
    return [];
  }

  return labels
    .map((label) => {
      if (label.name !== undefined) {
        return label.name.toLowerCase();
      }
    })
    .filter((label) => label !== undefined);
};

module.exports = { isPullRequest, getPullRequestLabels };
