import axios from "axios"


// export const getItem = async () => {
//     const { data } = await axios.get('api/videos');
//     return data;
// }

// export const getItemUser = async (id: number) => {
//     const { data } = await axios.get(`api/videos/${id}`);
//     return data;
// }


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