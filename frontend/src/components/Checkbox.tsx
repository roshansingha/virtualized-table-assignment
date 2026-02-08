import { memo } from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    ariaLabel: string;
    indeterminate?: boolean;
}

export const Checkbox = memo(function Checkbox({
    checked,
    onChange,
    ariaLabel,
    indeterminate = false,
}: CheckboxProps) {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            aria-label={ariaLabel}
            ref={(el) => {
                if (el) {
                    el.indeterminate = indeterminate;
                }
            }}
            className="checkbox"
        />
    );
});
