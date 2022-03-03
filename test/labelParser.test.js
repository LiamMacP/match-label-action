const { parseActionLabels } = require("../src/labelParser");

describe("parseActionLabels", () => {
  test("labels is undefined - return empty", () => {
    expect(parseActionLabels(undefined)).toEqual([]);
  });

  test("labels is empty string - return empty", () => {
    expect(parseActionLabels("")).toEqual([]);
  });

  test("labels does not have comma - return 1 string", () => {
    expect(parseActionLabels("test-1")).toEqual(["test-1"]);
  });

  test("labels splits by comma - return 1 case-insensitive string array", () => {
    expect(parseActionLabels("test,TEST1")).toEqual(["test", "test1"]);
  });
});
