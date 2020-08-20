import { table } from './utils/airtable.js';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (req, res) => {
    const { user } = await auth0.getSession(req);

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
});
