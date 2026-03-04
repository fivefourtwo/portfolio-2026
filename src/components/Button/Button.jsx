import { ArrowRight, ArrowUp } from '@carbon/icons-react';
import styles from './Button.module.css';

const Button = ({
  variant = 'large',
  children,
  href,
  onClick,
  className = '',
  disabled = false,
  ...rest
}) => {
  const variantClass = styles[variant];
  const disabledClass = disabled && variant === 'large' ? styles.disabled : '';
  const combinedClassName = [styles.button, variantClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const content =
    variant === 'large' ? (
      <>
        <span className={styles.label}>View Project</span>
        <ArrowRight size={20} aria-hidden />
      </>
    ) : variant === 'ghost' ? (
      <>
        <span className={styles.label}>{children}</span>
        <span className={styles.arrowIcon}>
          <ArrowUp size={20} aria-hidden />
        </span>
      </>
    ) : (
      <span className={styles.label}>{children}</span>
    );

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const commonProps = {
    ...rest,
    className: combinedClassName,
    onClick: handleClick,
  };

  if (href) {
    return (
      <a
        href={href}
        {...commonProps}
        aria-disabled={disabled}
        {...(disabled && { tabIndex: -1 })}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} {...commonProps}>
      {content}
    </button>
  );
};

export default Button;
