import "./styles.css";
import { useState, useEffect, useCallback } from "react";
// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

function Player() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // let's say you debounce using a delay of 300ms

  const search = async (keyword) => {
    console.log("Searching", keyword);
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          data: [`Searched for: ${keyword}`]
        });
      }, 1000)
    );
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      search(debouncedSearchQuery).then((data) => {
        console.log(debouncedSearchQuery);
        setSearchResults(data);
        console.log(searchResults);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="eg: 'Standup Comedy'"
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Player />
    </div>
  );
}
