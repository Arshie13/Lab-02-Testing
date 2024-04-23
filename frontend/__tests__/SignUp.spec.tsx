import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import axios from 'axios';
import SignUp from '../src/components/SignUp';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignUp component', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should sign up successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'mockToken',
        userId: 'mockUserId',
      },
    });

    const { getByLabelText, getByRole } = render(
    <Router>
      <SignUp />
    </Router>
  );
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(getByRole("button", { name: /sign up/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(window.location.pathname).toBe('/signin');
  });

  it('should handle sign up error', async () => {
    
    mockedAxios.post.mockRejectedValueOnce({
      response: { status: 500 }
    });

    const { getByLabelText, getByRole } = render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(window.location.pathname).toBe('/server-error');
  });

  it('should alert user if username, email, or password is invalid', async () => {
    const { getByLabelText, getByRole } = render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/email address/i), { target: { value: 'testexample.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(getByRole('button', { name: /sign up/i }));

    expect(window.location.pathname).toBe('/error');
  });
});
