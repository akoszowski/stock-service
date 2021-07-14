import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cryptoCurrencies: string[][] = [
  ['btcusd', 'Bitcoin', 'btc', 'usd'],
  ['ethusd', 'Ethereum', 'eth', 'usd'],
  ['ltcusd', 'Litecoin', 'ltc', 'usd'],
  ['adausd', 'Cardano', 'ada', 'usd'],
  ['dotusd', 'Polkadot', 'dot', 'usd'],
  ['bchtusd', 'Bitcoin Cash', 'bcht', 'usd'],
  ['xlmusd', 'Stellar', 'xlm', 'usd'],
  ['linkusd', 'Chainlink', 'link', 'usd'],
  ['usdtusd', 'Tether', 'usdt', 'usd'],
  ['xmrusd', 'Monero', 'xmr', 'usd'],
];

async function main() {
  const addedQuotes = await Promise.all(
    cryptoCurrencies.map(async (currency) => {
      const [ticker, name, baseCur, quoteCur] = currency;

      console.log(currency);
      console.log(ticker, name, baseCur, quoteCur);

      const newInstrument = await prisma.instrument.create({
        data: {
          ticker: ticker,
          baseCurrency: baseCur,
          quoteCurrency: quoteCur,
        },
      });

      return newInstrument;
    }),
  );

  console.log({ addedQuotes });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Database seeded!');
    await prisma.$disconnect();
  });