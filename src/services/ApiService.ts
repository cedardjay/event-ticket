import axios from "axios"
import { CreateEventPayload } from "../features/event/pages/OrganiserPage";

interface InitiatePaymentPayload {
    eventId: string
    quantity: number
    fullName: string
    email: string
    phoneNumber: string
}

export default class ApiService {

    static BASE_URL = import.meta.env.VITE_API_BASE_URL;

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }




    /* Get all events (public) */
    static async allEvents() {
        const response = await axios.get(`${this.BASE_URL}/events`);
        return response.data.data;
    }

    /* Create a new event (organiser) */
    static async createEvent(payload: CreateEventPayload) {
        const response = await axios.post(`${this.BASE_URL}/events`, payload);
        return response.data.data;
    }


    static async getPaymentStatus(paymentId: string) {
        const response = await axios.get(`${this.BASE_URL}/payments/${paymentId}/status`);
        return response.data;
    }

    static async initiatePayment(payload: InitiatePaymentPayload) {
        const response = await axios.post(`${this.BASE_URL}/payments/iwomi/initiate`, payload)
        return response.data.payment;
    }

}



// export default new ApiService();