import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsdmluLWNsYXJrZSIsImEiOiJjbWdoaXg4dDUwNXp4MmpyNXh1NWM3aDN1In0.ZNQC3iFBbfb21YgA1QzJbA';

interface MapComponentProps {
  nearbyUsers: any[];
  userLocation?: { longitude: number; latitude: number };
  onUserMarkerClick?: (user: any) => void;
  height?: string;
  zoom?: number;
  showUserLocation?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  nearbyUsers,
  userLocation,
  onUserMarkerClick,
  height = '500px',
  zoom = 13,
  showUserLocation = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  // Initialize map once
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const center: [number, number] = userLocation 
      ? [userLocation.longitude, userLocation.latitude]
      : [85.8245, 20.2961];

    console.log('🗺️ Initializing map at', center);

    // ✅ Dark theme map style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
      center,
      zoom
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add YOUR location marker (DEFAULT MAPBOX PIN - GREEN)
    if (showUserLocation && userLocation) {
      map.current.on('load', () => {
        if (!map.current || userMarkerRef.current) return;

        userMarkerRef.current = new mapboxgl.Marker({ 
          color: '#10B981', // Cyan to match theme
          scale: 1.2
        })
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 10px; background: #1f2937; border-radius: 8px;">
                  <h3 style="margin: 0 0 5px 0; color: #10B981; font-size: 16px;">📍 Your Location</h3>
                  <p style="margin: 0; color: #9ca3af; font-size: 14px;">Current position</p>
                </div>
              `)
          )
          .addTo(map.current);

        console.log('✅ Added your location marker');
      });
    }

    return () => {
      console.log('🧹 Cleaning up MapComponent');
      markersRef.current.forEach(marker => marker.remove());
      userMarkerRef.current?.remove();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update user markers when nearbyUsers changes
  useEffect(() => {
    if (!map.current) return;

    const updateMarkers = () => {
      if (!map.current) return;

      console.log(`🔄 Updating ${nearbyUsers.length} user markers`);

      // Remove existing user markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      if (nearbyUsers.length === 0) {
        console.log('ℹ️ No users to display');
        return;
      }

      // Add new user markers (CUSTOM CIRCULAR DESIGN)
      nearbyUsers.forEach((user, index) => {
        if (!user.location?.coordinates || !map.current) {
          console.warn(`⚠️ Skipping user ${user.name} - invalid location`);
          return;
        }

        const [lng, lat] = user.location.coordinates;
        
        if (isNaN(lng) || isNaN(lat)) {
          console.warn(`⚠️ Invalid coordinates for ${user.name}:`, user.location.coordinates);
          return;
        }

        console.log(`📍 Adding marker ${index + 1}: ${user.name} at [${lng}, ${lat}]`);

        // ✅ FIXED: Create outer container (for Mapbox positioning)
        const el = document.createElement('div');
        el.className = 'marker-container';
        el.style.cursor = 'pointer';
        
        // ✅ FIXED: Create inner content div (this is what we'll scale)
        const innerEl = document.createElement('div');
        innerEl.className = 'marker-content';
        innerEl.style.cssText = `
          width: 40px;
          height: 40px;
          background: ${user.primarySkillColor || '#3B82F6'};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 6px rgba(0,0,0,0.5);
          font-size: 16px;
          user-select: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          transform-origin: center center;
        `;
        innerEl.innerHTML = user.name.charAt(0).toUpperCase();
        
        // Append inner to outer
        el.appendChild(innerEl);
        
        // ✅ FIXED: Apply hover effects to INNER element only
        el.addEventListener('mouseenter', () => {
          innerEl.style.transform = 'scale(1.15)';
          innerEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.7)';
        });
        
        el.addEventListener('mouseleave', () => {
          innerEl.style.transform = 'scale(1)';
          innerEl.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)';
        });
        
        // Click handler
        if (onUserMarkerClick) {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            onUserMarkerClick(user);
          });
        }

        const popupContent = `
          <div style="padding: 12px; min-width: 220px; background: #1f2937; border-radius: 8px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <div style="
                width: 40px; 
                height: 40px; 
                background: ${user.primarySkillColor || '#3B82F6'}; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                font-weight: bold;
                margin-right: 12px;
                font-size: 18px;
              ">
                ${user.name.charAt(0)}
              </div>
              <div>
                <h3 style="margin: 0; font-size: 16px; color: white;">${user.name}</h3>
                ${user.isOnline ? '<span style="color: #10B981; font-size: 12px;">● Online</span>' : '<span style="color: #6b7280; font-size: 12px;">○ Offline</span>'}
              </div>
            </div>
            ${user.skills?.length > 0 ? `
              <p style="margin: 6px 0; color: #9ca3af; font-size: 14px;">
                <strong style="color: #06b6d4;">Skills:</strong> ${user.skills.slice(0, 3).map((s: any) => s.name).join(', ')}
              </p>
            ` : ''}
            ${user.distanceInKm ? `
              <p style="margin: 6px 0; color: #9ca3af; font-size: 14px;">
                <strong style="color: #06b6d4;">📍 Distance:</strong> ${user.distanceInKm} km away
              </p>
            ` : ''}
            ${user.averageRating ? `
              <p style="margin: 6px 0; color: #9ca3af; font-size: 14px;">
                <strong style="color: #06b6d4;">⭐ Rating:</strong> ${user.averageRating} (${user.totalReviews || 0} reviews)
              </p>
            ` : ''}
          </div>
        `;

        // ✅ Create marker with outer container
        const marker = new mapboxgl.Marker({ 
          element: el,
          anchor: 'center'
        })
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
          .addTo(map.current);

        markersRef.current.push(marker);
      });

      console.log(`✅ Added ${markersRef.current.length} user markers`);
    };

    if (map.current.loaded()) {
      updateMarkers();
    } else {
      map.current.once('load', updateMarkers);
    }
  }, [nearbyUsers, onUserMarkerClick]);

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height, 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }} 
    />
  );
};

export default React.memo(MapComponent);
