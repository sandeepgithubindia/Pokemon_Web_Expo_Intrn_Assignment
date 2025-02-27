# Pokemon Explorer

## 🚀 Overview
Pokemon Explorer is a responsive web app built with **Next.js** that fetches data from the **PokeAPI**. Users can browse Pokémon, search for their favorites, and view detailed stats, abilities, and types.

## 🛠 Tech Stack
- **Next.js** (React Framework)
- **TypeScript** (Optional)
- **Tailwind CSS** (For styling)
- **PokeAPI** (Data source)

## 🎯 Features
### Homepage
- Displays a list of Pokémon fetched from PokeAPI
- Implements a **search bar** to filter Pokémon by name
- Responsive **card layout** with images and details

### Detail Page
- Click on a Pokémon to navigate to its detailed page
- Shows Pokémon **image, type, abilities, and stats**
- Styled using **Tailwind CSS**

### Performance Optimization
- Uses **Next.js dynamic routes** (`/pokemon/[id]`)
- Implements **Server-Side Rendering (SSR) / Static Site Generation (SSG)** for improved performance

## 📂 Project Structure
```
/pokemon-explorer
│── /src
│   ├── /app
│   │   ├── page.tsx (Homepage)
│   │   ├── /pokemon
│   │   │   ├── [id].tsx (Pokemon Detail Page)
│   ├── /components
│   │   ├── PokemonCard.tsx
│   ├── /styles
│── .env
│── .gitignore
│── package.json
│── README.md
```

## 🛠 Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/sandeepgithubindia/Pokemon_Explorer_Internship_Assigment.git
   cd pokemon-explorer
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file and add:
   ```env
   NEXT_PUBLIC_POKEAPI_URL=https://pokeapi.co/api/v2/pokemon
   ```

4. **Run the development server**:
   ```sh
   npm run dev
   ```

5. Open **http://localhost:3000** in your browser.

## 📌 Deployment
To deploy the project on **Vercel**, run:
```sh
vercel
```
Or deploy manually via **Netlify** or **GitHub Pages**.

## 📜 License
This project is licensed under the **MIT License**.

---
### ⭐ Feel free to contribute, fork, and star this project!
🚀 Happy Coding!




