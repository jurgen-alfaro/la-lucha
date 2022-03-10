import { useContext } from "react";
import { createContext, useState } from "react";
import LoginContext from "../login/LoginContext";
const SuggestionContext = createContext();

export const SuggestionProvider = ({ children }) => {
  const { user } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({});

  /*   useEffect(() => {
    fetchSuggestions();
  }, []); */

  // Fetch suggestions from DB
  const getSuggestions = async () => {
    setIsLoading(true);
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

  // Get suggestion by ID
  const getSuggestion = async (id) => {
    setIsLoading(true);
    const response = await fetch(`/api/suggestions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    setSuggestion(data.suggestion[0]);
    setIsLoading(false);
  };

  // Add suggestion to DB
  const addSuggestion = async (newSuggestion) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSuggestion),
      });

      const data = await response.json();

      setSuggestions([data, ...suggestions]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("Error al agregar sugerencia");
    }
  };

  // Update suggestion to DB
  const updateSuggestion = async (suggestion) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/suggestions/${suggestion.idsuggestions}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(suggestion),
        }
      );

      const data = await response.json();

      setIsLoading(false);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error al actualizar sugerencia: ${suggestion}`);
    }
  };

  return (
    <SuggestionContext.Provider
      value={{
        suggestions,
        addSuggestion,
        isLoading,
        getSuggestions,
        getSuggestion,
        suggestion,
        setSuggestion,
        updateSuggestion,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
};

export default SuggestionContext;
