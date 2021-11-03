import {NextApiRequest, NextApiResponse} from "next";
import {Class} from "../../utils/types";

const {dbConnect, Aula} = require("../../utils/mongoose")

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()

    const aulas = await Aula.find({})

    const classDetails = aulas.map((aula: Class) => {
        const {name, id, date} = aula
        const algoCount = aula.algorithms.length;

        return {
            name, id, date, algoCount
        }
    })

    return res.status(200).json({classes: classDetails})
}