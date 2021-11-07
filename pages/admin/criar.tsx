import {SubmitHandler} from "react-hook-form";
import {FormValues} from "../../utils/types";
import {useMutation} from "react-query";
import axios from "axios";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import Form from "../../components/Form";
import Link from "next/link"
import {ArrowLeftIcon} from "@iconicicons/react";
import Header from "../../components/Header";

export default function Criar() {
    const router = useRouter()

    const submitMutation = useMutation((data: FormValues) => {
        return axios.post("/api/new-class", {data})
    })

    const onSubmit: SubmitHandler<FormValues> = data => {
        submitMutation.mutate(data)
    }

    useEffect(() => {
        if (submitMutation.isSuccess) router.push(`/aulas/${submitMutation.data.data.newId}`)
    }, [submitMutation.isSuccess]);

    const date = new Date()

    return (
        <div className="w-full h-full p-5 flex flex-col items-center">
            <Header title="Novo algoritmo"/>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-3xl font-semibold opacity-80">Editar Aula</h1>
            </div>
            <div className="flex flex-col mt-20 w-[700px]">
                <Link href="/admin"><a className="text-green-500 text-xl flex items-center hover:underline"><ArrowLeftIcon />Recuar</a></Link>
                <Form onSubmit={onSubmit} type="create" defaultValues={{
                    data: date.toISOString().substr(0, 10) as any,
                    nome: "",
                    algos: []
                }}/>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();