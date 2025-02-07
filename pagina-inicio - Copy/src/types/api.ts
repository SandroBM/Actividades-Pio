
//interfaces que representan cada dato de la api//
export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
}

export interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      long: string;
    };
    venue: {
      name: string;
      city: string;
    };
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  league: League;
}