export interface IUser {
    name: string;
    user_type: string;
    email: string;
    id: number;
}


export interface UserFormData {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface ICampaign {
    id: string;
    title: string;
    brand: string;
    category: string;
    description: string;
    deadline: Date;
    user_id: string;
    compensation: number;
    campaignId: string;
};


export interface ILoginUser {
    email: string
    password: string
}