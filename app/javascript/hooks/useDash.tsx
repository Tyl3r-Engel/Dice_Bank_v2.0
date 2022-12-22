import { useContext } from "react"
import DashboardContext, { DashboardContextTypes } from "../contexts/DashboardProvider"

export default function useDash() {
  const { accountList, user }: DashboardContextTypes = useContext(DashboardContext)
  return { accountList, user }
}