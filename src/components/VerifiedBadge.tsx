import React from 'react';

interface VerifiedBadgeProps {
  className?: string;
  size?: number;
  title?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  className = "w-4 h-4 text-[#1877F2] shrink-0 inline-block align-middle cursor-pointer",
  size,
  title = "Verified"
}) => {
  return (
    <span className="inline-flex items-center" title={title}>
      <svg
        viewBox="0 0 24 24"
        aria-label={title}
        className={className}
        style={size ? { width: size, height: size } : undefined}
        fill="currentColor"
      >
        <title>{title}</title>
        {/* Official Facebook/Meta 12-point scalloped verified badge */}
        <path d="M12 2c.5 0 1 .2 1.4.6l1.4 1.4c.5.5 1.2.8 1.9.8h2c.8 0 1.5.7 1.5 1.5v2c0 .7.3 1.4.8 1.9l1.4 1.4c.8.8.8 2 0 2.8l-1.4 1.4c-.5.5-.8 1.2-.8 1.9v2c0 .8-.7 1.5-1.5 1.5h-2c-.7 0-1.4.3-1.9.8l-1.4 1.4c-.8.8-2 .8-2.8 0l-1.4-1.4c-.5-.5-1.2-.8-1.9-.8h-2c-.8 0-1.5-.7-1.5-1.5v-2c0-.7-.3-1.4-.8-1.9l-1.4-1.4c-.8-.8-.8-2 0-2.8l1.4-1.4c.5-.5.8-1.2.8-1.9v-2c0-.8.7-1.5 1.5-1.5h2c.7 0 1.4-.3 1.9-.8l1.4-1.4c.4-.4.9-.6 1.4-.6z" />
        {/* Crisp White Checkmark inside */}
        <path
          d="M10.2 15.6l-3.3-3.3 1.4-1.4 1.9 1.9 5.4-5.4 1.4 1.4-6.8 6.8z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );
};
