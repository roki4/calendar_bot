const TelegramBot = require("node-telegram-bot-api");
const config = require("./config/config.js");
const request = require("request");
const helper = require("./src/helper.js");
const keyboard = require("./src/keyboard/keyboard.js");
const kb = require("./src/keyboard/keyboard-button.js");

const bot = new TelegramBot(config.TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = helper.getChatId(msg);

  switch (msg.text) {
    case kb.start:
      bot.sendMessage(chatId, `Hello! I'm Calendar bot, how can I help you?`, {
        reply_markup: {
          keyboard: keyboard.home,
        },
      });

    case kb.home.holidays_of_year:

      const year = new Date().toString().split(" ")[3];
      const url = `https://date.nager.at/api/v3/publicholidays/${year}/RU`;

      request(url, (err, response, body) => {
        if (err) {
          console.log(err);
          return;
        }

        const data = JSON.parse(body);

        for (let i = 0; i < data.length; i++) {
          bot.sendMessage(
            helper.getChatId( msg ),
            `Праздники в этом году:\nДата: ${data[i].date}\nПраздник: ${data[i].localName}`
          );
        }
      });
  }
});
