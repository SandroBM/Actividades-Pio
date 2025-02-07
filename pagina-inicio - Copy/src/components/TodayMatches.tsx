import { useEffect, useState } from 'react';
import { getTodayMatches } from '../services/api';
import { Match } from '../types/api';

export default function TodayMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getTodayMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Cargando partidos...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {matches.map((match) => (
        <div key={match.fixture.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-600 mb-2">
            {new Date(match.fixture.date).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })} - {match.fixture.venue.name}, {match.fixture.venue.city}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-8 h-8 object-contain" />
              <span className="font-medium">{match.teams.home.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold">
                {match.goals.home ?? '-'} - {match.goals.away ?? '-'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium">{match.teams.away.name}</span>
              <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-8 h-8 object-contain" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {match.league.name} - {match.fixture.status.long}
          </div>
        </div>
      ))}
    </div>
  );
}