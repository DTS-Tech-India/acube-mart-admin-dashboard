

import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  ShoppingCart,
  Box,
  ReceiptIndianRupee,
  ScanLineIcon,
  Wallet
} from "lucide-react"
import { cn } from "@/lib/utils";
import { RadialChartComponent } from "@/components/radial-chart";
import { AreaChartComponent } from "@/components/area-chart";

export default function Dashboard() {

  const quickCards = [
    {
      title: "Total Revenue",
      value: 75000,
      icon: ReceiptIndianRupee,
      percentage: 36,
      color: "text-green-800",
      bg: "bg-green-200",
      valueCurrency: "$",
    },
    {
      title: "Total Sales",
      value: 3150,
      icon: ShoppingCart,
      percentage: 10,
      color: "text-indigo-800",
      bg: "bg-indigo-200",
    },
    {
      title: "Products",
      value: 1390,
      icon: Box,
      percentage: 5,
      color: "text-red-800",
      bg: "bg-red-200",
    },
    {
      title: "Balance",
      value: 113,
      icon: Wallet,
      percentage: 8,
      color: "text-orange-800",
      bg: "bg-orange-200",
      valueCurrency: "$",
    },
  ]


  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center gap-4">
      {/* Header Menu */}
      <header className="flex flex-wrap items-center justify-between  w-full">
        <Tabs defaultValue="all time" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all time">All Time</TabsTrigger>
            <TabsTrigger value="12 months">12 Months</TabsTrigger>
            <TabsTrigger value="30 days">30 Days</TabsTrigger>
            <TabsTrigger value="7 days">7 Days</TabsTrigger>
            <TabsTrigger value="24 hours">24 Hours</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="all time">All Time Data.</TabsContent>
          <TabsContent value="12 months">12 Months Data.</TabsContent>
          <TabsContent value="30 days">30 Days Data.</TabsContent>
          <TabsContent value="7 days">7 Days Data.</TabsContent>
          <TabsContent value="24 hours">24 Hours Data.</TabsContent> */}
        </Tabs>
        <div className="flex flex-wrap items-center gap-2">
          <DatePickerWithRange />
          <Button className="bg-violet-500">+ Add Products</Button>
        </div>
      </header>
      {/* Quick Details Cards */}
      <div className="w-full flex flex-wrap justify-between gap-4">
      {quickCards.map((card) => (
        <Card key={card.title} className="aspect-[16/9] w-full max-w-64">
          <CardHeader>
            <card.icon className={cn("w-10 h-10 p-2 rounded-full", card.bg, card.color)} />
          </CardHeader>
          <CardContent className="flex flex-col">
            <h2 className="text-sm text-muted-foreground">{card.title}</h2>
            <div className="flex gap-1">
              <p className="text-2xl font-bold">{card?.valueCurrency}{card.value}</p>
              <span className={cn("text-xs p-1 rounded-full mb-auto", card.color, card.bg)}>+ {card.percentage}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <RadialChartComponent />
        <AreaChartComponent />
      </div>
      
    </main>
  );
}
