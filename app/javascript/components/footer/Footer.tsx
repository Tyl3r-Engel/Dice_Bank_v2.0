import React from "react"
import { useNavigate } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()
  return(
    <footer className="footer">
      {/* personal info -> <address> goes in here </address> https://www.w3schools.com/tags/tag_address.asp*/}
      <div className="footer-img-container rainbow-bg-hover">
        <img
          className="footer-logo-img"
          src="http://localhost:3000/api/assets/images/logo2.png"
          alt="logo"
          loading="lazy"
          onClick={() => navigate("/")}
        />
      </div>

    </footer>
  )
}