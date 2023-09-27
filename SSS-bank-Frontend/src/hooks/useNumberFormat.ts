import React, { useState } from 'react';

// 숫자를 1000단위로 콤마를 추가하여 포맷팅하는 커스텀 훅
const useNumberFormat = (initialValue: string) => {
	const [formattedValue, setFormattedValue] = useState(initialValue);

	const formatNumber = (number: string) => {
		return number.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const formattedInputValue = formatNumber(inputValue);
		setFormattedValue(formattedInputValue);
	};

	return {
		formattedValue,
		handleValueChange,
	};
};

export default useNumberFormat;
