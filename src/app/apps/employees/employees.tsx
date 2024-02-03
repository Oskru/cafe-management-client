import { useEffect, useState } from 'react';
import { AppTemplate } from '../app-template';

import './employees.scss';
import { EMPLOYEES_URL } from '../../constants/api';
import { Modal } from '../../../utils/components/modal/modal';

const columns = [
  {
    name: 'Id',
  },
  {
    name: 'First Name',
  },
  {
    name: 'Last Name',
  },
  {
    name: 'Position',
  },
  {
    name: 'Address',
  },
  {
    name: 'Contact Number',
  },
  {
    name: 'Email',
  },
  {
    name: 'Bank Account Number',
  },
  {
    name: 'Wage Per Hour',
  },
  {
    name: 'Work Hours',
  },
  {
    name: 'Start Date',
  },
  {
    name: 'Is Active',
  },
];

interface Employee {
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
  roles: [];
}

export function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employee, setEmployee] = useState<Omit<Employee, 'id'>>({
    firstName: '',
    lastName: '',
    position: '',
    address: '',
    contactNumber: '',
    email: '',
    bankAccountNumber: 0,
    wagePerHour: 0,
    workHours: 0,
    startDate: '',
    isActive: false,
    roles: [],
  });

  const actions = [
    {
      title: 'Add employee',
      icon: 'gg-add-r',
      onClick: () => {
        setShowModal(true);
      },
    },
  ];

  function addEmployee() {
    fetch(EMPLOYEES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
  }

  function handleChangeEmployee(event: React.ChangeEvent<any>) {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addEmployee();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(EMPLOYEES_URL);
        setEmployees(await res.json());
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <AppTemplate appName='Employees' className='employees' actions={actions}>
      <h3>All employees</h3>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
              <td>{employee.address}</td>
              <td>{employee.contactNumber}</td>
              <td>{employee.email}</td>
              <td>{employee.bankAccountNumber}</td>
              <td>{employee.wagePerHour}</td>
              <td>{employee.workHours}</td>
              <td>{employee.startDate}</td>
              <td>{employee.isActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
      >
        <form onSubmit={handleFormSubmit} className='employees-form'>
          <input
            type='text'
            placeholder='First name'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Last name'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Position'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Address'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Contact number'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Email'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Bank account number'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Wage per hour'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Work hours'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Start date'
            onChange={handleChangeEmployee}
          />
          <input
            type='checkbox'
            placeholder='Is active'
            onChange={handleChangeEmployee}
          />
          <input
            type='text'
            placeholder='Roles'
            onChange={handleChangeEmployee}
          />
          <button type='submit'>
            <div className='gg-add-r'></div>Add employee
          </button>
        </form>
      </Modal>
    </AppTemplate>
  );
}
