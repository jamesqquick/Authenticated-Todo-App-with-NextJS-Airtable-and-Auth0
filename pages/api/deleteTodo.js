import { table } from './utils/airtable.js';

//TODO: require authentication
const handler = async (req, res) => {
    const { id } = req.body;

    try {
        const deletedRecord = await table.destroy([id]);
        res.statusCode = 200;
        res.json(deletedRecord);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};

export default auth0.requireAuthentication(OwnsRecord(handler));
