const nestZones = (zonesList) => {
    const zonesSortedById = zonesList.reduce((sortedZonesAcc, zone) => {
        const zoneWithUpdatedParent = zone.parent === null ? { ...zone, parent: "NULL" } : { ...zone }
        return {
            ...sortedZonesAcc,
            [zoneWithUpdatedParent.parent]:
                !sortedZonesAcc[zoneWithUpdatedParent.parent] ?
                    [zoneWithUpdatedParent]
                    : [...sortedZonesAcc[zoneWithUpdatedParent.parent], zoneWithUpdatedParent]
        }
    },
        {}
    )
    return nestZoneRec(zonesSortedById, "NULL")
}


const nestZoneRec = (zonesSortedById, parentId) => {
    if (!!zonesSortedById[parentId]) {
        return zonesSortedById[parentId].map(zone => ({ ...zone, parent: zone.parent === "NULL" ? null : zone.parent, children: nestZoneRec(zonesSortedById, zone.id) }))
    } else { return [] }
}

const filterZones = (nestedZones, isMobility, isResidency) => {
    return nestedZones.reduce((filteredNestedZonesAcc, zone) => {
        if ((!isMobility || (isMobility && zone.isMobility)) && (!isResidency || (isResidency && zone.isResidency))) {
            return [...filteredNestedZonesAcc, { ...zone, children: filterZones(zone.children, isMobility, isResidency) }]
        } else {
            return [...filteredNestedZonesAcc, ...filterZones(zone.children, isMobility, isResidency)]
        }
    }, [])
}

module.exports = {
    nestZones,
    filterZones
}