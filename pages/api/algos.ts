import {NextApiRequest, NextApiResponse} from "next";
import {Algorithm, Class} from "../../utils/types";

const {dbConnect, Aula} = require("../../utils/mongoose")

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect()

        if (req.method === "GET") {
            const {classId, algoId} = req.query

            const aula: Class = await Aula.findOne({id: classId})

            if (algoId) {

                let algoIdx: number
                aula.algorithms.forEach((algo: Algorithm, idx: number) => {
                    if (algo.id!.toString() === algoId) algoIdx = idx
                })

                const algo = aula.algorithms[algoIdx!]

                return res.status(200).json({aula, algo})
            }

            return res.status(200).json({aula})
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({error: true})
    }

}