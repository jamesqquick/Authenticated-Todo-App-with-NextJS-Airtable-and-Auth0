import { table } from './utils/airtable.js';

//TODO: requireAuthentication
export default async (req, res) => {
    //TODO: get the logged in user and associate userid with incoming record
    const user;
    
    const { description } = req.body;
    try {
        const createdRecords = await table.create([
            { fields: { description, userId: user.sub } },
        ]);
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
        };
        res.statusCode = 200;
        res.json(createdRecord);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};
