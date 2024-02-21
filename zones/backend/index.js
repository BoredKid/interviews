// https://dev.to/malikbilal111/building-a-file-upload-rest-api-with-nodejs-and-express-56l2

// index.js
const express = require('express');
const { getDbData, getDbDataById, editDBDataById, insertDbData } = require('./utils/dbFunc');
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


app.post('/zones', (req, res) => {
    try {
        const newZone = req.body;
        let sanitizedNewZone = {};
        const NEW_ZONE_FIELDS = ["name", "isResidency", "isMobility", "parent"];
        for (key of NEW_ZONE_FIELDS) {
            if (!Object.keys(newZone).includes(key)) {
                throw new Error(`Field ${key} is missing`)
            }
            sanitizedNewZone[key] = newZone[key]
        }


        insertDbData("zones", sanitizedNewZone)
        return res.json(filterZones(nestZones(getDbData("zones")), false, false))
    } catch (error) {
        return res.status(400).json({ error: error.toString() })
    }
})

app.get('*', function (req, res) {
    return res.status(404).json({ error: 'Route does not exists' });
});

app.post('*', function (req, res) {
    return res.status(404).json({ error: 'Route does not exists' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});