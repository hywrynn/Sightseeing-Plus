mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: journal.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(journal.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({
            offset: 25
        })
        .setHTML(
            `<h3>${journal.title}</h3><p>${journal.location}</p>`
        )
    )
    .addTo(map)
