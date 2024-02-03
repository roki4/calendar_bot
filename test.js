const request = require('request')
const year = new Date().toString().split(' ')[3];
const url = `https://date.nager.at/api/v3/publicholidays/${year}/RU`;

      request(url, (err, response, body) => {
        if (err) {
          console.log(err);
          return;
        }

        const data = JSON.parse(body);
        


        for (let i = 0; i < data.length; i++) {
          bot.sendMessage(helper.getChatId(msg), `Дата: ${data[i].date}\nПраздник: ${data[i].localName}`);
        }
      });