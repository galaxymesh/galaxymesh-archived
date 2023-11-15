const {
  utils: { getPackages },
} = require("@commitlint/config-lerna-scopes");

module.exports = {
  extends: ["@commitlint/config-lerna-scopes"],
  rules: {
    "scope-enum": async (ctx) => [
      2,
      "always",
      [
        ...(await getPackages(ctx)),
        "release",
        "repo",
      ],
    ],
  },
};
