export const getLetterByIndex = (index: number) => {
    if (index >= 1 && index <= 33) {
        return String.fromCharCode(1040 + index - 1);
    } else {
        return "";
    }
};
