import buttonCSS from './button.module.scss'

const Button = (props) => {
    return (
        <input onClick={props.onClick} className={props.color === "primary" ? buttonCSS.primaryBtn : buttonCSS.secondaryBtn} type="button" value={props.value} />
    )
}

export default Button