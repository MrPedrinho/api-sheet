import Link from "next/link";
import {Class} from "../../../../utils/types";
import axios from "axios";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {useRouter} from "next/router";
import Header from "../../../../components/Header";

export default function Aula ({aula}: {aula: Class}) {

    const router = useRouter()

    async function deleteClass() {
        const {data: {ok}} = await axios.post("/api/delete-class", {id: aula.id})
        if (ok) router.push("/admin")
    }

    return (
        <div>
            <Header title={`Administrador | ${aula.name}`}/>
            <div className="w-full h-full p-5 flex flex-col items-center">
                <div className="flex flex-row items-center justify-center">
                    <h1 className="text-3xl font-semibold opacity-80">
                        <Link href={`/admin`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">Admin</a>
                        </Link>
                        {" / "}
                        <Link href={`/admin/aulas/${aula.id}`}>
                            <a className="text-green-500 hover:animate-pulse hover:underline">{aula.name}</a>
                        </Link>
                        {" / "}
                        Algoritmos & Definições
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
                                <Link href={`/admin/aulas/${aula.id}/algo/${algo.id}`}>
                                    <a className="text-green-500 text-center my-1 hover:animate-pulse">Ver mais</a>
                                </Link>
                            </span>
                        </div>
                    ))}
                    <hr className="mt-10 mb-4 border-green-500"/>
                    <div className="flex items-center justify-between">
                        <Link href={`/admin/aulas/${aula.id}/editar`}><a className="bg-yellow-400 text-white rounded-full px-4 py-2 border border-yellow-400 hover:bg-white hover:text-yellow-400 transition">Editar Aula</a></Link>
                        <button className="bg-red-500 text-white rounded-full px-4 py-2 border border-red-500 hover:bg-white hover:text-red-500 transition" onClick={() => deleteClass()}>Apagar Aula</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/",
    async getServerSideProps(context) {
        const {data} = await axios.get("http://localhost:3000/api/algos", {params: {classId: context.params!.classId}})

        return {
            props: {
                aula: data.aula
            }
        }
    }
});