import supertest from 'supertest'
import { prisma, app } from '../index'

describe('Pogs API', () => {
  describe('GET /pogs', () => {
    it("should return all pogs created", async () => {
      await prisma.pogs.create({
        data: {
          pogs_name: 'Slammer',
          ticker_symbol: 'SLAM',
          price: 100,
          color: 'blue'
        }
      });

      const res = await supertest(app).get('/pogs');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Array));
      await prisma.pogs.deleteMany();
    });
  });

  describe('GET /pogs/:id', () => {
    it('should return 404 not found', async () => {
      const res = await supertest(app).get('/pogs/1');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('GET /pogs/:id', () => {
    it('should return a single pog', async () => {
      const newPogs = await prisma.pogs.create({
        data: {
          pogs_name: 'Slammer',
          ticker_symbol: 'SLAM',
          price: 100,
          color: 'blue'
        }
      });
      const res = await supertest(app).get(`/pogs/${newPogs.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      await prisma.pogs.deleteMany();
    });
  });

  describe('POST /pogs', () => {
    it('should create a new pog', async () => {
      const content = {
        "pogs_name": "Ben 10",
        "ticker_symbol": "BN10",
        "price": 10,
        "color": "#16AE58",
      }
      const res = await supertest(app).post('/pogs').send(content);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
      await prisma.pogs.deleteMany();
    });
  });

  describe('PUT /pogs/:id', () => {
    it('should update a pog', async () => {
      const newPogs = await prisma.pogs.create({
        data: {
          pogs_name: 'Slammer',
          ticker_symbol: 'SLAM',
          price: 100,
          color: 'blue'
        }
      });

      const content = {
        "pogs_name": "Ben 10",
        "ticker_symbol": "BN10",
        "price": 10,
        "color": "#16AE58",
      }
      const res = await supertest(app).put(`/pogs/${newPogs.id}`).send(content);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      await prisma.pogs.deleteMany();
    });
  });

  describe('DELETE /pogs/:id', () => {
    it('should delete a pog', async () => {
      const newPogs = await prisma.pogs.create({
        data: {
          pogs_name: 'Slammer',
          ticker_symbol: 'SLAM',
          price: 100,
          color: 'blue'
        }
      });

      const res = await supertest(app).delete(`/pogs/${newPogs.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
    });
  });
})