import React from 'react';
import { cn } from '../../../utils/cn';
import classes from './Button.module.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...rest
}) {
  return (
    <button
      className={cn(
        classes.btn,
        classes[variant],
        classes[size],
        { [classes.disabled]: disabled },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
