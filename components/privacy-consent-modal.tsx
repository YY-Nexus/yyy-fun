"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { Shield, FileText, CheckCircle, AlertCircle } from "lucide-react"

interface PrivacyConsentModalProps {
  isOpen: boolean
  onConsent: () => void
  onDecline?: () => void
}

export function PrivacyConsentModal({ isOpen, onConsent, onDecline }: PrivacyConsentModalProps) {
  const [showFullPolicy, setShowFullPolicy] = useState(false)
  const [hasRead, setHasRead] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleConsent = () => {
    if (hasRead && agreedToTerms) {
      onConsent()
    }
  }

  const canProceed = hasRead && agreedToTerms

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!showFullPolicy ? (
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">欢迎使用 YYC³ NetTrack</h2>
                  <p className="text-muted-foreground">在开始使用我们的网络监测工具前，请了解我们的隐私政策</p>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      隐私政策要点
                    </CardTitle>
                    <CardDescription>我们承诺保护您的隐私，以下是关键信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-800">本地优先</h4>
                          <p className="text-sm text-green-700">测试数据主要存储在您的设备本地</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-800">数据安全</h4>
                          <p className="text-sm text-blue-700">采用加密技术保护数据传输</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-purple-800">最少收集</h4>
                          <p className="text-sm text-purple-700">仅收集提供服务必需的信息</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <FileText className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-orange-800">透明公开</h4>
                          <p className="text-sm text-orange-700">清楚说明数据使用目的</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">我们收集的信息</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 网络测试数据（速度、延迟、连接质量）</li>
                        <li>• 输入的查询数据（IP地址、域名等）</li>
                        <li>• 基本设备信息（浏览器类型、操作系统）</li>
                        <li>• 匿名化的使用统计信息</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="read-policy"
                      checked={hasRead}
                      onCheckedChange={(checked) => setHasRead(checked as boolean)}
                    />
                    <label
                      htmlFor="read-policy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      我已阅读并理解上述隐私要点
                      <Button variant="link" className="h-auto p-0 ml-1" onClick={() => setShowFullPolicy(true)}>
                        （查看完整隐私政策）
                      </Button>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree-terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      disabled={!hasRead}
                    />
                    <label
                      htmlFor="agree-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      我同意按照隐私政策收集和使用我的信息
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleConsent} disabled={!canProceed} className="flex-1">
                    {canProceed ? "同意并开始使用" : "请先阅读并同意隐私政策"}
                  </Button>
                  {onDecline && (
                    <Button variant="outline" onClick={onDecline}>
                      不同意
                    </Button>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Badge variant="outline" className="text-xs">
                    使用任何功能即表示您同意本隐私政策
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">完整隐私政策</h3>
                    <Button variant="outline" size="sm" onClick={() => setShowFullPolicy(false)}>
                      返回
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <PrivacyPolicy showHeader={false} compact={true} />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
