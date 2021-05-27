const express = require('express')
require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
const bodyParser = require('body-parser');

const app = express()
const port = 8088

// The minimum prediction confidence.
const threshold = 0.9;

function loadToxicity(req, res, body){
    toxicity.load(threshold).then(model => {
        model.classify([body.sentence]).then(predictions => {
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.
            let hasToxic = false;
            let toxicSentences = []
            let message = 'Your sentence contains no toxic words';
            for(i=0;i<7;i++) {
                if (predictions[i].results[0].match === true) {
                    hasToxic = true;
                    message = 'Your sentence contains toxic words';
                    toxicSentences.push({'label':predictions[i].label.toUpperCase(),'pecentage':predictions[i].results[0].probabilities[1].toFixed(4)*100+"%"})
                }
            }

            res.status(200).json({
                error:false,
                message:message,
                data:toxicSentences
            })

        });
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Sentence Classify Service</h1>")
});

app.post('/sentence', (req, res) => {
    if (!req.body.sentence) {
        res.status(400).json({
            error:true,
            message:'The field [sentence] cannot be empty',
            data:[]
        })
    }
    loadToxicity(req, res, req.body);
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})