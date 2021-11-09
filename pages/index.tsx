import type {NextPage} from 'next'
import Link from "next/link"
import {Class} from "../utils/types";
import Header from "../components/Header";
import {getClass} from "../utils/get-class";

const Home: NextPage<{classes: string}> = ({classes}) => {

    const newClasses: Class[] = JSON.parse(classes).map((c: Class) => {
        c.date = new Date(c.date)
        return c
    })

    return (
    <div className="w-full h-full p-5 flex flex-col items-center">
        <Header title="Aplicações Informáticas" desc="Base de dados com algoritmos de aplicações informáticas"/>
        <div className="flex flex-row items-center justify-center">
            <h1 className="text-3xl font-semibold opacity-80">Algoritmos de Aplicações Informáticas B</h1>
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
                    <Link href={`/aulas/${aula.id}`}>
                        <a className="text-green-500 text-center my-1 hover:animate-pulse">Continuar</a>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
    const data = await getClass()

    return {
        props: {
            classes: JSON.stringify(data.classes)
        },
        revalidate: 60
    }
}