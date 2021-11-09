import Link from "next/link"
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {GetStaticPaths, GetStaticProps} from "next";
import {Class, Algorithm} from "../../../../../utils/types";
import Header from "../../../../../components/Header";
import {getClass} from "../../../../../utils/get-class";
import {getAlgo} from "../../../../../utils/get-algo";
import {useRouter} from "next/router";
import FallbackPage from "../../../../../components/FallbackPage";

export default function algoId ({aula, algo}: {aula: Class, algo: Algorithm}) {

    const router = useRouter()

    if (router.isFallback) return <FallbackPage />

    aula = JSON.parse(aula as any)
    const algoDetails = JSON.parse(algo as any)

    return (
        <div>
            <Header title={algo.name}/>
            <div className="w-full h-full p-5 flex flex-col items-center">
                <div className="flex flex-row items-center justify-center">
                    <h1 className="text-3xl font-semibold opacity-80">
                        <Link href={`/admin`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">Admin</a>
                        </Link>
                        {" / "}
                        <Link href={`/admin`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">{aula.name}</a>
                        </Link>
                        {" / "}
                        <Link href={`/admin/aulas/${aula.id}`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">Algoritmos</a>
                        </Link>
                        {" / "}
                        {algoDetails.name}
                    </h1>
                </div>
                <div className="w-[1000px] mt-20">
                    <div className="flex flex-col">
                        <h1 className="text-green-500 text-2xl mb-2 font-semibold opacity-80">Descrição do algoritmo:</h1>
                        <p className="pl-4 text-lg whitespace-pre-wrap">{algoDetails.description}</p>
                    </div>
                    <hr className="border-1 border-green-500 my-4" />
                    <div className="max-w-full">
                        <h1 className="text-green-500 text-2xl mb-2 font-semibold opacity-80">Algoritmo:</h1>
                        <SyntaxHighlighter language={algoDetails.syntax} showLineNumbers={true} className="shadow-md rounded-md">
                            {algoDetails.content}
                        </SyntaxHighlighter>
                        <hr className="border-1 border-green-500 my-4" />
                        <div className="flex flex-row w-full">
                            {algoDetails.tags!.map((tag: {type: string, value: string, level?:string}) => {
                                if (tag.type === "lang") {
                                    return (<span key={tag.value} className="mr-2 shadow-md px-4 py-1 text-center text-white bg-blue-500 rounded-full">{tag.value}</span>)
                                }
                                if (tag.type === "diff") {
                                    const colors: {[key: string]: string} = {easy: "bg-green-500", medium: "bg-yellow-500", hard: "bg-red-500"}
                                    const diffConv: {[key: string]: string} = {easy: "Fácil", medium: "Médio", hard: "Difícil"}

                                    return (<span key={tag.value} className={`mr-2 px-4 py-1 shadow-md text-center text-white ${colors[tag.value]} rounded-full`}>{diffConv[tag.value]}</span>)
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const {classes} = await getClass()

    let paths: any[] = []

    classes.forEach((aula: Class) => {
        aula.algorithms.forEach((algo: Algorithm) => {
            paths.push({params: {classId: aula.id.toString(), algoId: algo.id!.toString()}})
        })
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const data = await getAlgo({classId: params!.classId, algoId: params!.algoId})


    return {
        props: {
            aula: JSON.stringify(data.aula),
            algo: JSON.stringify(data.algo)
        },
        revalidate: 60
    }
}