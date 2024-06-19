import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import api, { User } from '@/api';
import '@testing-library/jest-dom'
import Home from './page';

jest.mock('../../api', () => ({
    apiFetch: jest.fn()
}));

describe('RegisterUserForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form inputs and button', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({message: 'testAPI - 🙋🙋🙋'});

        const Resolved = await Home();

        render(Resolved);

        await waitFor(async() => {
            expect(await screen.getByText(/API - 🙋🙋🙋/i)).toBeInTheDocument();
        })
    });
})