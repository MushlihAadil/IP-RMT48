import axios from "axios";

export const ServerAPI = axios.create({
    baseURL: `https://harrypotterserver.mushlihaadil.my.id`
});