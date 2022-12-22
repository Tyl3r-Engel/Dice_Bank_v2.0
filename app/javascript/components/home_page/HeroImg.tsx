import React from "react"
import Paper from "@mui/material/Paper"

export default function HeroImg() {
  const highlight = (s: string) => (<div className="text-highlight">{s}</div>)

  return (
    <div className="hero-img-container">
      <Paper elevation={12} sx={{ position: "relative"}}>
        <div className="hero-img-text-positioner">
          <div className="hero-img-text-container">
            <div className="hero-img-text">
                A {highlight("SIMPLE")} and {highlight("EASY")} alternative<br/>
                for Sending, Receiving, and Investing<br/>
                your {highlight("MONEY")}
            </div>
          </div>
        </div>

        <img
          src="https://images.pexels.com/photos/5638612/pexels-photo-5638612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="hero-img"
          className="hero-img"
          loading="eager"
        />
      </Paper>
    </div>
  )
}