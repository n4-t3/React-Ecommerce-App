import signinCSS from './signin.module.scss'
// import { signInWithGoogle } from "../../../firebase/firebase.utils";
import FormInput from '../../../components/form-input/form-input.component';
import Button from '../../../components/button/button.component';
const Signin = (props) => {
    const handleChange = (e) => {
    }
    const handleSignIn = ()=>{
        
    }
    return (
        <div className={signinCSS.signin}>
            <h2>Sign In</h2>
            <form>
                <FormInput name="email" type="email" onChange={handleChange} />
                <FormInput name="password" type="password" onChange={handleChange} />
                <Button onClick={handleSignIn} color="primary" value="Sign In"/>
            </form>
        </div>
    )
}

export default Signin