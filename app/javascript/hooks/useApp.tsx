import { useContext } from "react"
import AppContext, { AppContextTypes } from "../contexts/AppProvider"

export default function useHomePage() {
  const { isLoading, setIsLoading, screenSize, user, setUser }: AppContextTypes = useContext(AppContext)
  return { isLoading, setIsLoading, screenSize, user, setUser }
}