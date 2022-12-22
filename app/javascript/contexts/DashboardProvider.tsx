import React, { createContext, useState, useEffect } from "react"
import useApp from "../hooks/useApp"
import useApiCall from "../hooks/useApiCall"
import { User, defaultUser } from "./AppProvider"

export interface Account {
  id: number
  num: number
}

export interface DashboardContextTypes {
	accountList: Account[]
	user: User
}

const defaultAccountList: Account[] = []

const DashboardContext = createContext<DashboardContextTypes>(
	{
		accountList: defaultAccountList,
		user: defaultUser
	}
)

// eslint-disable-next-line react/prop-types
export const DashboardProvider = ({ children }) => {
	const { isLoading, setIsLoading, user } = useApp()
  const [accountList, setAccountList] = useState<Account[]>(defaultAccountList)
	const apiCall = useApiCall()

	const getAllAccounts = async () => {
		// const [data] = await apiCall({method: "get", route: `/${user.id}/account/all`})
		// const fetchedServiceList: Service[] = data.map(
		// 	({ id, attributes: {title, description, blurb, img_urls} }) => ({id, title, description, blurb, img_urls})
		// )
	}

	useEffect(() => {
		setIsLoading(true);
		(
			async () => {
				getAllAccounts()
			}
		)().then(() => setIsLoading(false))
	},[])

	if (isLoading) return <div style={{ height: "700px" }}>loading</div>
  return (
    <DashboardContext.Provider value={{ accountList, user }} >
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardContext