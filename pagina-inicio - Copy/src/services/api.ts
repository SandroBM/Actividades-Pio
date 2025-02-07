//Consumo de la api//
import axios from 'axios';
import { League, Match, Team } from '../types/api';


const api = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
  'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
});

export const getLeagues = async (): Promise<League[]> => {
  const response = await api.get('/leagues');
  return response.data.response;
};

export const getTodayMatches = async (): Promise<Match[]> => {
  const today = new Date().toISOString().split('T')[0];
  const response = await api.get('/fixtures', {
    params: { date: today }
  });
  return response.data.response;
};

export const getTeams = async (league?: number): Promise<Team[]> => {
  const response = await api.get('/teams', {
    params: league ? { league } : {}
  });
  return response.data.response;
};