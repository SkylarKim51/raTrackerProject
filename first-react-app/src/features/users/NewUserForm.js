import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
//import { ROLES } from "../../config/roles"

const NAME_REGEX = /^[a-z ,.'-]+$/
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const DOB_REGEX = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/


const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)

    const [dob, setDob] = useState('')
    const [validDob, setValidDob] = useState(false)

    
    //const [roles, setRoles] = useState(["Employee"])

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
        if (isSuccess) {
            setEmail('')
            setPassword('')
            setName('')
            setDob('')
            //setRoles([])
            //navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onDobChanged = e => setDob(e.target.value)

    // const onRolesChanged = e => {
    //     const values = Array.from(
    //         e.target.selectedOptions, //HTMLCollection 
    //         (option) => option.value
    //     )
    //     //setRoles(values)
    // }

    //const canSave = [roles.length, validEmail, validPassword, validName, validDob].every(Boolean) && !isLoading

    const canSave = [validEmail, validPassword, validName, validDob].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ email, password, name, dob })
        }
    }

    // const options = Object.values(ROLES).map(role => {
    //     return (
    //         <option
    //             key={role}
    //             value={role}

    //         > {role}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validNameClass = !validName ? 'form__input--incomplete' : ''
    const validDobClass = !validDob ? 'form__input--incomplete' : ''
    //const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


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
                    Username: <span className="nowrap">[3-20 letters]</span></label>
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
                    Password: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="dob">
                    Password: <span className="nowrap">[mm/dd/yyyy]</span></label>
                <input
                    className={`form__input ${validDobClass}`}
                    id="dob"
                    name="dob"
                    type="text"
                    value={dob}
                    onChange={onDobChanged}
                />

                {/* <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select> */}

            </form>
        </>
    )

    return content
}
export default NewUserForm