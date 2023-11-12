import axios from "axios";
import { RegisterApiResponse, UserData, VerifyApiResponse } from "./Register.model";

export const onVerify = async (email: string) : Promise<VerifyApiResponse> => {
    const response = await axios.get(`http://localhost:8080/api/v1/send-email?email=${email}`);
    return response.data;
}

export const onSubmit = async(userData: UserData): Promise<RegisterApiResponse> => {
    const response = await axios.post('http://localhost:8080/api/v1/register-user', userData);
    return response.data;
}