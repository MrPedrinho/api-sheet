import type {NextPage} from 'next'
import Link from "next/link"
import {Class} from "../../utils/types";
import axios from "axios";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import Header from "../../components/Header";

const Home: NextPage<{classes: Class[]}> = ({ classes }) => {

    const newClasses = classes.map((c: Class) => {
        c.date = new Date(c.date)
        return c
    })

    return (
        <div className="w-full h-full p-5 flex flex-col items-center">
            <Header title="Administrador"/>
            <div className="fixed top-0 left-0 flex flex-row items-center justify-center py-2 px-2">
                <Link href={"/admin/criar"}>
                    <a className="bg-green-500 py-2 px-6 text-white rounded-full text-lg shadow-lg border border-solid border-green-500 transition hover:text-green-500 hover:bg-white duration-300">Nova Aula</a>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-3xl font-semibold opacity-80">Algoritmos de Aplicações Informáticas | Administrador</h1>
            </div>
            <div className="flex flex-col mt-20 w-[700px]">
                <div className="text-xl w-full grid grid-cols-5 border-b border-solid border-green-500 border-b-2 opacity-80">
                    <span className="col-start-1">Nome</span>
                    <span className="col-start-2"># Algoritmos</span>
                    <span className="col-start-4">Data</span>
                </div>
                {newClasses.map(aula => (
                    <div key={aula.name} className="text-xl w-full grid grid-cols-5 pt-2">
                        <span className="col-start-1 flex items-center">{aula.name}</span>
                        <span className="col-start-2 flex items-center">{aula.algorithms.length}</span>
                        <span className="col-start-4 flex items-center">{aula.date.getDate()} / {aula.date.getMonth()} / {aula.date.getFullYear()}</span>
                        <Link href={`/admin/aulas/${aula.id}`}>
                            <a className="text-green-500 text-center my-1 hover:animate-pulse">Continuar</a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/",
    async getServerSideProps() {
        const {data} = await axios.get("http://localhost:3000/api/classes")

        return {
            props: {
                classes: data.classes,
            },
        }
    }
});