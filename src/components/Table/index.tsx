/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useContext } from "react";
import { MatchContext } from "../../context";
import { getMatches } from "../../utils/api";
import "./styles.scss";
import { CellInfo } from "../../constants/types";
import { CellAddress } from "../../constants/cellAddress";

const Table: React.FC = () => {
  const context = useContext(MatchContext);

  if (!context) {
    return <div>Loading context...</div>;
  }

  const { matches, setMatches, selectOdd, selectedOdds, loading, setLoading } =
    context;

  useEffect(() => {
    setLoading(true);
    getMatches()
      .then((matches) => {
        setMatches(matches);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setMatches, setLoading]);

  const getCellStyle = (matchId: string, oddType: string) => {
    return selectedOdds[matchId]?.oddType === oddType
      ? { backgroundColor: "yellow" }
      : {};
  };

  const renderCell = (match: any, oddType: string, cellInfo: CellInfo) => {
    const oddValue = match.OCG[cellInfo.ocg]?.OC[cellInfo.oc]?.O || "N/A";
    const isNA = oddValue === "N/A";
    const matchId = match.C;

    return (
      <td
        key={`${oddType + "_" + matchId}`}
        style={getCellStyle(matchId, oddType)}
        onClick={() => !isNA && selectOdd(match, oddType, oddValue)}
        className={isNA ? "na" : ""}
      >
        {oddValue}
      </td>
    );
  };

  return !loading ? (
    <div className="scrollable-table">
      <table>
        <thead>
          <tr className="sticky-header">
            <th className="pinnedColumn">{`Event Count: ${matches.length}`}</th>
            <th>Yorumlar</th>
            <th>{"" /*match.MBS*/}</th>
            {Object.entries(CellAddress).map(([key, cellInfo]) => (
              <th key={key + "_th"}>{cellInfo.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <React.Fragment key={match.C}>
              <tr key={index + "_firstRow"}>
                <td className="firstCell pinnedColumn">
                  {`${match.D + " " + match.DAY + " " + match.LN}`}
                </td>
                <td>Yorumlar</td>
                <td>{"" /*match.MBS*/}</td>
                {Object.entries(CellAddress).map(([key, cellInfo]) => (
                  <th key={key + "_header"}>{cellInfo.title}</th>
                ))}
              </tr>
              <tr key={index + "_secondRow"}>
                <td className="firstCell pinnedColumn">
                  <strong>{match.C}</strong>
                  {`${" " + match.T + " " + match.N}`}
                </td>
                <td>Yorumlar</td>
                <td>{match.MBS}</td>
                {Object.entries(CellAddress).map(([key, cellInfo]) =>
                  renderCell(match, key, cellInfo)
                )}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="loadingContainer">
      <span className="loadingText">Fetching data</span>
    </div>
  );
};

export default Table;
