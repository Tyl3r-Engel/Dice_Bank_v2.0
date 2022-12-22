import { useContext } from "react"
import NotificationContext, { NotificationContextTypes } from "../contexts/NotificationProvider"

export default function useHomePage() {
  const { notificationList, setNotificationList, notificationChannel }: NotificationContextTypes = useContext(NotificationContext)
  return { notificationList, setNotificationList, notificationChannel }
}