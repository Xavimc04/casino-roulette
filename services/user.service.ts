import instance from "@/lib/instance";

export async function getUser() {
    try {
        const response = await instance.get('/api/user');

        if(response.status !== 200) return false;

        return response.data;
    } catch (error) {
        return false; 
    }
}