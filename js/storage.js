/**
 * Token used for storage.
 * @type {string}
 */
const STORAGE_TOKEN = '8STE96HUTZL9YKNUBSW9RNRPEO8TPI1FQYJ3XUBI';

/**
 * The URL for the remote storage.
 * @type {string}
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Sets an item in the storage.
 * @param {string} key - The key of the item.
 * @param {any} value - The value of the item.
 * @returns {Promise<any>} A promise that resolves to the response from the server.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * Retrieves an item from the storage using the specified key.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the retrieved item.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

/**
 * Retrieves a specific JSON property from an item in the storage using the specified key and property ID.
 * @param {string} key - The key of the item to retrieve.
 * @param {string} id - The ID of the property to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the retrieved JSON property.
 */
async function getJSON(key, id, statement) {
    let Data = await getItem(key);
    let data = JSON.parse(Data.data.value);
    return data[id][statement];
}


