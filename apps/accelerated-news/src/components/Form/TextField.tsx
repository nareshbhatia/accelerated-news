import { ErrorMessage } from './ErrorMessage';
import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import './TextField.css';

export type ReactInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface TextFieldProps extends ReactInputProps {
  /** used to create data-testid property on element for testing */
  testId?: string;

  /** the label content */
  label?: React.ReactNode;

  /** error text */
  error?: string;
}

export function TextFieldInner(
  { className, id, error, label, testId, ...props }: TextFieldProps,
  ref: Ref<HTMLInputElement>
) {
  const styles = clsx(className, 'text-field__input');

  return (
    <>
      {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
      <input
        className={styles}
        data-testid={testId}
        id={id}
        ref={ref}
        {...props}
      />
      <ErrorMessage error={error} />
    </>
  );
}

export const TextField = forwardRef(TextFieldInner);
