// This is the frontend part to display the map using mapbox
// Visit https://www.mapbox.com/install/js/cdn-add/ for the syntax below inorder to display the map to your site

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyc2hpdGh2aCIsImEiOiJjbDIzMTV5NDcwM2c0M2NuMHlwMHFjY2t1In0.HuQ_WdldPKEDKJVGvkon2w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 9,
center: [-71.157895, 42.707741]
});

// Connect the database to the frontend in order to plot the actual points
async function getStores() {
    const res = await fetch('/api/v1/stores') // send a get request to the server to route:"/api/v1/stores" through fetch api
    const data = await res.json() // convert it to json (data.data contains all the points to be plotted on the map (array))

    const stores = data.data.map(store => {
        return {
                type: 'Features',
                geometry: {
                    type: 'Point', // geojson point
                    coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
                },
                properties: {
                    storeId: store.storeId,
                    icon: 'shop'
                }
            }
    }) // loop through the data.data array
   
    loadmap(stores) // stores is an array of objects obtained through the map()
    // console.log(data)
}

// To add the icon with id in the map
// Visit: https://docs.mapbox.com/mapbox-gl-js/example/add-image/
function loadmap(stores) {
    map.on('load', () => {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: stores, // the value of stores(array) is coming from the function getStores()
                    //features: [
                    //    {
                    //        type: 'Features',
                    //        geometry: {
                    //            type: 'Point', // geojson point
                    //            coordinates: [-71.157895, 42.707741]
                    //        },
                    //        properties: {
                    //            storeId: '0001',
                    //            icon: 'shop'
                    //        }
                    //    }
                    //]
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9], // x and y axis value
                'text-anchor': 'top'
            }
            });
        });
}

getStores()