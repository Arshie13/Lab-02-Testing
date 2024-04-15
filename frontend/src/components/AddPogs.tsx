import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const AddPogs = () => {
  const [pogsData, setPogsData] = useState({
    pogs_name: '',
    ticker_symbol: '',
    color: '',
    price: 0,
    previousPrice: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPogsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      const data ={
        pogs_name: pogsData.pogs_name,
        ticker_symbol: pogsData.ticker_symbol,
        color: pogsData.color,
        price: Number(pogsData.price),
        previous_price: pogsData.previousPrice,
      }
      await axios.post('http://localhost:3000/pogs/api', data);
      alert('Pogs added successfully');
      setPogsData({
        pogs_name: '',
        ticker_symbol: '',
        color: '',
        price: 0,
        previousPrice: 0,
      });
    } catch (error) {
      console.error('Error adding Pogs:', error);
    }
  };

  const navigate = useNavigate();

  const handleNavClick = () => {
    navigate('/admin');
  }

  return (
    <div>
      <Typography variant="h6">Add Pogs</Typography>
      <Grid container rowSpacing={1} columnSpacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ padding: 20 }}>
            <TextField
              label="Name"
              variant="outlined"
              name="pogs_name"
              value={pogsData.pogs_name}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Ticker Symbol"
              variant="outlined"
              name="ticker_symbol"
              value={pogsData.ticker_symbol}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Color"
              variant="outlined"
              name="color"
              value={pogsData.color}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              value={pogsData.price}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Previous Price"
              variant="outlined"
              type="number"
              name="previousPrice"
              value={pogsData.previousPrice}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={handleAdd}>
              Add
            </Button>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={handleNavClick}>
              Return to Admin Page
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddPogs;
