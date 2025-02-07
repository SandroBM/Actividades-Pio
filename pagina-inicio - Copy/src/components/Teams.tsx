import { useEffect, useState } from 'react';
import { getTeams } from '../services/api';
import { Team } from '../types/api';

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Cargando equipos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {teams.map((team) => (
        <div key={team.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain mb-3" />
          <h3 className="font-semibold text-center text-gray-900">{team.name}</h3>
          <span className="text-sm text-gray-600">{team.country}</span>
        </div>
      ))}
    </div>
  );
}