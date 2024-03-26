import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import fireImg from '../images/fire-icon.png';
import stormImg from '../images/storm2.png';
import volcanoImg from '../images/volcano.png'


function Map({ events }) {
  const [fire, setFire] = useState(true)
  const [storms, setStorms] = useState(true)
  const [volcanoes, setVolcanoes] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const fireIcon = L.icon({
    iconUrl: fireImg,
    iconSize: isMobile? [28, 28]:[30, 30],
  });

  const stormIcon = L.icon({
    iconUrl: stormImg,
    iconSize: [45, 45],
  });

  const volcanoIcon = L.icon({
    iconUrl: volcanoImg,
    iconSize: isMobile? [40, 40]:[45, 45],
  });


  useEffect(()=> {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)



    return ()=> {
      window.removeEventListener('resize', handleResize)
    }
  }, [])



  return (
    <div style={{position: 'relative'}}>
    <div className='header'>
      <div className='events-options'>
      <h3 className='hide-on-mobile'>Show: </h3>
      <label style={isMobile? {marginLeft: '55px'}: {}}>
        {!isMobile && <div className='event-option'>
          <input type='checkbox' checked={fire} onChange={e=> setFire(e.target.checked)}/>
          <img src={fireImg} width={isMobile? 25:30} alt='fire image'/>
          <p>Wildfires</p></div>}
        {isMobile && <div className='event-option-mobile'>
          <img src={fireImg} width={isMobile? 25:30} alt='fire image'/>
          <div>
          <input type='checkbox' checked={fire} onChange={e=> setFire(e.target.checked)}/>          
          <p>Wildfires</p></div></div>}
      </label>
      <label>
        {!isMobile && <div className='event-option'>
        <input type='checkbox' checked={storms} onChange={e=> setStorms(e.target.checked)}/>
        <img src={stormImg} width={isMobile? 30:30} alt='storm image'/>
        <p>Severe Storms</p>
        </div>}
        {isMobile && <div className='event-option-mobile'>
        <img src={stormImg} width={isMobile? 30:30} alt='storm image'/>
        <div>
        <input type='checkbox' checked={storms} onChange={e=> setStorms(e.target.checked)}/>
        <p>Severe Storms</p>
        </div></div>}
      </label>
      <label>
        {!isMobile && <div className='event-option'>
        <input type='checkbox' checked={volcanoes} onChange={e=> setVolcanoes(e.target.checked)}/>
        <img src={volcanoImg} width={30} alt='volcano image' />
        <p>Volcanoes</p>
        </div>}
        {isMobile && <div className='event-option-mobile'>
        <img src={volcanoImg} width={30} alt='volcano image' />
        <div>
        <input type='checkbox' checked={volcanoes} onChange={e=> setVolcanoes(e.target.checked)}/>
        <p>Volcanoes</p>
        </div></div>}
      </label>
      </div>

      <div style={{marginLeft: 'auto'}} className='hide-on-mobile'>
        <a href='https://www.linkedin.com/in/fahad-aldossary-425a4b241/'><h3 style={{fontWeight: '100'}}>Developed by Fahad Aldossary</h3></a>
      </div>
    </div>
    <MapContainer
      center={[35, 35]}
      zoom={4}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events?.map((event, index) => {
        if ((event.categories[0].id === 10 && storms) || (event.categories[0].id === 8 && fire) || (event.categories[0].id === 12 && volcanoes)) {
          const id = event.categories[0].id;
          const icon = id === 8 ? fireIcon : id === 10? stormIcon: volcanoIcon;

          return event.geometries.map((geometry, geometryIndex) => (
            <Marker
              position={[geometry.coordinates[1], geometry.coordinates[0]]}
              key={`${index}-${geometryIndex}`}
              icon={icon}
            >
              <Popup>{event.title}</Popup>
            </Marker>
          ));
        } else {
          return null;
        }
      })}
    </MapContainer>

    <div className='hide-on-desc _div'>
        <a href='https://www.linkedin.com/in/fahad-aldossary-425a4b241/'><h3 style={{fontWeight: '100'}}>Developed by Fahad Aldossary</h3></a>
    </div>
    </div>
  );
}

export default Map;
