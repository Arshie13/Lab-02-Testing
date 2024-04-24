import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddPogs from '../src/components/AddPogs';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('AddPogs component', () => {
  it('should render Add Pogs form correctly', () => {
    const { getByLabelText, getByRole } = render(
      <Router>
        <AddPogs />
      </Router>
    );

    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Ticker Symbol')).toBeInTheDocument();
    expect(getByLabelText('Color')).toBeInTheDocument();
    expect(getByLabelText('Price')).toBeInTheDocument();
    expect(getByLabelText('Previous Price')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Return to Admin Page' })).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    const { getByLabelText } = render(
      <Router>
        <AddPogs />
      </Router>
    );

    const nameInput = getByLabelText('Name') as HTMLInputElement;
    const tickerSymbolInput = getByLabelText('Ticker Symbol') as HTMLInputElement;
    const colorInput = getByLabelText('Color') as HTMLInputElement;
    const priceInput = getByLabelText('Price') as HTMLInputElement;
    const previousPriceInput = getByLabelText('Previous Price') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Bitcoin' } });
    fireEvent.change(tickerSymbolInput, { target: { value: 'BTC' } });
    fireEvent.change(colorInput, { target: { value: '#ffcc00' } });
    fireEvent.change(priceInput, { target: { value: '50000' } });
    fireEvent.change(previousPriceInput, { target: { value: '48000' } });

    expect(nameInput.value).toBe('Bitcoin');
    expect(tickerSymbolInput.value).toBe('BTC');
    expect(colorInput.value).toBe('#ffcc00');
    expect(priceInput.value).toBe('50000');
    expect(previousPriceInput.value).toBe('48000');
  });


  it('should handle adding Pogs', async () => {
    const { getByRole } = render(
      <Router>
        <AddPogs />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/pogs/api', {
        pogs_name: '',
        ticker_symbol: '',
        color: '',
        price: 0,
        previous_price: 0,
      });
    });
  });

  it('should handle navigation to Admin Page', () => {
    const { getByRole } = render(
      <Router>
        <AddPogs />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Return to Admin Page' }));
  });
});
