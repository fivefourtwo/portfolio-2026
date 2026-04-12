import { ArrowRight, ArrowUp } from '@carbon/icons-react';
import styles from './Button.module.css';

const VARIANT_CLASS = {
  large: 'large',
  ghost: 'ghost',
  link: 'link',
  icon: 'icon',
  'ghost-icon': 'ghostIcon',
};

const Button = ({
  variant = 'large',
  children,
  href,
  onClick,
  className = '',
  disabled = false,
  largeLabel = 'View Project',
  icon,
  ...rest
}) => {
  const variantClass = styles[VARIANT_CLASS[variant] || variant];
  const disabledClass = disabled && (variant === 'large' || variant === 'icon') ? styles.disabled : '';
  const combinedClassName = [styles.button, variantClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const content =
    variant === 'large' ? (
      <>
        <span className={styles.label}>{largeLabel}</span>
        {icon ? icon : <ArrowRight size={20} aria-hidden />}
      </>
    ) : variant === 'ghost' ? (
      <>
        <span className={styles.label}>{children}</span>
        <span className={styles.arrowIcon}>
          <ArrowUp size={20} aria-hidden />
        </span>
      </>
    ) : variant === 'icon' || variant === 'ghost-icon' ? (
      icon || children
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
