export interface IDataTravel {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  image: string;
  createdAt: string;
}

export interface ITripsPropsData {
  dataTravel: IDataTravel[];
}

export interface ITripPropsData {
  cardItem: IDataTravel;
}

export type BookingData = {
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

export interface ITripIdPropsData {
  bookingDataFilter: BookingData[];
}

export interface ITripIdProps {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  image: string;
  createdAt: string;
}

export interface IPropsFilter {
  updateTrim: (trim: string, duration: string, level: string) => void;
}

export interface IOrderModalProps {
  setModalActive: (bool: boolean) => void;
  active: boolean;
  dataTripsId: IDataTravel;
}

export interface IBookingsProps {
  bookingDataFilter: BookingData[];
}

export interface IBookingProps {
  card: BookingData;
}

export interface IUserData {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}
