import React, { createContext, useState, ReactNode, Context } from "react";
import { Match, MatchContextType, SelectedOdds } from "../constants/types";

export const MatchContext: Context<MatchContextType | null> =
  createContext<MatchContextType | null>(null);

interface MatchProviderProps {
  children: ReactNode;
}

export const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedOdds, setSelectedOdds] = useState<SelectedOdds>({});
  const [loading, setLoading] = useState<boolean>(false);

  const selectOdd = (match: Match, oddType: string, oddValue: string) => {
    const matchId = match.C;
    const matchName = match.N;
    const mbs = match.MBS;

    setSelectedOdds((prev) => {
      const newSelectedOdds = { ...prev };
      if (newSelectedOdds.hasOwnProperty(matchId) && newSelectedOdds[matchId].oddType === oddType) {
        delete newSelectedOdds[matchId];
      } else {
        newSelectedOdds[matchId] = {matchName,
          mbs,
          oddType,
          oddValue,};
      }
      return newSelectedOdds;
    });
  };

  const getTotalOdds = (): string => {
    const total = Object.values(selectedOdds).reduce(
      (acc, { oddValue }) => acc * parseFloat(oddValue),
      1
    );
    return total.toFixed(2);
  };

  return (
    <MatchContext.Provider
      value={{ matches, setMatches, selectedOdds, selectOdd, getTotalOdds, loading, setLoading }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;
