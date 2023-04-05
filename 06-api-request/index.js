require('dotenv').config();
const colors = require('colors/safe');

const { inquirerMenu, pause, createQuestion, interactiveList } = require("./helpers/inquirer");
const Searchs = require("./models/search");

const main = async () => {
  let opt;
  const searchs = new Searchs();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // 1. Search city
        const searchTxt = await createQuestion('City: ');
        const cities = await searchs.city(searchTxt);
        const cityId = await interactiveList(cities);

        if (cityId === '0') {
          continue;
        }

        const { name, lon, lat } = cities.find((city) => city.id === cityId);
        searchs.addHistory(name);

        const { temp, min, max, sensation } = await searchs.weather(lon, lat);

        // Result
        console.clear();
        console.log(colors.green('########## INFO ##########'));
        console.log('City:', name);
        console.log('Long: ', lon);
        console.log('Lat: ', lat);
        console.log('Temp: ', temp);
        console.log('Min: ', min);
        console.log('Max: ', max);
        console.log('Sensation: ', sensation);
        break;
      case 2:
        // 2. History
        if (searchs.historyCapitalized.length > 0) {
          searchs.historyCapitalized.forEach((place, index) => {
            const idx = index + 1;
            console.log(`${colors.green(`${idx}. `)} ${place}`);
          });
        }
        break;
      default:
        break;
    }

    await pause();
  } while (opt !== 0);
};

main();

