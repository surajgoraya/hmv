require('dotenv').config();

const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

app.get('/api/vaccines', (req, res) => {
    axios.default.get('https://api.covid19tracker.ca/summary').then(apiRes => {
        res.setHeader('Content-Type', 'application/json');

        if (apiRes.status === 200) {
            const mappedData = mapSummaryData(apiRes.data);
            if (!mappedData.error) {
                res.status(200).send(mappedData);
            } else {
                res.status(500).send(mappedData)
            }
        } else {
            res.status(500).send(createError());
        }
    });
})

app.get('/api/graph/distributed', (req, res) => {
    axios.default.get('https://api.covid19tracker.ca/reports?stat=vaccines_distributed&after=2020-12-19&fill_dates=true').then(apiRes => {
        res.setHeader('Content-Type', 'application/json');

        if (apiRes.status === 200) {
            const mappedData = mapVaccinesDistributedData(apiRes.data);
            if (!mappedData.error) {
                res.status(200).send(mappedData);
            } else {
                res.status(500).send(mappedData)
            }
        } else {
            res.status(500).send(createError());
        }
    });
});

app.get('/api/graph/vaccinated', (req, res) => {
    axios.default.get('https://api.covid19tracker.ca/reports?stat=vaccinated&after=2020-12-19&fill_dates=true').then(apiRes => {
        res.setHeader('Content-Type', 'application/json');

        if (apiRes.status === 200) {
            const mappedData = mapVaccinesAdministeredData(apiRes.data);
            if (!mappedData.error) {
                res.status(200).send(mappedData);
            } else {
                res.status(500).send(mappedData)
            }
        } else {
            res.status(500).send(createError());
        }
    });
});



app.use(express.static(path.join(__dirname, './frontend/dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist', 'index.html'));
})


app.listen(port, () => {
    console.log(`vaccine-canada-server listening at http://localhost:${port}`)
})

const createError = () => {
    const error = {
        error: {
            type: 'NO_DTRC',
            message: "No data received, api.covid19tracker.ca may be down.",
            time: new Date(Date.now()),
        }
    }
    return error;
}

const mapVaccinesDistributedData = (data) => {
    if (data) {
        let vData = data.data;

        if (vData === null || vData === undefined) {
            return createError();
        }
        vData = vData.map(data => {
            return {
                date: new Date(data.date),
                change: data.change_vaccines_distributed ? Number.parseInt(data.change_vaccines_distributed) : 0,
                total: data.total_vaccines_distributed ? Number.parseInt(data.total_vaccines_distributed) : 0
            }
        });

        const lastUpdate = new Date(data.last_updated);
        const newVData = {
            dataset: vData,
            version: lastUpdate,
            data_source: 'http://api.covid19tracker.ca/'
        }
        return newVData;
    } else {
        //No data, API might be down?
        return createError();
    }
}


const mapVaccinesAdministeredData = (data) => {
    if (data) {
        let vData = data.data;

        if (vData === null || vData === undefined) {
            return createError();
        }
        vData = vData.map(data => {
            return {
                date: new Date(data.date),
                change: data.change_vaccinated ? Number.parseInt(data.change_vaccinated) : 0,
                total: data.total_vaccinated ? Number.parseInt(data.total_vaccinated) : 0
            }
        });

        const lastUpdate = new Date(data.last_updated);
        const newVData = {
            dataset: vData,
            version: lastUpdate,
            data_source: 'http://api.covid19tracker.ca/'
        }
        return newVData;
    } else {
        //No data, API might be down?
        return createError();
    }
}


const mapSummaryData = (data) => {
    if (data) {
        const vData = data.data;

        if (vData[0] === null || vData[0] === undefined) {
            return createError();
        }

        const lastUpdate = new Date(data.last_updated);

        let newVData = {
            total_vaccinations: vData[0].total_vaccinations,
            total_vaccinated: vData[0].total_vaccinated,
            total_vaccines_distributed: vData[0].total_vaccines_distributed,
            version: lastUpdate,
            data_source: 'http://api.covid19tracker.ca/'
        }

        return newVData;
    } else {
        //No data, API might be down?
        return createError();
    }
}