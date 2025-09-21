import type { Profile } from "./types";

export const mockProfiles: Profile[] = [
    {
        id: "u1",
        name: "Alice Johnson",
        songs: ["Wonderwall - Oasis", "Blackbird - The Beatles", "Fast Car - Tracy Chapman"],
        instruments: ["Guitar", "Ukulele"],
        genres: ["Indie", "Folk", "Rock"],
        background: "Self-taught guitarist with 5 years of experience. Loves acoustic sessions and songwriting.",
        availability: {
            days: ["Friday", "Saturday"],
            times: ["Evenings", "Late Night"],
        },
    },
    {
        id: "u2",
        name: "Marcus Lee",
        songs: ["Take Five - Dave Brubeck", "So What - Miles Davis", "Spain - Chick Corea"],
        instruments: ["Piano", "Saxophone"],
        genres: ["Jazz", "Blues"],
        background: "Classically trained pianist who transitioned into jazz. Enjoys improvisation and jam sessions.",
        availability: {
            days: ["Wednesday", "Sunday"],
            times: ["Afternoons", "Evenings"],
        },
    },
    {
        id: "u3",
        name: "Sofia Ramirez",
        songs: ["Despacito - Luis Fonsi", "Vivir Mi Vida - Marc Anthony", "La Cumparsita - Carlos Gardel"],
        instruments: ["Vocals", "Percussion"],
        genres: ["Latin", "Pop", "World"],
        background: "Singer with roots in Latin music. Loves blending traditional rhythms with modern pop influences.",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            times: ["Mornings", "Evenings"],
        },
    },
] as const;


export const mockProfileIds = mockProfiles.map((profile) => profile.id)
