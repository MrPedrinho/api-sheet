import {NextApiRequest, NextApiResponse} from "next";
import {Class} from "../../utils/types";

const {dbConnect, Aula} = require("../../utils/mongoose")

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect()

        if (req.method === "GET") {
            const query = req.query.id ?? ""
            const aulas = await Aula.find(query.length > 0 ? {id: query}: {})

            const classDetails = aulas.map((aula: Class) => {
                const {name, id, date, algorithms} = aula
                return {
                    name, id, date, algorithms
                }
            })

            return res.status(200).json({classes: classDetails})
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({error: true})
    }

}