export interface Character {
    id: string;
    name: string;
    birthYear: string;
    species: Species;
    homeworld: Homeworld;
}

export interface Species {
    name: string;
    classification: string;
    designation: string;
    averageHeight: string;
    averageLifespan: string;
}

export interface Homeworld {
    name: string;
    rotationPeriod: string;
    orbitalPeriod: string;
    diameter: string;
    climate: string;
    terrain: string;
    surfaceWater: string;
    population: string;
}

export interface Film {
    title: string;
    episodeId: number;
    openingCrawl: string;
    director: string;
    producer: string;
    releaseDate: string;
}