import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsdmluLWNsYXJrZSIsImEiOiJjbWdoaXg4dDUwNXp4MmpyNXh1NWM3aDN1In0.ZNQC3iFBbfb21YgA1QzJbA';

const USERS = [
  {
    _id: "test_1",
    name: "Test User 1",
    skills: [{ name: "JavaScript" }],
    location: { coordinates: [85.8345, 20.3061] },
    distanceInKm: "1.00",
    primarySkillColor: "#F7DF1E"
  },
  {
    _id: "test_2",
    name: "Test User 2",
    skills: [{ name: "Python" }],
    location: { coordinates: [85.8145, 20.2861] },
    distanceInKm: "2.00",
    primarySkillColor: "#3776AB"
  }
];

const MapDemo: React.FC = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const markersRef = React.useRef<mapboxgl.Marker[]>([]);

  React.useEffect(() => {
    if (map.current || !mapContainer.current) return;

    console.log('🎯 Creating map with', USERS.length, 'users');

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [85.8245, 20.2961],
      zoom: 13
    });

    // Define addMarkers INSIDE useEffect to access proper closure
    const addMarkers = () => {
      if (!map.current) {
        console.error('❌ Map reference is null');
        return;
      }

      console.log('✅ Adding markers to map');

      // Clear existing markers first
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Your location marker (Green)
      const yourEl = document.createElement('div');
      yourEl.style.cssText = `
        width: 40px;
        height: 40px;
        background: #10B981;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        font-size: 20px;
      `;
      yourEl.innerHTML = '📍';
      
      const yourMarker = new mapboxgl.Marker({ element: yourEl })
        .setLngLat([85.8245, 20.2961])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>Your Location</h3><p>Jaydev Vihar, Bhubaneswar</p>')
        )
        .addTo(map.current);
      
      markersRef.current.push(yourMarker);
      console.log('✅ Added your location marker');

      // User markers
      USERS.forEach((user, index) => {
        if (!map.current) return;
        
        console.log(`📍 Adding marker ${index + 1}: ${user.name} at`, user.location.coordinates);
        
        const el = document.createElement('div');
        el.style.cssText = `
          width: 35px;
          height: 35px;
          background: ${user.primarySkillColor};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          font-size: 14px;
          transition: transform 0.2s;
        `;
        el.innerHTML = user.name.charAt(0);
        
        // Hover effect
        el.onmouseenter = () => {
          el.style.transform = 'scale(1.2)';
        };
        el.onmouseleave = () => {
          el.style.transform = 'scale(1)';
        };
        
        el.onclick = () => {
          alert(`👤 ${user.name}\n📚 Skill: ${user.skills[0].name}\n📍 Distance: ${user.distanceInKm} km`);
        };

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(user.location.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px;">${user.name}</h3>
                  <p style="margin: 4px 0; color: #666;">
                    <strong>Skill:</strong> ${user.skills[0].name}
                  </p>
                  <p style="margin: 4px 0; color: #666;">
                    <strong>Distance:</strong> ${user.distanceInKm} km away
                  </p>
                </div>
              `)
          )
          .addTo(map.current);

        markersRef.current.push(marker);
      });

      console.log(`✅ ALL DONE! Added ${markersRef.current.length} markers total`);
    };

    // Call addMarkers when map loads
    map.current.on('load', () => {
      console.log('✅ Map loaded event fired');
      addMarkers();
    });

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up map and markers');
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []); // Empty dependency array - runs once

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#1f2937' }}>
        🧪 Map Demo - Marker Testing
      </h1>
      <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>
        Testing Mapbox GL JS markers with React. Should display 3 markers total.
      </p>
      
      <div 
        ref={mapContainer} 
        style={{ 
          width: '100%', 
          height: '600px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '2px solid #e5e7eb'
        }}
      />
      
      <div style={{ 
        marginTop: '20px', 
        padding: '24px', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#1f2937' }}>
          Expected Markers:
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
          <li style={{ padding: '12px', marginBottom: '8px', backgroundColor: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '32px', height: '32px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '18px' }}>📍</span>
            <span><strong>Your Location</strong> - Jaydev Vihar Square (Green marker)</span>
          </li>
          <li style={{ padding: '12px', marginBottom: '8px', backgroundColor: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '32px', height: '32px', backgroundColor: '#F7DF1E', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', color: 'white', fontWeight: 'bold' }}>T</span>
            <span><strong>Test User 1</strong> - JavaScript (Yellow marker)</span>
          </li>
          <li style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '32px', height: '32px', backgroundColor: '#3776AB', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', color: 'white', fontWeight: 'bold' }}>T</span>
            <span><strong>Test User 2</strong> - Python (Blue marker)</span>
          </li>
        </ul>
        
        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#1f2937' }}>
          User Details:
        </h3>
        {USERS.map(u => (
          <div 
            key={u._id} 
            style={{ 
              padding: '16px', 
              border: `2px solid ${u.primarySkillColor}`, 
              margin: '8px 0', 
              borderRadius: '8px',
              backgroundColor: 'white'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '18px', color: '#1f2937' }}>{u.name}</strong>
                <p style={{ margin: '4px 0', color: '#6b7280' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 12px', 
                    backgroundColor: u.primarySkillColor, 
                    color: 'white', 
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {u.skills[0].name}
                  </span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: u.primarySkillColor }}>
                  {u.distanceInKm} km
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>away</p>
              </div>
            </div>
          </div>
        ))}
        
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: '#f0f9ff', 
          borderLeft: '4px solid #3b82f6',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#1e40af' }}>
            <strong>💡 Tip:</strong> Click on markers for details, or hover over them to see popup information!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapDemo;
