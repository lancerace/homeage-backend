export interface IBooking {
    name: string;
    vaccinationCenterId: number;
    time: Date;
}


export interface IUpdateBooking {
    message?: string;
    success: boolean;
}