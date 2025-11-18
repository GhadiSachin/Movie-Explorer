# Movie Explorer — React + Vite

A small Movie Explorer app that uses **TMDB (The Movie Database)** API to search and browse trending movies.
Features:
- Trending (week) listing
- Search by title
- Load more pagination
- Favorites stored in localStorage
- Lightweight, Vite + React

---
Screenshots:
<img width="1692" height="952" alt="Screenshot 2025-11-18 at 10 34 07 AM" src="https://github.com/user-attachments/assets/5761bbef-1851-4f0f-978a-69b9051fb502" />
<img width="1692" height="952" alt="Screenshot 2025-11-18 at 10 34 26 AM" src="https://github.com/user-attachments/assets/eab59ecb-6145-4096-96c6-9a3cd22b216e" />

<img width="1692" height="952" alt="Screenshot 2025-11-18 at 10 34 56 AM" src="https://github.com/user-attachments/assets/26942316-7b31-496a-b4ad-0329a2442d05" />
<img width="1692" height="952" alt="Screenshot 2025-11-18 at 10 35 51 AM" src="https://github.com/user-attachments/assets/b192ed97-87cd-45ae-a51a-2f6b3b5ad6f0" />

## Setup

1. Clone or extract the project:

```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

2. Copy `.env.example` to `.env` and add your TMDB API key:

```bash
cp .env.example .env
# Edit .env and set VITE_TMDB_KEY to your TMDB API key
```

Get an API key from https://www.themoviedb.org/settings/api

3. Install dependencies:

```bash
npm install
```

4. Run dev server:

```bash
npm run dev
```

Open the URL shown by Vite (typically http://localhost:5173)

---

## Build

```bash
npm run build
npm run preview
```

---

## Notes

- The app expects `VITE_TMDB_KEY` in the environment. If missing it will show an alert.
- You can extend the app with routing, detailed movie pages, and improved UI/UX.

---

## License

Open-source — use for learning and interview practice.
