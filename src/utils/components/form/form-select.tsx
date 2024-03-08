import { useField } from 'formik';
import './form-select.scss';

/**
 * This is a component for rendering a select input field with label and options.
 * Warning: only to be used inside a Formik component form.
 * @param {string} label - The label for the select input field.
 * @param {array} options - An array of objects with `value` and `label` properties.
 * @param {string} props - The props for the select input field.
 * @returns The `FormField` component.
 */
export function FormSelect({
  label,
  name,
  options,
  ...props
}: {
  label: string;
  options: any[];
  name: string;
}) {
  const [field, meta] = useField(name);

  return (
    <div className='formselect'>
      <label htmlFor={label} className='label formselect__label'>
        {label}
      </label>
      <select
        {...props}
        {...field}
        id={label}
        className={
          meta.touched && meta.error
            ? 'formselect__select formselect__select--error'
            : 'formselect__select'
        }
      >
        {options.map(option => (
          <option
            key={option.label}
            value={option.value}
            className='formselect__option'
          >
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className='formselect__error-message'>{meta.error}</div>
      ) : null}
    </div>
  );
}
