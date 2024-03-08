import { useEffect, useState } from 'react';
import { AppTemplate } from '../app-template';

import './employees.scss';
import { EMPLOYEES_URL } from '../../../utils/data/api';
import { Modal } from '../../../utils/components/modal/modal';
import { authorizedFetch } from '../../../utils/functions/authorized-fetch';
import { Employee } from '../../../interfaces/employee';
import { Form, Formik } from 'formik';
import { FormField } from '../../../utils/components/form/form-field';
import { FormCheckbox } from '../../../utils/components/form/form-checkbox';
import { employeeSchema } from '../../../schemas/employee-schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import MessageBox from '../../../utils/components/form/message-box';

const initialValues = {
  firstName: '',
  lastName: '',
  position: '',
  address: '',
  contactNumber: '',
  email: '',
  bankAccountNumber: '',
  wagePerHour: '',
  workHours: '',
  isActive: true,
};

export function Employees() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [updating, setUpdating] = useState<boolean>(false);

  const [updateEmployeeInitialValues, setUpdateEmployeeInitialValues] =
    useState<Employee>();

  const [fetchStatus, setFetchStatus] = useState({
    ok: null,
    error: '',
  });

  const resetFetchStatus = () => {
    setFetchStatus({
      ok: null,
      error: '',
    });
  };

  const deleteEmployee = async (id: number) => {
    try {
      const res = await authorizedFetch(`${EMPLOYEES_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEmployees(
          employees.filter((employee: Employee) => employee.id !== id)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateEmployee = (id: number) => {
    setUpdating(true);
    const employee = employees.find(employee => employee.id === id);
    if (employee) {
      setUpdateEmployeeInitialValues(employee);
    }
    setShowModal(true);
  };

  const actions = [
    {
      title: 'Add employee',
      icon: 'gg-add-r',
      onClick: () => {
        setShowModal(true);
      },
    },
  ];

  const handleSubmit = async (values: any, actions: any) => {
    try {
      resetFetchStatus();
      const employee: Employee = {
        ...values,
        startDate: new Date().toISOString(),
      };
      const res = await authorizedFetch(
        updating ? `${EMPLOYEES_URL}/${employee.id}` : EMPLOYEES_URL,
        {
          method: updating ? 'PUT' : 'POST',
          body: JSON.stringify(employee),
        }
      );
      setFetchStatus(
        res.ok
          ? { ok: true, error: '' }
          : { ok: false as any, error: 'Unexpected server error' }
      );
    } catch (e) {
      setFetchStatus({ ok: false as any, error: e as string });
    }
    if (!updating) {
      actions.resetForm();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authorizedFetch(EMPLOYEES_URL);
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Position</th>
            <th>Address</th>
            <th>Contact number</th>
            <th>Email</th>
            <th>Bank account number</th>
            <th>Wage per hour</th>
            <th>Work hours</th>
            <th>Start date</th>
            <th>Is active</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
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
              <td>{employee.isActive.toString()}</td>
              <td className='change'>
                <button
                  className='change__button'
                  onClick={() => deleteEmployee(employee.id!)}
                >
                  <div className='gg-trash'></div>
                </button>
                <button
                  className='change__button'
                  onClick={() => updateEmployee(employee.id!)}
                >
                  <div className='gg-file'></div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          show={showModal}
          handleClose={() => {
            setShowModal(!showModal);
            window.location.reload();
          }}
        >
          <Formik
            initialValues={
              updating ? updateEmployeeInitialValues : initialValues
            }
            onSubmit={handleSubmit}
            validationSchema={employeeSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form
                // ensure that there are no unneeded re-renders
                onChange={() => {
                  fetchStatus.error || fetchStatus.ok
                    ? resetFetchStatus()
                    : null;
                }}
                className='form form--product'
              >
                <h3>{updating ? 'Update employee info' : 'Add employee'}</h3>
                <FormField
                  label='First name'
                  name='firstName'
                  type='text'
                  placeholder='Enter first name'
                />
                <FormField
                  label='Last name'
                  name='lastName'
                  type='text'
                  placeholder='Enter last description'
                />
                <FormField
                  label='Position'
                  name='position'
                  type='text'
                  placeholder='Enter position'
                />
                <FormField
                  label='Address'
                  name='address'
                  type='text'
                  placeholder='Enter address'
                />
                <FormField
                  label='Contact nubmer'
                  name='contactNumber'
                  type='text'
                  placeholder='Enter contact number'
                />
                <FormField
                  label='Email'
                  name='email'
                  type='text'
                  placeholder='Enter email'
                />
                <FormField
                  label='Bank account number'
                  name='bankAccountNumber'
                  type='number'
                  placeholder='Enter bank account number'
                />
                <FormField
                  label='Wage per hour'
                  name='wagePerHour'
                  type='number'
                  placeholder='Enter wage per hour'
                />
                <FormField
                  label='Work hours'
                  name='workHours'
                  type='number'
                  placeholder='Enter work hours'
                />
                <FormCheckbox label='Is active' name='isActive' />
                <button
                  type='submit'
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    Object.keys(touched).length === 0
                  }
                  className={
                    isSubmitting
                      ? 'submit-but submit-but--submitting'
                      : 'submit-but'
                  }
                >
                  {isSubmitting && (
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      spin
                      className='submit-but__icon'
                    />
                  )}
                  Submit
                </button>
                {fetchStatus.error && (
                  <MessageBox
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                  />
                )}
                {fetchStatus.ok && (
                  <MessageBox
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                  />
                )}
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </AppTemplate>
  );
}
