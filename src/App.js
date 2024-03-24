import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import Loading from './components/Loading';


function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const eventsx = [
    { lat: 51.505, lng: -0.09, title: 'Marker 1' },
    { lat: 51.51, lng: -0.1, title: 'Marker 2' },
    // Add more markers as needed
  ];

  useEffect(()=> {
    const getData = async () => {
      setLoading(true)
      const res = await fetch(`https://eonet.gsfc.nasa.gov/api/v2.1/events?key=${process.env.REACT_APP_NASA_NET_KEY}`)
      const { events } = await res.json()

      setData(events)
      setLoading(false)
    }

    getData()
  }, [])

  console.log(data)


  return (
    <div className="App">
      {!loading? <Map events={data} />: <Loading />}
    </div>
  );
}

export default App;
