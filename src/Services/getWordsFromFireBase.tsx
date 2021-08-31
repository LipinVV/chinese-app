import {fireBaseData} from "./firebase";
import {wordInterface} from "../AdminSection/WordCreator/WordCreatorFireBase";

export const getWordsFromFireBase = async () => {

    const wordCollection =fireBaseData.collection('Dictionary')

    try {
        const allWordsSnapShot = await wordCollection.get();

        let allWords : wordInterface[] = [];

        allWordsSnapShot.forEach((doc) => {
            const unpackedWord = doc.data()
            allWords.push({
                key: doc.id,
                word: unpackedWord.word,
                definition: unpackedWord.definition,
                pinyin: unpackedWord.pinyin,
                tone: unpackedWord.tone,
                audioUrl: unpackedWord.audioUrl
                // audioUrl: unpackedWord?.audioUrl?.audioUrl,
            })
        });

        return allWords.map((word, i) => {
            return {
                ...word,
                id: i + 1
            }
        })
    }
    catch (error) {
        return Promise.reject(error);
    }
}