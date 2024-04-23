import React, { useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import Navbar from './Navbar';
import './ScrollAnimation.css';
import axios from 'axios';

interface PogsInfo {
  id: number;
  pogs_name: string;
  ticker_symbol: string;
  price: number;
  color: string;
  previous_price: number;
  createdAt: Date;
  updatedAt: Date;
}

const Homepage = () => {
  const [pogsData, setPogsData] = React.useState<PogsInfo[]>([]);
  const [buyPogs, setBuyPogs] = React.useState<PogsInfo[]>([]);
  const user_id = localStorage.getItem('user_id');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/wallet/api-user-pogs-info/${user_id}`);
        if (!Array.isArray(response.data) || !response.data.length) {
          console.error('Error fetching crypto data:', response.data);
        } else {
          setPogsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBuyPogs = async (pogs_id: number) => {
    try {
      console.log('pogs_id:', pogs_id);
      const response = await axios.post('http://localhost:3000/wallet/api-buy-pogs', {
        user_id: user_id,
        pogs_id: pogs_id,
        quantity: 1,
      });
      setBuyPogs(response.data);
      alert('Pogs bought successfully!')
    } catch (error) {
      console.error('Error buying pogs:', error);
    }
  };

  const handleSellPogs = async (pogs_id: number) => {
    try {
      console.log('pogs_id:', pogs_id);
      const response = await axios.post('http://localhost:3000/wallet/api-sell-pogs', {
        user_id: user_id,
        pogs_id: pogs_id,
        quantity: 1,
      });
      setBuyPogs(response.data);
      alert('Pogs sold successfully!')
    } catch (error) {
      console.error('Error selling pogs:', error);
    }
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Typography variant="h4" gutterBottom>
          User's Pogs Owned
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={50}>
          {pogsData.map((pogs, index) => (
            <Grid item xs={12} sm={12} md={12} key={index} >
              <Paper style={{ padding: 20 }}>
                <Button variant="contained" color="primary" onClick={async () => {
                  await handleBuyPogs(pogs.id);
                }} style={{ marginBottom: 10 }}>
                  Buy Pog
                </Button>
                <Button variant="contained" color="primary" onClick={async () => {
                  await handleSellPogs(pogs.id);
                }} style={{ marginBottom: 10 }}>
                  Sell Pog
                </Button>
                <Typography variant="h5" style={{ backgroundColor: pogs.color.toLowerCase() }}>{pogs.pogs_name}</Typography>
                <Typography variant="subtitle1">Symbol: {pogs.ticker_symbol}</Typography>
                <Typography variant="body1">Price: ${pogs.price}</Typography>
                <Typography variant="body1">Previous Price: ${pogs.previous_price}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Homepage;
