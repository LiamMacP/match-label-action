jest.mock("@actions/github");

const { context } = require("@actions/github");
const { isPullRequest, getPullRequestLabels } = require("../src/github");

describe("isPullRequest", () => {
  test("return true when eventName is pull_request", async () => {
    context.eventName = "pull_request";

    expect(isPullRequest(context)).toBeTruthy();
  });

  test("return true when eventName is pull_request_target", async () => {
    context.eventName = "pull_request_target";

    expect(isPullRequest(context)).toBeTruthy();
  });

  test("return false when eventName not valid when eventName is pull_request", async () => {
    context.eventName = "TEST";

    expect(isPullRequest(context)).toBeFalsy();
  });
});

describe("getPullRequestLabels", () => {
  test("return empty array if input is undefined", async () => {
    context.payload = {
      // eslint-disable-next-line camelcase
      pull_request: {
        number: 1,
        labels: undefined,
      },
    };

    expect(getPullRequestLabels(context)).toEqual([]);
  });

  test("return empty when input is not an array", async () => {
    context.payload = {
      // eslint-disable-next-line camelcase
      pull_request: {
        number: 1,
        labels: "NotAnArray",
      },
    };

    expect(getPullRequestLabels(context)).toEqual([]);
  });

  test("return lowercase single label when present in input", async () => {
    context.payload = {
      // eslint-disable-next-line camelcase
      pull_request: {
        number: 1,
        labels: [{ name: "TEST" }],
      },
    };

    expect(getPullRequestLabels(context)).toEqual(["test"]);
  });

  test("return single label when one lebel name is not present", async () => {
    context.payload = {
      // eslint-disable-next-line camelcase
      pull_request: {
        number: 1,
        labels: [{ name: "test" }, {}],
      },
    };

    expect(getPullRequestLabels(context)).toEqual(["test"]);
  });

  test("return single label when one lebel name is undefined", async () => {
    context.payload = {
      // eslint-disable-next-line camelcase
      pull_request: {
        number: 1,
        labels: [{ name: "test" }, { name: undefined }],
      },
    };

    expect(getPullRequestLabels(context)).toEqual(["test"]);
  });
});
