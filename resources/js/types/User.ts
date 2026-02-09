export type User = {
    id: number;
    name: string;
    email: string;
    status: boolean;
    profile_photo?: string;
    email_verified_at: string | null;
    deleted_at: string;
    remember_token: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; 
};
