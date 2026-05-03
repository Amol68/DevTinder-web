// DarkInput.jsx
import { useId } from "react";
import { forwardRef } from "react";
import classNames from "../../utils/utils";
import { Label } from "./Label";

export const Input = forwardRef(function Input(props, ref) {
  const id = useId();
  const {
    className,
    labelClassName,
    inputClassName,
    label,
    placeholder,
    type,
    disable,
    value,
    onChange,
    readOnly,
    onkeydown,
  } = props;

  return (
    <div className={` flex flex-col gap-1 w-full ${className}`}>
      <Label htmlFor={id} className={classNames(labelClassName)}>
        {label}
      </Label>

      <input
        // data-testid={dataTestid ? `${dataTestid}-input` : "input-field"}
        id={id}
        type={type}
        placeholder={placeholder}
        className={classNames(
          "w-full min-w-0 truncate border px-3 border-border bg-transparent focus:outline-none focus:ring-0",
          "text-default rounded-lg text-sm font-medium leading-none",
          "placeholder:text-muted bg-muted disabled:cursor-not-allowed disabled:bg-transparent",
          "py-2 rounded-2xl",
          inputClassName,
        )}
        onChange={(e)=>{onChange(e.target.value)}}
        onKeyDown={onkeydown}
        value={value}
        disabled={disable}
        readOnly={readOnly}
        ref={ref}
      />
    </div>
  );
});
