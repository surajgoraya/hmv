require('dotenv').config();

const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const Medusa = require('medusajs');


app.get('/api/vaccines', async (req, res) => {
    const resp = await Medusa.get('summary', async function (resolve, reject) {

        console.log('INFO -- Cache Missed Summary, Requested server', new Date(Date.now()));

        const servResp = axios.default.get('https://api.covid19tracker.ca/summary').then(apiRes => {
            if (apiRes.status === 200) {
                const mappedData = mapSummaryData(apiRes.data);
                return mappedData;
            } else {
                return createError();
            }
        });


        resolve(await servResp);
    }, 3600000);

    res.setHeader('Content-Type', 'application/json');
    if (!resp.error) {
        res.status(200).send(resp);
    } else {
        res.status(500).send(resp)
    }

})

app.get('/api/graph/distributed', async (req, res) => {
    const resp = await Medusa.get('distributed', async function (resolve, reject) {

        console.log('INFO -- Cache Missed distributed, Requested server', new Date(Date.now()));

        const servResp = axios.default.get('https://api.covid19tracker.ca/reports?stat=vaccines_distributed&after=2020-12-19&fill_dates=true').then(apiRes => {
            if (apiRes.status === 200) {
                const mappedData = mapVaccinesDistributedData(apiRes.data);
                return mappedData;
            } else {
                return createError();
            }
        });

        resolve(await servResp);
    });

    res.setHeader('Content-Type', 'application/json');
    if (!resp.error) {
        res.status(200).send(resp);
    } else {
        res.status(500).send(resp)
    }
});

app.get('/api/graph/vaccinated', async (req, res) => {
    const resp = await Medusa.get('vaccinated', async function (resolve, reject) {

        console.log('INFO -- Cache Missed vaccinated, Requested server', new Date(Date.now()));

        const servResp = axios.default.get('https://api.covid19tracker.ca/reports?stat=vaccinated&after=2020-12-19&fill_dates=true').then(apiRes => {
            if (apiRes.status === 200) {
                const mappedData = mapVaccinesAdministeredData(apiRes.data);
                return mappedData;
            } else {
                return createError();
            }
        });

        resolve(await servResp);
    });

    res.setHeader('Content-Type', 'application/json');
    if (!resp.error) {
        res.status(200).send(resp);
    } else {
        res.status(500).send(resp)
    }
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
            change_vaccinated: vData[0].change_vaccinated,
            change_vaccines_distributed: vData[0].change_vaccines_distributed,
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