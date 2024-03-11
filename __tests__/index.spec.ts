import supertest from 'supertest'
import { prisma, app } from '../index'

describe('Pogs API', () => {
  
  describe('GET /pogs', () => {
    it("should return all pogs created", async () => {
      await prisma.pogs.create({
        data: {
          pogs_name: 'Predator',
          ticker_symbol: 'PRDTR',
          price: 60000,
          color: 'black'
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
      const id = await prisma.pogs.create({
        data: {
          pogs_name: 'Predator',
          ticker_symbol: 'PRDTR',
          price: 60000,
          color: 'black'
        }
      });
      const res = await supertest(app).get('/pogs/1');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('GET /pogs/:id', () => {
    it('should return a single pog', async () => {
      const newPogs = await prisma.pogs.create({
        data: {
          pogs_name: 'AllanPacete',
          ticker_symbol: 'ALLNPCT',
          price: 999999,
          color: 'Pink'
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
        "pogs_name": "Chopchop",
        "ticker_symbol": "Chpchp",
        "price": 100,
        "color": "Green",
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
          pogs_name: 'Aljason',
          ticker_symbol: 'ALJSN',
          price: 111111,
          color: 'white'
        }
      });

      const content = {
        "pogs_name": "May bukas pa",
        "ticker_symbol": "MBP",
        "price": 1,
        "color": "Brown",
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
          pogs_name: 'Bitcoin',
          ticker_symbol: 'BTC',
          price: 100,
          color: 'blue'
        }
      });

      const res = await supertest(app).delete(`/pogs/${newPogs.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  afterAll(async () => {
    await prisma.$disconnect()
  })
})