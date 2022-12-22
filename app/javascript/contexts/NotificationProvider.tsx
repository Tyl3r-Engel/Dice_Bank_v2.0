import React, { createContext, useState, useEffect } from "react"
import useApp from "../hooks/useApp"
import { createConsumer } from "@rails/actioncable"

export interface UserNotification {
	id: number
}

export interface NotificationContextTypes {
  notificationList: UserNotification[]
	setNotificationList: React.Dispatch<React.SetStateAction<UserNotification[]>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	notificationChannel: any
}

const defaultNotificationList: UserNotification[] = []
const setNotificationList = ( (() => { return }) as React.Dispatch<React.SetStateAction<UserNotification[]>> )

const NotificationContext = createContext<NotificationContextTypes>({
  notificationList: defaultNotificationList,
  setNotificationList,
  notificationChannel: null
})

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const { user } = useApp()
	const [consumer] = useState(createConsumer("http://localhost:3000/cable"))
	const [notificationChannel, setNotificationChannel] = useState()
	const [notificationList, setNotificationList] = useState<UserNotification[]>(defaultNotificationList)

	const notificationSub = () => {
		const notificationChannel = consumer.subscriptions.create(
			{ channel: "NotificationChannel", room_id: user.id },
			{
				received(data) {
					setNotificationList(prev => [...prev, data])
				}
			}
		)
		setNotificationChannel(notificationChannel)
	}

  useEffect(() => {
    notificationSub()
	},[])

  return (
    <NotificationContext.Provider value={{ notificationList, setNotificationList, notificationChannel }} >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext