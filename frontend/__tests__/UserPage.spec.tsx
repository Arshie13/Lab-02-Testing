import '@testing-library/jest-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserPage from '../src/components/UserPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { pogsData } from './__mocks__/pogsdata';
import React from 'react';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserPage component', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: pogsData
    });
  });

  it('should render Pogs data correctly', async () => {
    const { getByText, getAllByText } = render(
      <Router>
        <UserPage />
      </Router>
    );

    await waitFor(() => {
      const getText = getByText(`User's Pogs Owned`);
      console.log(getText);
      expect(getByText(`User's Pogs Owned`)).toBeInTheDocument();
      expect(getAllByText('Buy Pog').length).toBe(2);
      expect(getAllByText('Sell Pog').length).toBe(2);
      expect(getByText('Bitcoin')).toBeInTheDocument();
      expect(getByText('Litecoin')).toBeInTheDocument();
      expect(getByText('Symbol: BTC')).toBeInTheDocument();
      expect(getByText('Symbol: LTC')).toBeInTheDocument();
      expect(getByText('Price: $50000')).toBeInTheDocument();
      expect(getByText('Price: $5000')).toBeInTheDocument();
      expect(getByText('Previous Price: $48000')).toBeInTheDocument();
      expect(getByText('Previous Price: $4800')).toBeInTheDocument();
    });
  });

  it('should handle buying Pogs', async () => {
    const { container } = render(
      <Router>
        <UserPage />
      </Router>
    );

    await waitFor(() => {
      const buyButton = container.querySelector('.buy-button');
      if (buyButton) {
        fireEvent.click(buyButton);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/wallet/api-buy-pogs', {
          user_id: localStorage.getItem('user_id'),
          pogs_id: 1,
          quantity: 1,
        });
      } else {
        throw new Error('Buy button not found');
      }
    });
  });

  it('should handle selling Pogs', async () => {
    const { container } = render(
      <Router>
        <UserPage />
      </Router>
    );

    await waitFor(() => {
      const sellButton = container.querySelector('.sell-button');
      if (sellButton) {
        fireEvent.click(sellButton);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/wallet/api-sell-pogs', {
          user_id: localStorage.getItem('user_id'),
          pogs_id: 1,
          quantity: 1,
        });
      } else {
        throw new Error('Sell button not found');
      }
    });
    
  });
});
