import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TripStackProps } from '../navigation/TripStack';

export type SendAdjustScreenProps = NativeStackScreenProps<TripStackProps, 'SendAdjust'>;
export type GetAdjustScreenProps = NativeStackScreenProps<TripStackProps, 'GetAdjust'>;
export type AdjustTripScreenProps = NativeStackScreenProps<TripStackProps, 'AdjustTrip'>;
export type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'TripDetail'>;
