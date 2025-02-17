interface Attributes {
	past_key_dates: {
		[key: string]: string;
	};
	key_dates: {
		[key: string]: string;
	};
};

interface ClientAccount {
	id: string;
	primary_applicant_info: {
		mobile: string;
		email: string;
	};
	name: string;
}

export interface Application {
	type: string;
	id: string;
	attributes: Attributes;
	lender_reference: string;
	purpose: string;
	amount: number;
	user_reference: number;
	client_account: ClientAccount;
};
