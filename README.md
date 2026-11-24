# TerraWise 2.0 — Smart Agriculture Platform

TerraWise is a React + Express + SQLite prototype for two user journeys:
- **Farmer / landowner:** manage a farm, store soil-test values, retrieve climate data, compare crop options, review irrigation/rotation guidance and publish land listings.
- **Land seeker:** browse real listings entered by owners, filter by rental/sale and location, and send an enquiry.

## Stack
- Frontend: React, Vite, Lucide icons, responsive CSS.
- Backend: Node.js, Express.
- Database: SQLite (`server/data/terrawise.sqlite`, created automatically).
- Authentication: bcrypt password hashes, JWT sessions, CNI keyed hash for login and AES-256-GCM encrypted CNI storage.
- External data: NASA POWER climatology, Open-Meteo forecast/current weather, OpenStreetMap Nominatim geocoding.

## Run locally (Windows / macOS / Linux)
1. Install Node.js 20 LTS or newer.
2. Extract the project and open a terminal in the `TerraWise` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `server/.env.example` to `server/.env`. Replace both secrets with long, random values. Keep this file private and never commit it.
5. Start the frontend and backend:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173`.

The API runs at `http://localhost:4000/api`. Check `http://localhost:4000/api/health`.

For a frontend-only deployment, set `VITE_API_URL` to the deployed API URL before building. The SQLite database must live on persistent server storage; do not deploy this local SQLite setup to a serverless platform with ephemeral disk.

## Main flows
### Registration and login
- Registration fields: full name, CNI, phone, password, account type.
- Login: CNI + password.
- Roles: `farmer` and `seeker`.
- The role controls which dashboard and actions are available.

### Farmer
- Save one or more parcels with location, coordinates, area, soil texture, water source and crop.
- Optional soil test values: pH, EC, organic matter, N, P and K.
- Request live weather / forecast from Open-Meteo and regional climatology from NASA POWER.
- Generate and save an indicative crop ranking and a farm-specific decision record.
- Save a crop plan.
- Publish a rental or sale listing.
- Review enquiries from land seekers.

### Land seeker
- Filter owner-published land listings by rental/sale and location.
- Review location, area, soil, water, asking price and owner name.
- Send a request to the owner.

### Voice and languages
- UI languages: French, Moroccan Darija, English.
- Browser speech synthesis and speech recognition are used where available. Browser/device language support varies; Moroccan Darija speech recognition and TTS are not guaranteed.

## Data quality and agronomic limitations
- **NASA POWER** is regional meteorological / solar climatology, not a field soil test. It cannot provide a farm's pH, NPK or exact soil texture.
- **Open-Meteo** provides weather forecasts/current weather, not direct measurements inside the field.
- Soil texture and laboratory values must be supplied by the farmer from a real soil analysis. Empty values remain unknown; the app must not invent them.
- Crop rankings use a small, transparent, indicative rule set (soil texture, broad pH ranges and relative water demand). Scores are not validated Morocco-specific yield predictions and must not be presented as guaranteed suitability.
- Irrigation guidance is qualitative. Exact irrigation volumes require ETo, crop coefficient (Kc), growth stage, effective rainfall, irrigation efficiency and measured soil water capacity. This prototype deliberately does not invent a litres/mm recommendation.
- Rotation suggestions are planning prompts only. Validate varieties, sowing dates, pest/disease history, market access and local agronomic advice.
- Land listings are not seeded with fabricated properties. They appear only after a landowner publishes an actual listing. Owners should verify title, boundaries, water rights, access and legal status before a transaction.
- Nominatim is a public geocoding service. Respect its usage policy and use a suitable commercial/self-hosted provider for production scale.

## Security / production checklist
This is a development prototype, not yet a production-ready regulated service:
- Configure strong, independent `JWT_SECRET` and `CNI_ENCRYPTION_KEY` values.
- Serve over HTTPS; add rate limiting, CSRF protections where applicable, input validation, audit logging, backups and account recovery.
- Review Moroccan Law 09-08 / CNDP requirements before collecting CNI and phone data in production. Collect only necessary identity data and define retention/deletion policies.
- Use persistent managed database infrastructure for production (PostgreSQL recommended), not a local SQLite file on a serverless host.
- Add moderation, ownership verification, document upload and dispute/contact workflows before enabling real estate transactions.
- Add official Morocco-specific crop calendars, cultivar data, soil maps and agronomic validation before calling recommendations authoritative.

## Data references
- NASA POWER Climatology API: https://power.larc.nasa.gov/docs/services/api/temporal/climatology/
- NASA POWER data services: https://power.larc.nasa.gov/docs/services/api/
- Open-Meteo API documentation: https://open-meteo.com/en/docs
- FAO Harmonized World Soil Database: https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/harmonized-world-soil-database-v12/en/
- FAO soil physical properties: https://www.fao.org/soils-portal/soil-survey/proprietes-du-sol/proprietes-physiques/en/
- ISRIC SoilGrids: https://soilgrids.org/
- Moroccan agricultural good practices guide (ANRAC): https://www.anrac.gov.ma/es/wp-content/uploads/sites/9/2023/10/AGRICULTEURen.pdf


### Compatibilité Windows / SQLite

Le serveur utilise maintenant `node:sqlite`, intégré à Node.js. Il n’est plus nécessaire d’installer `better-sqlite3`, Visual Studio C++ Build Tools ou Python pour compiler un module natif. Utilisez Node.js 22.13+ (ou 24+) puis relancez `npm install`.


## TerraWise 2.2 — Smart Land Matching

- Added a Smart Matching view for land seekers.
- Ranks only real, active land listings from the database (no sample farmer profiles and no simulated likes/back-matches).
- Uses the supplied matching mechanism's weighted approach: land suitability (45%), neutral reciprocal-fit baseline (35%), proximity (15%), and area compatibility (5%).
- Applies a minimum indicative land-fit threshold of 60/100.
- Uses coordinates when available; otherwise, typed location similarity is used as a weak proximity signal.
- Considers target crop, listed soil type, water source, desired irrigation and required area.
- Adds owner crop metadata to listing results for future reciprocal matching.
- The reciprocal component is neutral for seekers because they do not have a registered farm to score as a return offer. This is stated in the UI rather than inventing a mutual match.
- Existing three-stage crop rotation planner and all prior TerraWise functionality are retained.

Matching scores are indicative ranking aids, not agronomic guarantees. Verify soil, water rights, land title, and local conditions before renting or buying.
