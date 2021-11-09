import Link from "next/link";
import {Class} from "../../../utils/types";
import {GetStaticPaths, GetStaticProps} from "next";
import Header from "../../../components/Header";
import {getClass} from "../../../utils/get-class";
import {getAlgo} from "../../../utils/get-algo";
import {useRouter} from "next/router";
import FallbackPage from "../../../components/FallbackPage";

export default function Aula ({aula}: {aula: string | Class}) {
    const router = useRouter()

    if (router.isFallback) return <FallbackPage />

    aula = JSON.parse(aula as string)

    return (
        <div>
            <Header title={(aula as Class).name}/>
            <div className="w-full h-full p-5 flex flex-col items-center">
                <div className="flex flex-row items-center justify-center">
                    <h1 className="text-3xl font-semibold opacity-80">
                        <Link href={`/`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">{(aula as Class).name}</a>
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
                    {(aula as Class).algorithms.map(algo => (
                        <div key={algo.name} className="text-xl w-full grid grid-cols-6 pt-2">
                            <span className="col-start-1 col-span-3 flex items-center">{algo.name}</span>
                            <span className="col-start-4 flex items-center">{algo.lang}</span>
                            <span className="col-start-6">
                                <Link href={`/aulas/${(aula as Class).id}/algo/${algo.id}`}>
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
    const {classes} = await getClass()

    let paths: any[] = []

    classes.forEach((aula: Class) => {
        paths.push({params: {classId: aula.id.toString()}})
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const data = await getAlgo({classId: params!.classId})

    return {
        props: {
            aula: JSON.stringify(data.aula)
        },
        revalidate: 20
    }
}