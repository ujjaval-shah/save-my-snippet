import axios from "axios"

const home = 'http://127.0.0.1:8000/'

export const get_tags = async () => {
    return await axios.get(`${home}api/tag/all/`)
        .then(response => [true, response.data.tags])
        .catch(err => [false, console.log(err)])
}

export const create_tag = async (tagObj) => {
    return await axios.post(`${home}api/tag/create/`, tagObj)
        .then(response => [true, response.data])
        .catch(err => [false, console.log(err)])
}

export const get_snip = async (id) => {
    return await axios.get(`${home}api/snip/${id}/`)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export const create_snip = async (snipObj) => {
    return await axios.post(`${home}api/snip/create/`, snipObj)
        .then(response => [true, response.data])
        .catch(err => [false, console.log(err)])
}

export const update_snip = async (snipObj) => {
    return await axios.put(`${home}api/snip/update/`, snipObj)
        .then(response => [true, response.data])
        .catch(err => [false, console.log(err)])
}

export const delete_snip = async (id) => {
    return await axios.delete(`${home}api/snip/${id}/delete/`)
        .then(response => [true, response.data])
        .catch(err => [false, console.log(err)])
}

export const pin_snip = async (id) => {
    return await axios.put(`${home}api/snip/${id}/pin/`)
        .then(response => [true, response.data])
        .catch(err => [false, console.log(err)])
}

export const unpin_snip = async (id) => {
    return await axios.put(`${home}api/snip/${id}/unpin/`)
        .then(response => [true, response.data])
        .catch(err => [false, console.log(err)])
}

export const get_snips = async () => {
    return await axios.get(`${home}api/snip/all/`)
        .then(response => [true, response.data.snips])
        .catch(err => [false, console.log(err)])
}

export const get_languages = async () => {
    return await axios.get(`${home}api/language/all/`)
        .then(response => [true, response.data.languages])
        .catch(err => [false, console.log(err)])
}