import WalletDAO from "./dao/WalletDAO";
import UserDAO from "./dao/UserDAO";
import PogsDAO from "./dao/PogsDAO";

import { PrismaClient } from '@prisma/client';

// async function createSampleWallet() {
//   const user = await UserDAO.getUserByEmail('email2@email.com')

//   const pog = await PogsDAO.createPogs({
//     pogs_name: 'pogs_name',
//     ticker_symbol: 'TCKR',
//     price: 100,
//     color: 'blue'
//   })

//   const wallet = await WalletDAO.createWallet({
//     user_id: user!.id,
//     pogs_id: pog.id,
//   })

//   console.log('Wallet created:', wallet);
// }

// createSampleWallet();

// const prisma = new PrismaClient();

// async function getWalletByUserId(user_id: number) {
//   const wallet = await prisma.wallet.findMany({
//     where: {
//       user_id,
//     },
//   });
//   console.log(wallet);
// }

// getWalletByUserId(14);