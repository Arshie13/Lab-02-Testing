import axios from 'axios';

const url = 'http://localhost:3000';

describe('Pogs API', () => {

  // GET endpoints
  describe('GET /pogs', () => {
    it('should return all pogs', async () => {
      const response = await axios.get(`${url}/pogs`);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(expect.any(Array));
    });
  });

  describe('GET /pogs/:id', () => {
    it('should return 404 not found', async () => {

      try {
        await axios.get(`${url}/pogs/99`)
      } catch (error: any) {
        if (error.response) {
          expect(error.response.status).toEqual(404);
          expect(error.response.data).toEqual('Not Found.');
        }
      }
    });
  });

  describe('GET /pogs/:id', () => {
    it('should return a single pog', async () => {
      const response = await axios.get(`${url}/pogs/2`);
      expect(response.status).toEqual(200);
      expect(response.data).toHaveProperty('pogs_name');
      expect(response.data).toHaveProperty('ticker_symbol');
      expect(response.data).toHaveProperty('price');
      expect(response.data).toHaveProperty('color');
    });
  });

  describe('POST /pogs', () => {
    it('should create a new pog', async () => {
      const content = {
        "pogs_name": "Ben 10",
        "ticker_symbol": "BN10",
        "price": 10,
        "color": "#16AE58",
        "updatedAt": Date.now()
      }
      const response = await axios.post(`${url}/pogs`, content);
      expect(response.status).toEqual(201);
      expect(response.data).toEqual(expect.any(Object));
    });
  });

  describe('PUT /pogs/:id', () => {
    it('should update a pog', async () => {
      const response = await axios.put(`${url}/pogs/1`, {
        pogs_name: 'Slammer',
        ticker_symbol: 'SLAM',
        price: 100,
        color: 'blue',
        updatedAt: Date.now()
      });
      expect(response.status).toEqual(200);
    });
  });

  describe('DELETE /pogs/:id', () => {
    it('should delete a pog', async () => {
      const response = await axios.delete(`${url}/pogs/1`);
      expect(response.status).toEqual(200);
    });
  });
})