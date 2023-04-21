import { useState } from 'react';
import '.././App.css';
import Button from "react-bootstrap/Button";


const UserEntry = () => {
    const [painLevel, setPainLevel] = useState("");
    const [stressLevel, setStressLevel] = useState("");
    const [sleepLevel, setSleepLevel] = useState("");
    const [foodsConsumed, setFoodsConsumed] = useState("");


    const handlePainLevelChange = (event) => {
        setPainLevel(event.target.value);
    }

    const handleStressLevelChange = (event) => {
        setStressLevel(event.target.value);
    }

    const handleSleepLevelChange = (event) => {
        setSleepLevel(event.target.value);
    }

    const handleFoodsConsumed = (event) => {
        setFoodsConsumed(event.target.value)
    }

    const UserEntrySubmit  = (event) => {
        //check last entry, cant submit twice in one day
        event.preventDefault();
    }

    return( 
        <div className = 'userEntry'>
            <h1>Enter Your Information Below</h1>
            <p>
                {/*Pain Level*/}
                On a scale of 1-10, 10 being the worst, what is your pain level?
                <form>
                    <select value={painLevel} onChange={handlePainLevelChange}>
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
                </form>

                {/*Stress Level*/}
                On a scale of 1-10, 10 being the most, what is your stress level?
                <form>
                    <select value={stressLevel} onChange={handleStressLevelChange}>
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
                </form>

                {/*Sleep Level*/}
                On a scale of 1-10, 10 being the most, how well have you slept?
                <form>
                    <select value={sleepLevel} onChange={handleSleepLevelChange}>
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
                </form>

                {/*Foods */}
                Did you consume any of the following in the past 24 hours *Mark all that apply*
                <form>
                    <select value={foodsConsumed} onChange={handleFoodsConsumed}>
                        <option value="Dairy">Dairy</option>
                        <option value="Red Meat">Red Meat</option>
                        <option value="Sugary Foods">Sugary Foods</option>  
                        <option value="Fried Foods">Fried Foods</option>
                        <option value="Alcohol">Alcohol</option>
                    </select>
                </form>
                

                <Button variant="primary" type="submit" onClick={UserEntrySubmit}>
                Submit
                </Button>
            </p>
        </div>
    );
};

export default UserEntry;