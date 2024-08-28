
const BASE_URL = "http://127.0.0.1:5000"
const PROD_BASE_URL = "https://arannou-backend.onrender.com"


async function get_all_objects(object_type) {
    response = await etch(BASE_URL+"/api/"+object_type, {
        "headers": {
        "accept": "application/json",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "GET",
        "mode": "cors"
    })
    console.log(response)
    return response
}

async function create_object(object_type, new_object) {
    response = await etch(BASE_URL+"/api/"+object_type, {
        "headers": {
        "accept": "application/json",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "POST",
        "body": new_object,
        "mode": "cors"
    })
    console.log(response)
    return response
}

async function update_object(object_type, object_name, new_object) {
    response = await etch(BASE_URL+"/api/"+object_type+"/"+object_name, {
        "headers": {
        "accept": "application/json",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "PUT",
        "body": new_object,
        "mode": "cors"
    })
    console.log(response)
    return response
}

async function delete_object(object_type, object_name) {
    response = await etch(BASE_URL+"/api/"+object_type+"/"+object_name, {
        "headers": {
        "accept": "application/json",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "DELETE",
        "mode": "cors"
    })
    console.log(response)
    return response
}


