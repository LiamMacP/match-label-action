jest.mock("@actions/core");
jest.mock("../src/github");

const { isPullRequest, getPullRequestLabels } = require("../src/github");

const core = require("@actions/core");
const run = require("../src/pullRequestAction");

describe("run", () => {
  beforeEach(() => {
    isPullRequest.mockReturnValue(true);
    getPullRequestLabels.mockReturnValue(["test1", "test2", "test3"]);

    core.getInput = jest
      .fn()
      .mockReturnValueOnce("test1") // labels Input
      .mockReturnValueOnce(""); // allOf Input

    core.setFailed = jest.fn();
    core.setOutput = jest.fn();
  });

  test("empty requested labels passes", async () => {
    isPullRequest.mockReturnValue(false);

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "Invalid event specified, it should be used on [pull_request, pull_request_target] events"
    );
  });

  test("empty label input sets failed", async () => {
    core.getInput = jest.fn().mockReturnValueOnce("");

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "No labels requested to search, please provide a comma-seperated list of labels"
    );
  });

  test("empty pull request labels input sets failed", async () => {
    getPullRequestLabels.mockReturnValue([]);

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "No labels currently present on Pull Request"
    );
  });

  test("No intersection throws error message pull request labels input sets failed", async () => {
    getPullRequestLabels.mockReturnValue(["TEST2"]);

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "Label intersection yielded no matches"
    );
  });

  test("allOf set with not all matching sets failed", async () => {
    core.getInput = jest
      .fn()
      .mockReturnValueOnce("test1,test4") // labels Input
      .mockReturnValueOnce("true"); // allOf Input

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "Pull Request labels: test1,test2,test3 does not contain all the required labels: test1,test4"
    );
  });

  test("matchedLabels output is set correctly with intersection", async () => {
    await run();

    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith("matchedLabels", "test1");
  });

  test("random error should fail job", async () => {
    isPullRequest.mockImplementationOnce(() => {
      throw new Error("This is a random error");
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith("This is a random error");
  });
});
