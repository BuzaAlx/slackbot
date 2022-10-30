const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const createSlackApp = require("./services/Slack/createSlackApp");
const createJiraClient = require("./services/Jira/createJiraClient");
const createRegEx = require("./helpers");

const app = createSlackApp();
const JiraClient = createJiraClient();

app.message("", async (data) => {
  const regex = createRegEx(process.env.JIRA_PROJECT_KEY);

  const found = data.message.text.match(regex)?.map((el) => el.toUpperCase());

  if (found) {
    try {
      const issue = await JiraClient.issues.getIssue({
        issueIdOrKey: found[0],
      });

      const comment = await JiraClient.issueComments.addComment({
        issueIdOrKey: found[0],
        body: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: data.message.text,
                  type: "text",
                },
              ],
            },
          ],
        },
      });
      console.log(comment);
      await data.say(`comment added to issue with key: ${found[0]}`);
    } catch (error) {
      await data.say(`I did't find issue with this key:${found[0]} :(`);
    }
  } else {
    await data.say(`I did't find any key in your message :(`);
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
