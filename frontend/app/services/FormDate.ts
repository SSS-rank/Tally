function formatDate(in_date: Date) {
	const year = in_date.getFullYear();
	const month = String(in_date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
	const day = String(in_date.getDate()).padStart(2, '0'); // 일자를 2자리로 포맷팅
	const hours = String(in_date.getHours()).padStart(2, '0'); // 시간을 2자리로 포맷팅
	const minutes = String(in_date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅

	return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export default formatDate;
