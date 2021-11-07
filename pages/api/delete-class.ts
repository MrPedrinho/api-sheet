import { withApiAuthRequired } from '@auth0/nextjs-auth0';
const {dbConnect, Aula} = require("../../utils/mongoose")


export default withApiAuthRequired(async function myApiRoute(req, res) {
    try {
        await dbConnect()

        const {id}: {id: string} = req.body

        await Aula.findOneAndDelete({id: parseInt(id)})

        return res.status(200).json({ok: true})

    } catch (err) {
        console.error(err)
        return res.status(500).json({error: true})
    }
});