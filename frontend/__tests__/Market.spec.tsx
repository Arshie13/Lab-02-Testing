import '@testing-library/jest-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Market from '../src/components/Market';
import { pogsData } from './__mocks__/pogsdata';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Market component', () => {

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: pogsData
    });
  });

  it('should render Pogs market correctly', async () => {
    const { getByText } = render(
      <Router>
        <Market />
      </Router>
    );

    await waitFor(() => {
      pogsData.forEach((pog) => {
        getByText(pog.pogs_name);
        getByText(`Price: $${pog.price}`);
      });
    });
  });

  it('should handle buying Pogs', async () => {
    const { getAllByText } = render(
      <Router>
        <Market />
      </Router>
    );

    await waitFor(() => {
      const buyButton = getAllByText('Buy Pog');

      buyButton.forEach((button) => {
        fireEvent.click(button);
      });

      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/wallet/api-buy-pogs', {
        user_id: localStorage.getItem('user_id'),
        pogs_id: 1,
        quantity: 1,
      });
    });
  });
});
