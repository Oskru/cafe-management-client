import { useField } from 'formik';

/**
 * This is a component for rendering a checkbox field with a label and error message.
 * Warning: only to be used inside a Formik component form.
 * @param {string} label - The label for the checkbox field.
 * @param {string} props - The props for the checkbox field.
 * @returns The `FormCheckbox` component.
 */
export function FormCheckbox({
  label,
  name,
  className,
  ...props
}: {
  label: string;
  className?: string;
  name: string;
}) {
  const [field, meta] = useField(name);

  return (
    <div className={'formfield'}>
      <label htmlFor={name} className='label formfield__label'>
        {label}
      </label>
      <input
        {...props}
        {...field}
        type='checkbox'
        id={name}
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
