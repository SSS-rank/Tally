import removeCommaAndParseInt from './removeCommaAndParseInt';
import exRateApi from '../api/exRateApi';

async function getExRate(curr_type: string) {
	const getCurrentDate = (): string => {
		const today = new Date();
		const year = today.getFullYear();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}`;
	};
	const formatExchangeData = (data: any[]) => {
		return data.map((item) => ({
			label: item.cur_unit,
			value: item.deal_bas_r,
		}));
	};
	// const params = { searchdate: getCurrentDate() };
	const params = { searchdate: '20230927' };

	const res = await exRateApi.get('', { params });
	if (res) {
		const exData = formatExchangeData(res.data);
		const dat = exData.filter((item) => item.label == curr_type);
		const return_value = removeCommaAndParseInt(dat[0].value);
		return return_value;
	}
}

export default getExRate;
