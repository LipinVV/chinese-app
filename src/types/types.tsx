export type wordCard = {
    correct: string;
    id: number,
    word: string | undefined,
    pinyin: string | undefined,
    definition: string | undefined,
    tone: number | undefined,
    isFavourite: boolean | undefined,
    toLearn: boolean | undefined,
}