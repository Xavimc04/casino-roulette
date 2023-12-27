import instance from "@/lib/instance";

export async function getUser() {
    try {
        instance.get('/api/user')
            .then(response => {
                if(response.status != 200) return false; 

                console.log(response.data); 

                return response.data; 
            }).catch(error => {
                return false;      
            });
    } catch (error) {
        return false; 
    }
}