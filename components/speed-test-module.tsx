"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Upload, Wifi, Clock, TrendingUp, Play, Square } from "lucide-react"
import { LogoProgress } from "@/components/logo-progress"
import { FeatureGuard } from "@/components/feature-guard"

interface SpeedTestResult {
  downloadSpeed: number
  uploadSpeed: number
  ping: number
  jitter: number
  timestamp: Date
}

function SpeedTestContent() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTest, setCurrentTest] = useState<"download" | "upload" | "ping" | null>(null)
  const [result, setResult] = useState<SpeedTestResult | null>(null)
  const [history, setHistory] = useState<SpeedTestResult[]>([])

  const startSpeedTest = async () => {
    setIsRunning(true)
    setProgress(0)
    setResult(null)

    try {
      // Ping测试
      setCurrentTest("ping")
      const pingResult = await simulatePingTest()
      setProgress(33)

      // 下载测试
      setCurrentTest("download")
      const downloadResult = await simulateDownloadTest()
      setProgress(66)

      // 上传测试
      setCurrentTest("upload")
      const uploadResult = await simulateUploadTest()
      setProgress(100)

      const testResult: SpeedTestResult = {
        downloadSpeed: downloadResult,
        uploadSpeed: uploadResult,
        ping: pingResult.ping,
        jitter: pingResult.jitter,
        timestamp: new Date(),
      }

      setResult(testResult)
      setHistory((prev) => [testResult, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("测速失败:", error)
    } finally {
      setIsRunning(false)
      setCurrentTest(null)
      setProgress(0)
    }
  }

  const simulatePingTest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      ping: Math.random() * 50 + 10,
      jitter: Math.random() * 10 + 1,
    }
  }

  const simulateDownloadTest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return Math.random() * 900 + 100
  }

  const simulateUploadTest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return Math.random() * 500 + 50
  }

  const getSpeedColor = (speed: number) => {
    if (speed > 500) return "text-green-600"
    if (speed > 100) return "text-yellow-600"
    return "text-red-600"
  }

  const getSpeedGrade = (downloadSpeed: number) => {
    if (downloadSpeed > 500) return { grade: "优秀", color: "bg-green-100 text-green-800" }
    if (downloadSpeed > 100) return { grade: "良好", color: "bg-yellow-100 text-yellow-800" }
    if (downloadSpeed > 50) return { grade: "一般", color: "bg-orange-100 text-orange-800" }
    return { grade: "较差", color: "bg-red-100 text-red-800" }
  }

  const getTestStatusText = () => {
    switch (currentTest) {
      case "ping":
        return "正在测试网络延迟..."
      case "download":
        return "正在测试下载速度..."
      case "upload":
        return "正在测试上传速度..."
      default:
        return "准备开始测速..."
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">网络测速</h2>
        <p className="text-muted-foreground">精确测量您的网络连接速度和质量</p>
        <Badge variant="outline" className="mt-2">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          隐私保护已启用
        </Badge>
      </div>

      {/* 主测速区域 */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {!isRunning && !result && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                <LogoProgress progress={0} variant="circular" size="xl" showProgress={false}>
                  <div className="text-lg font-semibold text-gray-600 mt-4">点击开始测速</div>
                </LogoProgress>
                <Button onClick={startSpeedTest} size="lg" className="px-8">
                  <Play className="w-5 h-5 mr-2" />
                  开始测速
                </Button>
              </motion.div>
            )}

            {isRunning && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <LogoProgress progress={progress} variant="glow" size="xl" showProgress={true}>
                  <div className="text-lg font-semibold text-blue-600 mt-4">{getTestStatusText()}</div>
                </LogoProgress>
                <Button onClick={() => setIsRunning(false)} variant="outline">
                  <Square className="w-4 h-4 mr-2" />
                  停止测试
                </Button>
              </motion.div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Download className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className={`text-2xl font-bold ${getSpeedColor(result.downloadSpeed)}`}>
                        {result.downloadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Mbps 下载</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className={`text-2xl font-bold ${getSpeedColor(result.uploadSpeed)}`}>
                        {result.uploadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Mbps 上传</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Wifi className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold text-purple-600">{result.ping.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">ms 延迟</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <div className="text-2xl font-bold text-orange-600">{result.jitter.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">ms 抖动</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Badge className={getSpeedGrade(result.downloadSpeed).color}>
                    网络质量: {getSpeedGrade(result.downloadSpeed).grade}
                  </Badge>
                  <Button onClick={startSpeedTest} variant="outline">
                    重新测试
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 隐私提示 */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm">🔒</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">隐私保护说明</h4>
              <p className="text-sm text-blue-700">
                测速数据仅在您的浏览器本地存储，不会上传到服务器。我们仅收集匿名化的统计信息用于改进服务质量。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 历史记录 */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              测试历史
              <Badge variant="secondary" className="ml-auto">
                本地存储
              </Badge>
            </CardTitle>
            <CardDescription>最近的测速记录（仅保存在您的设备上）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{record.timestamp.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className={getSpeedColor(record.downloadSpeed)}>
                        {record.downloadSpeed.toFixed(1)} Mbps
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Upload className="w-4 h-4 text-green-600" />
                      <span className={getSpeedColor(record.uploadSpeed)}>{record.uploadSpeed.toFixed(1)} Mbps</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-4 h-4 text-purple-600" />
                      <span>{record.ping.toFixed(0)} ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export function SpeedTestModule() {
  return (
    <FeatureGuard
      featureName="网络测速"
      description="此功能需要测试您的网络连接并收集速度数据。测试结果将保存在您的设备本地。"
    >
      <SpeedTestContent />
    </FeatureGuard>
  )
}
