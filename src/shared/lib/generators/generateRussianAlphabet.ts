const START_CHAR_CODE = 1040; // код буквы "А"

export const generateRussianAlphabet = (count: number): string[] => {
    const alphabet = [];
    for (let i = 0; i < count; i++) {
        const charCode = START_CHAR_CODE + i;
        alphabet.push(String.fromCharCode(charCode));
    }
    return alphabet;
};
