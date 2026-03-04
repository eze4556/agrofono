export interface UserI {
  id: string;
  nombre: string;
  dni: string;
  active: boolean;
  telefono: number;
  email?: string;
  subscriptionId?: string;
}
