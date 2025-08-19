import axios from "axios";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RoomData {
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl?: string;
}

interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  status?: string;
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  token?: string;
  role?: string;
}

export default class ApiService {
  static BASE_URL = "http://localhost:4040";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**AUTH */

  /* This register a new user */
  static async registerUser(
    registration: RegistrationData
  ): Promise<ApiResponse<any>> {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  /* This login a registered user */
  static async loginUser(loginDetails: LoginData): Promise<ApiResponse<any>> {
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  /***USERS */

  /* This is to get the user profile */
  static async getAllUsers(): Promise<ApiResponse<any[]>> {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserProfile(): Promise<ApiResponse<any>> {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is to update user profile */
  static async updateProfile(profileData: {
    name: string;
    email: string;
    phoneNumber: string;
  }): Promise<ApiResponse<any>> {
    const response = await axios.put(
      `${this.BASE_URL}/users/update-profile`,
      profileData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is the to get a single user */
  static async getUser(userId: string): Promise<ApiResponse<any>> {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-by-id/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is the to get user bookings by the user id */
  static async getUserBookings(userId: string): Promise<ApiResponse<any[]>> {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-user-bookings/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is to delete a user */
  static async deleteUser(userId: string): Promise<ApiResponse<any>> {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**ROOM */
  /* This adds a new room room to the database */
  static async addRoom(formData: FormData): Promise<ApiResponse<any>> {
    const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  }

  /* This gets all available rooms */
  static async getAllAvailableRooms(): Promise<ApiResponse<any[]>> {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/all-available-rooms`
    );
    return result.data;
  }

  /* This gets all available by dates rooms from the database with a given date and a room type */
  static async getAvailableRoomsByDateAndType(
    checkInDate: string,
    checkOutDate: string,
    roomType: string
  ): Promise<ApiResponse<any[]>> {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result.data;
  }

  /* This gets all room types from the database */
  static async getRoomTypes(): Promise<ApiResponse<string[]>> {
    const response = await axios.get(`${this.BASE_URL}/rooms/types`);
    return response.data;
  }

  /* This gets all rooms from the database */
  static async getAllRooms(): Promise<ApiResponse<any[]>> {
    const result = await axios.get(`${this.BASE_URL}/rooms/all`);
    return result.data;
  }

  /* This function gets a room by the id */
  static async getRoomById(roomId: string): Promise<ApiResponse<any>> {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/room-by-id/${roomId}`
    );
    return result.data;
  }

  /* This deletes a room by the Id */
  static async deleteRoom(roomId: string): Promise<ApiResponse<any>> {
    const result = await axios.delete(
      `${this.BASE_URL}/rooms/delete/${roomId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /* This updates a room */
  static async updateRoom(
    roomId: string,
    formData: FormData | RoomData
  ): Promise<ApiResponse<any>> {
    const headers =
      formData instanceof FormData
        ? { ...this.getHeader(), "Content-Type": "multipart/form-data" }
        : this.getHeader();

    const result = await axios.put(
      `${this.BASE_URL}/rooms/update/${roomId}`,
      formData,
      {
        headers,
      }
    );
    return result.data;
  }

  /**BOOKING */
  /* This saves a new booking to the database */
  static async bookRoom(
    roomId: string,
    userId: string,
    booking: BookingData
  ): Promise<ApiResponse<any>> {
    console.log("USER ID IS: " + userId);

    const response = await axios.post(
      `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
      booking,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This gets all bookings from the database */
  static async getAllBookings(): Promise<ApiResponse<any[]>> {
    const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
      headers: this.getHeader(),
    });
    return result.data;
  }

  /* This get booking by the confirmation code */
  static async getBookingByConfirmationCode(
    bookingCode: string
  ): Promise<ApiResponse<any>> {
    const result = await axios.get(
      `${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`
    );
    return result.data;
  }

  /* This get booking by id */
  static async getBookingById(bookingId: string): Promise<ApiResponse<any>> {
    const result = await axios.get(
      `${this.BASE_URL}/bookings/get-by-id/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /* This updates a booking */
  static async updateBooking(
    bookingId: string,
    bookingData: BookingData
  ): Promise<ApiResponse<any>> {
    const result = await axios.put(
      `${this.BASE_URL}/bookings/update/${bookingId}`,
      bookingData,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /* This is the to cancel user booking */
  static async cancelBooking(bookingId: string): Promise<ApiResponse<any>> {
    const result = await axios.delete(
      `${this.BASE_URL}/bookings/cancel/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /* This deletes a booking */
  static async deleteBooking(bookingId: string): Promise<ApiResponse<any>> {
    const result = await axios.delete(
      `${this.BASE_URL}/bookings/delete/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /* This finds a booking by ID or email */
  static async findBooking(
    bookingId: string,
    email: string
  ): Promise<ApiResponse<any>> {
    const result = await axios.get(
      `${this.BASE_URL}/bookings/find?bookingId=${bookingId}&email=${email}`
    );
    return result.data;
  }

  /**AUTHENTICATION CHECKER */
  static logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin(): boolean {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser(): boolean {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
}
