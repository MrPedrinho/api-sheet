import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {FormValues} from "../utils/types";
import {CloseIcon, PlusIcon, UploadIcon} from "@iconicicons/react";
import {useState} from "react";

type Props = {
    onSubmit: SubmitHandler<FormValues>
    defaultValues: FormValues
    type: "create" | "edit"
}

function Error({message}: {message: string | undefined}) {
    return <p className="text-red-500 text-sm mt-1">{message}</p>
}

export default function Form({onSubmit, defaultValues, type}: Props) {
    const {register, handleSubmit, control, formState: {errors}} = useForm<FormValues>({defaultValues})
    const {fields, append, remove} = useFieldArray({control, name: "algos"})
    const [sent, setSent] = useState(false)

    function submit(data: FormValues) {
        console.log(data)
        setSent(true)
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(submit)} autoComplete="off" className="flex flex-col py-2">
            <div className="flex flex-col py-2">
                <label className="text-green-500 text-xl" htmlFor="name">Nome da aula:</label>
                <input className="border-solid p-2 border-b border-green-300 focus-visible:border-green-500 focus:outline-none" type="text" id="name" {...register("nome", {required: "Necessário"})} placeholder="Aula 1" />
                {errors.nome && <Error message={errors.nome.message}/>}
            </div>
            <div className="flex flex-col py-2">
                <label className="text-green-500 text-xl" htmlFor="date">Data da aula:</label>
                <input className="focus:outline-none border-solid border-b border-green-500" type="date" id="date" {...register("data", {required: "Necessário"})} />
                {errors.data && <Error message={errors.data.message}/>}
            </div>
            <ul className="pt-6">
                <div className="flex justify-between">
                    <h1 className="text-green-500 text-xl">Algoritmos:</h1>

                </div>
                <hr className="my-2 border-green-500" />
                {fields.map((item, index) => {
                    return (
                        <li key={item.id} className="flex flex-col p-4 border-green-500 border rounded-md mb-2">
                            <h1 className="text-center text-green-500 text-xl font-semibold text">Algoritmo {index+1}</h1>

                            <div className="flex flex-col py-2">
                                <label className="text-green-500 text-xl">Nome do algoritmo:</label>
                                <input className="border-solid p-2 border-b border-green-300 focus-visible:border-green-500 focus:outline-none" type="text" id="name" placeholder="Soma de dois números" {...register(`algos.${index}.name`, {required: "Necessário"})} />
                            </div>

                            <div className="flex flex-col py-2">
                                <label className="text-green-500 text-xl">Descrição do algoritmo:</label>
                                <input className="border-solid p-2 border-b border-green-300 focus-visible:border-green-500 focus:outline-none" type="text" id="name" placeholder="Pede dois integers, e soma-os respetivamente" {...register(`algos.${index}.description`, {required: "Necessário"})} />
                            </div>

                            <div className="py-2">
                                <label className="text-green-500 text-xl mr-4">Linguagem de código:</label>
                                <select className="py-2 focus:outline-none" {...register(`algos.${index}.lang`, {required: "Necessário"})}>
                                    <option value="C++">C++</option>
                                    <option value="C">C</option>
                                    <option value="Python">Python</option>
                                </select>
                            </div>

                            <div className="flex flex-col py-2">
                                <label className="text-green-500 text-xl mb-2">Código:</label>
                                <textarea className="whitespace-pre-wrap focus:outline-none border border-green-300 rounded-md p-2 focus:border-green-500" data-gramm="false" {...register(`algos.${index}.content`, {required: "Necessário"})} rows={15}/>
                            </div>


                            <div className="py-2">
                                <label className="text-green-500 text-xl mr-4">Dificuldade do algoritmo:</label>
                                <select className="py-2 focus:outline-none" {...register(`algos.${index}.diff`, {required: "Necessário"})}>
                                    <option value="easy">Fácil</option>
                                    <option value="medium">Médio</option>
                                    <option value="hard">Difícil</option>
                                </select>
                            </div>

                            <button className="ml-auto flex items-center bg-red-500 text-white border border-red-500 transition hover:text-red-500 hover:bg-white py-1 px-4 rounded-full" type="button" onClick={() => remove(index)}><CloseIcon />Remover</button>
                        </li>
                    );
                })}
            </ul>
            <div className="ml-auto">
                <button className="flex items-center text-white bg-green-500 py-1 px-4 rounded-full transition hover:bg-white hover:text-green-500 border border-green-500" onClick={() => append({})} type="button"><PlusIcon/> Adicionar algoritmo</button>
            </div>
            <button className="mr-auto flex items-center mt-4 rounded-full gap-2 bg-green-500 text-white transition hover:bg-white hover:text-green-500 border border-green-500 px-4 py-2" disabled={sent} type="submit">
                {!sent && <><UploadIcon/>{type === "create" ? "Submeter" : "Confirmar"}</>}
                {sent && <>A criar aula...</>}
            </button>
        </form>
    )
}