# TerraWise — Farmer-first prototype

## Run locally (Windows)
1. Install Node.js LTS.
2. Extract this folder.
3. Open Command Prompt inside the extracted folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the `http://localhost:5173` address shown by Vite.

## Prototype features
- Darija / English interface switch; icon-based controls (no decorative emoji).
- GPS location with explicit permission and clearer error messages.
- Manual location search using OpenStreetMap Nominatim geocoding, so the farmer can search by village, town or area rather than choosing from a fixed city list.
- NASA POWER climatology request for T2M, PRECTOTCORR and RH2M at the selected coordinates.
- Crop selector and three rotation strategy comparison cards.
- LandMatch map centred on the selected location, adjustable search radius and distance calculations from that location.
- Browser speech synthesis and speech recognition where supported.

## Important limitations
- GPS works only on HTTPS or localhost and requires browser permission.
- Browser speech recognition and installed voices vary by device. Moroccan Darija recognition and Darija text-to-speech are not guaranteed by browser APIs. For dependable production voice, connect a tested speech service that explicitly supports Moroccan Darija.
- NASA POWER values are regional climatology, not field-level soil measurements. Annual rainfall shown here is an annualized estimate from the climatological daily mean (PRECTOTCORR × 365).
- LandMatch map and distances are centred on the selected location, but the displayed nearby parcels are generated demo examples, not real rental listings. A real marketplace requires a database and verified landowner listings.
- Rotation cards are educational comparison concepts, not agronomic recommendations validated for a particular farm.
- Nominatim is a public geocoding service; use responsibly and consider a dedicated provider for production traffic.
