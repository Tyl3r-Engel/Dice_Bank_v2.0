import React from "react"
import useDash from "../../../hooks/useDash"
import useNotification from "../../../hooks/useNotification"

export default function Dashboard() {
  const { accountList, user } = useDash()
  const { notificationList, setNotificationList, notificationChannel } = useNotification()
  return (
    <div className="dash-container fade-in">

      <div className="dash-account-list-container">
        <div className="dash-greeting">
          {`Hi, ${user.displayName}`}<br />
          <div className="dash-greeting-net-worth">
            your net worth is $$$
            {/* add total of all accounts and stocks, may take a sec use a loading effect */}
          </div>
        </div>
        <br />
        <div className="dash-account-list">
          {JSON.stringify(notificationList)}
        </div>
        <button onClick={() => notificationChannel.send({ other: "data" })}>send msg</button>
      </div>

    </div>
  )
}