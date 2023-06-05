import React, { useState } from 'react'
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
} from '@mui/material'

type TdeeCalculatorProps = {}

const TdeeCalculator: React.FC<TdeeCalculatorProps> = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [weight, setWeight] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [age, setAge] = useState<number>(0)
    const [gender, setGender] = useState<'male' | 'female'>('male')
    const [activity, setActivity] = useState<number>(1.2)
    const [tdee, setTdee] = useState<number>(0)

    const handleNext = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setWeight(+event.target.value)
    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setHeight(+event.target.value)
    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setAge(+event.target.value)
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setGender(event.target.value as 'male' | 'female')

    const calculateTdee = () => {
        let bmr

        if (gender === 'male') {
            bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        } else {
            bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
        }
        const newTdee = bmr * activity
        setTdee(newTdee)
    }
    const steps = [
        {
            label: 'Select Gender',
            content: (
                <RadioGroup
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                >
                    <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                    />
                    <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                    />
                </RadioGroup>
            ),
        },
        {
            label: 'Enter Age',
            content: (
                <TextField
                    sx={{ mb: 2 }}
                    label="Age"
                    type="number"
                    required
                    value={age}
                    onChange={handleAgeChange}
                />
            ),
        },
        {
            label: 'Enter Weight',
            content: (
                <TextField
                    sx={{ mb: 2 }}
                    label="Weight (kg)"
                    type="number"
                    required
                    value={weight}
                    onChange={handleWeightChange}
                />
            ),
        },
        {
            label: 'Enter Height',
            content: (
                <TextField
                    sx={{ mb: 2 }}
                    label="Height (cm)"
                    type="number"
                    required
                    value={height}
                    onChange={handleHeightChange}
                />
            ),
        },

        {
            label: 'Select Activity Level',
            content: (
                <Select
                    sx={{ mb: 2 }}
                    label="Activity Level"
                    value={activity}
                    onChange={(event) =>
                        setActivity(Number(event.target.value))
                    }
                >
                    <MenuItem value={1.2}>Sedentary</MenuItem>
                    <MenuItem value={1.375}>Lightly Active</MenuItem>
                    <MenuItem value={1.55}>Moderately Active</MenuItem>
                    <MenuItem value={1.725}>Very Active</MenuItem>
                    <MenuItem value={1.9}>Extra Active</MenuItem>
                </Select>
            ),
        },
        {
            label: 'Your TDEE',
            content: (
                <div>
                    <p>Your TDEE is:</p>
                    <h2>{tdee.toFixed(0)} calories</h2>
                </div>
            ),
        },
    ]

    return (
        <div>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            {step.content}
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={
                                        index === steps.length - 1
                                            ? calculateTdee
                                            : handleNext
                                    }
                                >
                                    {index === steps.length - 1
                                        ? 'Calculate'
                                        : 'Next'}
                                </Button>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default TdeeCalculator
