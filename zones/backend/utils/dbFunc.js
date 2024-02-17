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
module.exports = {
    getDbData,
    getDbDataById
}