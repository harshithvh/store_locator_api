# Store Locator

> Node/Express/Mongo API with GeoJSON location field to store locations. Simple vanilla JS frontend using the Mapbox Library

## Quick Start

Add your MONGO_URI and GEOCODER_API_KEY to the "config/config.env" file.

```bash
# Install dependencies
npm install

# Serve on localhost:3000
npm run dev (nodemon)
or
npm start

# Postman
GET    /api/v1/stores # Get Stores

POST   /api/v1/stores # Add Store
body { storeId: "0001", address: "10 main st Boston MA" }
```
