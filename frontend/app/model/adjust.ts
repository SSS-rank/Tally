import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TripStackProps } from '../navigation/TripStack';

export type adjustListItemProps = {
	adjustList: adjustListItem[];
	// navigation?: NativeStackScreenProps<TripStackProps>;
};

export type adjustItemProps = {
	adjustList: adjustListItem;
	onPress: () => void;
	// navigation: NativeStackScreenProps<TripStackProps>;
};

export type adjustListItem = {
	calculate_group_uuid: string;
	created_time: string;
	amount: number;
	status: string;
	receiver_name?: string;
	// navigation?: NativeStackScreenProps<TripStackProps>;
};
