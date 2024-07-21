import React, { useContext, useState } from "react";

import "./styles.scss";
import { MatchContext } from "../../context";
import { MatchContextType } from "../../constants/types";

const Cart: React.FC = () => {
  const context = useContext<MatchContextType | null>(MatchContext);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  if (!context) {
    return <div>Loading...</div>; 
  }

  const { selectedOdds, getTotalOdds, loading } = context;

  const toggleCart = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    !loading &&
    <div className="cart">
      {Object.keys(selectedOdds).length
       ? (
        <>
          <button onClick={toggleCart} className="cartToggleButton">
            {isCollapsed ? "+" : "-"}
          </button>
          {!isCollapsed && (
            <div className="cartRowList">
              {Object.entries(selectedOdds).map(([key, item], index) => (
                <div className="cartRow" key={index}>
                  <div>{item.mbs}</div>
                  <div>Kod: {key}</div>
                  <div>Maç: {item.matchName}</div>
                  <div>
                    <strong>Oran: {item.oddValue}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="cartTotal">
            Toplam Tutar: <strong>{getTotalOdds()} TL</strong>
          </div>
        </>
      ) : (
        <div className="emptyCart">Sepetiniz boş</div>
      )}
    </div>
  );
};

export default Cart;
