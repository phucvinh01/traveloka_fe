
import axios from '../axios/http'


export const getHotelPage = async (page: number): Promise<ApiGetPageResponse | false> => {
  try {
    const data = await axios.get(`hotel/get-page?page=${page}`);
    if (data.status === 200) {
      const res: ApiGetPageResponse = data.data;
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false
}


export const getOneHotelById = async (id: string): Promise<IOneHotel | false | undefined> => {
  try {
    const response = await axios.get<IOneHotel>(`hotel/get-one-by-id?id=${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getHotelsByProvince = async (province: string): Promise<IResponeCardHotel | false | undefined> => {
  try {
    const response = await axios.get<IResponeCardHotel>(`hotel/hotels-by-province?province=${province}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export type InsertResult = {
  id: string,
  hotel_id:string,
}


export const insertHotel = async (body:IHotel | undefined): Promise<string | false | undefined> => {
  try {
    console.log("insertHotel");
    const response = await axios.post<InsertResult>(`/hotel/insert-hotel`,body);
    if (response.status === 200) {
      return response.data.id
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const insertTyperoom = async (body:ITypeRoom | undefined,id:string): Promise<InsertResult | false | undefined> => {
  try {
    
    const response = await axios.post<InsertResult>(`/hotel/insert-typeroom`,{...body,"HotelId":id});
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export async function uploadImage(image: File, typeRoom: InsertResult,region:string): Promise<boolean> {
  try {
    // Tạo FormData chứa dữ liệu cần uploadid_hotel
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id_hotel', typeRoom.hotel_id);
    formData.append('id_typeroom', typeRoom.id);
    formData.append('region', region);

    const response = await fetch('http://localhost:8000/api/upload-image', {
      method: 'POST',
      body: formData,
    });
    console.log('Image uploaded successfully:', await response.text());
    return true ;
  } catch (error) {
    console.error('Error uploading image:', error);
    return false;
  }
}

export const insertRoom = async (body:IRoom | undefined, id:string,index:number): Promise<InsertResult | false | undefined> => {
  try {
    const response = await axios.post<InsertResult>(`/room/insert-room`,{...body,  "typeRoom_id":id, "name_room":`${body?.RoomName} ${index} ` });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const insertStaff = async (HotelId:string, StaffId:string): Promise<InsertResult | false | undefined> => {
  try {
    const response = await axios.post<InsertResult>(``);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};









