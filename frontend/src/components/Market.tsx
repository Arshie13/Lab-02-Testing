import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

interface PogsInfo {
  id: number; // Add the ID field for each pog
  pogs_name: string;
  ticker_symbol: string;
  price: number;
  color: string;
  previous_price: number;
  createdAt: Date;
  updatedAt: Date;
}

const Market = () => {
  const [pogsData, setPogsData] = useState<PogsInfo[]>([]);
  const [user_id, setUserId] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pogs/api');
        const userResponse = await axios.get('http://localhost:3000/user/api-auth', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        setUserId(userResponse.data.id);
        setPogsData(response.data);
      } catch (error) {
        console.error('Error fetching Pogs data:', error);
      }
    };

    fetchData();
  }, []);

  // To be finished tomorrow
  const handleBuy = async (pogsId: number, quantity: number) => {
    // Implement buy logic here
    try {
      console.log('Buying Pogs with ID:', pogsId, 'Quantity:', quantity, 'User ID:', user_id)
      const response = await axios.post('http://localhost:3000/pogs/api-buy-pogs', {
        pogsId,
        quantity,
        user_id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Pogs bought successfully')
      navigate('/home')
      console.log('response', response);
    } catch (error) {
      console.error('Error buying Pogs:', error);
    }
  };

  const handleSell = (pogsId: number) => {
    // Implement sell logic here
    console.log('Selling Pogs with ID:', pogsId);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h4" gutterBottom>
          Pogs Dashboard
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={50}>
          {pogsData.map((pogs) => (
            <Grid item xs={12} sm={12} md={12} key={pogs.id}>
              <Paper style={{ padding: 20 }}>
                <Button onClick={() => handleBuy(pogs.id, user_id)} style={{ marginRight: 10 }}>
                  Buy
                </Button>
                <Button onClick={() => handleSell(pogs.id)} style={{ marginRight: 10 }}>
                  Sell
                </Button>
                <Typography variant="h5" style={{ backgroundColor: pogs.color.toLowerCase() }}>
                  {pogs.pogs_name}
                </Typography>
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

export default Market;
