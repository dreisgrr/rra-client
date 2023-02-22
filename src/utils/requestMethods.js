import axios from "axios"

const serverMode = true;
const localhost = 'http://localhost:8800/api';
const production = 'http://100.26.214.82/api'

const requestUrl = axios.create({
    baseURL: (serverMode ? production : localhost),
    headers: {
        'Content-Type': 'application/json',
    },
})

export default requestUrl