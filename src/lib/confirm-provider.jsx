"use client"

import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const ConfirmContext = createContext(undefined)

export function ConfirmProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [resolver, setResolver] = useState(null)

  const confirm = useCallback((msg) => {
    return new Promise((resolve) => {
      setMessage(msg || "Are you sure you want to proceed? This action is irreversible.")
      setIsOpen(true)
      setResolver(() => resolve)
    })
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    if (resolver) resolver(false)
    handleClose()
  }, [resolver, handleClose])

  const handleConfirm = useCallback(() => {
    if (resolver) resolver(true)
    handleClose()
  }, [resolver, handleClose])

  const value = useMemo(() => ({ confirm }), [confirm])

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{message}</p>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) {
    throw new Error("useConfirm must be used within a ConfirmProvider")
  }
  return ctx.confirm
}


