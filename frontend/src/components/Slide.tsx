import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Button } from '@mui/material';

interface Pog {
  pogsData: {
    id: number;
    pogs_name: string;
    ticker_symbol: string;
    price: number;
    color: string;
  }[];
}

const InfiniteScroll = ({ pogsData }: Pog) => {

  return (<div style={{ marginTop: 50 }}>
    <div className="banner-wrapper">
      <div className="wrapper">
        <div className="pogs">
          {pogsData.map((pog, index) => (
            
            <div className='pog' key={index}>
              <Paper style={{ backgroundColor: pog.color }}>
                <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
              </Paper>
            </div>
          ))}
        </div>
        <div className="pogs">
          {pogsData.map((pog, index) => (
            <div className='pog' key={index}>
              <Paper style={{ backgroundColor: pog.color }}>
                <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default InfiniteScroll;
