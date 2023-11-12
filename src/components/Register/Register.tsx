import { Form, Button } from 'react-bootstrap';
import './Register.scss';
import { useFormik } from 'formik';
import { useCallback, useState, useEffect } from 'react';
import { RegisterApiResponse, RegisterPageProps, VerifyApiResponse } from './Register.model';
import { useNavigate } from 'react-router';

const Register = ({ onVerify, onSubmit }: RegisterPageProps) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            if(passwordMatched) {
                const response = await onSubmit?.(values);
                setSubmitResponse(response);
                alert(response.message);
                navigate('/login');
            }
        }
    })

    const [confPass, setConfPass] = useState('');
    const [verifyDisabled, setVerifyDisabled] = useState(false);
    const [warningText, setWarningText] = useState('');
    const [passwordMatched, setPasswordMatch] = useState(false);
    const [verifyResponse, setVerifyResponse] = useState<VerifyApiResponse>();
    const [submitResponse, setSubmitResponse] = useState<RegisterApiResponse>();
    const comparePasswordFields = useCallback(() => {
        if(formik.values.password !== confPass) {
            setWarningText('Passwords do not match!');
            setPasswordMatch(false)
        } else {
            setWarningText('')
            setPasswordMatch(true)
        }
    },[confPass,formik.values.password])

    useEffect(()=> {
        comparePasswordFields();
    }, [comparePasswordFields])

    const handleVerify = async() => {
        const response = await onVerify?.(formik.values.email)
        setVerifyResponse(response);
        alert(response.message)
        setVerifyDisabled(true)
    }

    return (
        <div className='register'>
            <div className='register__header'>REGISTER</div>
            <div className="register__form-wrapper">
                <Form className='register__form-wrapper__form' onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <Form.Control type='text' id="firstName" name="firstName" value={formik.values.firstName} placeholder='First Name' onChange={formik.handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' id="lastName" name="lastName" value={formik.values.lastName} placeholder='Last Name' onChange={formik.handleChange} required />
                    </Form.Group>
                    <Form.Group className='register__form-wrapper__form__email-wrapper'>
                        <Form.Control type='email' id="email" name="email" value={formik.values.email} placeholder='Email' onChange={formik.handleChange} required />
                        <Button variant='dark' onClick={handleVerify} disabled={verifyDisabled}>Verify</Button>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='password' id="password" name="password" value={formik.values.password} placeholder='Password' onChange={formik.handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' id="confirmPassword" name="confirmPassword" value={confPass} onChange={(e) => {
                            setConfPass(e.target.value);
                        }} placeholder='Confirm Password' required />
                        {warningText && <div className='register__form-wrapper__form__password-warning-text'>
                            <i className="bi bi-exclamation-triangle"></i>
                            <p>{warningText}</p>
                        </div>}
                    </Form.Group>
                    <Button variant='success' className='register__form-wrapper__form__button' type='submit'>Register</Button>
                </Form>
            </div>
        </div>
    )
}

export default Register;