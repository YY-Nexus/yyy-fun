"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Gauge, Shield, Wrench, Network, TrendingUp, Users, Globe, FileText, MessageSquare } from "lucide-react"
import { SpeedTestModule } from "@/components/speed-test-module"
import { PerformanceTestModule } from "@/components/performance-test-module"
import { SecurityDetectionModule } from "@/components/security-detection-module"
import { UtilitiesModule } from "@/components/utilities-module"
import { NetworkDiagnosisModule } from "@/components/network-diagnosis-module"
import { LogoProgressDemo } from "@/components/logo-progress-demo"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { EnhancedHeader } from "@/components/enhanced-header"
import { ResponsiveLogo } from "@/components/responsive-logo"
import { usePrivacyConsent } from "@/hooks/use-privacy-consent"
import { FeedbackModule } from "@/components/feedback-module"

export default function NetworkTestingPlatform() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const { hasConsented, consentDate } = usePrivacyConsent()

  const modules = [
    {
      id: "speed-test",
      title: "网络测速",
      description: "精确测量网络上传下载速度、延迟和质量",
      icon: Gauge,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      component: SpeedTestModule,
    },
    {
      id: "performance-test",
      title: "性能测试",
      description: "全面评估网络性能和连接稳定性",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      component: PerformanceTestModule,
    },
    {
      id: "security-detection",
      title: "安全检测",
      description: "检测网络安全威胁和漏洞风险",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      component: SecurityDetectionModule,
    },
    {
      id: "network-diagnosis",
      title: "网络诊断",
      description: "深度诊断网络连接问题和故障排除",
      icon: Network,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      component: NetworkDiagnosisModule,
    },
    {
      id: "utilities",
      title: "实用工具",
      description: "包含IP查询、域名解析等网络工具集",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      component: UtilitiesModule,
    },
    {
      id: "logo-demo",
      title: "Logo动画演示",
      description: "展示可复用的logo进度动画效果",
      icon: Zap,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      component: LogoProgressDemo,
    },
    {
      id: "privacy-policy",
      title: "隐私政策",
      description: "查看我们的隐私保护政策和数据使用说明",
      icon: FileText,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      component: PrivacyPolicy,
    },
    {
      id: "feedback",
      title: "沟通反馈",
      description: "提交反馈建议、问题报告和联系我们",
      icon: MessageSquare,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      component: FeedbackModule,
    },
  ]

  const stats = [
    { label: "测试次数", value: "1,234,567", icon: Zap, change: "+12%" },
    { label: "活跃用户", value: "89,432", icon: Users, change: "+8%" },
    { label: "全球节点", value: "156", icon: Globe, change: "+3%" },
  ]

  const currentModule = modules.find((m) => m.id === activeModule)

  if (activeModule && currentModule) {
    const Component = currentModule.component
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <EnhancedHeader onLogoClick={() => setActiveModule(null)} currentModule={currentModule.title} />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={() => setActiveModule(null)}>
                ← 返回主页
              </Button>
              <ResponsiveLogo size="sm" showText={false} interactive={false} />
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${currentModule.bgColor}`}>
                <currentModule.icon className={`w-6 h-6 ${currentModule.color}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentModule.title}</h1>
                <p className="text-gray-600">{currentModule.description}</p>
              </div>
            </div>
          </div>
          <Component />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <EnhancedHeader onLogoClick={() => setActiveModule(null)} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ResponsiveLogo size="lg" showText={true} interactive={false} className="justify-center mb-4" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Network Tracking Platform
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            全方位网络性能监测、安全检测与故障诊断的专业平台
          </motion.p>

          {/* 隐私状态显示 */}
          {hasConsented && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
            >
              <Badge variant="outline" className="text-green-600 border-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                隐私协议已同意 ({new Date(consentDate!).toLocaleDateString()})
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${module.borderColor} ${module.bgColor}`}
                onClick={() => setActiveModule(module.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-lg ${module.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <module.icon className={`w-8 h-8 ${module.color}`} />
                    </div>
                    <Badge
                      variant="secondary"
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      进入模块
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-base">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveModule(module.id)
                    }}
                  >
                    开始使用
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ResponsiveLogo size="sm" showText={false} interactive={false} />
            <span className="text-sm">YYC³ NetTrack</span>
          </div>
          <p>&copy; 2024 专业网络监测解决方案.</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs">
            <button onClick={() => setActiveModule("privacy-policy")} className="hover:text-blue-600 transition-colors">
              隐私政策
            </button>
            <span>|</span>
            <span>使用即代表同意隐私协议</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
