import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';



function App() {
  const [coins, setCoins] = useState([])  
  const [search, setSearch] = useState('')

  useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  .then(res => {
    setCoins(res.data)
   }).catch(error => console.log(error))
  }, []); // this is the promise that is using the CoinGecko api.

  const handleChage = e => {
    setSearch(e.target.value)
  } // this function handels the searching of the coins. 

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )  

  return (
    <div className="coin-app">
      <div className='coin-app'>
        <div className='coin-search'>
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input type='text' placeholder='Search' className='coin-input' onChange={handleChage}/>
          </form>
        </div>
        
        {filteredCoins.map(coin => {
          return(<Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={(typeof coin.price_change_percentage_24h=='number') ? coin.price_change_percentage_24h.toFixed(2) : coin.price_change_percentage_24h}
            volume={coin.total_volume}
            />
          )
        })} {/*this is going to map through  */}
        
      </div>
      
    </div>
  );
}

export default App;
