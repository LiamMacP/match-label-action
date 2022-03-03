const parseActionLabels = (labels) => {
  if (labels === undefined || labels === "") {
    return [];
  }

  return labels.split(",").map((label) => label.toLowerCase());
};

module.exports = {
  parseActionLabels,
};
