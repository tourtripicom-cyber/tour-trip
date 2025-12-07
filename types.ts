export interface Vehicle {
  id: number;
  name: string;
  imageUrl: string;
  capacity: number;
  type: string;
  ratePerKm: number;
}

export interface Destination {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}
