import {Algorithm, Class} from "./types";
const {dbConnect, Aula} = require("./mongoose")

export async function getAlgo (query: {[key: string]: any}) {
    try {
        await dbConnect()

        const {classId, algoId} = query

        const aula: Class = await Aula.findOne({id: classId})

        if (algoId) {

            let algoIdx: number
            aula.algorithms.forEach((algo: Algorithm, idx: number) => {
                if (algo.id!.toString() === algoId) algoIdx = idx
            })

            const algo = aula.algorithms[algoIdx!]

            return {aula, algo}
        }

        return {aula}

    } catch (err) {
        console.error(err)
        return {error: true}
    }

}