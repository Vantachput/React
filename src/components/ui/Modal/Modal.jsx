import React, { useEffect } from 'react';
import { cn } from '../../../utils/cn';
import classes from './Modal.module.css';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  ...rest
}) {
  // Запобігаємо прокручуванню body, коли модальне вікно відкрите
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={onClose} {...rest}>
      <div
        className={cn(classes.content, className)}
        onClick={(e) => e.stopPropagation()} // Запобігаємо закриттю при кліку всередині вікна
      >
        <div className={classes.header}>
          {title && <h3 className={classes.title}>{title}</h3>}
          <button className={classes.closeBtn} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className={classes.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
