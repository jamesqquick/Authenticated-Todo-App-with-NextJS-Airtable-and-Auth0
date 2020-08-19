const { table, getMinifiedRecord } = require('./utils/airtable.js');
export default async (req, res) => {
    try {
        const records = await table.select({}).firstPage();
        const formattedRecords = records.map((record) =>
            getMinifiedRecord(record)
        );
        res.statusCode = 200;
        res.json(formattedRecords);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};
