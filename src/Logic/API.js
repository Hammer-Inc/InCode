function validateResponse(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export default validateResponse

let matchers = {
    "string": /^[\w\s-]+$/,
    "binary": /^[01]+$/,
    "validate": /^[01]{3,}$/
};


function sortbyposition(v1, v2) {
    return v1.position - v2.position
}
export {matchers, sortbyposition}
