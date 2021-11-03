import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {FormValues} from "../../utils/types";
import {useMutation} from "react-query";
import axios from "axios";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Criar() {
    const {register, handleSubmit, control, formState: {errors}} = useForm<FormValues>()
    const {fields, append, remove} = useFieldArray({control, name: "algos"})
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


    return (
        <div className="w-full h-full p-5 flex flex-col items-center"> {/* @todo add validation */}
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-3xl font-semibold opacity-80">Nova Aula</h1>
            </div>
            <div className="flex flex-col mt-20 w-[700px]">
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div>
                        <label htmlFor="name">Nome da aula:</label>
                        <input type="text" id="name" {...register("nome", {required: "Necessário"})} placeholder="Aula 1" /> {/* @todo make this random */}
                        <p>{errors.nome?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="date">Nome da aula:</label>
                        <input type="date" id="date" {...register("data", {required: "Necessário"})} />
                    </div>
                    <ul>
                        <button onClick={() => append({})} type="button">Adicionar algoritmo</button>
                        {fields.map((item, index) => {
                            return (
                                <li key={item.id} className="flex flex-col">
                                    <h1>Novo algoritmo</h1>

                                    <input placeholder="Nome do algoritmo" {...register(`algos.${index}.name`)} />

                                    <input placeholder="Descrição do algoritmo" {...register(`algos.${index}.description`)} />

                                    <select {...register(`algos.${index}.lang`)}>
                                        <option value="C++">C++</option>
                                        <option value="C">C</option>
                                        <option value="Python">Python</option>
                                    </select>

                                    <textarea {...register(`algos.${index}.content`)} className="whitespace-pre-wrap"/>

                                    <select {...register(`algos.${index}.diff`)}>
                                        <option value="easy">Fácil</option>
                                        <option value="medium">Médio</option>
                                        <option value="hard">Difícil</option>
                                    </select>

                                    <button type="button" onClick={() => remove(index)}>Remover</button>
                                </li>
                            );
                        })}
                    </ul>
                    <button type="submit">Submeter</button>
                </form>
            </div>
        </div>
    )
}