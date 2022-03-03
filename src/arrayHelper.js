const arrayIntersection = (allValues, wantedValues) => {
  if (allValues === undefined || wantedValues === undefined) {
    return [];
  }

  return wantedValues.filter((value) => allValues.includes(value));
};

module.exports = { arrayIntersection };
