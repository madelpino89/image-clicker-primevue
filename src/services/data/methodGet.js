import { http } from "@/setup/http";

export default {
    getRandomUsers: async (numberResults) => {
        if(numberResults) {
            if (typeof(numberResults) !== "number") {
                throw new Error("numberResults must be a number");
            }
        } else {
            numberResults = 6;
        }
            
        const params = numberResults ? `?results=${numberResults}&nat=ES` : `?results=6&nat=ES`;
        const response = await http.get(params);
        return response.data;
        
    }
};