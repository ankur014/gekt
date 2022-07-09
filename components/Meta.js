import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'GEKT',
  keywords: 'crypto transaction aggregator, ethereum, arbitrum, optimism, starknet, zksync, aurora',
  description: 'Get every crypto transaction done for your addresses at one place',
};

export default Meta;
