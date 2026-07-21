import React, { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, suffix, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[13px] font-medium text-muted-foreground tracking-tight">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`w-full bg-background border border-white/[0.08] rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 ${suffix ? 'pr-12' : ''} ${className}`}
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-sm text-muted-foreground">
              {suffix}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-destructive mt-1">{error}</span>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
