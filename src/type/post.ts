export type PostDto = {
    id: number;
    title: string;
    content: string;
    createDate: string;
    modifyDate: string;
}

export type PostCommentsDto = {
    id: number;
    content: string;
    createDate: string;
    modifyDate: string;
}