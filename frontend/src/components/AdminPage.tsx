import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import Navbar from './Navbar';
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

const AdminPage = () => {
  const [pogsData, setPogsData] = useState<PogsInfo[]>([]);
  const [editingPogs, setEditingPogs] = useState<PogsInfo | null>(null);
  const [newPogsInfo, setNewPogsInfo] = useState<PogsInfo | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pogs/api');
      setPogsData(response.data);
    } catch (error) {
      console.error('Error fetching pogs data:', error);
    }
  };

  const handleEditClick = (pogs: PogsInfo) => {
    setEditingPogs(pogs);
    setNewPogsInfo({ ...pogs });
  };

  const handleFieldChange = (field: keyof PogsInfo, value: string | number) => {
    if (newPogsInfo) {
      setNewPogsInfo({ ...newPogsInfo, [field]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      if (!newPogsInfo) return;
      await axios.put(`http://localhost:3000/pogs/api/${newPogsInfo.id}`, newPogsInfo);
      fetchData();
      setEditingPogs(null);
    } catch (error) {
      console.error('Error updating pogs data:', error);
      alert('Error updating pogs data. Please try again later.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/pogs/api/${id}`);
      fetchData();
      alert('Pogs deleted successfully');
    } catch (error) {
      console.error('Error deleting pogs data:', error);
      alert('Error deleting pogs data. Please try again later.');
    }
  };

  const handlePriceUpdate = async () => {
    try {
      await axios.patch('http://localhost:3000/pogs/api/update-prices');
      fetchData();
      alert('Pogs prices updated successfully');
    } catch (error) {
      console.error('Error updating pogs price:', error);
      alert('Error updating pogs price. Please try again later.');
    }
  };

  const navigate = useNavigate();

  const handleAddPogs = async () => {
    navigate('/add-pogs');
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h4" gutterBottom>
          Pogs Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddPogs} style={{ marginBottom: 10 }}>
          Add Pogs
        </Button>
        <Button variant='contained' color='primary' onClick={handlePriceUpdate} style={{ marginLeft: 10 }}>
          Update Prices
        </Button>
        <Grid container rowSpacing={1} columnSpacing={50}>
          {pogsData.map((pogs, index) => (
            <Grid item xs={12} sm={12} md={12} key={index}>
              <Paper style={{ padding: 20 }}>
                {editingPogs && editingPogs.id === pogs.id ? (
                  <>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={newPogsInfo?.pogs_name}
                      onChange={(e) => handleFieldChange('pogs_name', e.target.value)}
                      style={{ marginBottom: 10 }}
                    />
                    <TextField
                      label="Ticker Symbol"
                      variant="outlined"
                      value={newPogsInfo?.ticker_symbol}
                      onChange={(e) => handleFieldChange('ticker_symbol', e.target.value)}
                      style={{ marginBottom: 10 }}
                    />
                    <TextField
                      label="Color"
                      variant="outlined"
                      type='text'
                      value={newPogsInfo?.color}
                      onChange={(e) => handleFieldChange('color', e.target.value)}
                      style={{ marginBottom: 10 }}
                    />
                    <TextField
                      label="Price"
                      variant="outlined"
                      type="number"
                      value={newPogsInfo?.price}
                      onChange={(e) => handleFieldChange('price', parseFloat(e.target.value))}
                      style={{ marginBottom: 10 }}
                    />
                    <TextField
                      label="Previous Price"
                      variant="outlined"
                      type="number"
                      value={newPogsInfo?.previous_price}
                      onChange={(e) => handleFieldChange('previous_price', parseFloat(e.target.value))}
                      style={{ marginBottom: 10 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: 10 }}>
                      Update
                    </Button>
                    <Button variant="contained" onClick={() => setEditingPogs(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outlined" color="primary" onClick={() => handleEditClick(pogs)} style={{ marginBottom: 10 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(pogs.id)} style={{ marginBottom: 10, marginLeft: 10 }}>
                      Delete
                    </Button>
                    <Typography variant="h5" style={{ backgroundColor: pogs.color.toLowerCase() }}>{pogs.pogs_name}</Typography>
                    <Typography variant="subtitle1">Symbol: {pogs.ticker_symbol}</Typography>
                    <Typography variant="body1">Color: {pogs.color}</Typography>
                    <Typography variant="body1">Price: ${pogs.price}</Typography>
                    <Typography variant="body1">Previous Price: ${pogs.previous_price}</Typography>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default AdminPage;
