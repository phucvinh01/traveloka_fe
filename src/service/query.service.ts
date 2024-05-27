import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import { getTypeRooms, insertTyperoom, updateTyperoom, getImageTypeRoom, uploadMultipleImage, } from "./typeroom.service";
import { getRooms, insertRoom, updateRoom } from "./room.service";
import { getHotel, getRenvenuByHotel, IHotel, updateHotel } from "./hotel.service";
import { getBookings } from "./_booking.service";

// Query Typeroom

export function useGetTypeRooms(id: string) {
  return useQuery({
    queryKey: ["getTypeRooms",id],
    queryFn: () => getTypeRooms(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateTypeRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertTyperoomAndImage) => insertTyperoom(data),
    onSuccess: async () => {
      console.log("onSuccess");
        await queryClient.invalidateQueries({ queryKey: ['getTypeRooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['getTypeRooms'] });

    },
  });
}

export function useGetImagesTypeRoom(id: string) {
  return useQuery({
    queryKey: ["getImagesTypeRoom",id],
    queryFn: () => getImageTypeRoom(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateImagesTypeRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMutilpleImageUpload) => uploadMultipleImage(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getImagesTypeRoom'] }); 
        await queryClient.prefetchQuery({ queryKey: ['getImagesTypeRoom'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}

export function useUpdateTypeRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SelectTypeRoom) => updateTyperoom(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getTypeRooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['getTypeRooms'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}


// Query room
export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Room) => insertRoom(data),
    onSuccess: async () => {
      console.log("success");
        await queryClient.invalidateQueries({ queryKey: ['rooms'] }); // Corrected line
        await queryClient.prefetchQuery({ queryKey: ['rooms'] }); // Manually refetch
    },
  });
}

export function useRooms(id: string) {
  return useQuery({
    queryKey: ["rooms",id],
    queryFn: () => getRooms(id),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useUpdateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Room) => updateRoom(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['rooms'] }); 
        await queryClient.prefetchQuery({ queryKey: ['rooms'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}

//Query hotel 

export function useGetRenvenuHotel(id: string | undefined) {
  return useQuery({
    queryKey: ["renvenuHotel",id],
    queryFn: () => getRenvenuByHotel(id),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}


export function useGetHotel(id: string) {
  return useQuery({
    queryKey: ["hotel",id],
    queryFn: () => getHotel(id),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useUpdateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HotelResponse) => updateHotel(data),
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['hotel'] }); 
        await queryClient.prefetchQuery({ queryKey: ['hotel'] }); 
    },
    onError: async (error) => {
      return "Cập nhật phòng thất bại";
    },
  });
}


//Booking



export function useGetBooking(idHotel: string) {
  return useQuery({
    queryKey: ["useGetBooking",idHotel],
    queryFn: () => getBookings(idHotel),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}