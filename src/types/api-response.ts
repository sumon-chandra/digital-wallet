/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SuccessResponse<T> {
	statusCode: number;
	success: true;
	message: string;
	data: T;
}

export interface ErrorResponse {
	success: false;
	message: string;
	errorSources: {
		path: string;
		message: string;
	}[];
	err: any;
	stack: any;
}

export interface TransSummeryReportType {
	date: Date;
	cashIn: number;
	cashOut: number;
	sendMoney: number;
	add: number;
	withdraw: number;
	total: number;
	count: number;
}
