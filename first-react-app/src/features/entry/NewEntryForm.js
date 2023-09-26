import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewEntryMutation } from "./entryApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const MEDICATION_REGEX = /^[A-z ,.'-]{4,12}$/

const date = new Date()
const todaysDate = new Intl.DateTimeFormat('en-US').format(date)

const NewEntryForm = ({ users }) => {
    const [addNewEntry, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewEntryMutation()
    
    const navigate = useNavigate()

    const [painLevel, setPainLevel] = useState('')
    const [sleepLevel, setSleepLevel] = useState('')
    const [stressLevel, setStressLevel] = useState('')
    const [medication, setMedication] = useState('')
    const [validMedication, setValidMedication] = useState(false)
    const [exercise, setExercise] = useState(false)
    const [allMeds, setMeds] = useState([])
    const foodNames = ["Alcohol", "High Sugars", "Fried Foods", "Red Meat", "Dairy"]

    const [allFoods, setAllFoods] = useState(
        new Array(5).fill(false)
    );

    const handleFoodCheck = (position) => {
        const updatedFoods = allFoods.map((item, index) => 
            index === position ? !item:item 
        );
        setAllFoods(updatedFoods);
    }

    const addMedication = (e) => {
        e.preventDefault()
        setMeds([...allMeds, medication])
        setMedication('')
    }

    useEffect(() => {
        setValidMedication(MEDICATION_REGEX.test(medication))
    }, [medication])

    useEffect(() => {
        if (isSuccess) {
            setPainLevel('')
            setSleepLevel('')
            setStressLevel('')
            setMedication('')
            setMeds([])
            setExercise(false)
            navigate('/dash')
        }
    }, [isSuccess, navigate])

    const onPainChanged = e => setPainLevel(e.target.value)
    const onSleepChanged = e => setSleepLevel(e.target.value)
    const onStressChanged = e => setStressLevel(e.target.value)
    const onMedicationChanged = e => setMedication(e.target.value)

    const onExerciseChanged = () => {setExercise(!exercise)};

    const userEmail = JSON.parse(localStorage.getItem("email"))

    const canSave = [userEmail, todaysDate, painLevel, sleepLevel, stressLevel, allMeds, exercise, allFoods] && !isLoading

    const onSaveEntryClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewEntry({userEmail, todaysDate, painLevel, sleepLevel, stressLevel, allMeds, exercise, allFoods})
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validMedicationClass = !validMedication ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form">
                <div className="form__title-row">
                    <h2>New Entry</h2>
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

                <div className="input-section">
                    <label className="form__label" htmlFor="painLevel">
                        Pain Level:</label>
                    <select value={painLevel} onChange={onPainChanged}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>  
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="input-section">
                    <label className="form__label" htmlFor="sleepLevel">
                        Sleep Level:</label>
                    <select value={sleepLevel} onChange={onSleepChanged}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>  
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="input-section">
                    <label className="form__label" htmlFor="stressLevel">
                        Stress Level:</label>
                    <select value={stressLevel} onChange={onStressChanged}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>  
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="input-section">
                    <label className="form__label" htmlFor="medication">
                        Medications: {allMeds}</label>
                    <input
                        className={`form__input ${validMedicationClass}`}
                        id="medication"
                        name="medication"
                        type="text"
                        autoComplete="off"
                        value={medication}
                        onChange={onMedicationChanged}
                    />
                    <button onClick={addMedication}> Add Medication </button>
                </div>


                <div className="input-section">
                    <label className="form__label" htmlFor="exercise">
                        Exercise: </label>   
                    <input value={exercise} type="checkbox" checked={exercise} onChange={onExerciseChanged}></input>
                </div>

                <ul className="foods-list">
                    {foodNames.map((name, index) => {
                        return (
                            <li key={index}>
                                <div className="food-item">
                                    <div className="left-side">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={allFoods[index]}
                                            onChange={() => handleFoodCheck(index)}
                                        />
                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                    </div>
                                </div>
                            </li> 
                        )
                    })}
                </ul>

                <button onClick= {onSaveEntryClicked} className="form__submit-button">Submit Entry</button>
            </form>
        </>
    )
    return content
}

export default NewEntryForm