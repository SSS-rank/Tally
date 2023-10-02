const removeCommaAndParseInt = (inputString: string): number => {
	const numberWithoutComma = parseFloat(inputString.replace(/,/g, ''));

	if (!isNaN(numberWithoutComma)) {
		return numberWithoutComma;
	} else {
		return 0;
	}
};
export default removeCommaAndParseInt;
