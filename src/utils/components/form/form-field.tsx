import { useField } from 'formik';
import './form-field.scss';

/**
 * This is a component for rendering a form field with a label and error message.
 * Warning: only to be used inside a Formik component form.
 * @param {string} label - The label for the form field.
 * @param {string} props - The props for the form field.
 * @returns The `FormField` component.
 */
export function FormField({
  label,
  name,
  type,
  placeholder,
  className,
  ...props
}: {
  label: string;
  className?: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  const [field, meta] = useField(name);

  return (
    <div className='formfield'>
      <label htmlFor={label} className='label formfield__label'>
        {label}
      </label>
      <input
        {...props}
        {...field}
        id={label}
        className={
          meta.touched && meta.error
            ? 'formfield__input--error formfield__input'
            : 'formfield__input'
        }
      />
      {meta.touched && meta.error ? (
        <div className='formfield__error-message'>{meta.error}</div>
      ) : null}
    </div>
  );
}
