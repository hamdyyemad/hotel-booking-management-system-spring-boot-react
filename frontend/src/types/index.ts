export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  type: string;
  amenities: string[];
  imageUrl?: string;
  roomType?: string;
  roomPrice?: number;
  roomDescription?: string;
  roomPhotoUrl?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  startDate?: string;
  endDate?: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  userName: string;
  userEmail: string;
  roomName: string;
  bookingConfirmationCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  token?: string;
  role?: string;
  user?: T;
  room?: T;
  roomList?: T[];
  bookingConfirmationCode?: string;
}
