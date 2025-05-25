"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import { ResponsiveLogo } from "@/components/responsive-logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <ResponsiveLogo size="md" showText={true} interactive={false} className="justify-center mb-4" />
          <CardTitle className="text-2xl">页面未找到</CardTitle>
          <CardDescription>抱歉，您访问的页面不存在</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <p className="text-muted-foreground mb-6">页面可能已被移动或删除</p>
          </div>

          <div className="space-y-2">
            <Button className="w-full" onClick={() => (window.location.href = "/")}>
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              <Search className="w-4 h-4 mr-2" />
              返回上页
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
