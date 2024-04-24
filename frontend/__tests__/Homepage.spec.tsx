import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Homepage from '../src/components/Homepage';
import { pogsData } from './__mocks__/pogsdata';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Homepage component', () => {
  it('should render Pogs data correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: pogsData });

    const { getAllByText } = render(
      <Router>
        <Homepage />
      </Router>
    );

    await waitFor(() => {
      const elements = getAllByText('BTC: $50000');
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should handle error when fetching Pogs data', async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: 404 });

    const { getByText } = render(
      <Router>
        <Homepage />
      </Router>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/server-error');
    });
  });
});
