# Autonomous, Provably Transparent(APT)-Casino - Fully On-Chain Casino on ICP Blockchain

A couple of days back, I was was on etherscan exploring some transactions and saw an advertisement of [https://stake.com/](url) which was giving 200% bonus on first deposit, I deposited 120 USDT into stake.com they gave 360 USDT as total balance in their controlled custodial wallet and when I started playing casino games I was shocked to see that I was only able to play with $1 per game and was unable to increase the betting amount beyond $1 and when I tried to explore and play other games on the platform the issue was persisting, I reached the customer support and got to know that this platform has cheated me under the name of wager limits as I was using the bonus scheme of 200%.

When I asked the customer support for refund they showed a mathematical equation which says if refund then I have to play $12,300 worth of gameplay and this was a big shock for me. Thereby, In the hope of getting the deposited money back, I played the different games of stake.com like roulette, mines, spin wheel, etc, the entire night and lost all the money and time.

I was very annoyed of that's how Apt-Casino was born, gamblefi all in one platform where new web3 users can play games, perform gambling but have a safe, secure, transparent environment that does not scam any of their users. Also, I wanted to address common issues in traditional gambling platforms.

> **Revolutionizing GambleFi with ICP**

<div align="center">
  <img src="https://github.com/user-attachments/assets/6880e1cb-769c-4272-8b66-686a90abf3be" alt="APT-Casino Architecture" width="800"/>
  <p><em>Next-Gen Decentralized Casino Powered by Cryptographic Randomness</em></p>
</div>

## 🌟 PARADIGM SHIFT: WEB3 GAMBLING REIMAGINED

APT-Casino isn't just another blockchain gambling platform—it's a **hyper-composable, fully on-chain, provably-fair casino ecosystem** that fundamentally disrupts the traditional gambling industry's opacity. Born from the frustration with predatory Web2 gambling platforms that employ:

- ❌ Rigged outcomes manipulated behind closed doors
- ❌ Hidden wager limits designed to trap user funds
- ❌ Restrictive withdrawal policies with impossible conditions
- ❌ Deceptive "bonus schemes" with unrealistic wagering requirements

**APT-Casino introduces a zero-trust gambling protocol where mathematics replaces faith and cryptographic proofs eliminate uncertainty.**

## 🎮 Features

### Games
- **Roulette**: Classic roulette with multiple bet types (numbers, colors, odds/evens, etc.)
- **Mines**: Reveal tiles to find gems while avoiding mines
- **Plinko**: Balls dropping into multiplier segments pyramid
- **Spin Wheel**: Risk-based wheel spinning with different multiplier segments

### Blockchain Features
- **ICP Integration**: Fully ICP blockchain integrated
- **On-Chain Randomness**: All games use provably fair ICP Motoko on-chain randomness
- **APTC Token Support**: All games played exclusively with APTC tokens deployed on ICP Testnet
- **Multiple Wallet Support**: NNS wallet
- **Mobile Friendly**: Responsive design for mobile and desktop

### Technical Features
- **ICP Contracts**: Smart contracts written in Motoko language
- **Real-Time Updates**: Live game state and balance updates
- **Event System**: Comprehensive event tracking for all game actions
- **Security**: Provably fair gaming with on-chain verification


### Frontend Development
```bash
# Install npm
npm install

# Start production server
npm run dev

```

```env
NEXT_PUBLIC_IC_HOST=https://ic0.app
NEXT_PUBLIC_CASINO_CANISTER_ID=d7bsl-tiaaa-aaaan-qz5pq-cai
NEXT_PUBLIC_APTC_TOKEN_CANISTER_ID=f2kju-siaaa-aaaan-qz5zq-cai
```

## 🏗️ Architecture
<img width="1569" height="754" alt="Screenshot 2025-09-23 at 11 58 36 AM" src="https://github.com/user-attachments/assets/3ef462b5-7275-488a-9324-cd30248dace7" />

### Frontend (Next.js)
- **Framework**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with custom gradients
- **State Management**: React hooks and context
- **Wallet Integration**: NNS
- **UI Components**: Custom casino-themed components

### Smart Contracts (Motoko)
- **Language**: Motoko
- **Framework**: ICP Motoko Randomness Module
- **Games**: Roulette, Mines, Plinko, Spin Wheel
- **Randomness**: On-chain SHA3-256 hashing
- **Events**: Comprehensive event system

## 🎯 Game Mechanics

### Roulette
- **Bet Types**: Numbers (0-36), Colors (Red/Black), Odds/Evens, High/Low, Dozens, Columns, Split, Street, Corner, Line
- **Payouts**: 1:1 to 35:1 depending on bet type
- **Randomness**: On-chain SHA3-256 with timestamp and transaction data

### Mines
- **Grid**: 5x5 grid (25 tiles)
- **Mines**: 1-24 mines per game
- **Reveal**: Click tiles to reveal gems or mines
- **Multiplier**: Increases as you reveal more tiles safely
- **Cashout**: Collect winnings at any time

### Plinko
- **Risk Levels**: Low, Medium, High
- **Instant Results**: Immediate win/loss determination

### Spin Wheel
- **Risk Levels**: Low, Medium, High
- **Segments**: 6-10 segments based on risk
- **Multipliers**: 1.2x to 10x depending on risk level
- **Instant Results**: Immediate win/loss determination

### Provably Fair
- All game logic is on-chain
- Randomness is verifiable
- No server-side manipulation possible

## Future
All though started as an idea but I am now thinking of carrying it forward as a business model and expanding further.
- **Mainnet Launch:** Deploying on the ICP mainnet for real-world use.
- **User Testing:** Conducting extensive user testing to refine the platform.
- **Promoting the Product:** Marketing to attract a wider audience.
- Introducing 24 new games to the platform in the next 6 months.
- Explore additional DeFi features like staking, farming, and yield strategies to offer more financial services within the platform.
- Bringing in new monetisation schemas to compensate the casino games/ game creators.
- Having an in-built live streaming, for gameplay, we may utilise livepeer/ lens/ huddle01 for this feature and allow players to do streaming within the application just like pump.fun.
- We also plan to introduce an in-game chat feature where gamblers/ gamers/ our users can chat and predict the outcome of the games making its perspective and narrative towards SOCIALFI as well.

Ultimately, want to be the biggest gamefi/ gambling / games hub centre of the gaming and gambling industry.
