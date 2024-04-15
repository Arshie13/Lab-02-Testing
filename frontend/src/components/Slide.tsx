import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Button } from '@mui/material';

interface Pog {
  pogs: {
    id: number;
    pogs_name: string;
    ticker_symbol: string;
    price: number;
    color: string;
  } [];
}

const InfiniteScroll = ({pogs}: Pog) => {

  return (
    <div className="banner-wrapper">
      <div className="wrapper">
        <div className="pogs">
          {pogs.map((pog) => (
            <div className='pog'>
              <Paper style={{backgroundColor: pog.color}}>
                <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
              </Paper>
            </div>
          ))}
        </div>
        <div className="pogs">
          {pogs.map((pog) => (
            <div className='pog'>
              <Paper style={{ backgroundColor: pog.color }}>
                <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
