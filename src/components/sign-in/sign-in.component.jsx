import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            const { email, password } = this.state
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                email: '',
                password: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className='sign-in'>
                <h1>I have already account</h1>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required />
                    <FormInput
                        name='password'
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required />
                    <div className='buttons'>
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>GOOGLE SIGNIN</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;