import { useEffect, useState } from 'react';
import { getLeagues } from '../services/api';
import { League } from '../types/api';

export default function Leagues() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Cargando ligas...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {leagues.map((league) => (
        <div key={league.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
          <img src={league.logo} alt={league.name} className="w-12 h-12 object-contain" />
          <div>
            <h3 className="font-semibold text-gray-900">{league.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <img src={league.flag} alt={league.country} className="w-4 h-4 object-contain" />
              <span>{league.country}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}