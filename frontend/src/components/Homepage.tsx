import React, { useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pogs/api');
        setPogsData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{marginTop: 50}}>
        <div className="banner-wrapper">
          <div className="wrapper">
            <div className="pogs">
              {pogsData.map((pog) => (
                <div className='pog'>
                  <Paper style={{ backgroundColor: pog.color }}>
                    <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
                  </Paper>
                </div>
              ))}
            </div>
            <div className="pogs">
              {pogsData.map((pog) => (
                <div className='pog'>
                  <Paper style={{ backgroundColor: pog.color }}>
                    <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
                  </Paper>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h4" gutterBottom>
          Pogs Dashboard
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={50}>
          {pogsData.map((pogs, index) => (
            <Grid item xs={12} sm={12} md={12} key={index} >
              <Paper style={{ padding: 20 }}>
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
