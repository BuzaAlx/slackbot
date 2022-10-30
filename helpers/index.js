const createRegEx = function (ProjectKey) {
  const regex = RegExp(
    String.raw`(${ProjectKey}|${ProjectKey.toLowerCase()})-[0-9][0-9]?[0-9]?`,
    "g"
  );
  return regex;
};

module.exports = createRegEx;
