import axios from "axios"

const home = 'http://127.0.0.1:8000/'

export const get_tags = async () => {
    return await axios.get(`${home}api/tag/all/`)
        .then(response => response.data.tags)
        .catch(err => console.log(err))
}

export const get_snip = async (id) => {
    return await axios.get(`${home}api/snip/${id}/`)
        .then(response => response.data)
        .catch(err => console.log(err))
}

export const get_snips = async () => {
    return await axios.get(`${home}api/snip/all/`)
        .then(response => response.data.snips)
        .catch(err => console.log(err))
}

export const get_languages = async () => {
    return await axios.get(`${home}api/language/all/`)
        .then(response => response.data.languages)
        .catch(err => console.log(err))
}