function getCurrencyType(amount: string): 'kr' | 'jp' | 'us' {
	const isYen = /[￥¥]/.test(amount);
	const isDollar = /[$]/.test(amount);

	if (isYen) {
		return 'jp';
	} else if (isDollar) {
		return 'us';
	} else {
		return 'kr';
	}
}
export default getCurrencyType;
