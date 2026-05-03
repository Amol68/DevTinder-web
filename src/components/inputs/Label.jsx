import classNames from "../../utils/utils";

export function Label(props) {
  const { className, ...restProps } = props;
  return (
    <label
      className={classNames(
        "text-muted-foreground text-muted-foreground  mb-2 block text-xs font-bold tracking-wide leading-none",
        className,
      )}
      {...restProps}
    >
      {props.children}
    </label>
  );
}
