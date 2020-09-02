import { table, getMinifiedRecord, minifyRecords } from './utils/airtable.js';

//TODO: require authentication
export default async (req, res) => {
    //TODO: get logged in user
    try {
        const records = await table
            .select({ filterByFormula: `userId = '${user.sub}'` })
            .firstPage();
        const formattedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(formattedRecords);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};
