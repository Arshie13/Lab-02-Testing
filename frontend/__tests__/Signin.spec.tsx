import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import axios from 'axios';
import SignIn from '../src/components/SignIn';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignIn component', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'mockToken',
        userId: 'mockUserId',
      },
    });

    const { getByLabelText, getByRole } = render(
    <Router>
      <SignIn />
    </Router>
  );
    fireEvent.change(getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(window.location.pathname).toBe('/home');
  });

  it('should handle sign in error', async () => {
    
    mockedAxios.post.mockRejectedValueOnce({
      response: { status: 404 }
    });

    const { getByLabelText, getByRole } = render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(window.location.pathname).toBe('/not-found');
  });
});
