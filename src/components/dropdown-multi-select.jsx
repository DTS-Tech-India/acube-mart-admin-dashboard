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
 
 
export function DropdownMultiSelect({/* value, setValue, */ data}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" ">Select</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
            <div className="flex items-center gap-2">
            <Checkbox
                /* checked={selectAadhar}
                onCheckedChange={setSelectAadhar} */
            />
            <Label>Aadhar</Label> 
            </div>
        <DropdownMenuSeparator />
        {data && data.map((item) => (
            <>
            <div key={item._id}>
                <Checkbox />
                <Label>{item.name}</Label>
            </div>
            <DropdownMenuSeparator />
            </>
        ))}
        <div className="flex items-center gap-2">
          <Checkbox
           /*  checked={selectAyushman}
            onCheckedChange={setSelectAyushman} */
          
          />
          <Label>Ayushman</Label>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <Checkbox
                /* checked={selectEpic}
                onCheckedChange={setSelectEpic} */
            />
          <Label>EPIC</Label>
        </div>
        {data && data.map((item) => (
          <DropdownMenuCheckboxItem
            key={item._id}
            className="w-full flex gap-4"
            >
            <Checkbox />
            {item.name}
          </DropdownMenuCheckboxItem>
        ))} 
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}