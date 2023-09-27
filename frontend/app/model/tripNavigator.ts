import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TripStackProps } from '../navigation/TripStack';

export type SendAdjustScreenProps = NativeStackScreenProps<TripStackProps, 'SendAdjust'>;
export type GetAdjustScreenProps = NativeStackScreenProps<TripStackProps, 'GetAdjust'>;
export type AdjustTripScreenProps = NativeStackScreenProps<TripStackProps, 'AdjustTrip'>;
export type TripDetailScreenProps = NativeStackScreenProps<TripStackProps, 'TripDetail'>;
export type AddPaymentScreenProps = NativeStackScreenProps<TripStackProps, 'AddPayment'>;
export type ModifyPaymentScreenProps = NativeStackScreenProps<TripStackProps, 'ModifyPayment'>;

export type PayAdjustScreenProps = NativeStackScreenProps<TripStackProps, 'PayAdjust'>;
export type PasswordScreenProps = NativeStackScreenProps<TripStackProps, 'Password'>;
