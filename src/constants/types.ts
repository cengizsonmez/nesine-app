export interface Match {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: string;
  MBS: string
  OCG: OcgItem[];
}

export interface OcgItem {
  ID: string;
  N: string;
  MBS: string;
  SO: string;
  oc: OcItem[];
}

export interface OcItem {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: string;
  IMF: string;
}

export interface CellInfo {
  title: string;
  ocg: string;
  oc: string;
}

export interface SelectedOdds {
  [matchId: string]: {
    matchName: string;
    mbs: string;
    oddType: string;
    oddValue: string;
  };
}

export interface MatchContextType {
  matches: Match[];
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  selectedOdds: SelectedOdds;
  selectOdd: (match: Match, oddType: string, oddValue: string) => void;
  getTotalOdds: () => string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}