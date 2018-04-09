const api_url = "http://webdbapps.uni/Assignment 1/public/api";


function handleRequestError(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}


export default api_url;
export {api_url, handleRequestError};

