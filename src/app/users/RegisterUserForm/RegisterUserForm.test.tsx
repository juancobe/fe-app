import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterUserForm from './RegisterUserForm';
import { UserContext } from '../UsersComponent/UsersComponent';
import api, { User } from '@/api';
import '@testing-library/jest-dom'

jest.mock('../../../../api', () => ({
    registerUser: jest.fn(),
}));

const mockSetAllUsers = jest.fn();
const mockAllUsers: User[] = [];
const mockSetSearchResult = jest.fn()

const mockContextValue = {
    setAllUsers: mockSetAllUsers,
    allUsers: mockAllUsers,
    setSearchResult: mockSetSearchResult,
};

const renderWithContext = (component: React.ReactElement) => {
    return render(
        <UserContext.Provider value={mockContextValue}>{component}</UserContext.Provider>
    )
}

describe('RegisterUserForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form inputs and button', () => {
        renderWithContext(<RegisterUserForm />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/rates/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/event types/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
        expect(screen.getByText(/register user/i)).toBeInTheDocument();
    });

    it('submits the form and updates display users', async () => {
        const newUser = {
            name: 'John Doe',
            location: 'NYC',
            rates: 300,
            eventTypes: ['Wedding', 'Corporate'],
        };

        (api.registerUser as jest.Mock).mockResolvedValueOnce(newUser);

        renderWithContext(<RegisterUserForm />);

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: newUser.name } });
        fireEvent.change(screen.getByLabelText(/location/i), { target: { value: newUser.location } });
        fireEvent.change(screen.getByLabelText(/rates/i), { target: { value: newUser.rates.toString() } });
        fireEvent.change(screen.getByLabelText(/event types/i), { target: { value: newUser.eventTypes.join(',') } });

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: /save/i }));
        })

        await waitFor(() => {
            expect(api.registerUser).toHaveBeenCalledWith(newUser);

            expect(mockSetAllUsers).toHaveBeenCalledWith([...mockAllUsers, newUser]);
        })
    });

    it('handles form submission errors', async () => {
        (api.registerUser as jest.Mock).mockRejectedValueOnce(new Error);

        renderWithContext(<RegisterUserForm />);

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'NYC' } });
        fireEvent.change(screen.getByLabelText(/rates/i), { target: { value: '300' } });
        fireEvent.change(screen.getByLabelText(/event types/i), { target: { value: 'Wedding,Corporate' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /save/i }));
        });

        expect(api.registerUser).toHaveBeenCalled();
        expect(screen.getByText("Couldn't register new user, try again")).toBeInTheDocument();
    });
});
