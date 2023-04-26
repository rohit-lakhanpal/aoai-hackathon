var express = require('express');
var router = express.Router();
const { completion } = require("../../utilities/openai");

/* GET completion listing. */
router.post('/', async (req, res) => {
  // Get the transcript from the request body if it exists
  try {
      const transcript = req.body.transcript;
      const model = req.body.model;

      // Throw an error if the transcript is not set
      if (!transcript) {
          res.status(400).send('Transcript was not set.');
      } else {
          //res.json(await analyseSentiment(transcript));
          const models = await completion(transcript, model);
          res.json(models);
          //res.status(200).send('Completion was not set.');
      }
  } catch (error) {
      console.log(error);
      let message = error.message || 'There was an error generating completion.'
      res.status(400).send(message);
  }
});
module.exports = router;
