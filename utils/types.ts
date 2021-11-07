export type Class = {
    name: string,
    id: number,
    date: Date,
    algorithms: Algorithm[],
    _id?: string,
    __v?: string
}

export type Algorithm = {
    name: string,
    id?: number,
    lang: "C++" | "C" | "Python",
    syntax: "cpp" | "c" | "python",
    description: string,
    tags?: {type: string, value: string}[]
    content: string
    diff?: "easy" | "medium" | "hard"
    _id?: string
}

export type FormValues = {
    nome: string,
    data: Date,
    algos: Algorithm[]
}