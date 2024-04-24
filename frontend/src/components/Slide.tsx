import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Button } from '@mui/material';

interface Pog {
  pogsData: {
    id: number;
    pogs_name: string;
    ticker_symbol: string;
    price: number;
    previous_price: number;
    color: string;
  }[];
}

const InfiniteScroll = ({ pogsData }: Pog) => {



  return (<div style={{ marginTop: 50 }}>
    <div className="banner-wrapper">
      <div className="wrapper">
        <div className="pogs">
          {pogsData.map((pog, index) => {
            const currentPrice = pog.price;
            const previousPrice = pog.previous_price;
            const marquee = (currentPrice - previousPrice) / previousPrice * 100;
            let marqueeText: string

            if (marquee > 0) {
              marqueeText = `+${marquee.toFixed(2)}%`;
            } else {
              marqueeText = `-${marquee.toFixed(2)}%`;
            }

            if (previousPrice === 0) {
              marqueeText = '0';
            }

            return (
              <div className='pog' key={index}>
                <Paper style={{ backgroundColor: pog.color }}>
                  <Typography variant="subtitle1">{pog.ticker_symbol}: ${pog.price}</Typography>
                  <Typography variant="subtitle1"> {marqueeText} </Typography>
                </Paper>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
  );
};

export default InfiniteScroll;
