import registerCSS from './register.module.scss'
import FormInput from '../../../components/form-input/form-input.component'
import Button from '../../../components/button/button.component'
const Register = (props) =>{
    const handleChange = (e) => {
    }
    const handleRegister = ()=>{
        
    }
    return (
        <div className={registerCSS.register}>
            <h2>Register</h2>
            <form>
                <FormInput name="email" type="email" onChange={handleChange} />
                <FormInput name="password" type="password" onChange={handleChange} />
                <Button onClick={handleRegister} color="primary" value="Register"/>
            </form>
        </div>
    )
}

export default Register