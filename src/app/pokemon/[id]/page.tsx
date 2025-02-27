"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

const PokemonDetail = () => {
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is correctly typed
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!pokemon) return <p className="text-white text-center">Pokémon not found.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-yellow-400 capitalize">{pokemon.name}</h1>

        {/* Optimized Pokémon Image */}
        <div className="relative w-40 h-40 mx-auto mt-4">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Pokémon Types */}
        <div className="mt-4">
          <p className="text-lg font-semibold">Type:</p>
          <div className="flex justify-center space-x-2 mt-1">
            {pokemon.types.map((t, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-green-500 text-gray-900"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pokémon Abilities */}
        <div className="mt-4">
          <p className="text-lg font-semibold">Abilities:</p>
          <p className="text-gray-300">{pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
        </div>

        {/* Pokémon Stats */}
        <div className="mt-4">
          <p className="text-lg font-semibold">Stats:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pokemon.stats.map((s, index) => (
              <div key={index} className="p-2 bg-gray-700 rounded-lg text-gray-300">
                <p className="text-sm">{s.stat.name}</p>
                <p className="text-lg font-bold">{s.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
