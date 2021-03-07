import axios from './instance.js';
import ghaxios from 'axios';
import marked from "marked";


const getVaccineData = async () => {
    const data = await axios.get('/vaccines');
    console.log(data);
    return data.data;
}
const getAbout = async () => {
    const ghReadme = await ghaxios.get(
        "https://raw.githubusercontent.com/surajgoraya/hmv/master/README.md"
    );
    if (ghReadme.status === 200) {
        return marked(ghReadme.data.split("Stack")[0], { sanitize: true }).toString();
    } else {
        return "error getting about.";
    }
}

export { getVaccineData, getAbout }