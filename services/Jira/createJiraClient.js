const { Version3Client } = require("jira.js");

const createJiraClient = function () {
  return new Version3Client({
    host: process.env.JIRA_HOST,
    authentication: {
      basic: {
        email: process.env.JIRA_AUTH_EMAIL,
        apiToken: process.env.JIRA_API_TOKEN,
      },
    },
  });
};

module.exports = createJiraClient;
