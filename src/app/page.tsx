"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        const detailedPokemonData = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const detailsRes = await fetch(pokemon.url);
            return detailsRes.json();
          })
        );

        setPokemons(detailedPokemonData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
        Pokémon Explorer
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="p-3 w-full max-w-md rounded-lg text-black focus:ring-2 focus:ring-yellow-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              <h2 className="text-xl text-center font-semibold mt-3 capitalize">
                {pokemon.name}
              </h2>
              <div className="flex justify-center space-x-2 mt-2">
                {pokemon.types.map((t, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-gray-900">
                    {t.type.name}
                  </span>
                ))}
              </div>
              <p className="text-center mt-2 text-sm text-gray-400">
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
