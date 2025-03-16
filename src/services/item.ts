import axios from "axios"

export const deleteItemUser = async(id:number) =>{
    const {data} = await axios.delete(`/api/videos/${id}`)
    return data;
}

export const updateViewsUser =  async(id:number) => {
    const {data} = await axios.patch(`/api/video/${id}`);
    return data;
}


export const addLikeItem =  async(videoId: number, userId: number) => {
    const {data} = await axios.post(`/api/liked`, {videoId, userId});
    return data;
}


export const getCategories =  async() => {
    const {data} = await axios.get(`/api/category`);
    return data;
}