function numberWithCommas(input: string): string {
	const tmp = input;
	const trans_tmp = parseInt(tmp.replace(/\D/g, ''));
	return trans_tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export default numberWithCommas;
