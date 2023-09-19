import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { TextStyles } from '../../styles/CommonStyles';

interface TripListFilterProps {
	filterName: string;
}

function TripListFilter({ filterName }: TripListFilterProps) {
	const [check, setCheck] = useState(false);

	const checkFilter = () => {
		setCheck(!check);
	};

	return (
		<TouchableOpacity style={styles.filterView} onPress={checkFilter}>
			<Text style={styles.filterName}>{filterName}</Text>
			{check && <Icon style={styles.checkIcon} name="checkmark" size={24} />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	filterView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	filterName: {
		...TextStyles({ align: 'left' }).regular,
		marginBottom: 14,
	},
	checkIcon: {
		color: '#91C0EB',
	},
});

export default TripListFilter;
