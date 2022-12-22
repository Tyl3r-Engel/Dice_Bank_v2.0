// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// import "@hotwired/turbo-rails"
// import "controllers"


import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AppProvider } from "./contexts/AppProvider"
import { BrowserRouter } from "react-router-dom"

const root = createRoot(document.getElementById("root"))
const appWithContext = () => (
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
)
root.render(appWithContext())