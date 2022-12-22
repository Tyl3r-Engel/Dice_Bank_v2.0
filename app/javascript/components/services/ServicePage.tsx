import { Button, FormControl, FormHelperText, Input, InputLabel, Modal, Paper } from "@mui/material"
import React, { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

//todo pull out service page form to it's own component
export default function ServicePage() {
  const { state: { service } } = useLocation()
  const focusRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [disclaimerError, setDisclaimerError] = useState<boolean>(false)

  const handleDisclaimerInput = () => setDisclaimerError(!disclaimerError)
  const handleModal = () => setIsModalOpen(!isModalOpen)
  const handleForm = (e) => {
    e.preventDefault()
    if(!disclaimerError) return
    console.log("form submit")
  }


  useEffect(() => {
    if (focusRef?.current) focusRef.current.scrollIntoView(true)
  }, [])

  return (
    <div className="service-page fade-in">
      <div ref={focusRef} className="service-page-title">{service.title}</div>

      <div className="service-page-main-container">
        <img
          src="https://via.placeholder.com/750"
          alt="service main img"
          className="service-page-main-img"
          loading="lazy"
        />
        <div className="service-page-blurb">
          <p>{service.blurb}</p>
        </div>
        <div className="service-page-description">
          <p>{service.description}</p>
        </div>
      </div>

      <div className="service-page-form-container">
        <form className="service-page-form" onSubmit={handleForm}>
          <div className="disclaimer-input-container">
            <FormControl error={!disclaimerError} required>
              <InputLabel htmlFor="disclaimer-input">Disclaimer Check</InputLabel>
              <Input
                required
                value={disclaimerError}
                onChange={handleDisclaimerInput}
                id="disclaimer-input"
                type="radio"
                aria-describedby="disclaimer-helper-text"
              />
              <FormHelperText id="disclaimer-helper-text">
                {"Selecting this means you've read and accepted the disclaimer. Found "}
                <div className="link-text hover" onClick={handleModal}>here</div>
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <Button type="submit">Add {service.title}</Button>
        </form>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleModal}
      >
        <div className="disclaimer-modal-text-container">
          <Paper elevation={24}>
            This Account is in no way connected to any monetary value.<br />
            (click out side of box to close)
          </Paper>
        </div>
      </Modal>

    </div>
  )
}