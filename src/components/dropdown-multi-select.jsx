"use client"
 
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
 
 
export function DropdownMultiSelect({modules, setModules, value}) {
  const [selectAadhar, setSelectAadhar] = React.useState(value?.aadhaar)
  const [selectAyushman, setSelectAyushman] = React.useState(value?.ayushman)
  const [selectEpic, setSelectEpic] = React.useState(value?.epic)

  const handleAadharChange = () => {
      setSelectAadhar(!selectAadhar)
      setModules({
        ...modules,
        aadhaar: !modules.aadhaar
      })
      //console.log(modules)
    }

    const handlePanChange = () => {
      setSelectPan(!selectPan)
      setModules({
          ...modules,
          ayushman: !modules.ayushman
      })
      //console.log(modules)
    }
    const handleEpicChange = () => {
        setSelectEpic(!selectEpic)
        setModules({
            ...modules,
            epic: !modules.epic
        })
        //console.log(modules)
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-6 text-md rounded-xl">Select</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Modules</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectAadhar}
            onCheckedChange={setSelectAadhar}
          />
         <Label>Aadhar</Label> 
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectAyushman}
            onCheckedChange={setSelectAyushman}
          
          />
          <Label>Ayushman</Label>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <Checkbox
                checked={selectEpic}
                onCheckedChange={setSelectEpic}
            />
          <Label>EPIC</Label>
        </div>
        
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}