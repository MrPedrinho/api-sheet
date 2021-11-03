export type Class = {
    name: string,
    id: number,
    date: Date,
    algorithms: Algorithm[]
}

export type Algorithm = {
    name: string,
    id: number,
    lang: string,
    syntax: string,
    description: string,
    tags: {type: string, value: string, level?: string}[]
    content: string
}