import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import { TripListItemProps } from '../../model/tripListItem';
import { TextStyles } from '../../styles/CommonStyles';
function TripListItem({ title, nationName, date, image }: TripListItemProps) {
	console.log(image);
	return (
		<TouchableOpacity>
			<View style={styles.listItemContainer}>
				<View style={styles.listView}>
					<Avatar.Image size={50} style={{ marginRight: 20 }} source={{ uri: image }} />
					<View>
						<View style={styles.listItemTop}>
							<Text style={styles.listItemTitle}>{title}</Text>
							<Text style={styles.listItemNationName}>{nationName}</Text>
						</View>
						<Text style={styles.listItemDate}>{date}</Text>
					</View>
					<View></View>
				</View>
				<Icon name="chevron-forward" size={30} color="#666666" />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listItemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	listView: {
		flexDirection: 'row',
	},
	listItemTop: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	listItemTitle: {
		...TextStyles({ align: 'left' }).medium,
		marginRight: 6,
	},
	listItemNationName: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
	listItemDate: {
		...TextStyles({ align: 'left', color: '#666666' }).small,
	},
});

export default TripListItem;
