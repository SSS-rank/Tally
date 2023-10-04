function ExTractHourAndMinute(input: string): string {
	const [hour, minute] = input.split(':');
	return `${hour}:${minute}`;
}
export default ExTractHourAndMinute;
