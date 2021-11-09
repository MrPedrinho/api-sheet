export default function FallbackPage() {

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-green-500 font-semibold mb-10 text-6xl">Aguarda enquanto carregamos a página</h1>
            <p className="bg-green-500 text-2xl">Prometemos que não demora muito</p>
        </div>
    )
}