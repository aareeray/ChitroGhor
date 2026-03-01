"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../config/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
async function seedBengaliFilms() {
    if (!TMDB_API_KEY) {
        console.error('TMDB_API_KEY is not set in environment variables.');
        return;
    }
    try {
        console.log('Fetching Bengali films from TMDB...');
        const response = await axios_1.default.get(`${TMDB_BASE_URL}/discover/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                with_original_language: 'bn',
                sort_by: 'popularity.desc',
                page: 1
            }
        });
        const films = response.data.results;
        console.log(`Found ${films.length} films on page 1 of TMDB.`);
        for (const film of films) {
            // Upsert film to avoid duplicates
            await db_1.prisma.film.create({
                data: {
                    title_en: film.title,
                    title_bn: film.original_title,
                    type: 'FILM',
                    release_year: film.release_date ? parseInt(film.release_date.substring(0, 4)) : null,
                    synopsis_en: film.overview,
                    poster: film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : null,
                    // Placeholder for OTT and detailed metadata which might require generic queries
                    ott_platforms: [],
                }
            });
        }
        console.log('Successfully seeded Bengali films.');
    }
    catch (error) {
        console.error('Error seeding TMDB films:', error);
    }
}
seedBengaliFilms()
    .then(() => db_1.prisma.$disconnect())
    .catch((e) => {
    console.error(e);
    db_1.prisma.$disconnect();
    process.exit(1);
});
