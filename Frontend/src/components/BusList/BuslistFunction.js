import axios from 'axios'

export function addReview(review) {
    let apiUrl = 'http://localhost:8080/review'
    return axios.post(apiUrl, review, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
