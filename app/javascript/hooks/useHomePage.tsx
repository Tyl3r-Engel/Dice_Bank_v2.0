import { useContext } from "react"
import HomePageContext, { Service } from "../contexts/HomePageProvider"

export default function useHomePage() {
  const { serviceList }: { serviceList: Service[] } = useContext(HomePageContext)
  return { serviceList }
}