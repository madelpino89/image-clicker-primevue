import { http } from "@/setup/http";

export default {
    getRandomUser: async (numberResults) => {
        let results = numberResults || 5;
        const response = await http.get(`https://randomuser.me/api/?results=${results}&nat=ES`);
        return response.data;
    }
};