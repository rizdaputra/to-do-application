import axios from "axios"

const BASE_URL = "https://nanameue-front-end-candidate-test.vercel.app/api/rizdaputra/todos"

export const getToDoItems = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error){
        console.error('Error getting To Do Items:', error);
        return [];
    }
}

export const createToDo = async (text: string) => {
    try {
        const response = await axios.post(BASE_URL+"/create", {text});
        return response.data;
    } catch (error){
        console.error('Error creating to do item:', error);
        return {};
    }
}

export const updateToDoCheck = async (id: string) => {
    try {
        const response = await axios.put(BASE_URL+"/"+id+"/toggle");
        return response.data;
    } catch (error){
        console.error('Error updating to do item:', error);
        return {};
    }
}

export const deleteToDo = async (id: string) => {
    try {
        const response = await axios.delete(BASE_URL+"/"+id);
        return response.data;
    } catch (error){
        console.error('Error updating to do item:', error);
        return {};
    }
}