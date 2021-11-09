import {SubmitHandler} from "react-hook-form";
import {Algorithm, FormValues} from "../../../../utils/types";
import {useMutation} from "react-query";
import axios from "axios";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import Form from "../../../../components/Form";
import Link from "next/link";
import {ArrowLeftIcon} from "@iconicicons/react";
import Header from "../../../../components/Header";
import {getClass} from "../../../../utils/get-class";

export default function Editar({aula}: {aula: FormValues}) {
    aula = JSON.parse(aula as any)

    const router = useRouter()

    const {classId} = router.query

    const submitMutation = useMutation((data: FormValues) => {
        return axios.post("/api/edit-class", {data, id: classId})
    })

    const onSubmit: SubmitHandler<FormValues> = data => {
        submitMutation.mutate(data)
    }

    useEffect(() => {
        if (submitMutation.isSuccess) router.push(`/admin/aulas/${submitMutation.data.data.newId}`)
    }, [submitMutation.isSuccess]);


    return (
        <div className="w-full h-full p-5 flex flex-col items-center">
            <Header title="Editar algoritmo"/>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-3xl font-semibold opacity-80">Editar {aula.nome}</h1>
            </div>
            <div className="flex flex-col mt-20 w-[700px]">
                <Link href={`/admin/aulas/${classId}`}><a className="text-green-500 text-xl flex items-center hover:underline"><ArrowLeftIcon />Recuar</a></Link>
                <Form onSubmit={onSubmit} defaultValues={aula} type="edit"/>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/",
    async getServerSideProps(context) {
        const data = await getClass(context.params!.classId as string)

        const {name, date, algorithms} = data.classes

        const newDate = new Date(date).toISOString().substr(0, 10) as any

        const formVals: FormValues = {
            nome: name,
            data: newDate,
            algos: algorithms.map((algo: Algorithm) => {
                let diff, lang;
                const {description, id, name, content} = algo
                algo.tags!.forEach((tag: any) => {
                    if (tag.type === "lang") lang = tag.value
                    if (tag.type === "diff") diff = tag.value
                })

                return {name, id, lang, diff, description, content}
            })
        }

        return {
            props: {
                aula: JSON.stringify(formVals)
            }
        }
    }
});
