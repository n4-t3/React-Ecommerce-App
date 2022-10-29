import formInputCSS from './form-input.module.scss'

const FormInput = (props) => {
    return (
        <div className={formInputCSS.formInput}>
            <label htmlFor={props.name}>{props.name}:</label>            
            <input type={props.type} id={props.name} onChange={props.onChange}/>
        </div>
    )
}

export default FormInput