import React from 'react'
import axios from 'axios'

const BuyPogs = () => {

  const [pogs, setPogs] = React.useState([]);
  const [quantity, setQuantity] = React.useState<number>();
  const user_id = localStorage.getItem('user_id');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pogs/api');
        setPogs(response.data);
      } catch (error) {
        console.error('Error fetching Pogs data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setQuantity(event.target.value);
  }

  const handleBuy = async (pogs_id: number) => {
    try {
      console.log("user_id: ", user_id, "pogs_id: ", pogs_id)
      const formData = {
        user_id: user_id,
        pogs_id: pogs_id,
        quantity: quantity,
      }
      await axios.post('http://localhost:3000/wallet/api-buy-pogs', formData);
      alert("Successfully bought Pogs")
    } catch (error) {
      console.error('Error buying Pogs:', error);
    }
  };

  return (
    <div>
      <h1>Buy Pogs</h1>
      <div>
        {pogs.map((pog: any) => (
          <div key={pog.id}>
            <h2>{pog.pogs_name}</h2>
            <p>Price: {pog.price}</p>
            <input type="number" placeholder='quantity' value={quantity} onChange={handleChange}/>
            <button onClick={() => handleBuy(pog.id)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyPogs