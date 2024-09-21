"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"
/* const chartData = [
  { date: "2024-06-28", order: 149, user: 200 },
  { date: "2024-06-29", order: 200, user: 300 },
] */

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  order: {
    label: "Order",
    color: "hsl(var(--chart-1))",
  },
  user: {
    label: "User",
    color: "hsl(var(--chart-2))",
  },
}

export function AreaChartComponent() {
  const {data: ordersList, isLoadingOrdersList, isErrorOrdersList} = useQuery({
    queryKey: ["ordersList"],
    queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/all`)
    .then((res) => res.data),
  })
  //console.log(ordersList)

  const {data: users, isLoadingUsers, isErrorUsers} = useQuery({
    queryKey: ["users"],
    queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`)
    .then((res) => res.data),
  })
  //console.log(users)

  const modifiedData = React.useMemo(() => {
    //array of objects contaning date and number of orders and  users
    const dates = [
      ...(ordersList?.data?.map((item) => item.createdAt) || []),
      ...(users?.data?.map((item) => item.createdAt) || []),
    ]
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b))

    return uniqueDates.map((date) => {
      const order = ordersList?.data.filter(
        (order) => new Date(order.createdAt) <= new Date(date)
      ).length
      const user = users?.data.filter(
        (user) => new Date(user.createdAt) <= new Date(date)
      ).length
      return {
        date: date.split("T")[0],
        order,
        user,
      }
    })
  }, [ordersList, users])
  //console.log(modifiedData)
  
  const [timeRange, setTimeRange] = React.useState("365d")

  const filteredData = modifiedData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 365
    if (timeRange === "90d") {
      daysToSubtract = 90
    } else if (timeRange === "60d") {
      daysToSubtract = 60
    } else if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <>
    {isLoadingOrdersList || isErrorOrdersList || isLoadingUsers || isErrorUsers || !modifiedData ? (
      <Skeleton className="h-60 w-full" />
    ):(
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Total Orders and Users</CardTitle>
          <CardDescription>
            Showing total orders over time with respect to total users
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 1 year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="365d" className="rounded-lg">
              Last 1 year
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="60d" className="rounded-lg">
              Last 2 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 1 month
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 w-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOrder" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-order)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-order)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillUser" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-user)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-user)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="user"
              type="natural"
              fill="url(#fillUser)"
              stroke="var(--color-user)"
              stackId="a"
            />
            <Area
              dataKey="order"
              type="natural"
              fill="url(#fillOrder)"
              stroke="var(--color-order)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )}
    </>
  )
}
