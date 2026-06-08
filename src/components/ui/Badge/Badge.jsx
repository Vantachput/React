import React from 'react';
import { cn } from '../../../utils/cn';
import classes from './Badge.module.css';

export function Badge({
  children,
  variant = 'primary',
  className,
  ...rest
}) {
  return (
    <span
      className={cn(classes.badge, classes[variant], className)}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
