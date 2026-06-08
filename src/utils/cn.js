/**
 * Об'єднує класи в один рядок. Аналог бібліотеки clsx / classnames.
 * @param {...any} inputs - Списки класів, об'єкти {клас: boolean} або масиви.
 * @returns {string} - Об'єднаний рядок класів.
 */
export function cn(...inputs) {
  const classes = [];
  
  for (let i = 0; i < inputs.length; i++) {
    const arg = inputs[i];
    if (!arg) continue;
    
    const argType = typeof arg;
    
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = cn(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}
