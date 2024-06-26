

import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center">
      <header className="flex items-center justify-between w-full my-2">
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
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Button className="bg-indigo-500">+ Add Products</Button>
        </div>
      </header>
    </main>
  );
}
