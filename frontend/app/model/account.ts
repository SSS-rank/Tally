export interface Account {
	accountNumber: string;
	bankCode: string;
	bankName: string;
	balance: number;
	representativeAccount: boolean;
}

export interface AccountResgistReq {
	account_number: string;
	bank_code: string;
	order_number: number;
	account_password: string;
	transfer_password?: string;
}
