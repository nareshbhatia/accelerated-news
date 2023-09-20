import { ErrorMessage } from './ErrorMessage';
import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import './TextAreaField.css';

export type ReactTextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaFieldProps extends ReactTextAreaProps {
  /** used to create data-testid property on element for testing */
  testId?: string;

  /** the label content */
  label?: React.ReactNode;

  /** error text */
  error?: string;
}

export function TextAreaFieldInner(
  { className, id, error, label, testId, ...props }: TextAreaFieldProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const styles = clsx(className, 'textarea-field__input');

  return (
    <>
      {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
      <textarea
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

export const TextAreaField = forwardRef(TextAreaFieldInner);
