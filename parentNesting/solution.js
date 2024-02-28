const fs = require('fs');

const elements = require('./trainingData.json')
const nestElements = (elementsList) => {
    const elementsSortedById = elementsList.reduce((sortedElementsAcc, element) => {
        const elementWithUpdatedParent = element.parent === null ? { ...element, parent: "NULL" } : { ...element }
        return {
            ...sortedElementsAcc,
            [elementWithUpdatedParent.parent]:
                !sortedElementsAcc[elementWithUpdatedParent.parent] ?
                    [elementWithUpdatedParent]
                    : [...sortedElementsAcc[elementWithUpdatedParent.parent], elementWithUpdatedParent]
        }
    },
        {}
    )
    return nestElementsRec(elementsSortedById, "NULL")
}


const nestElementsRec = (elementsSortedById, parentId) => {
    if (!!elementsSortedById[parentId]) {
        return elementsSortedById[parentId].map(element => ({ ...element, parent: element.parent === "NULL" ? null : element.parent, children: nestElementsRec(elementsSortedById, element.id) }))
    } else { return [] }
}

console.log(nestElements(elements));

// i want to write a function that will create a json file from the nested elements
const createJsonFile = (nestedElements) => {
    fs.writeFileSync('trainingDataSolution.json', JSON.stringify(nestedElements))
}

createJsonFile(nestElements(elements));
