const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const datafile = 'server/data/clothing.json';
const router = express.Router();


module.exports = function(monitor) {
  let dataMonitor = monitor;

  dataMonitor.on('dataAdded', (item) => {
    setImmediate(() => console.log(`Clothing Response: '${item}' was added.`));
  });

  /* GET all clothing */
  router.route('/')
    .get(async function(req, res) {

      try {
        let data = await getClothingData();
        console.log('Returning async data...');
        res.send(data);
      } catch (error) {
        res.status(500).send(error);
      }

      // getClothingData()
      //   .then(data => {
      //     console.log('Returning clothing data to browser');
      //     res.send(data);
      //   })
      //   .catch(error => res.status(500).send(error))
      //   .finally(() => console.log('Processing complete.')) // finally() isn't required; demo purposes only.

    })

    .post(async function(req, res) {
      try {

        let data = await getClothingData();

        let nextID = getNextAvailableID(data);

        let newClothingItem = {
          clothingID: nextID,
          itemName: req.body.itemName,
          price: req.body.price
        };

        data.push(newClothingItem);

        await saveClothingData(data);

        dataMonitor.emit('dataAdded', newClothingItem.itemName);

        console.log('Returning new item to browser.');

        res.status(201).send(newClothingItem);
      } catch (error) {
        res.status(500).send(error);
      }

    })

  async function  getClothingData() {

      let rawData = await fsPromises.readFile(datafile, 'utf8')
      let clothingData = JSON.parse(rawData);

      console.log(clothingData);

      return clothingData;

    // return new Promise((resolve, reject) => {
    //   fs.readFile(datafile, 'utf8', (err, data) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       let clothingData = JSON.parse(data);
    //       resolve(clothingData);
    //     }
    //   });
    // });

  };

  function getNextAvailableID(allClothingData) {

    let maxID = 0;

    allClothingData.forEach(function(element, index, array) {
      if(element.clothingID > maxID) {
        maxID = element.clothingID;
      }
    });
    return ++maxID;
  }

  function saveClothingData(data) {
    return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
  }

  return router;
}
