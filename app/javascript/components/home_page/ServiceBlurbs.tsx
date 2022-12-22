import React, { useEffect, useState } from "react"
import useHomePage from "../../hooks/useHomePage"
import { Service } from "../../contexts/HomePageProvider"
import { Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface PropTypes { serviceList?: Service[] }
export default function ServiceBlurbs(props: PropTypes) {
	const { serviceList: homePageList } = useHomePage()
	const [serviceList, setServiceList] = useState<Service[]>(props.serviceList || homePageList)

	useEffect(() => { if(homePageList.length != 0 && !props.serviceList) setServiceList(homePageList)},[homePageList])

  return (
    <>
      <div className="services-title">
        <strong>Account Types</strong>
      </div>
      <div className="service-card-container">
        {
          serviceList.map((element: Service, index: number) => (
              <ServiceCard
								key={index}
								service={element}
							/>
            )
          )
        }
      </div>
    </>
  )
}

interface CardPropTypes { service: Service }
function ServiceCard({ service }: CardPropTypes) {
	const navigate = useNavigate()
	const handleClick = () => navigate(`/service/${service.title}`, { state: { service } })

	return (
		<Paper elevation={10} className="service-card" sx={{ background: "#ebe8ee"}}>
			<div className="service-card-thumbnail-container">
				{
					Object.keys(service.img_urls).length != 0 && (
						<img
							className="service-card-thumbnail hover"
							src={service.img_urls.thumbnail}
							alt="thumbnail Img"
							loading="lazy"
							onClick={handleClick}
						/>
					)
				}
			</div>

			<div className="service-card-text-container hover" onClick={handleClick}>
				<div className="service-card-title">
					{service.title}
				</div>
				{service.blurb}
			</div>
		</Paper>
	)
}