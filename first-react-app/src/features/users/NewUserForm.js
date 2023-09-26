import { useRef, useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useLoginMutation } from "../auth/authApiSlice"
import { useDispatch } from 'react-redux'
import { setCredentials } from "../auth/authSlice"

const NAME_REGEX = /^[A-z ,.'-]+$/
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const DOB_REGEX = /^([0-9]{2})\/([0-9]{2}\/([0-9]{4}))$/

const NewUserForm = () => {
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)

    const [dob, setDob] = useState('')
    const [validDob, setValidDob] = useState(false)

    const errRef = useRef()
    const [errMsg, setErrMsg] = useState('')

    const [login] = useLoginMutation()

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidDob(DOB_REGEX.test(dob))
    }, [dob])

    useEffect(() => {
        localStorage.setItem("email", JSON.stringify(email));
    }, [email])

    //added in so that when a user creates their account and is logged in, they will have jwt too
    const giveJWT = async () => {
        try{
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        if (isSuccess) {
            giveJWT()
            setEmail('')
            setPassword('')
            setName('')
            setDob('')
            navigate('/dash')
        }
    }, [isSuccess, navigate])

    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onDobChanged = e => setDob(e.target.value)

    const canSave = [validEmail, validPassword, validName, validDob].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ email, password, name, dob })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validNameClass = !validName ? 'form__input--incomplete' : ''
    const validDobClass = !validDob ? 'form__input--incomplete' : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="name">
                    Name: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="dob">
                    Date of Birth: <span className="nowrap">[MM/DD/YYY]</span></label>
                <input
                    className={`form__input ${validDobClass}`}
                    id="dob"
                    name="dob"
                    type="text"
                    value={dob}
                    onChange={onDobChanged}
                />

                <button className="form__submit-button" onSubmit={onSaveUserClicked}>Create New Account</button>
                <footer><Link to="/">Back to Home </Link><Link to="/login"> Login</Link></footer>

            </form>
        </>
    )

    return content
}
export default NewUserForm