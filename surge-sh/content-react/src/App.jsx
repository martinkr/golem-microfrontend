import { useState } from "react";
import "./App.css";
import tomatoSoupCanImage from "./assets/tomato-soup-can.jpg";

function App() {
  const [count, setCount] = useState(0);

  // Nachrichten an den Host senden
  function updateHeader(newCount) {
    if (window.parent && window.parent !== window) {
      parent.postMessage({ type: "cart:update", count: newCount }, "*");
    }
  }

  function add() {
    const newCount = count + 1;
    setCount(newCount);
    updateHeader(newCount);
  }

  function remove() {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    updateHeader(newCount);
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img
            src={tomatoSoupCanImage}
            alt="Condensed Tomato Soup Can (Photo by Anastasiya Badun: https://www.pexels.com/photo/condensed-tomato-soup-can-18148489/)"
            title="Condensed Tomato Soup Can (Photo by Anastasiya Badun: https://www.pexels.com/photo/condensed-tomato-soup-can-18148489/"
            className="product-img"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">Campbell's Tomatensuppe</h1>
          <p className="product-description">
            Ein ikonisches Stück Pop-Art-Geschichte in Ihrer Küche! Diese
            klassische Campbell's Tomatensuppe bringt nicht nur kulinarische
            Genüsse, sondern auch ein Stück kulturelles Erbe auf Ihren Tisch.
            Sie inspirierte Andy Warhols zu seinem legendärem Werk "Campbell's
            Soup Cans" aus dem Jahr 1962, das die Konsumkultur revolutionierte
            und die Suppendose zu einem Symbol der Pop-Art machte. Jede Dose ist
            ein Statement.
            <br />
            <br />
            <small>
              Photo by Anastasiya Badun:
              https://www.pexels.com/photo/condensed-tomato-soup-can-18148489/
            </small>
          </p>
          <div className="product-actions">
            <button
              className="action-button remove-button"
              onClick={remove}
              disabled={count === 0}
              aria-label="Remove from cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="quantity-display">{count}</span>
            <button
              className="action-button add-button"
              onClick={add}
              aria-label="Add to cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
