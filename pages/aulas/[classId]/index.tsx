import Link from "next/link";
import {Class} from "../../../utils/types";
import {GetStaticPaths, GetStaticProps} from "next";
import axios from "axios";
import Header from "../../../components/Header";

export default function Aula ({aula}: {aula: Class}) {

    return (
        <div>
            <Header title={aula.name}/>
            <div className="w-full h-full p-5 flex flex-col items-center">
                <div className="flex flex-row items-center justify-center">
                    <h1 className="text-3xl font-semibold opacity-80">
                        <Link href={`/`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">{aula.name}</a>
                        </Link>
                        {" / "}
                        Algoritmos
                    </h1>
                </div>
                <div className="flex flex-col mt-20 w-[600px]">
                    <div className="text-xl w-full grid grid-cols-6 border-b border-solid border-gray-400">
                        <span className="col-start-1 col-span-3">Nome</span>
                        <span className="col-start-4">Linguagem</span>
                    </div>
                    {aula.algorithms.map(algo => (
                        <div key={algo.name} className="text-xl w-full grid grid-cols-6 pt-2">
                            <span className="col-start-1 col-span-3 flex items-center">{algo.name}</span>
                            <span className="col-start-4 flex items-center">{algo.lang}</span>
                            <span className="col-start-6">
                                <Link href={`/aulas/${aula.id}/algo/${algo.id}`}>
                                    <a className="text-green-500 text-center my-1 hover:animate-pulse">Ver mais</a>
                                </Link>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const {data: {classes}} = await axios.get("https://algos-api.vercel.app/api/classes")

    let paths: any[] = []

    classes.forEach((aula: Class) => {
        paths.push({params: {classId: aula.id.toString()}})
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {data} = await axios.get("https://algos-api.vercel.app/api/algos", {params: {classId: params!.classId}})

    return {
        props: {
            aula: data.aula
        },
        revalidate: 60
    }
}