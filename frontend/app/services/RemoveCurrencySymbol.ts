function removeCurrencySymbol(amount: string): string {
	return amount.replace(/[￥¥$,]/g, '');
}
export default removeCurrencySymbol;
