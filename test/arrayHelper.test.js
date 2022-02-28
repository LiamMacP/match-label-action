const { arrayIntersection } = require("../src/arrayHelper");

describe("arrayContainsAll", () => {
  test("both empty - returns true", () => {
    expect(arrayIntersection([], [])).toEqual([]);
  });

  test("one wanted in allValues - returns true", () => {
    expect(arrayIntersection(["TEST"], ["TEST", "TEST2"])).toEqual(["TEST"]);
  });

  test("wanted not in allValues - returns false", () => {
    expect(arrayIntersection(["TEST"], ["TEST2"])).toEqual([]);
  });

  test("allValues is undefined- returns false", () => {
    expect(arrayIntersection(undefined, [])).toEqual([]);
  });

  test("wantedValues is undefined- returns false", () => {
    expect(arrayIntersection([], undefined)).toEqual([]);
  });
});
