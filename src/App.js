import './App.css';
import { useEffect, useState } from "react"

const url = "https://sunil-ingole.onrender.com/ad/getads";

function App() {
  const [data, setData] = useState([]);
  const [serachData, setSearchData] = useState("");

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }
  useEffect(() => {
    fetchInfo();
  }, [])

  const filteredProducts = data.filter(
    item => {
      if (serachData === "") {
        return [];
      } else {
        let lowerPrimaryItem = item.primaryText?.toLowerCase();
        let lowerHeadlineItem = item.headline?.toLocaleLowerCase();
        let lowerdescription = item.description?.toLocaleLowerCase();
        let companyName = item.primaryText?.toLowerCase()
        let serachLower = serachData.toLocaleLowerCase();
        return (
          lowerPrimaryItem
            .includes(serachLower) ||
          lowerHeadlineItem
            .includes(serachLower) ||
          lowerdescription
            .includes(serachLower) ||
          companyName
            .includes(serachLower)
        );
      }
    }
  );

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  }

  return (
    <div className="App">
      <div className="searchbox">
        <h1>Serch Ads here</h1>
        <input type="text" placeholder="search here to see ads ..." onChange={handleSearch} />
      </div>
      <div className='mainbox'>
        {serachData.length === 0 ? <></> : filteredProducts?.map((item) => (
          <div key={item._id} className='subbox'>
            <img
              src={item.imageUrl}
              alt=''
            />
            <h3>{item.headline}</h3>
            <p>{item.primaryText}</p>
            <p>{item.description}</p>
            <p>{item.CTA}</p>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
