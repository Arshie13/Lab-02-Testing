import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AdminPage from '../src/components/AdminPage';
import { pogsData } from './__mocks__/pogsdata';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AdminPage component', () => {
  it('should render Pogs data correctly', async () => {

    mockedAxios.get.mockResolvedValueOnce({ data: pogsData });

    const { getAllByText } = render(
      <Router>
        <AdminPage />
      </Router>
    );

    await waitFor(() => {
      const elements = getAllByText('Symbol: BTC');
      expect(elements.length).toEqual(1);
    });
  });

  it('should handle error when fetching Pogs data', async () => {
    mockedAxios.get.mockRejectedValueOnce({response: 404 });

    render(
      <Router>
        <AdminPage />
      </Router>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/server-error');
    });
  });

  it('should navigate to Add Pogs page when Add Pogs button is clicked', async () => {
    const { getByText } = render(
      <Router>
        <AdminPage />
      </Router>
    );
    const addPogsButton = getByText('Add Pogs');

    fireEvent.click(addPogsButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/add-pogs');
    });
  });
});
