import axios from 'axios'

export function Get() {
    let apiUrl = 'http://localhost:8080/booking'
    return axios.get(apiUrl, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
