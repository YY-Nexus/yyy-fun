"use client"

import { LogoProgress } from "@/components/logo-progress"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <LogoProgress progress={75} variant="glow" size="xl" showProgress={false}>
          <div className="text-lg font-semibold text-blue-600 mt-4">正在加载应用...</div>
        </LogoProgress>
      </div>
    </div>
  )
}
