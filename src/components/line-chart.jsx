"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Skeleton } from "./ui/skeleton"
export const description = "A line chart with dots"

const chartConfig = {
  amount: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  }
}

export function LineChartComponent() {
  const {data: ordersList, isLoadingOrdersList, isErrorOrdersList} = useQuery({
    queryKey: ["ordersList"],
    queryFn: async() => await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/all`)
    .then((res) => res.data),
  })

  const modifiedData = useMemo(() => {
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return date.toLocaleString("default", { month: "long" })
    }).reverse()

    const data = ordersList?.data?.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "long",
      })
      if (lastSixMonths.includes(month)) {
        acc[month] = (acc[month] || 0) + order.total
      }
      return acc
    }, {})

    return lastSixMonths.map((month) => ({
      month,
      amount: data?.[month] || 0,
    })).sort((a, b) => new Date(a.month) - new Date(b.month))
  }, [ordersList])
  //console.log(modifiedData)
  return (
    <>
    {isLoadingOrdersList || isErrorOrdersList || !modifiedData ? (
      <Skeleton className="w-full h-60" />
    ): (
    <Card className="flex flex-col w-full max-w-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue</CardTitle>
        <CardDescription>{modifiedData[0].month} - {modifiedData[5].month} {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <LineChart
            accessibilityLayer
            data={modifiedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-amount)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Revenue of last 6 months <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing Revenue for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  )}
    </>
  )
}
