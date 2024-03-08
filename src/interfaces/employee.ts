export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  address: string;
  contactNumber: string;
  email: string;
  bankAccountNumber: number;
  wagePerHour: number;
  workHours: number;
  startDate: string;
  isActive: boolean;
  roles?: [];
}
