import signinPageCSS from './signin-page.module.scss'
import Signin from '../signin-component/signin.component'
import Register from '../register-component/register.component'

const SigninPage = (props) => {
    return (
        <div className={signinPageCSS.row}>
            <Signin />
            <Register />
        </div>
    )
}

export default SigninPage
