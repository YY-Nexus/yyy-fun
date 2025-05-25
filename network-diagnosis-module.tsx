"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Search, CheckCircle, XCircle, AlertTriangle, Clock, Globe, Server, Wifi, Activity, RefreshCw, Download, Copy, ExternalLink } from 'lucide-react'
import { EnergyCard } from "@/components/energy-card"
import { EnergyButton } from "@/components/energy-button"

interface DiagnosisResult {
  id: string
  timestamp: Date
  target: string
  type: "ping" | "traceroute" | "dns" | "port"
  status: "success" | "failed" | "timeout" | "partial"
  data: any
  duration: number
}

interface PingResult {
  host: string
  packets_sent: number
  packets_received: number
  packet_loss: number
  min_time: number
  max_time: number
  avg_time: number
  times: number[]
}

interface TracerouteHop {
  hop: number
  ip: string
  hostname?: string
  times: number[]
  status: "success" | "timeout" | "failed"
}

interface DNSRecord {
  type: string
  name: string
  value: string
  ttl: number
}

interface PortScanResult {
  port: number
  status: "open" | "closed" | "filtered"
  service?: string
  banner?: string
}

export function NetworkDiagnosisModule() {
  const [activeTab, setActiveTab] = useState("connectivity")
  const [target, setTarget] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<DiagnosisResult[]>([])
  const [currentResult, setCurrentResult] = useState<DiagnosisResult | null>(null)

  // 网络连通性测试
  const runConnectivityTest = async () => {
    if (!target.trim()) return

    setIsRunning(true)
    setProgress(0)
    setCurrentResult(null)

    try {
      const startTime = Date.now()
      
      // 模拟ping测试
      setProgress(20)
      const pingResult = await simulatePing(target)
      
      setProgress(60)
      // 模拟traceroute
      const tracerouteResult = await simulateTraceroute(target)
      
      setProgress(100)
      
      const result: DiagnosisResult = {
        id: `diag_${Date.now()}`,
        timestamp: new Date(),
        target,
        type: "ping",
        status: pingResult.packet_loss < 100 ? "success" : "failed",
        data: { ping: pingResult, traceroute: tracerouteResult },
        duration: Date.now() - startTime,
      }

      setCurrentResult(result)
      setResults(prev => [result, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("连通性测试失败:", error)
    } finally {
      setIsRunning(false)
      setProgress(0)
    }
  }

  // DNS解析测试
  const runDNSTest = async () => {
    if (!target.trim()) return

    setIsRunning(true)
    setProgress(0)

    try {
      const startTime = Date.now()
      
      setProgress(30)
      const dnsRecords = await simulateDNSLookup(target)
      
      setProgress(100)
      
      const result: DiagnosisResult = {
        id: `dns_${Date.now()}`,
        timestamp: new Date(),
        target,
        type: "dns",
        status: dnsRecords.length > 0 ? "success" : "failed",
        data: { records: dnsRecords },
        duration: Date.now() - startTime,
      }

      setCurrentResult(result)
      setResults(prev => [result, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("DNS测试失败:", error)
    } finally {
      setIsRunning(false)
      setProgress(0)
    }
  }

  // 端口扫描测试
  const runPortScan = async () => {
    if (!target.trim()) return

    setIsRunning(true)
    setProgress(0)

    try {
      const startTime = Date.now()
      const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995, 3389, 5432, 3306]
      const scanResults: PortScanResult[] = []

      for (let i = 0; i < commonPorts.length; i++) {
        const port = commonPorts[i]
        setProgress((i / commonPorts.length) * 100)
        
        const result = await simulatePortScan(target, port)
        scanResults.push(result)
        
        // 模拟扫描延迟
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      const result: DiagnosisResult = {
        id: `port_${Date.now()}`,
        timestamp: new Date(),
        target,
        type: "port",
        status: scanResults.some(r => r.status === "open") ? "success" : "failed",
        data: { ports: scanResults },
        duration: Date.now() - startTime,
      }

      setCurrentResult(result)
      setResults(prev => [result, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("端口扫描失败:", error)
    } finally {
      setIsRunning(false)
      setProgress(0)
    }
  }

  // 模拟函数
  const simulatePing = async (host: string): Promise<PingResult> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const times = Array.from({ length: 4 }, () => Math.random() * 100 + 10)
    const packetLoss = Math.random() > 0.9 ? Math.floor(Math.random() * 25) : 0
    
    return {
      host,
      packets_sent: 4,
      packets_received: 4 - Math.floor((packetLoss / 100) * 4),
      packet_loss: packetLoss,
      min_time: Math.min(...times),
      max_time: Math.max(...times),
      avg_time: times.reduce((a, b) => a + b, 0) / times.length,
      times,
    }
  }

  const simulateTraceroute = async (host: string): Promise<TracerouteHop[]> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const hops: TracerouteHop[] = []
    const hopCount = Math.floor(Math.random() * 10) + 5
    
    for (let i = 1; i <= hopCount; i++) {
      hops.push({
        hop: i,
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        hostname: i === hopCount ? host : `hop${i}.example.com`,
        times: Array.from({ length: 3 }, () => Math.random() * 50 + i * 10),
        status: Math.random() > 0.1 ? "success" : "timeout",
      })
    }
    
    return hops
  }

  const simulateDNSLookup = async (domain: string): Promise<DNSRecord[]> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      { type: "A", name: domain, value: "93.184.216.34", ttl: 3600 },
      { type: "AAAA", name: domain, value: "2606:2800:220:1:248:1893:25c8:1946", ttl: 3600 },
      { type: "MX", name: domain, value: "10 mail.example.com", ttl: 3600 },
      { type: "NS", name: domain, value: "ns1.example.com", ttl: 86400 },
      { type: "TXT", name: domain, value: "v=spf1 include:_spf.example.com ~all", ttl: 3600 },
    ]
  }

  const simulatePortScan = async (host: string, port: number): Promise<PortScanResult> => {
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const commonServices: { [key: number]: string } = {
      21: "FTP",
      22: "SSH",
      23: "Telnet",
      25: "SMTP",
      53: "DNS",
      80: "HTTP",
      110: "POP3",
      143: "IMAP",
      443: "HTTPS",
      993: "IMAPS",
      995: "POP3S",
      3389: "RDP",
      5432: "PostgreSQL",
      3306: "MySQL",
    }

    const isOpen = Math.random() > 0.7
    
    return {
      port,
      status: isOpen ? "open" : "closed",
      service: isOpen ? commonServices[port] : undefined,
      banner: isOpen && Math.random() > 0.5 ? `${commonServices[port]} Server v1.0` : undefined,
    }
  }

  const copyToClipboard =
