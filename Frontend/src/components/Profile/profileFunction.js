import axios from 'axios'

export function updateProfile(profile) {
    let apiUrl = 'http://localhost:8080/profile'
    return axios.post(apiUrl, profile, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getProfile(id) {
    let apiUrl = `http://localhost:8080/profile/${id}`
    return axios.get(apiUrl, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}