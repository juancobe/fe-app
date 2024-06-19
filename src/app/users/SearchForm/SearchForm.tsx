'use client'

import { Dispatch, FormEventHandler, SetStateAction, useCallback, useEffect, useState } from "react"

import api, { User } from "../../../../api"
import FormField from "../FormField/FormField"
import Form from "../Form/Form"

/**
 * 
 * @returns Form to search user by location and event type
 */
const SearchForm = ({ setSearchResult }: { setSearchResult: Dispatch<SetStateAction<User[] | undefined>> }) => {
    const [searchLocation, setSearchLocation] = useState('')
    const [searchEventType, setSearchEventType] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
        e.preventDefault()

        if (!searchLocation || !searchEventType) {
            return
        }

        const searchResult = await api.searchUser({ location: searchLocation, eventType: searchEventType })
        setSearchResult(searchResult)
    }, [searchLocation, searchEventType, setSearchResult])

    useEffect(() => {
        if (!searchLocation || !searchEventType) {
            setSearchResult([])
        }
    }, [searchEventType, searchLocation, setSearchResult])

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Search for user</h3>

            <FormField labelText="Location" id="search-location" type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />

            <FormField labelText="Event Type" id="search-event-type" type="text" value={searchEventType} onChange={(e) => setSearchEventType(e.target.value)} />
            
            <button>Search</button>
        </Form>
    )
}

export default SearchForm