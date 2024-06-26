'use client'

import { FormEventHandler, useCallback, useContext, useMemo, useState } from "react"
import api, { User } from "../../../../api"
import FormField from "../FormField/FormField"
import Form from "../Form/Form"
import { UserContext } from "../UsersComponent/UsersComponent"
import Button from '@mui/material/Button';

/**
 *  
 * @returns Form to search user by location and event type
 */
const RegisterUserForm = () => {
    const {setAllUsers, allUsers} = useContext(UserContext)
    const [newUserLocation, setNewUserLocation] = useState('')
    const [newUserName, setNewUserName] = useState('')
    const [newUserRates, setNewUserRates] = useState('')
    const [newUserEventType, setNewUserEventType] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const eventTypeArray = useMemo(() => {
        return newUserEventType.split(',')
    }, [newUserEventType])

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
        e.preventDefault()

        const newUser = {
            name: newUserName,
            location: newUserLocation,
            rates: Number(newUserRates),
            eventTypes: eventTypeArray
        }


        try {
            const res = await api.registerUser(newUser)
            setErrorMessage('')
            setAllUsers([...allUsers, res])
        } catch {
            setErrorMessage("Couldn't register new user, try again")
        }

    }, [newUserName, newUserLocation, newUserRates, eventTypeArray, setAllUsers, allUsers])


    return (
        <Form onSubmit={handleSubmit}>
            <h3>Register user</h3>

            <FormField labelText="Name" id="new-user-name" type="text" required value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />

            <FormField labelText="Location" id="new-user-location" type="text" required value={newUserLocation} onChange={(e) => setNewUserLocation(e.target.value)} />

            <FormField labelText="Rates" id="new-user-rates" type="text" required value={newUserRates} onChange={(e) => setNewUserRates(e.target.value)} />

            <FormField labelText="Event Types - comma separated, no spaces" id="new-user-event-types" type="text" required value={newUserEventType} onChange={(e) => setNewUserEventType(e.target.value)} />

            <Button variant="contained">Save</Button>

            {errorMessage ? <p>{errorMessage}</p> : null}
        </Form>
    )
}

export default RegisterUserForm