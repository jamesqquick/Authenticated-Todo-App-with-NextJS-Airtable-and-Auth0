import auth0 from '../utils/auth0';
import { table } from '../utils/airtable.js';
const ownsRecord = (handler) => async (req, res) => {
    const { user } = await auth0.getSession(req);

    if (!user) {
        res.statusCode = 401;
        return res.json({ msg: 'Not logged in' });
    }

    const { id } = req.body;
    try {
        const existingRecord = await table.find(id);
        if (!existingRecord || user.sub !== existingRecord.fields.userId) {
            res.statusCode = 404;
            return res.json({ msg: 'Record not found' });
        }
        req.record = existingRecord;
        return handler(req, res);
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ msg: 'Something went wrong' });
    }
};

export default ownsRecord;
