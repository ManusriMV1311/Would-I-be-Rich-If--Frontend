import { Scenario, ScenarioCategory } from '@/types/scenario.types';

export const SCENARIO_CONFIG: {
  categoryId: ScenarioCategory;
  name: string;
  icon: string;
  scenarios: (Omit<Scenario, 'id' | 'run_count' | 'is_active'>)[];
}[] = [
  // ── 1. CRYPTO (Global & India) ──────────────────────────────────────────────
  {
    categoryId: 'crypto',
    name: 'Cryptocurrency',
    icon: 'Bitcoin',
    scenarios: [
      {
        uuid: 'crypto-btc-2015',
        name: 'Bitcoin (2015)',
        title: 'What if I bought Bitcoin in 2015?',
        description: 'See what happened if you simulated the path at the very start of the crypto revolution.',
        category: 'crypto',
        region: 'global',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'BTC-USD', start_date: '2015-01-01', end_date: 'today' },
        context: {
          story: "In 2015, Bitcoin was a niche digital experiment discussed on obscure forums.",
          hook: "You could have been an early pioneer in the greatest wealth transfer of the century."
        },
        tags: ["High Risk", "Legendary", "Moon"]
      },
      {
        uuid: 'crypto-btc-inr-2017',
        name: 'Bitcoin (India 2017)',
        title: 'What if I bought Bitcoin in INR in 2017?',
        description: 'Buying the dip during the first major Indian crypto wave.',
        category: 'crypto',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'BTC-INR', start_date: '2017-01-01', end_date: 'today' },
        context: {
          story: "Demonetization had just hit, and Indians were looking for digital alternatives.",
          hook: "A ₹1 Lakh investment then would have changed your life today."
        },
        tags: ["Digital Gold", "India Boom"]
      },
      {
        uuid: 'crypto-eth-2016',
        name: 'Ethereum Launch',
        title: 'What if I bought Ethereum at launch?',
        description: 'ETH was trading for cents. What if you got in early?',
        category: 'crypto',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'ETH-USD', start_date: '2016-08-01', end_date: 'today' },
        context: {
          story: "Vitalik Buterin's vision was just taking flight as the 'world computer'.",
          hook: "Imagine owning a piece of the base layer of the future internet."
        },
        tags: ["Smart Contracts", "Early Adopter"]
      },
      {
        uuid: 'crypto-wrx-2020',
        name: 'WazirX (India)',
        title: 'What if I bought WazirX (WRX) at launch?',
        description: 'The token that powered India\'s largest crypto exchange.',
        category: 'crypto',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'WRX-INR', start_date: '2020-02-01', end_date: 'today' },
        context: {
          story: "WazirX was the gateway for millions of Indians into the crypto world.",
          hook: "The WRX token saw massive volatility and peak heights in 2021."
        },
        tags: ["Exchange Token", "Indian Crypto"]
      },
      {
        uuid: 'crypto-sol-2020',
        name: 'Solana Summer',
        title: 'What if I bought Solana in 2020?',
        description: 'The high-speed blockchain that surprised everyone.',
        category: 'crypto',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'SOL-USD', start_date: '2020-09-01', end_date: 'today' },
        context: {
          story: "Solana promised 'Visa-level' speed and ultra-low transaction costs.",
          hook: "The 'Solana Summer' created thousands of millionaires overnight."
        },
        tags: ["Speed", "Ecosystem"]
      },
      {
        uuid: 'crypto-doge-2020',
        name: 'Dogecoin Meme',
        title: 'What if I HODLed Dogecoin from 2020?',
        description: 'The meme coin that Elon made famous.',
        category: 'crypto',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'DOGE-USD', start_date: '2020-01-01', end_date: 'today' },
        context: {
          story: "It started as a joke. Then the internet's richest man started tweeting.",
          hook: "The ultimate 'meme to millions' story of the decade."
        },
        tags: ["Meme", "Social Viral"]
      },
      {
        uuid: 'crypto-eth-inr-2018',
        name: 'Ethereum (India)',
        title: 'What if I bought Ethereum in INR in 2018?',
        description: 'Buying the world computer in Indian Rupees.',
        category: 'crypto',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'ETH-INR', start_date: '2018-01-01', end_date: 'today' },
        context: {
          story: "The crypto winter of 2018 was cold, but the believers stayed.",
          hook: "Patience in 2018 turned into a fortune in 2021."
        },
        tags: ["Ecosystem", "India Crypto"]
      },
      {
        uuid: 'crypto-sol-inr-2021',
        name: 'Solana (India)',
        title: 'What if I bought Solana in INR during the 2021 run?',
        description: 'Catching the high-speed wave from India.',
        category: 'crypto',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'SOL-INR', start_date: '2021-01-01', end_date: 'today' },
        context: {
          story: "2021 was the year Solana went from $2 to $250.",
          hook: "A masterclass in catching the right trend at the right time."
        },
        tags: ["DeFi", "High Growth"]
      }
    ],
  },

  // ── 2. SPENDING HABITS (Global & India) ─────────────────────────────────────
  {
    categoryId: 'spending',
    name: 'Spending Habits',
    icon: 'Coffee',
    scenarios: [
      {
        uuid: 'spending-chai-india',
        name: 'Daily Cutting Chai',
        title: 'What if I put my daily cutting chai money into the market?',
        description: '₹15-20 a day. Sounds small, but compound interest is a beast.',
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'NIFTYBEES.NS', monthly_amount: 600, start_date: '2010-01-01' },
        context: {
          story: "That evening chai break is a ritual. But what if the money grew instead?",
          hook: "You've been drinking your future wealth, one sip at a time."
        },
        tags: ["Micro-Allocating", "Desi Habit"]
      },
      {
        uuid: 'spending-swiggy-india',
        name: 'Weekend Swiggy/Zomato',
        title: 'What if I skipped a Swiggy order every week?',
        description: 'Allocating ₹500 every weekend into the Indian stock market.',
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'RELIANCE.NS', monthly_amount: 2000, start_date: '2018-01-01' },
        context: {
          story: "Convenience is expensive. Those delivery fees and surges add up.",
          hook: "Your late-night cravings might be costing you a luxury vacation."
        },
        tags: ["Lifestyle", "Modern India"]
      },
      {
        uuid: 'spending-coffee-spy',
        name: 'Daily Latte',
        title: 'What if I put my daily coffee money into the market?',
        description: '$5 a day into the S&P 500.',
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 150, start_date: '2010-01-01' },
        context: {
          story: "The 'Latte Factor' is the oldest personal finance advice in the book.",
          hook: "Is that caffeine hit really worth a down payment on a house?"
        },
        tags: ["Classic Advice", "Compound Interest"]
      },
      {
        uuid: 'spending-netflix-spy',
        name: 'Netflix vs Stocks',
        title: 'What if I put my Netflix subscription into the market?',
        description: '$15/month in the stock market.',
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 15, start_date: '2012-01-01' },
        context: {
          story: "Streaming content for hours, or streaming wealth for years?",
          hook: "You've been watching the wealth of others instead of building your own."
        },
        tags: ["Small Steps", "Subscription"]
      },
      {
        uuid: 'spending-uber-eats-spy',
        name: 'Delivery Fees',
        title: 'What if I put my Uber Eats spending into the market?',
        description: 'Delivery fees add up. So does compound interest.',
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 80, start_date: '2018-01-01' },
        context: {
          story: "The cost of convenience is the most invisible drain on your wealth.",
          hook: "Shocking: how much you've paid just to avoid walking to the kitchen."
        },
        tags: ["Invisible Waste", "Modern Life"]
      },
      {
        uuid: 'spending-recharge-india',
        name: 'Mobile Data Recharge',
        title: 'What if I put my monthly mobile recharge into the market?',
        description: 'Allocating ₹250/month since the 4G revolution began.',
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'INFY.NS', monthly_amount: 250, start_date: '2016-01-01' },
        context: {
          story: "Jio changed the game. Data became cheaper, but what if you put the difference into the market?",
          hook: "The data you consumed for memes could have built a serious portfolio."
        },
        tags: ["Digital India", "Small Capital"]
      },
      {
        uuid: 'spending-fuel-india',
        name: 'Petrol Price Hikes',
        title: 'What if I put the fuel price hike amount?',
        description: 'Allocating the extra ₹1000/month spent on rising fuel costs.',
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'BPCL.NS', monthly_amount: 1000, start_date: '2019-01-01' },
        context: {
          story: "Fuel prices hit ₹100/liter. It hurt the pocket, but could it have filled the portfolio?",
          hook: "Transforming inflation pain into investment gain."
        },
        tags: ["Inflation", "Daily Life"]
      }
    ],
  },

  // ── 3. REAL ESTATE (Global & India) ─────────────────────────────────────────
  {
    categoryId: 'real_estate',
    name: 'Real Estate',
    icon: 'Home',
    scenarios: [
      {
        uuid: 're-mumbai-2010',
        name: 'Mumbai Flat (Worli)',
        title: 'What if I bought a flat in Worli in 2010?',
        description: 'Mumbai real estate is legendary. Let\'s look at the numbers.',
        category: 'real_estate',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'RELIANCE.NS', start_date: '2010-01-01', end_date: 'today', appreciation_pct: 12 },
        context: {
          story: "Owning a home in South Bombay is the ultimate status symbol.",
          hook: "Even if you didn't buy the flat, allocating that capital would have been insane."
        },
        tags: ["Premium", "Landlord"]
      },
      {
        uuid: 're-blr-2012',
        name: 'Bengaluru IT Hub (Sarjapur)',
        title: 'What if I bought land in Sarjapur in 2012?',
        description: 'The growth of Bengaluru\'s tech corridor reflected in real estate.',
        category: 'real_estate',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'TATAMOTORS.NS', start_date: '2012-01-01', end_date: 'today', appreciation_pct: 15 },
        context: {
          story: "Sarjapur was just a quiet suburb before the IT boom turned it into a goldmine.",
          hook: "The dirt you ignored then is now worth its weight in silver."
        },
        tags: ["Tech Boom", "High Growth"]
      },
      {
        uuid: 're-austin-2015',
        name: 'Austin Housing',
        title: 'What if I bought a house in Austin in 2015?',
        description: 'Austin went from "affordable" to "expensive" in record time.',
        category: 'real_estate',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'HOMZ', start_date: '2015-01-01', end_date: 'today' },
        context: {
          story: "The great migration to Texas changed the landscape of the US housing market.",
          hook: "You missed the 'Keep Austin Weird' era, but you could have caught the 'Keep Austin Rich' era."
        },
        tags: ["US Market", "Migration"]
      },
      {
        uuid: 're-reit-2009',
        name: 'REIT Bottom (2009)',
        title: 'What if I bought REITs at the 2009 crash bottom?',
        description: 'Real estate investment trusts at historic lows.',
        category: 'real_estate',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'VNQ', start_date: '2009-03-09', end_date: 'today' },
        context: {
          story: "When the housing bubble burst, everyone ran. The bold ones stayed.",
          hook: "Buying the world's most tangible asset when it was 'paper thin'."
        },
        tags: ["Contrarian", "Dividend"]
      }
    ],
  },

  // ── 4. STOCK MARKET (Global & India) ────────────────────────────────────────
  {
    categoryId: 'stocks',
    name: 'Stock Market',
    icon: 'TrendingUp',
    scenarios: [
      {
        uuid: 'stocks-reliance-2002',
        name: 'Reliance Industries',
        title: 'What if I bought Reliance in 2002?',
        description: 'The backbone of the Indian economy.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'RELIANCE.NS', start_date: '2002-01-01', end_date: 'today' },
        context: {
          story: "The Dhirubhai Ambani era was just passing the baton to the next generation.",
          hook: "Owning a piece of the company that owns half of India."
        },
        tags: ["Blue Chip", "Empire"]
      },
      {
        uuid: 'stocks-tcs-ipo',
        name: 'TCS IPO (2004)',
        title: 'What if I put money into the TCS IPO?',
        description: 'India\'s IT giant from the very beginning.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'TCS.NS', start_date: '2004-08-25', end_date: 'today' },
        context: {
          story: "TCS was the first Indian software company to hit the billion-dollar mark.",
          hook: "The software revolution started here. Were you on the train?"
        },
        tags: ["IPO", "IT Giant"]
      },
      {
        uuid: 'stocks-zomato-2022',
        name: 'Zomato Dip',
        title: 'What if I bought Zomato during the 2022 dip?',
        description: 'The startup that redefined Indian delivery.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'ZOMATO.NS', start_date: '2022-07-25', end_date: 'today' },
        context: {
          story: "Critics called it overvalued. The stock price crashed. Then the comeback began.",
          hook: "A classic story of 'buying when there is blood in the streets'."
        },
        tags: ["Startup", "Comeback"]
      },
      {
        uuid: 'stocks-itc-2015',
        name: 'ITC (The Dividend King)',
        title: 'What if I bought ITC for the dividends?',
        description: 'Steady, reliable, and always in the news.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'ITC.NS', start_date: '2015-01-01', end_date: 'today' },
        context: {
          story: "Cigarettes, Biscuits, and Hotels. The diversified giant of India.",
          hook: "The stock that everyone memes about, but everyone secretly wants to own."
        },
        tags: ["Dividends", "Value"]
      },
      {
        uuid: 'stocks-aapl-2005',
        name: 'Apple (US)',
        title: 'What if I bought Apple stock in 2005?',
        description: 'Before the iPhone, before the App Store.',
        category: 'stocks',
        region: 'global',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'AAPL', start_date: '2005-01-03', end_date: 'today' },
        context: {
          story: "The iPod was a hit, but the real revolution hadn't even started yet.",
          hook: "You could have owned the company that defined the modern era."
        },
        tags: ["Tech King", "Innovation"]
      },
      {
        uuid: 'stocks-nvda-2015',
        name: 'NVIDIA (AI Boom)',
        title: 'What if I bought NVIDIA before the AI boom?',
        description: 'When they were just a GPU company for gamers.',
        category: 'stocks',
        region: 'global',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: 'NVDA', start_date: '2015-01-02', end_date: 'today' },
        context: {
          story: "The world thought they were for gamers. Jensen knew they were for the future.",
          hook: "The pick-and-shovel play of the AI gold rush."
        },
        tags: ["AI", "Hyper Growth"]
      },
      {
        uuid: 'stocks-nifty-2010',
        name: 'Nifty 50 Index',
        title: 'What if I just put money into the Nifty 50?',
        description: 'The top 50 companies in India.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: '^NSEI', start_date: '2010-01-01', end_date: 'today' },
        context: {
          story: "The index fund: the boring way to get rich. But does it work?",
          hook: "Betting on the entire Indian economy. Spoiler: it pays off."
        },
        tags: ["Safety", "Index Fund"]
      },
      {
        uuid: 'stocks-hdfc-2005',
        name: 'HDFC Bank',
        title: 'What if I bought HDFC Bank in 2005?',
        description: 'The private banking giant of India.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'HDFCBANK.NS', start_date: '2005-01-01', end_date: 'today' },
        context: {
          story: "From a single branch to the most valuable bank in India.",
          hook: "The power of consistent, year-on-year compound growth."
        },
        tags: ["Finance", "Consistent"]
      },
      {
        uuid: 'stocks-tata-motors-2020',
        name: 'Tata Motors (EV)',
        title: 'What if I bought Tata Motors during the 2020 crash?',
        description: 'Catching the EV revolution early.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'TATAMOTORS.NS', start_date: '2020-03-23', end_date: 'today' },
        context: {
          story: "In 2020, people doubted the future of cars. Then EVs happened.",
          hook: "Riding the electric wave with India's most trusted brand."
        },
        tags: ["Automobile", "EV Boom"]
      },
      {
        uuid: 'stocks-asian-paints',
        name: 'Asian Paints',
        title: 'What if I bought Asian Paints for the long term?',
        description: 'The compounding machine of the Indian market.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'ASIANPAINT.NS', start_date: '2005-01-01', end_date: 'today' },
        context: {
          story: "They don't just sell paint; they sell a data-driven supply chain empire.",
          hook: "The stock that never seems to go down, only up and up."
        },
        tags: ["Consumption", "Legendary"]
      },
      {
        uuid: 'stocks-irctc-ipo',
        name: 'IRCTC IPO',
        title: 'What if I put money into the IRCTC IPO?',
        description: 'The monopoly of Indian Railways ticketing.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'IRCTC.NS', start_date: '2019-10-14', end_date: 'today' },
        context: {
          story: "The IPO that every Indian household wanted to get an allocation for.",
          hook: "Owning the platform that every Indian traveler uses."
        },
        tags: ["Monopoly", "Public Sector"]
      },
      {
        uuid: 'stocks-infosys-2000',
        name: 'Infosys (Dot-com)',
        title: 'What if I bought Infosys during the dot-com bust?',
        description: 'India\'s software icon during its toughest time.',
        category: 'stocks',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'INFY.NS', start_date: '2000-01-01', end_date: 'today' },
        context: {
          story: "Murthy and his team were building the future of outsourcing.",
          hook: "The foundation of India's middle-class wealth was built on IT stocks."
        },
        tags: ["IT Icon", "Long Term"]
      },
      {
        uuid: 'stocks-tsla-2010',
        name: 'Tesla (US)',
        title: 'What if I bought Tesla at IPO?',
        description: 'The electric car company everyone said would fail.',
        category: 'stocks',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'TSLA', start_date: '2010-06-29', end_date: 'today' },
        context: {
          story: "Elon Musk was betting the house on electric cars. The world laughed.",
          hook: "Buying Tesla then was a bet on the future of energy."
        },
        tags: ["EV", "Disruptor"]
      },
      {
        uuid: 'stocks-amzn-1997',
        name: 'Amazon (US)',
        title: 'What if I bought Amazon at IPO?',
        description: 'Just a bookstore. On the internet. In 1997.',
        category: 'stocks',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'AMZN', start_date: '1997-05-15', end_date: 'today' },
        context: {
          story: "Bezos was working out of a garage with a spray-painted sign.",
          hook: "The everything store started as a nothing store."
        },
        tags: ["E-commerce", "Giant"]
      }
    ],
  },

  // ── 5. GOVERNMENT SCHEMES (India Only) ──────────────────────────────────────
  {
    categoryId: 'govt_schemes',
    name: 'Govt Schemes',
    icon: 'Shield',
    scenarios: [
      {
        uuid: 'govt-ppf-2010',
        name: 'PPF (Tax Free)',
        title: 'What if I maxed out my PPF since 2010?',
        description: 'Allocating ₹1.5 Lakh every year into the Public Provident Fund.',
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: '^NSEI', monthly_amount: 12500, start_date: '2010-01-01' },
        context: {
          story: "The holy grail of Indian tax-saving investments. Safe, secure, and EEE.",
          hook: "Your parents were right about this one. Let's see how right."
        },
        tags: ["Safe", "Tax Saving", "Retirement"]
      },
      {
        uuid: 'govt-nps-2015',
        name: 'NPS (Retirement)',
        title: 'What if I put money into NPS?',
        description: 'The National Pension System with equity exposure.',
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'NIFTYBEES.NS', monthly_amount: 4166, start_date: '2015-01-01' },
        context: {
          story: "The modern Indian retirement plan with a mix of equity and debt.",
          hook: "Planning for the 'silver years' while you're still in the 'golden years'."
        },
        tags: ["Pension", "Long Term"]
      },
      {
        uuid: 'govt-ssy-2015',
        name: 'Sukanya Samriddhi',
        title: 'What if I started SSY for my daughter?',
        description: 'The highest interest rate govt scheme for the girl child.',
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: '^NSEI', monthly_amount: 12500, start_date: '2015-01-22' },
        context: {
          story: "Beti Bachao Beti Padhao. A scheme designed for a daughter's future.",
          hook: "The gift of financial independence for the next generation."
        },
        tags: ["Social Impact", "High Interest"]
      }
    ],
  },

  // ── 6. DEBT (India & Global) ───────────────────────────────────────────────
  {
    categoryId: 'debt',
    name: 'Debt',
    icon: 'CreditCard',
    scenarios: [
      {
        uuid: 'debt-edu-loan-india',
        name: 'Education Loan (India)',
        title: 'What if I put my education loan EMI into the market?',
        description: 'Repaying a ₹10 Lakh loan vs allocating that amount.',
        category: 'debt',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'HDFCBANK.NS', monthly_amount: 15000, start_date: '2012-01-01' },
        context: {
          story: "The burden of the 'first debt'. It feels like starting life with a weight on your back.",
          hook: "What if you were the one collecting the interest instead of paying it?"
        },
        tags: ["Debt Trap", "Student Life"]
      },
      {
        uuid: 'debt-credit-card-india',
        name: 'Credit Card Minimums',
        title: 'What if I put my credit card interest into the market?',
        description: 'Paying only the minimum due is the most expensive mistake.',
        category: 'debt',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: '^NSEI', monthly_amount: 2000, start_date: '2015-01-01' },
        context: {
          story: "36% interest per year. The banks love you. Your wallet hates you.",
          hook: "You're funding the bank's profit margin with your future."
        },
        tags: ["High Interest", "Money Drain"]
      },
      {
        uuid: 'debt-student-loan-spy',
        name: 'Student Loan (US)',
        title: 'What if I put my student loan interest into the market?',
        description: '$300/month that went to the bank instead of the market.',
        category: 'debt',
        region: 'global',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'SPY', monthly_amount: 300, start_date: '2010-09-01' },
        context: {
          story: "A generation defined by debt. What if you chose equity instead?",
          hook: "The degree cost you twice: the tuition and the lost opportunity."
        },
        tags: ["US Debt", "Opportunity Cost"]
      }
    ],
  },

  // ── 7. CULTURAL & LIFE (India & Global) ─────────────────────────────────────
  {
    categoryId: 'cultural',
    name: 'Cultural & Life',
    icon: 'Heart',
    scenarios: [
      {
        uuid: 'cultural-gold-diwali',
        name: 'Diwali Gold',
        title: 'What if I bought Gold every Diwali?',
        description: 'Buying 10g of Gold on Dhanteras every single year.',
        category: 'cultural',
        region: 'india',
        sim_type: 'recurring_dca',
        params: { investment_asset: 'GOLDBEES.NS', monthly_amount: 5000, start_date: '2005-01-01' },
        context: {
          story: "Dhanteras: the day India buys its weight in gold for prosperity.",
          hook: "Prosperity isn't just a blessing; it's a CAGR of 10% in yellow metal."
        },
        tags: ["Tradition", "Safety"]
      },
      {
        uuid: 'cultural-wedding-jewelry',
        name: 'Wedding Jewelry',
        title: 'What if I put money into Gold Jewelry early?',
        description: 'Buying gold jewelry vs gold ETFs.',
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'GOLDBEES.NS', start_date: '2010-01-01', end_date: 'today' },
        context: {
          story: "Jewelry has making charges. Gold ETFs don't. Let's see the gap.",
          hook: "Your locker is full of gold, but is your portfolio?"
        },
        tags: ["Cultural", "Gold"]
      },
      {
        uuid: 'cultural-wedding-india',
        name: 'Big Fat Indian Wedding',
        title: 'What if I put my wedding budget in Nifty into the market?',
        description: 'The average Indian wedding cost ₹15 Lakhs. What if you put it into the market?',
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: '^NSEI', start_date: '2012-01-01', end_date: 'today' },
        context: {
          story: "3 days of celebrations, 500 guests, and a mountain of expenses.",
          hook: "The memories are priceless, but the portfolio would have been legendary."
        },
        tags: ["Luxury", "Reality Check"]
      },
      {
        uuid: 'career-first-salary',
        name: 'First Salary',
        title: 'What if I put my entire first salary into the market?',
        description: 'Allocating that first paycheck in 2015 into the market.',
        category: 'career',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'TCS.NS', start_date: '2015-06-01', end_date: 'today' },
        context: {
          story: "The excitement of the first paycheck is unmatched. You probably spent it on a phone.",
          hook: "If you'd gifted your future self that money, you'd be thanking yourself today."
        },
        tags: ["Millennial", "Career"]
      },
      {
        uuid: 'life-tuition-spy',
        name: 'College Tuition',
        title: 'What if I had put my college tuition?',
        description: '$30,000/year. What if the market taught you instead?',
        category: 'life',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2010-09-01', end_date: 'today' },
        context: {
          story: "The student loan debt crisis is real. What if you were on the other side?",
          hook: "A degree in 'Market Economics' from the school of hard knocks."
        },
        tags: ["Education", "Opportunity Cost"]
      }
    ],
  },

  // ── 7. MACRO EVENTS (India & Global) ────────────────────────────────────────
  {
    categoryId: 'macro',
    name: 'Macro Events',
    icon: 'Globe',
    scenarios: [
      {
        uuid: 'macro-demonetization-2016',
        name: 'Demonetization Gold',
        title: 'What if I bought Gold on Demonetization night?',
        description: 'Nov 8, 2016. The night the currency changed forever.',
        category: 'macro',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: 'GOLDBEES.NS', start_date: '2016-11-08', end_date: 'today' },
        context: {
          story: "The PM addressed the nation at 8 PM. By midnight, cash was just paper.",
          hook: "In the chaos of 2016, those who fled to hard assets won big."
        },
        tags: ["DeMo", "Panic Buy"]
      },
      {
        uuid: 'macro-covid-crash-india',
        name: 'COVID Crash (Nifty)',
        title: 'What if I bought Nifty on the 2020 crash day?',
        description: 'March 23, 2020. The single biggest buying opportunity of our generation.',
        category: 'macro',
        region: 'india',
        sim_type: 'lump_sum',
        trending: true,
        params: { asset: '^NSEI', start_date: '2020-03-23', end_date: 'today' },
        context: {
          story: "The world stopped. Markets plummeted. It felt like the end.",
          hook: "Fortune favors the brave who buy when the world is in lockdown."
        },
        tags: ["Lockdown", "Opportunity"]
      },
      {
        uuid: 'macro-08-crash-spy',
        name: '2008 Financial Crisis',
        title: 'What if I bought stocks during the 2008 crash?',
        description: 'The Great Recession was a generational wealth opportunity.',
        category: 'macro',
        region: 'global',
        sim_type: 'lump_sum',
        params: { asset: 'SPY', start_date: '2008-11-20', end_date: 'today' },
        context: {
          story: "Lehman collapsed, and the global financial system was on the brink.",
          hook: "Generational wealth is built during generational crises."
        },
        tags: ["Global Crisis", "Classic Recovery"]
      },
      {
        uuid: 'macro-gst-2017',
        name: 'GST Rollout',
        title: 'What if I put money in during the GST rollout?',
        description: 'July 1, 2017. One nation, one tax.',
        category: 'macro',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: '^NSEI', start_date: '2017-07-01', end_date: 'today' },
        context: {
          story: "The biggest tax reform in India's history. It changed how business is done.",
          hook: "Consolidation of the economy led to massive market gains."
        },
        tags: ["Reform", "Structural Change"]
      },
      {
        uuid: 'macro-2021-bull-run',
        name: '2021 Bull Run',
        title: 'What if I caught the 2021 Bull Run?',
        description: 'The post-covid rally that broke all records.',
        category: 'macro',
        region: 'india',
        sim_type: 'lump_sum',
        params: { asset: '^NSEI', start_date: '2021-01-01', end_date: 'today' },
        context: {
          story: "Demat accounts exploded as everyone wanted a piece of the action.",
          hook: "The year the retail investor finally took charge of the market."
        },
        tags: ["Bull Run", "Retail Power"]
      }
    ],
  },
  {
    categoryId: 'spending',
    name: 'Daily Spends & Habits',
    icon: 'Coffee',
    scenarios: [
      {
        uuid: 'gen-spending-0-2dc706',
        name: 'Daily Swiggy/Zomato',
        title: "What if I put my daily Swiggy/Zomato spending?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 9000, "investment_asset": "ZOMATO.NS", "start_date": "2021-07-23"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-1-7c2cf3',
        name: 'Weekend Pub Hopping',
        title: "What if I put my weekend pub hopping budget?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 12000, "investment_asset": "UNITEDSPR.NS", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-2-22dc8c',
        name: 'Daily Premium Coffee',
        title: "What if my daily premium coffee went into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 6000, "investment_asset": "SBUX", "start_date": "2016-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-3-006f83',
        name: 'Streaming Subscriptions',
        title: "What if I put my Netflix and Spotify subscription fees?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 1000, "investment_asset": "NFLX", "start_date": "2016-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-4-237b22',
        name: 'Cigarette Spending',
        title: "What if I put the money I spend on cigarettes?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 6000, "investment_asset": "ITC.NS", "start_date": "2010-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-5-57d7f5',
        name: 'Annual iPhone Upgrade',
        title: "What if I put the cost of buying the latest iPhone every year?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'global',
        sim_type: 'lump_sum',
        params: {"initial_amount": 100000, "investment_asset": "AAPL", "start_date": "2018-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-6-1b19b9',
        name: 'Fast Fashion Budget',
        title: "What if my fast-fashion Myntra/Zara budget was put into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 5000, "investment_asset": "TRENT.NS", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-7-94dfbe',
        name: 'Salon & Grooming',
        title: "What if I put my monthly salon and grooming budget?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 3000, "investment_asset": "HINDUNILVR.NS", "start_date": "2012-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-8-1c1a63',
        name: 'Gym Supplements',
        title: "What if my expensive gym supplement stack went into stocks?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 8000, "investment_asset": "SUNPHARMA.NS", "start_date": "2018-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-9-6c5999',
        name: 'Uber/Ola vs Metro',
        title: "What if I took the metro and put my Uber/Ola budget?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 10000, "investment_asset": "TATAMOTORS.NS", "start_date": "2016-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-10-79de6a',
        name: 'Weekend Movies',
        title: "What if I put my weekend movie and popcorn budget?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 2500, "investment_asset": "PVRINOX.NS", "start_date": "2014-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-11-047117',
        name: 'Gaming Microtransactions',
        title: "What if my online gaming microtransactions were put into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 2000, "investment_asset": "MSFT", "start_date": "2017-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-12-184d88',
        name: 'Impulse Amazon Purchases',
        title: "What if my impulse Amazon purchases went to Amazon stock?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'global',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 7500, "investment_asset": "AMZN", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-13-3400a0',
        name: 'Chai & Sutta ritual',
        title: "What if I put my daily cutting chai and sutta money?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 1500, "investment_asset": "NIFTYBEES.NS", "start_date": "2010-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-spending-14-0f905c',
        name: 'Weekend Mall Hopping',
        title: "What if my weekend mall-hopping budget went into retail stocks?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'spending',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 6000, "investment_asset": "DMART.NS", "start_date": "2017-03-21"},
        tags: ['New', 'Trending']
      },
    ]
  },
  {
    categoryId: 'govt_schemes',
    name: 'Government Schemes',
    icon: 'Landmark',
    scenarios: [
      {
        uuid: 'gen-govt_schemes-0-0da1ee',
        name: 'PPF vs Index Funds',
        title: "What if my PPF yearly contribution went into index funds?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 12500, "investment_asset": "^NSEI", "start_date": "2010-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-1-827a48',
        name: 'Sukanya Samriddhi Yojana',
        title: "What if Sukanya Samriddhi Yojana equivalent was put in IT stocks?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 5000, "investment_asset": "TCS.NS", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-2-e7847d',
        name: 'Voluntary EPF',
        title: "What if my EPF voluntary contribution went to direct equity?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 10000, "investment_asset": "RELIANCE.NS", "start_date": "2012-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-3-1297b9',
        name: 'PM Kisan yearly payouts',
        title: "What if my PM Kisan yearly payouts were put into the market agriculture stocks?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 500, "investment_asset": "PIIND.NS", "start_date": "2018-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-4-2484c0',
        name: 'NPS Tier 1',
        title: "What if my NPS Tier 1 monthly contribution was purely in Nifty?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 5000, "investment_asset": "NIFTYBEES.NS", "start_date": "2014-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-5-aa0e5f',
        name: 'SGB vs Physical Gold',
        title: "What if I bought Sovereign Gold Bonds instead of physical gold?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 250000, "investment_asset": "GOLDBEES.NS", "start_date": "2015-11-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-6-529554',
        name: 'POMIS Scheme',
        title: "What if my POMIS (Post Office Scheme) was put into the market banking?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 900000, "investment_asset": "HDFCBANK.NS", "start_date": "2010-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-7-84b6b8',
        name: 'Atal Pension Yojana',
        title: "What if my Atal Pension Yojana contribution went to high-growth tech?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 210, "investment_asset": "INFY.NS", "start_date": "2015-05-09"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-8-0b97c9',
        name: 'Traditional LIC Premium',
        title: "What if my traditional LIC Premium was put into the market the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 8000, "investment_asset": "BAJFINANCE.NS", "start_date": "2012-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-govt_schemes-9-8abcbb',
        name: 'ELSS Tax Savings',
        title: "What if my ELSS tax-saving amount went into direct stocks?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'govt_schemes',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 12500, "investment_asset": "LART.NS", "start_date": "2014-01-01"},
        tags: ['New', 'Trending']
      },
    ]
  },
  {
    categoryId: 'cultural',
    name: 'Culture & Lifestyle',
    icon: 'Home',
    scenarios: [
      {
        uuid: 'gen-cultural-0-faa2b0',
        name: 'Big Fat Indian Wedding',
        title: "What if the Big Fat Indian Wedding budget was put into the marketstead?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 2000000, "investment_asset": "TITAN.NS", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-1-eb4a2b',
        name: 'Dhanteras Gold Buying',
        title: "What if Dhanteras gold buying was put into equity every year?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 4000, "investment_asset": "ASIANPAINT.NS", "start_date": "2010-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-2-5c3c53',
        name: 'Cash under the Mattress',
        title: "What if the cash kept under the mattress was in the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 500000, "investment_asset": "^NSEI", "start_date": "2016-11-08"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-3-029c65',
        name: 'Childs First Birthday',
        title: "What if the budget for my child's lavish first birthday was put into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 200000, "investment_asset": "PIDILITIND.NS", "start_date": "2013-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-4-f46ff8',
        name: 'Shagun Envelopes',
        title: "What if all the 'Shagun' envelope money was put into the market over time?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 1500, "investment_asset": "SBI.NS", "start_date": "2008-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-5-3a2a99',
        name: 'Diwali New Car',
        title: "What if the Diwali new car budget was put into the market auto stocks?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 800000, "investment_asset": "MARUTI.NS", "start_date": "2014-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-6-a8e2cf',
        name: 'Annual Family Trip',
        title: "What if the annual family Dubai trip was skipped for investments?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 25000, "investment_asset": "IRCTC.NS", "start_date": "2019-10-14"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-7-bb398c',
        name: 'Diwali Firecrackers',
        title: "What if the massive Diwali firecrackers budget was saved?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 2000, "investment_asset": "HCLTECH.NS", "start_date": "2012-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-8-f76448',
        name: 'Bitcoin vs Rolex',
        title: "What if I bought Bitcoin instead of a Rolex watch?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 800000, "investment_asset": "BTC-INR", "start_date": "2016-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-cultural-9-2bf00e',
        name: 'Royal Enfield Bullet',
        title: "What if the Royal Enfield Bullet money went into Eicher Motors?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'cultural',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 250000, "investment_asset": "EICHERMOT.NS", "start_date": "2012-01-01"},
        tags: ['New', 'Trending']
      },
    ]
  },
  {
    categoryId: 'career',
    name: 'Career & Life Events',
    icon: 'Briefcase',
    scenarios: [
      {
        uuid: 'gen-career-0-8412a2',
        name: 'I my very first salary cheque',
        title: "What if I put my very first salary cheque?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 25000, "investment_asset": "INFY.NS", "start_date": "2010-06-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-1-19af72',
        name: 'Annual Diwali Bonus',
        title: "What if my annual Diwali Bonus was put into the market every year?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 8000, "investment_asset": "WIPRO.NS", "start_date": "2014-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-2-d11561',
        name: 'Appraisal Increment',
        title: "What if I put my entire appraisal increment amount?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 15000, "investment_asset": "KOTAKBANK.NS", "start_date": "2016-04-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-3-08bcc1',
        name: 'MBA Fee vs QQQ',
        title: "What if I skipped an expensive MBA and put the fee into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'global',
        sim_type: 'lump_sum',
        params: {"initial_amount": 2500000, "investment_asset": "QQQ", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-4-4814f1',
        name: 'Freelance Side Hustle',
        title: "What if my freelance side-hustle income was consistently put into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'global',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 20000, "investment_asset": "UPWK", "start_date": "2018-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-5-9fff8c',
        name: 'Income Tax Refund',
        title: "What if I put my income tax refund every year?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 5000, "investment_asset": "ICICIBANK.NS", "start_date": "2013-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-6-335ce4',
        name: 'Inherited Property',
        title: "What if the inherited property downpayment went into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 5000000, "investment_asset": "DLF.NS", "start_date": "2012-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-7-19d4d0',
        name: 'Rent vs Buy EMI',
        title: "What if I rented and put the EMI difference into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'recurring_dca',
        params: {"monthly_amount": 40000, "investment_asset": "NIFTYBEES.NS", "start_date": "2015-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-8-b86173',
        name: 'Wedding Registry Gifts',
        title: "What if all my wedding registry cash gifts were put into the market?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'india',
        sim_type: 'lump_sum',
        params: {"initial_amount": 500000, "investment_asset": "HDFCBANK.NS", "start_date": "2016-01-01"},
        tags: ['New', 'Trending']
      },
      {
        uuid: 'gen-career-9-2eadf4',
        name: 'Old Car Sale',
        title: "What if the money from selling my old car went into Tesla?",
        description: "Explore what happens if you had made this financial choice.",
        category: 'career',
        region: 'global',
        sim_type: 'lump_sum',
        params: {"initial_amount": 400000, "investment_asset": "TSLA", "start_date": "2019-01-01"},
        tags: ['New', 'Trending']
      },
    ]
  },
];

export const ASSET_NAMES: Record<string, string> = {
  'BTC-USD': 'Bitcoin',
  'ETH-USD': 'Ethereum',
  'DOGE-USD': 'Dogecoin',
  'SOL-USD': 'Solana',
  'BTC-INR': 'Bitcoin (INR)',
  'ETH-INR': 'Ethereum (INR)',
  'SOL-INR': 'Solana (INR)',
  'WRX-INR': 'WazirX',
  'NIFTYBEES.NS': 'Nifty BeES ETF',
  'RELIANCE.NS': 'Reliance Industries',
  'SPY': 'S&P 500 ETF',
  'INFY.NS': 'Infosys',
  'BPCL.NS': 'BPCL',
  'TATAMOTORS.NS': 'Tata Motors',
  'HOMZ': 'Austin Housing Index',
  'VNQ': 'Vanguard Real Estate ETF',
  'TCS.NS': 'TCS',
  'ZOMATO.NS': 'Zomato',
  'ITC.NS': 'ITC',
  'AAPL': 'Apple',
  'NVDA': 'NVIDIA',
  '^NSEI': 'Nifty 50 Index',
  'HDFCBANK.NS': 'HDFC Bank',
  'ASIANPAINT.NS': 'Asian Paints',
  'IRCTC.NS': 'IRCTC',
  'TSLA': 'Tesla',
  'AMZN': 'Amazon',
  'GOLDBEES.NS': 'Gold BeES ETF',
  'TRENT.NS': 'Trent (Zara/Westside)',
  'UNITEDSPR.NS': 'United Spirits (Diageo)',
  'QQQ': 'Invesco QQQ Trust',
  'EICHERMOT.NS': 'Eicher Motors (Royal Enfield)',
  'SBI.NS': 'State Bank of India',
  'DLF.NS': 'DLF Limited',
  'DMART.NS': 'Avenue Supermarts (DMart)',
  'SUNPHARMA.NS': 'Sun Pharma',
  'SBUX': 'Starbucks',
  'PIDILITIND.NS': 'Pidilite Industries',
  'BAJFINANCE.NS': 'Bajaj Finance',
  'KOTAKBANK.NS': 'Kotak Mahindra Bank',
  'LART.NS': 'Larsen & Toubro',
  'HINDUNILVR.NS': 'Hindustan Unilever',
  'HCLTECH.NS': 'HCL Technologies',
  'MSFT': 'Microsoft',
  'ICICIBANK.NS': 'ICICI Bank',
  'WIPRO.NS': 'Wipro',
  'UPWK': 'Upwork',
  'TITAN.NS': 'Titan Company',
  'PIIND.NS': 'PI Industries',
  'MARUTI.NS': 'Maruti Suzuki',
  'NFLX': 'Netflix',
  'PVRINOX.NS': 'PVR INOX'
};

export const getAllDropdownGroups = () => {
  return SCENARIO_CONFIG.map(category => {
    // Deduplicate options by asset ticker to prevent duplicate keys
    const uniqueOptionsMap = new Map();
    
    category.scenarios.forEach(s => {
      const ticker = (s.params.asset || s.params.investment_asset);
      if (ticker && !uniqueOptionsMap.has(ticker)) {
        uniqueOptionsMap.set(ticker, {
          value: ticker,
          label: ASSET_NAMES[ticker] || s.name,
        });
      }
    });

    return {
      label: category.name,
      options: Array.from(uniqueOptionsMap.values()),
    };
  });
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
