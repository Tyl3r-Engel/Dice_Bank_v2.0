import React, { createContext, useState, useEffect } from "react"
import useApp from "../hooks/useApp"
import useApiCall from "../hooks/useApiCall"

export type imgUrlsType = { thumbnail: string }
export interface Service {
	id: number,
	title: string,
	description: string,
	blurb: string,
	img_urls: imgUrlsType
}

const serviceList: Service[] = []
const HomePageContext = createContext({ serviceList })

// eslint-disable-next-line react/prop-types
export const HomePageProvider = ({ children }) => {
	const { isLoading, setIsLoading } = useApp()
	const [serviceList, setServiceList] = useState<Service[]>([])
	const apiCall = useApiCall()

	const getAllServices = async () => {
		const [data] = await apiCall({method: "get", route: "/services"})
		const fetchedServiceList: Service[] = data.map(
			({ id, attributes: {title, description, blurb, img_urls} }) => ({id, title, description, blurb, img_urls})
		)

		setServiceList(fetchedServiceList)
	}

	useEffect(() => {
		setIsLoading(true)
		getAllServices().then(() => setIsLoading(false))
	},[])

	if (isLoading) return <div style={{ height: "700px" }}>loading</div>
  return (
    <HomePageContext.Provider value={{ serviceList }} >
      {children}
    </HomePageContext.Provider>
  )
}

export default HomePageContext