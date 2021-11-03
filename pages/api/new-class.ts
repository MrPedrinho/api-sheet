import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import {Algorithm, Class, FormValues} from "../../utils/types";
const {dbConnect, Aula} = require("../../utils/mongoose")


export default withApiAuthRequired(async function myApiRoute(req, res) {
    try {
        await dbConnect()

        const {data}: {data: FormValues} = req.body

        const currentClasses = await Aula.find({}).sort({id: -1})
        const newId = currentClasses[0]?.id + 1 || 1

        let newAlgos: Algorithm[] = []

        data.algos.forEach((algo: Algorithm, idx: number)=> {
            const {content, description, diff, lang, name} = algo

            const syntax: {[key: string]: any} = {"C++": "c++", C: "c", Python: "python"}

            const tags = [{type: "lang", value: lang}, {type: "diff", value: diff!}]

            let newAlgo: Algorithm = {
                id: idx + 1,
                content,
                description,
                lang,
                syntax: syntax[lang],
                name,
                tags
            }

            newAlgos.push(newAlgo)
        })

        let newClass: Class = {
            id: newId,
            name: data.nome,
            date: new Date(data.data),
            algorithms: newAlgos
        }

        await Aula.create(newClass)

        return res.status(200).json({newId})

    } catch (err) {
        console.error(err)
        return res.status(500).json({error: true})
    }
});