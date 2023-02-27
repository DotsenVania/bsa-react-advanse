type StateDataUser = {
  id?: string;
  fullName?: string;
  email?: string;
  createdAt?: string;
};
type BookingsData = {
  id: string;
  userId?: string;
  tripId?: string;
  guests?: number;
  date: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
  totalPrice?: number;
  createdAt?: string;
};

export interface IRootState {
  auth: {
    presenceOfToken: boolean;
    loadingAuth: boolean;
    error: boolean;
    userData: StateDataUser;
  };
  trips: {
    loadingData: boolean;
    tripsData: never[];
    tripsDataId: {};
    error: boolean;
  };
  bookings: {
    bookingsData: BookingsData[];
    loadingData: boolean;
    error: boolean;
    messageDelete: string;
  };
}
