import * as Yup from 'yup';

export const employeeSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  position: Yup.string().required('Position is required'),
  address: Yup.string().required('Address is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bankAccountNumber: Yup.number().required('Bank Account Number is required'),
  wagePerHour: Yup.number().required('Wage Per Hour is required'),
  workHours: Yup.number().required('Work Hours is required'),
  isActive: Yup.boolean(),
});
