import { Scenario, ScenarioCategory } from '@/types/scenario.types';

export const SCENARIO_CONFIG: {
  categoryId: ScenarioCategory;
  name: string;
  icon: string;
  scenarios: (Omit<Scenario, 'id' | 'run_count' | 'is_active'> & { name: string })[];
}[] = [
  // ── 1. CRYPTO ──────────────────────────────────────────────────────────────
  {
    categoryId: 'crypto',
    name: 'Cryptocurrency',
    icon: 'Bitcoin',
    scenarios: [
      {
        uuid: 'crypto-btc-2015',
        name: 'Bitcoin',
        title: 'What if I bought Bitcoin in 2015?',
        description: 'See what happened if you invested at the very start of the crypto revolution.',
        category: 'crypto',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'BTC-USD', start_date: '2015-01-01', end_date: 'today' },
      },
      {
        uuid: 'crypto-eth-2016',
        name: 'Ethereum',
        title: 'What if I bought Ethereum at launch?',
        description: 'ETH was trading for cents. What if you got in early?',
        category: 'crypto',
        sim_type: 'lump_sum',
        params: { asset: 'ETH-USD', start_date: '2016-08-01', end_date: 'today' },
      },
      {
        uuid: 'crypto-sol-2020',
        name: 'Solana',
        title: 'What if I bought Solana in 2020?',
        description: 'The high-speed blockchain that surprised everyone.',
        category: 'crypto',
        sim_type: 'lump_sum',
        params: { asset: 'SOL-USD', start_date: '2020-09-01', end_date: 'today' },
      },
      {
        uuid: 'crypto-doge-2020',
        name: 'Dogecoin',
        title: 'What if I HODLed Dogecoin from 2020?',
        description: 'The meme coin that Elon made famous. Before he tweeted about it.',
        category: 'crypto',
        sim_type: 'lump_sum',
        params: { asset: 'DOGE-USD', start_date: '2020-01-01', end_date: 'today' },
      },
    ],
  },

  // ── 2. SPENDING HABITS ─────────────────────────────────────────────────────
  {
    categoryId: 'spending',
    name: 'Spending Habits',
    icon: 'Coffee',
    scenarios: [
      {
        uuid: 'spending-coffee-spy',
        name: 'Daily Coffee',
        title: 'What if I invested my daily coffee money?',
        description: 'That $5 latte every day. What if you put it into the S&P 500 instead?',
        category: 'spending',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 150, start_date: '2010-01-01' },
      },
      {
        uuid: 'spending-netflix-spy',
        name: 'Netflix Subscription',
        title: 'What if I invested my Netflix subscription?',
        description: '$15/month of content vs $15/month in the stock market.',
        category: 'spending',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 15, start_date: '2012-01-01' },
      },
      {
        uuid: 'spending-lunch-aapl',
        name: 'Daily Lunch',
        title: 'What if I skipped lunch and bought Apple stock?',
        description: 'Packing lunch instead of buying it. Every. Single. Day.',
        category: 'spending',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'AAPL', monthly_amount: 200, start_date: '2010-01-01' },
      },
      {
        uuid: 'spending-uber-eats-spy',
        name: 'Uber Eats',
        title: 'What if I invested my Uber Eats spending?',
        description: 'Delivery fees add up. So does compound interest.',
        category: 'spending',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 80, start_date: '2018-01-01' },
      },
    ],
  },

  // ── 3. REAL ESTATE ─────────────────────────────────────────────────────────
  {
    categoryId: 'real_estate',
    name: 'Real Estate',
    icon: 'Home',
    scenarios: [
      {
        uuid: 're-austin-2015',
        name: 'Austin Real Estate',
        title: 'What if I bought a house in Austin in 2015?',
        description: 'Austin went from "affordable" to "expensive" in record time.',
        category: 'real_estate',
        sim_type: 'lump_sum',
        params: { asset: 'HOMZ', start_date: '2015-01-01', end_date: 'today' },
      },
      {
        uuid: 're-reit-2009',
        name: 'REIT Crash Bottom',
        title: 'What if I bought REITs at the 2009 crash bottom?',
        description: 'Real estate investment trusts at historic lows.',
        category: 'real_estate',
        sim_type: 'lump_sum',
        params: { asset: 'VNQ', start_date: '2009-03-09', end_date: 'today' },
      },
      {
        uuid: 're-iyr-2010',
        name: 'US Real Estate ETF',
        title: 'What if I invested in US Real Estate ETF in 2010?',
        description: 'The housing market bounced hard after the crash.',
        category: 'real_estate',
        sim_type: 'lump_sum',
        params: { asset: 'IYR', start_date: '2010-01-01', end_date: 'today' },
      },
    ],
  },

  // ── 4. STOCK MARKET ────────────────────────────────────────────────────────
  {
    categoryId: 'stocks',
    name: 'Stock Market',
    icon: 'TrendingUp',
    scenarios: [
      {
        uuid: 'stocks-aapl-2005',
        name: 'Apple',
        title: 'What if I bought Apple stock in 2005?',
        description: 'Before the iPhone, before the App Store, before the trillion-dollar valuation.',
        category: 'stocks',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'AAPL', start_date: '2005-01-03', end_date: 'today' },
      },
      {
        uuid: 'stocks-nvda-2015',
        name: 'NVIDIA',
        title: 'What if I bought NVIDIA before the AI boom?',
        description: 'When they were just a GPU company for gamers.',
        category: 'stocks',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'NVDA', start_date: '2015-01-02', end_date: 'today' },
      },
      {
        uuid: 'stocks-tsla-2010',
        name: 'Tesla',
        title: 'What if I bought Tesla at IPO?',
        description: 'The electric car company everyone said would fail.',
        category: 'stocks',
        sim_type: 'lump_sum',
        params: { asset: 'TSLA', start_date: '2010-06-29', end_date: 'today' },
      },
      {
        uuid: 'stocks-amzn-1997',
        name: 'Amazon',
        title: 'What if I bought Amazon at IPO?',
        description: 'Just a bookstore. On the internet. In 1997.',
        category: 'stocks',
        sim_type: 'lump_sum',
        params: { asset: 'AMZN', start_date: '1997-05-15', end_date: 'today' },
      },
      {
        uuid: 'stocks-spy-2009',
        name: 'S&P 500 Recovery',
        title: 'What if I bought S&P 500 at the 2009 bottom?',
        description: 'The greatest market recovery in modern history.',
        category: 'stocks',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2009-03-09', end_date: 'today' },
      },
      {
        uuid: 'stocks-msft-2010',
        name: 'Microsoft',
        title: 'What if I bought Microsoft in 2010?',
        description: 'Everyone thought they were past their prime. They were not.',
        category: 'stocks',
        sim_type: 'lump_sum',
        params: { asset: 'MSFT', start_date: '2010-01-04', end_date: 'today' },
      },
    ],
  },

  // ── 5. LIFE DECISIONS ──────────────────────────────────────────────────────
  {
    categoryId: 'life',
    name: 'Life Decisions',
    icon: 'Target',
    scenarios: [
      {
        uuid: 'life-tuition-spy',
        name: 'College Tuition',
        title: 'What if I had invested my college tuition?',
        description: '$30,000/year. What if the market taught you instead?',
        category: 'life',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2010-09-01', end_date: 'today' },
      },
      {
        uuid: 'life-wedding-aapl',
        name: 'Wedding Budget',
        title: 'What if I invested my wedding budget?',
        description: 'The average US wedding costs $30,000. In Apple stock.',
        category: 'life',
        sim_type: 'lump_sum',
        params: { asset: 'AAPL', start_date: '2012-06-01', end_date: 'today' },
      },
      {
        uuid: 'life-vacation-vti',
        name: 'Vacation Fund',
        title: 'What if I invested my annual vacation budget?',
        description: '$5,000/year in Cancún vs $5,000/year in a total market ETF.',
        category: 'life',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'VTI', monthly_amount: 417, start_date: '2015-01-01' },
      },
      {
        uuid: 'life-car-payment-spy',
        name: 'Car Payments',
        title: 'What if I invested my car payments instead?',
        description: '$400/month lease vs $400/month in the S&P 500.',
        category: 'life',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 400, start_date: '2014-01-01' },
      },
    ],
  },

  // ── 6. DEBT ────────────────────────────────────────────────────────────────
  {
    categoryId: 'debt',
    name: 'Debt',
    icon: 'CreditCard',
    scenarios: [
      {
        uuid: 'debt-student-loan-spy',
        name: 'Student Loan Interest',
        title: 'What if I invested my student loan interest payments?',
        description: '$300/month that went to the bank instead of the market.',
        category: 'debt',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 300, start_date: '2010-09-01' },
      },
      {
        uuid: 'debt-credit-card-fee-spy',
        name: 'Credit Card Fees',
        title: 'What if I avoided credit card fees and invested them?',
        description: '$50 a month in fees going to the bank. What if it went to the market instead?',
        category: 'debt',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 50, start_date: '2012-01-01' },
      },
      {
        uuid: 'debt-mortgage-spy',
        name: 'Mortgage Down Payment',
        title: 'What if I invested my mortgage down payment?',
        description: '$60,000 earmarked for a house. What if it went to stocks instead?',
        category: 'debt',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2010-01-01', end_date: 'today' },
      },
      {
        uuid: 'debt-car-loan-interest-spy',
        name: 'Car Loan Interest',
        title: 'What if I invested my car loan interest?',
        description: 'Every dollar of interest you paid someone else\'s bank.',
        category: 'debt',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 75, start_date: '2015-01-01' },
      },
    ],
  },

  // ── 7. MACRO EVENTS ────────────────────────────────────────────────────────
  {
    categoryId: 'macro',
    name: 'Macro Events',
    icon: 'Globe',
    scenarios: [
      {
        uuid: 'macro-covid-crash-spy',
        name: 'COVID Crash Day',
        title: 'What if I bought the market on the COVID crash day?',
        description: 'March 23, 2020. The single best buying opportunity of the decade.',
        category: 'macro',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'SPY', start_date: '2020-03-23', end_date: 'today' },
      },
      {
        uuid: 'macro-08-crash-spy',
        name: '2008 Crash Fear',
        title: 'What if I bought stocks at the 2008 crash?',
        description: 'Fear was everywhere. The opportunity was massive.',
        category: 'macro',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2008-11-20', end_date: 'today' },
      },
      {
        uuid: 'macro-dotcom-bust-qqq',
        name: 'Dot-com Bust Recovery',
        title: 'What if I bought tech after the dot-com bust?',
        description: '2002: tech was dead. Or so everyone thought.',
        category: 'macro',
        sim_type: 'lump_sum',
        params: { asset: 'QQQ', start_date: '2002-10-10', end_date: 'today' },
      },
      {
        uuid: 'macro-fed-rate-gold',
        name: 'Gold Safety Flight',
        title: 'What if I bought Gold when the Fed started printing?',
        description: 'QE, ZIRP, and the flight to safety assets.',
        category: 'macro',
        sim_type: 'lump_sum',
        params: { asset: 'GLD', start_date: '2008-09-15', end_date: 'today' },
      },
    ],
  },
];

export const getAllDropdownGroups = () => {
  return SCENARIO_CONFIG.map(category => ({
    label: category.name,
    options: category.scenarios
      .filter(s => s.params.asset || s.params.investment_asset)
      .map(s => ({
        value: (s.params.asset || s.params.investment_asset) || '',
        label: s.name,
      })),
  }));
};

// Flattened list for the scenarios page
export const ALL_SCENARIOS = SCENARIO_CONFIG.flatMap((cat, catIdx) => 
  cat.scenarios.map((s, sIdx) => ({
    ...s,
    id: (catIdx + 1) * 100 + sIdx, // Generate a unique numeric ID
    run_count: Math.floor(Math.random() * 1000) + 500, // Visual fluff
    is_active: true
  })) as Scenario[]
);
