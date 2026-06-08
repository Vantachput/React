import React from 'react';
import { cn } from '../../../utils/cn';
import classes from './Card.module.css';

export function Card({ children, className, ...rest }) {
  return (
    <div className={cn(classes.card, className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...rest }) {
  return (
    <div className={cn(classes.header, className)} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...rest }) {
  return (
    <div className={cn(classes.body, className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...rest }) {
  return (
    <div className={cn(classes.footer, className)} {...rest}>
      {children}
    </div>
  );
}

export default Card;
