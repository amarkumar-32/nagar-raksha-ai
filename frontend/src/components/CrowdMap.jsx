import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

function CrowdMap({ places }) {

  const getColor = (risk) => {

    if (risk === "High") return "red";

    if (risk === "Medium") return "yellow";

    return "green";
  };

  return (

    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "20px",
        marginTop: "40px"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place, index) => (

        <CircleMarker
          key={index}
          center={[place.lat, place.lng]}
          radius={15}
          pathOptions={{
            color: getColor(place.risk)
          }}
        >

          <Popup>

            <h2>{place.name}</h2>

            <p>People: {place.people}</p>

            <p>Risk: {place.risk}</p>

          </Popup>

        </CircleMarker>

      ))}

    </MapContainer>
  );
}

export default CrowdMap;