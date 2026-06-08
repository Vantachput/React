import React, { useId } from 'react';
import { cn } from '../../../utils/cn';
import classes from './Input.module.css';

export function Input({
  label,
  placeholder,
  disabled = false,
  error,
  className,
  ...rest
}) {
  const id = useId();
  
  return (
    <div className={cn(classes.container, { [classes.disabled]: disabled }, className)}>
      {label && (
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(classes.input, { [classes.error]: error })}
        {...rest}
      />
      {error && <span className={classes.errorMessage}>{error}</span>}
    </div>
  );
}

export default Input;
