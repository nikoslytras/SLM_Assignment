const packagesData = [
    {
        create: {
            voucher: 'A1A',
            postcode: "10041",
        },
        where: { voucher: 'A1A' },
        update: {}
    },
    {
        create: {
            voucher: 'B2B',
            postcode: "11332",
        },
        where: { voucher: 'B2B' },
        update: {}
    },
    {
        create: {
            voucher: 'C3C',
            postcode: "10042",
        },
        where: { voucher: 'C3C' },
        update: {}
    },
    {
        create: {
            voucher: 'D4D',
            postcode: "11342",
        },
        where: { voucher: 'D4D' },
        update: {}
    },
    {
        create: {
            voucher: 'E5E',
            postcode: "11444",
        },
        where: { voucher: 'E5E' },
        update: {}
    },
    {
        create: {
            voucher: 'F6F',
            postcode: "16788",
        },
        where: { voucher: 'F6F' },
        update: {}
    },
    {
        create: {
            voucher: 'G7G',
            postcode: "16788",
        },
        where: { voucher: 'G7G' },
        update: {}
    },
    {
        create: {
            voucher: 'H8H',
            postcode: "10043",
        },
        where: { voucher: 'H8H' },
        update: {}
    },
    {
        create: {
            voucher: 'I9I',
            postcode: "16800",
        },
        where: { voucher: 'I9I' },
        update: {}
    },
    {
        create: {
            voucher: 'J0J',
            postcode: "16801",
        },
        where: { voucher: 'J0J' },
        update: {}
    }
];

const driversData = [
    {
        create: {
            name: 'Moe',
            cluster: 'A',
        },
        where: { name: 'Moe' },
        update: {}
    },
    {
        create: {
            name: 'Larry',
            cluster: 'B',
        },
        where: { name: 'Larry' },
        update: {}
    },
    {
        create: {
            name: 'Curly',
            cluster: 'C',
        },
        where: { name: 'Curly' },
        update: {}
    }
];

const clustersData = [
    {
        create: {
            id: 'A',
            postcodes: '10XXX',
        },
        where: { id: 'A' },
        update: {}
    },
    {
        create: {
            id: 'B',
            postcodes: '11XXX',
        },
        where: { id: 'B' },
        update: {}
    },
    {
        create: {
            id: 'C',
            postcodes: '16XXX',
        },
        where: { id: 'C' },
        update: {}
    }
];

async function insertPackage(db) {
    for (const data of packagesData) {
        console.log(await db.packages.upsert(data));
    }
}

async function insertDrivers(db) {
    for (const data of driversData) {
        console.log(await db.drivers.upsert(data));
    }
}

async function insertClusters(db) {
    for (const data of clustersData) {
        console.log(await db.clusters.upsert(data));
    }
}

module.exports = {
    insertPackage,
    insertDrivers,
    insertClusters
}

