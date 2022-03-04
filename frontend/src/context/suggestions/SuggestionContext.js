import { useContext } from "react";
import { createContext, useState } from "react";
import LoginContext from "../login/LoginContext";
const SuggestionContext = createContext();

export const SuggestionProvider = ({ children }) => {
  const { user } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  /*   useEffect(() => {
    fetchSuggestions();
  }, []); */

  // Fetch suggestions from DB
  const fetchSuggestions = async () => {
    const response = await fetch("/api/suggestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    setSuggestions(data.suggestions);
    setIsLoading(false);
  };

  // Add suggestion to DB
  const addSuggestion = async (newSuggestion) => {
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSuggestion),
      });

      const data = await response.json();

      setSuggestions([data, ...suggestions]);
    } catch (error) {
      console.log(error);
      throw new Error("Error al agregar sugerencia");
    }
  };

  return (
    <SuggestionContext.Provider
      value={{ suggestions, addSuggestion, isLoading, fetchSuggestions }}
    >
      {children}
    </SuggestionContext.Provider>
  );
};

export default SuggestionContext;
