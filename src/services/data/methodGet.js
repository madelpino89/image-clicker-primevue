import { http } from "@/setup/http";

export default {
    getRandomUsers: async (numberResults) => {
        let results = numberResults || 6;
        const params = numberResults ? `?results=${results}&nat=ES` : `?results=6&nat=ES`;
        const response = await http.get(params);
        return response.data;
    }
};