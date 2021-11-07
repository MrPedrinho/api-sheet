import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import {Algorithm, Class, FormValues} from "../../utils/types";
const {dbConnect, Aula} = require("../../utils/mongoose")


export default withApiAuthRequired(async function myApiRoute(req, res) {
    try {
        await dbConnect()

        const {data, id}: {data: FormValues, id: string} = req.body

        console.log(req.body)

        let newAlgos: Algorithm[] = []

        data.algos.forEach((algo: Algorithm, idx: number)=> {
            const {content, description, diff, lang, name} = algo

            const syntax: {[key: string]: any} = {"C++": "c++", C: "c", Python: "python"}

            const tags = [{type: "lang", value: lang}, {type: "diff", value: diff!}]

            let newAlgo: Algorithm = {
                id: idx+1,
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
            id: parseInt(id),
            name: data.nome,
            date: new Date(data.data),
            algorithms: newAlgos
        }

        await Aula.findOneAndReplace({id: parseInt(id)}, newClass)

        return res.status(200).json({newId: id})

    } catch (err) {
        console.error(err)
        return res.status(500).json({error: true})
    }
});