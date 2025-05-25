"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, MapPin, Search, Copy, ExternalLink, Wrench } from "lucide-react"

interface IPInfo {
  ip: string
  country: string
  region: string
  city: string
  isp: string
  timezone: string
  lat: number
  lon: number
}

interface DomainInfo {
  domain: string
  ip: string
  status: string
  registrar: string
  createdDate: string
  expiryDate: string
}

export function UtilitiesModule() {
  const [activeTab, setActiveTab] = useState("ip-lookup")
  const [ipInput, setIpInput] = useState("")
  const [domainInput, setDomainInput] = useState("")
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const lookupIP = async () => {
    if (!ipInput.trim()) return

    setIsLoading(true)
    try {
      // 模拟IP查询
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockIPInfo: IPInfo = {
        ip: ipInput,
        country: "中国",
        region: "北京市",
        city: "北京",
        isp: "中国电信",
        timezone: "Asia/Shanghai",
        lat: 39.9042,
        lon: 116.4074,
      }

      setIpInfo(mockIPInfo)
    } catch (error) {
      console.error("IP查询失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const lookupDomain = async () => {
    if (!domainInput.trim()) return

    setIsLoading(true)
    try {
      // 模拟域名查询
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockDomainInfo: DomainInfo = {
        domain: domainInput,
        ip: "93.184.216.34",
        status: "Active",
        registrar: "Example Registrar",
        createdDate: "2023-01-15",
        expiryDate: "2025-01-15",
      }

      setDomainInfo(mockDomainInfo)
    } catch (error) {
      console.error("域名查询失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  const getMyIP = async () => {
    setIsLoading(true)
    try {
      // 模拟获取本机IP
      await new Promise((resolve) => setTimeout(resolve, 500))
      const mockIP = "123.456.789.012"
      setIpInput(mockIP)
      await lookupIP()
    } catch (error) {
      console.error("获取IP失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">实用工具</h2>
        <p className="text-muted-foreground">包含IP查询、域名解析等网络工具集</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ip-lookup">IP地址查询</TabsTrigger>
          <TabsTrigger value="domain-lookup">域名查询</TabsTrigger>
        </TabsList>

        <TabsContent value="ip-lookup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                IP地址查询
              </CardTitle>
              <CardDescription>查询IP地址的地理位置和ISP信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="输入IP地址，如: 8.8.8.8"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button onClick={lookupIP} disabled={isLoading || !ipInput.trim()}>
                  <Search className="w-4 h-4 mr-2" />
                  查询
                </Button>
                <Button onClick={getMyIP} variant="outline" disabled={isLoading}>
                  获取我的IP
                </Button>
              </div>

              {ipInfo && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">IP地址</div>
                            <div className="font-mono text-lg">{ipInfo.ip}</div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(ipInfo.ip)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">地理位置</div>
                            <div>
                              {ipInfo.country}, {ipInfo.region}, {ipInfo.city}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div>
                          <div className="text-sm text-muted-foreground">ISP服务商</div>
                          <div>{ipInfo.isp}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div>
                          <div className="text-sm text-muted-foreground">时区</div>
                          <div>{ipInfo.timezone}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">坐标位置</div>
                          <div className="font-mono">
                            纬度: {ipInfo.lat}, 经度: {ipInfo.lon}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          在地图中查看
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain-lookup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                域名查询
              </CardTitle>
              <CardDescription>查询域名的注册信息和DNS记录</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="输入域名，如: example.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button onClick={lookupDomain} disabled={isLoading || !domainInput.trim()}>
                  <Search className="w-4 h-4 mr-2" />
                  查询
                </Button>
              </div>

              {domainInfo && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">域名</div>
                            <div className="font-mono text-lg">{domainInfo.domain}</div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(domainInfo.domain)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">IP地址</div>
                            <div className="font-mono">{domainInfo.ip}</div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(domainInfo.ip)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-sm text-muted-foreground">状态</div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800">{domainInfo.status}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div>
                          <div className="text-sm text-muted-foreground">注册商</div>
                          <div>{domainInfo.registrar}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div>
                          <div className="text-sm text-muted-foreground">注册日期</div>
                          <div>{domainInfo.createdDate}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div>
                          <div className="text-sm text-muted-foreground">到期日期</div>
                          <div>{domainInfo.expiryDate}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
