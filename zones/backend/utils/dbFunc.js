const fs = require("fs");


const getDbData = (name) => {
    const filePath = `./db/${name}.json`;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
        throw new Error(`Failed to access data of db ${name}`);
    }
}

const writeDbData = (name, data) => {
    const filePath = `./db/${name}.json`;
    try {
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
        return;
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
        throw new Error(`Failed to access data of db ${name}`);
    }
}

const getDbDataById = (name, id) => {
    try {
        const dbData = getDbData(name);
        const element = dbData.find(val => val.id === id);
        if (!element) throw new Error(`Element ${id} don't exists in db ${name}`)
        else return element;
    } catch (err) {
        throw err;
    }
}

const editDBDataById = (name, id, newData) => {
    try {
        const dbData = getDbData(name);
        const element = dbData.find(val => val.id === id);
        if (!element) throw new Error(`Element ${id} don't exists in db ${name}`)
        else {
            const newElement = { ...element, ...newData };
            const newDbData = dbData.reduce((newDataArray, element) => element.id !== id ? [...newDataArray, element] : [...newDataArray, newElement], [])
            writeDbData(name, newDbData)
            return element;
        }

    } catch (err) {
        throw err;
    }
}

// generated via chatgpt
function generateUniqueId() {
    // Generate a random component
    const randomPart = Math.random().toString(36).substring(2, 8);

    // Combine timestamp and random part
    const uniqueId = Date.now().toString(36) + randomPart;

    return uniqueId;
}


const insertDbData = (name, newData) => {
    try {
        const dbData = getDbData(name);

        const newElement = { ...newData, id: generateUniqueId() };
        const newDbData = [...dbData, newElement]
        writeDbData(name, newDbData)
    } catch (err) {
        throw err;
    }
}
module.exports = {
    getDbData,
    getDbDataById,
    editDBDataById,
    insertDbData
}