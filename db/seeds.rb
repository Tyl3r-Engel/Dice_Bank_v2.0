# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#

services = Service.create([
  {
    title: "Checking Account",
    description: "A basic account for putting your money",
    blurb: "Place to store money",
    img_urls: {
      thumbnail: "/api/assets/images/checkingThumbnail.png", # 300px X 300px
      main_img: "/api/assets/images/checkingMainImage" #
    }
  },
  {
    title: "Credit Account",
    description: "A basic account credit account",
    blurb: "Yay debt",
    img_urls: { thumbnail: "/api/assets/images/checkingThumbnail.png" }
  },
  {
    title: "Investment Account",
    description: "A basic account that invests the money in it",
    blurb: "We lose your money for you, I mean \"invest\"",
    img_urls: { thumbnail: "/api/assets/images/checkingThumbnail.png" }
  },
  {
    title: "Trading Account",
    description: "A basic account for trading stocks",
    blurb: "Buy and sell stocks without fees at your leisure",
    img_urls: { thumbnail: "/api/assets/images/checkingThumbnail.png" }
  }
])

roles = Role.create([
  {
    name: "Basic User"
  },
  {
    name: "Admin"
  },
])