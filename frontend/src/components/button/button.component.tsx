import buttonCSS from "./button.module.scss";

interface Props {
  onClick: () => {};
  color: "primary" | "secondary";
  value: string;
}

const Button = (props: Props) => {
  return (
    <input
      onClick={props.onClick}
      className={
        props.color === "primary"
          ? buttonCSS.primaryBtn
          : buttonCSS.secondaryBtn
      }
      type="button"
      value={props.value}
    />
  );
};

export default Button;
