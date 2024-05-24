import axios from "axios";

export const ServerAPI = axios.create({
    baseURL: `https://harrypotterserver.mushlihaadil.my.id`
    // baseURL: `http://localhost:3000`
});