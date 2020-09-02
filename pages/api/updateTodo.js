import { table } from './utils/airtable.js';
import auth0 from './utils/auth0';
import OwnsRecord from './middleware/OwnsRecord.js';

//TODO: require authentication
export default handler = async (req, res) => {
    //TODO: get logged in userc
    const user;
    
    const { id, fields } = req.body;

    try {
        const newFields = { ...fields, userId: user.sub };
        const updatedRecord = await table.update([{ id, fields: newFields }]);
        res.statusCode = 200;
        res.json(updatedRecord);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};
