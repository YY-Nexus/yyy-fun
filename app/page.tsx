"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
import { GlobalHeader } from "@/components/global-header"
import { GlobalFooter } from "@/components/global-footer"
import { StaticTechBackground } from "@/components/static-tech-background"
import { AnimatedTitle } from "@/components/animated-title"
import { AnimatedLogoHero } from "@/components/animated-logo-hero"
import { ModuleCard } from "@/components/module-card"
import { StatsCard } from "@/components/stats-card"

export default function NetworkTestingPlatform() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const { hasConsented, consentDate, giveConsent } = usePrivacyConsent()
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

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === "feedback" || moduleId === "privacy-policy") {
      setActiveModule(moduleId)
      return
    }

    if (!hasConsented) {
      setPendingModule(moduleId)
      setShowPrivacyModal(true)
      return
    }

    setActiveModule(moduleId)
  }

  const handlePrivacyConsent = () => {
    giveConsent()
    setShowPrivacyModal(false)
    if (pendingModule) {
      setActiveModule(pendingModule)
      setPendingModule(null)
    }
  }

  const handlePrivacyDecline = () => {
    setShowPrivacyModal(false)
    setPendingModule(null)
  }

  const featuredModules = modules.filter((m) => m.featured)
  const utilityModules = modules.filter((m) => !m.featured)

  if (activeModule && currentModule) {
    const Component = currentModule.component
    return (
      <StaticTechBackground>
        <GlobalHeader
          onLogoClick={() => setActiveModule(null)}
          onBackClick={() => setActiveModule(null)}
          currentModule={currentModule.title}
          showBackButton={true}
        />
        <div className="container mx-auto px-4 py-8">
          <Component />
        </div>
        <GlobalFooter
          onPrivacyClick={() => setActiveModule("privacy-policy")}
          onFeedbackClick={() => setActiveModule("feedback")}
        />
      </StaticTechBackground>
    )
  }

  return (
    <StaticTechBackground>
      <GlobalHeader onLogoClick={() => setActiveModule(null)} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedLogoHero size="hero" interactive={true} variant="default" />
          </motion.div>

          <AnimatedTitle
            title="YYC³ NetTrack"
            subtitle="全方位网络性能监测、安全检测与故障诊断的专业平台"
            size="xl"
            variant="rainbow"
          />

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

        {/* Stats - 确保等高 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* 核心功能模块 - 4列等宽布局 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">核心功能</h2>
            <p className="text-white/80 drop-shadow">专业的网络监测与诊断工具</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {featuredModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                {...module}
                onClick={() => handleModuleClick(module.id)}
                className={`transition-all duration-300 delay-${index * 100}`}
              />
            ))}
          </div>
        </div>

        {/* 辅助功能模块 - 3列等宽布局 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">辅助功能</h2>
            <p className="text-white/80 drop-shadow">实用工具与支持服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {utilityModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                {...module}
                onClick={() => handleModuleClick(module.id)}
                className={`transition-all duration-300 delay-${(index + 4) * 100}`}
              />
            ))}
          </div>
        </div>
      </div>

      <GlobalFooter
        onPrivacyClick={() => setActiveModule("privacy-policy")}
        onFeedbackClick={() => setActiveModule("feedback")}
      />

      <PrivacyConsentModal
        isOpen={showPrivacyModal}
        onConsent={handlePrivacyConsent}
        onDecline={handlePrivacyDecline}
      />
    </StaticTechBackground>
  )
}
