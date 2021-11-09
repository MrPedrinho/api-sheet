import {Class} from "./types";

const {dbConnect, Aula} = require("./mongoose")

export async function getClass (id?: string) {
    try {
        await dbConnect()

        const query = id ?? ""
        const aulas = await Aula.find(query.length > 0 ? {id: parseInt(query)}: {})

        let classDetails = aulas.map((aula: Class) => {
            const {name, id, date, algorithms} = aula
            return {
                name,
                id,
                date: date.toUTCString(),
                algorithms
            }
        })

        if (query.length > 0) classDetails = classDetails[0]

        return {classes: classDetails}

    } catch (err) {
        console.error(err)
        return {error: true}
    }

}