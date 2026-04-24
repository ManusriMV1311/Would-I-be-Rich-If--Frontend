import { Scenario, ScenarioCategory } from '@/types/scenario.types';

export const SCENARIO_CONFIG: {
  categoryId: ScenarioCategory;
  name: string;
  icon: string;
  scenarios: (Omit<Scenario, 'id' | 'run_count' | 'is_active'>)[];
}[] = [
  {
    categoryId: 'crypto',
    name: 'Cryptocurrency',
    icon: 'Bitcoin',
    scenarios: [
      {
        uuid: 'crypto-btc-2015',
        title: 'Invest in Bitcoin (2015)',
        description: 'See the impact of investing early in the world\'s most famous cryptocurrency.',
        category: 'crypto',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'BTC-USD', start_date: '2015-01-01', end_date: 'today' },
      },
      {
        uuid: 'crypto-eth-2016',
        title: 'Ethereum at launch',
        description: 'What if you grabbed ETH when it was basically free?',
        category: 'crypto',
        sim_type: 'lump_sum',
        params: { asset: 'ETH-USD', start_date: '2016-01-01', end_date: 'today' },
      },
      {
        uuid: 'crypto-sol-2020',
        title: 'Solana early days',
        description: 'Investing in the high-speed blockchain before the boom.',
        category: 'crypto',
        sim_type: 'lump_sum',
        params: { asset: 'SOL-USD', start_date: '2020-04-11', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'stocks',
    name: 'US Stocks',
    icon: 'Briefcase',
    scenarios: [
      {
        uuid: 'stocks-aapl-2007',
        title: 'Apple (iPhone Launch)',
        description: 'Investing the day Steve Jobs unveiled the original iPhone.',
        category: 'stocks',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'AAPL', start_date: '2007-01-09', end_date: 'today' },
      },
      {
        uuid: 'stocks-tsla-2010',
        title: 'Tesla IPO',
        description: 'Backing Elon Musk when Tesla went public.',
        category: 'stocks',
        sim_type: 'lump_sum',
        params: { asset: 'TSLA', start_date: '2010-06-29', end_date: 'today' },
      },
      {
        uuid: 'stocks-amzn-1997',
        title: 'Amazon IPO',
        description: 'Buying the "Everything Store" when it only sold books.',
        category: 'stocks',
        sim_type: 'lump_sum',
        params: { asset: 'AMZN', start_date: '1997-05-15', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'indian_stocks',
    name: 'Indian Stocks',
    icon: 'Globe',
    scenarios: [
      {
        uuid: 'india-reliance-2005',
        title: 'Reliance Industries (2005)',
        description: 'Investing in India\'s largest conglomerate.',
        category: 'indian_stocks',
        sim_type: 'lump_sum',
        params: { asset: 'RELIANCE.NS', start_date: '2005-01-01', end_date: 'today' },
      },
      {
        uuid: 'india-tcs-2004',
        title: 'TCS IPO (2004)',
        description: 'Backing India\'s IT boom.',
        category: 'indian_stocks',
        sim_type: 'lump_sum',
        params: { asset: 'TCS.NS', start_date: '2004-08-25', end_date: 'today' },
      },
      {
        uuid: 'india-infy-1999',
        title: 'Infosys (1999)',
        description: 'The golden age of Indian IT services.',
        category: 'indian_stocks',
        sim_type: 'lump_sum',
        params: { asset: 'INFY.NS', start_date: '1999-03-11', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'etfs',
    name: 'Index ETFs',
    icon: 'PieChart',
    scenarios: [
      {
        uuid: 'etf-spy-2009',
        title: 'S&P 500 Bottom (2009)',
        description: 'Buying the market exactly at the 2008-09 financial crisis bottom.',
        category: 'etfs',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2009-03-09', end_date: 'today' },
      },
      {
        uuid: 'etf-qqq-2010',
        title: 'Nasdaq 100 (2010)',
        description: 'A bet on the modern technology sector.',
        category: 'etfs',
        sim_type: 'lump_sum',
        params: { asset: 'QQQ', start_date: '2010-01-01', end_date: 'today' },
      },
      {
        uuid: 'etf-vti-2015',
        title: 'Total Stock Market (2015)',
        description: 'Owning a piece of every public US company.',
        category: 'etfs',
        sim_type: 'lump_sum',
        params: { asset: 'VTI', start_date: '2015-01-01', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'commodities',
    name: 'Commodities',
    icon: 'Database',
    scenarios: [
      {
        uuid: 'comm-gold-2000',
        title: 'Gold at the Millennium',
        description: 'Investing in the ultimate safe haven in the year 2000.',
        category: 'commodities',
        sim_type: 'lump_sum',
        params: { asset: 'GC=F', start_date: '2000-01-01', end_date: 'today' },
      },
      {
        uuid: 'comm-oil-2020',
        title: 'Crude Oil (2020)',
        description: 'Buying oil during the historic pandemic crash.',
        category: 'commodities',
        sim_type: 'lump_sum',
        params: { asset: 'CL=F', start_date: '2020-04-20', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'forex',
    name: 'Forex',
    icon: 'DollarSign',
    scenarios: [
      {
        uuid: 'forex-eurusd-2008',
        title: 'EUR/USD in 2008',
        description: 'Tracking the Euro against the Dollar since the financial crisis.',
        category: 'forex',
        sim_type: 'lump_sum',
        params: { asset: 'EURUSD=X', start_date: '2008-01-01', end_date: 'today' },
      },
      {
        uuid: 'forex-usdinr-2010',
        title: 'USD/INR in 2010',
        description: 'The depreciation of the Indian Rupee over a decade.',
        category: 'forex',
        sim_type: 'lump_sum',
        params: { asset: 'USDINR=X', start_date: '2010-01-01', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'indices',
    name: 'Market Indices',
    icon: 'TrendingUp',
    scenarios: [
      {
        uuid: 'index-gspc-2000',
        title: 'S&P 500 Index (2000)',
        description: 'Direct tracking of the S&P 500 index from the dot-com bubble peak.',
        category: 'indices',
        sim_type: 'lump_sum',
        params: { asset: '^GSPC', start_date: '2000-03-24', end_date: 'today' },
      },
      {
        uuid: 'index-nsei-2008',
        title: 'NIFTY 50 (2008)',
        description: 'India\'s benchmark index after the global financial crisis.',
        category: 'indices',
        sim_type: 'lump_sum',
        params: { asset: '^NSEI', start_date: '2008-01-01', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'ai',
    name: 'AI Boom',
    icon: 'Cpu',
    scenarios: [
      {
        uuid: 'ai-nvda-2015',
        title: 'NVIDIA (Pre-AI boom)',
        description: 'Before LLMs, they were just making graphics cards for gamers.',
        category: 'ai',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'NVDA', start_date: '2015-01-01', end_date: 'today' },
      },
      {
        uuid: 'ai-msft-2019',
        title: 'Microsoft (OpenAI partnership)',
        description: 'When Microsoft first invested $1B into OpenAI.',
        category: 'ai',
        sim_type: 'lump_sum',
        params: { asset: 'MSFT', start_date: '2019-07-22', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'pandemic',
    name: 'Pandemic Era',
    icon: 'Activity',
    scenarios: [
      {
        uuid: 'pan-zm-2020',
        title: 'Zoom (March 2020)',
        description: 'Buying Zoom when the world locked down.',
        category: 'pandemic',
        sim_type: 'lump_sum',
        params: { asset: 'ZM', start_date: '2020-03-01', end_date: 'today' },
      },
      {
        uuid: 'pan-pfe-2020',
        title: 'Pfizer (Vaccine Race)',
        description: 'Betting on the vaccine manufacturer.',
        category: 'pandemic',
        sim_type: 'lump_sum',
        params: { asset: 'PFE', start_date: '2020-11-09', end_date: 'today' },
      }
    ]
  },
  {
    categoryId: 'meme',
    name: 'Meme Assets',
    icon: 'Smile',
    scenarios: [
      {
        uuid: 'meme-gme-2021',
        title: 'GameStop (Before the squeeze)',
        description: 'Getting in on GME before WallStreetBets sent it to the moon.',
        category: 'meme',
        sim_type: 'lump_sum',
        params: { asset: 'GME', start_date: '2020-12-01', end_date: 'today' },
      },
      {
        uuid: 'meme-doge-2020',
        title: 'Dogecoin (2020)',
        description: 'Buying the joke coin before Elon Musk tweeted about it.',
        category: 'meme',
        sim_type: 'lump_sum',
        params: { asset: 'DOGE-USD', start_date: '2020-01-01', end_date: 'today' },
      }
    ]
  }
];

export const getAllDropdownGroups = () => {
  return SCENARIO_CONFIG.map(category => ({
    label: category.name,
    options: category.scenarios.map(s => ({
      value: s.params.asset || '',
      label: s.title
    })).filter(o => o.value !== '')
  }));
};
