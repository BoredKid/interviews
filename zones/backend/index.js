// https://dev.to/malikbilal111/building-a-file-upload-rest-api-with-nodejs-and-express-56l2

// index.js
const express = require('express');
const { getDbData, getDbDataById, editDBDataById } = require('./utils/dbFunc');
const { nestZones, filterZones } = require('./utils/func');
const app = express();

const port = 8081;

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());

/*
TODO:
- post & put candidate


- get zone

- post zone/ put zone ?
*/

app.get('/ping', (req, res) => {
    return res.send('pong')
});

app.get('/candidates', (req, res) => {
    try {
        return res.json(getDbData("candidates"))
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

app.get('/candidates/:id', (req, res) => {
    const candidateId = req.params.id;
    try {
        return res.json(getDbDataById("candidates", candidateId))
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

app.get('/zones', (req, res) => {
    let isMobility = req.query.isMobility === "true" ? true : false;
    let isResidency = req.query.isResidency === "true" ? true : false;
    try {
        return res.json(filterZones(nestZones(getDbData("zones")), isMobility, isResidency))
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

app.put('/zones/:id', (req, res) => {
    const zoneId = req.params.id;
    const updatedData = req.body;
    const editedFields = Object.keys(updatedData);
    let sanitizedEditedData = {};
    if (editedFields.includes("isMobility")) {
        sanitizedEditedData.isMobility = updatedData.isMobility
    }
    if (editedFields.includes("isResidency")) {
        sanitizedEditedData.isResidency = updatedData.isResidency
    }
    try {
        editDBDataById("zones", zoneId, sanitizedEditedData)
        return res.json(filterZones(nestZones(getDbData("zones")), false, false))
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

// app.post('/upload-sourcing-campus', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), (req, res) => {
//     console.log(req.files)
//     if (!req.files && req.files.length > 1) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }
//     // la route prend aussi un body avec un champs data qui permet d'envoyer un mail de validation 
//     // (moyennant un email, un lastName et un firstName)
//     if (req.body && req.body.data) {
//         const data = JSON.parse(req.body.data);
//         sendConfirmationMail(data);
//     }
//     res.json({ message: 'File uploaded successfully' });
// });



// // allow to get mobilities or residencies for forms
// app.get('/zones', function (req, res) {
//     const zoneType = req.query.zoneType;
//     if (!zoneType || (zoneType !== "mobility" && zoneType !== "residency")) {
//         return res.status(400).json({ error: 'No zone type or wrong zone type' });
//     }
//     if (zoneType === "mobility" && !!mobilitiesJsonFile) {
//         return res.json(mobilitiesJsonFile)
//     }
//     if (zoneType === "residency" && !!residencyJsonFile) {
//         return res.json(residencyJsonFile)
//     }
//     return res.status(404).send("The data you're looking for is not there... Please contact itsupport@creamconsulting.com")
// })

app.get('*', function (req, res) {
    return res.status(404).json({ error: 'Route does not exists' });
});

app.post('*', function (req, res) {
    return res.status(404).json({ error: 'Route does not exists' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});