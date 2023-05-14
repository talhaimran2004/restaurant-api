import axios from "axios";

let restaurantApi = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'token': document.cookie
    },
})

export default restaurantApi