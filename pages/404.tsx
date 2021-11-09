import Link from "next/link"

export default function NotFound() {

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-green-500 font-semibold mb-10 text-6xl">Página não encontrada</h1>
            <Link href="/"><a className="px-4 py-2 text-2xl bg-green-500 text-white rounded-full border border-green-500 transition duration-300 hover:bg-white hover:text-green-500">Página inicial</a></Link>
        </div>
    )
}