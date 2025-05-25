"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gauge, Shield, Wrench, Network, TrendingUp, Users, Globe, FileText, MessageSquare } from "lucide-react"
import { SpeedTestModule } from "@/components/speed-test-module"
import { PerformanceTestModule } from "@/components/performance-test-module"
import { SecurityDetectionModule } from "@/components/security-detection-module"
import { UtilitiesModule } from "@/components/utilities-module"
import { NetworkDiagnosisModule } from "@/components/network-diagnosis-module"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { usePrivacyConsent } from "@/hooks/use-privacy-consent"
import { FeedbackModule } from "@/components/feedback-module"
import { PrivacyConsentModal } from "@/components/privacy-consent-modal"
import { EnhancedHeader } from "@/components/enhanced-header"
import { Enhanced3DIcon } from "@/components/enhanced-3d-icon"
import { Enhanced3DBackButton } from "@/components/enhanced-3d-back-button"
import { StaticTechBackground } from "@/components/static-tech-background"
import { BrandLogo } from "@/components/brand-logo"
import { AnimatedTitle } from "@/components/animated-title"
import { AnimatedLogoHero } from "@/components/animated-logo-hero"

export default function NetworkTestingPlatform() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const { hasConsented, consentDate, giveConsent } = usePrivacyConsent()

  // 在组件开头添加隐私弹窗状态
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [pendingModule, setPendingModule] = useState<string | null>(null)

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
      featured: true,
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
      featured: true,
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
      featured: true,
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
      featured: true,
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
      featured: false,
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
      featured: false,
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
      featured: false,
    },
  ]

  const stats = [
    { label: "测试次数", value: "1,234,567", icon: Gauge, change: "+12%" },
    { label: "活跃用户", value: "89,432", icon: Users, change: "+8%" },
    { label: "全球节点", value: "156", icon: Globe, change: "+3%" },
  ]

  const currentModule = modules.find((m) => m.id === activeModule)

  // 修改模块点击处理函数
  const handleModuleClick = (moduleId: string) => {
    // 沟通反馈和隐私政策可以直接访问
    if (moduleId === "feedback" || moduleId === "privacy-policy") {
      setActiveModule(moduleId)
      return
    }

    // 其他模块需要隐私同意
    if (!hasConsented) {
      setPendingModule(moduleId)
      setShowPrivacyModal(true)
      return
    }

    setActiveModule(moduleId)
  }

  // 隐私同意处理
  const handlePrivacyConsent = () => {
    giveConsent()
    setShowPrivacyModal(false)
    if (pendingModule) {
      setActiveModule(pendingModule)
      setPendingModule(null)
    }
  }

  // 隐私拒绝处理
  const handlePrivacyDecline = () => {
    setShowPrivacyModal(false)
    setPendingModule(null)
  }

  // 分离核心功能和辅助功能
  const featuredModules = modules.filter((m) => m.featured)
  const utilityModules = modules.filter((m) => !m.featured)

  if (activeModule && currentModule) {
    const Component = currentModule.component
    return (
      <StaticTechBackground>
        <EnhancedHeader onLogoClick={() => setActiveModule(null)} currentModule={currentModule.title} />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Enhanced3DBackButton onClick={() => setActiveModule(null)} />
            </div>
            <div className="flex items-center gap-3">
              <Enhanced3DIcon
                icon={currentModule.icon}
                size="lg"
                color={currentModule.color}
                bgColor={currentModule.bgColor}
                interactive={false}
              />
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">{currentModule.title}</h1>
                <p className="text-white/80 drop-shadow">{currentModule.description}</p>
              </div>
            </div>
          </div>
          <Component />
        </div>
      </StaticTechBackground>
    )
  }

  return (
    <StaticTechBackground>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* 使用新的动画Logo组件 */}
            <AnimatedLogoHero size="hero" interactive={true} variant="default" />
          </motion.div>

          {/* 使用新的动画标题组件 */}
          <AnimatedTitle
            title="YYC³ NetTrack"
            subtitle="全方位网络性能监测、安全检测与故障诊断的专业平台"
            size="xl"
            variant="rainbow"
          />

          {/* 隐私状态显示 */}
          {hasConsented && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
            >
              <Badge variant="outline" className="text-green-300 border-green-300 bg-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
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
              <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-green-300 font-medium">{stat.change}</p>
                    </div>
                    <Enhanced3DIcon
                      icon={stat.icon}
                      size="md"
                      color="text-blue-300"
                      bgColor="bg-blue-500/20"
                      interactive={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 核心功能模块 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">核心功能</h2>
            <p className="text-white/80 drop-shadow">专业的网络监测与诊断工具</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 h-full`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Enhanced3DIcon
                        icon={module.icon}
                        size="lg"
                        color={module.color}
                        bgColor={module.bgColor}
                        interactive={true}
                        onClick={() => handleModuleClick(module.id)}
                      />
                      <Badge
                        variant="secondary"
                        className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 text-white"
                      >
                        核心功能
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white">{module.title}</CardTitle>
                    <CardDescription className="text-base text-white/80">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300 bg-white/20 text-white border-white/30"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModuleClick(module.id)
                      }}
                    >
                      开始使用
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 辅助功能模块 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">辅助功能</h2>
            <p className="text-white/80 drop-shadow">实用工具与支持服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {utilityModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -3 }}
                className="group"
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 h-full`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Enhanced3DIcon
                        icon={module.icon}
                        size="md"
                        color={module.color}
                        bgColor={module.bgColor}
                        interactive={true}
                        onClick={() => handleModuleClick(module.id)}
                      />
                      <Badge
                        variant="outline"
                        className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 text-white border-white/30"
                      >
                        辅助工具
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white">{module.title}</CardTitle>
                    <CardDescription className="text-sm text-white/80">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300 bg-transparent text-white border-white/30 hover:border-white"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModuleClick(module.id)
                      }}
                    >
                      进入
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-white/70">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BrandLogo size="sm" showText={false} interactive={false} variant="white" />
            <span className="text-sm">YYC³ NetTrack</span>
          </div>
          <p>&copy; 2024 专业网络监测解决方案.</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs">
            <button onClick={() => setActiveModule("privacy-policy")} className="hover:text-blue-300 transition-colors">
              隐私政策
            </button>
            <span>|</span>
            <span>使用即代表同意隐私协议</span>
          </div>
        </footer>
      </div>
      <PrivacyConsentModal
        isOpen={showPrivacyModal}
        onConsent={handlePrivacyConsent}
        onDecline={handlePrivacyDecline}
      />
    </StaticTechBackground>
  )
}
