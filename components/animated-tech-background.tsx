"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTechBackgroundProps {
  variant?: "dots" | "waves" | "curves" | "auto"
  intensity?: "low" | "medium" | "high"
  speed?: "slow" | "normal" | "fast"
  className?: string
  children?: React.ReactNode
}

export function AnimatedTechBackground({
  variant = "auto",
  intensity = "medium",
  speed = "normal",
  className,
  children,
}: AnimatedTechBackgroundProps) {
  const [currentBg, setCurrentBg] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const backgrounds = [
    {
      id: "dots",
      name: "圆点网络",
      image: "/backgrounds/bg-53.jpg",
      overlay: "dots",
    },
    {
      id: "waves",
      name: "波浪流动",
      image: "/backgrounds/bg-49.jpg",
      overlay: "waves",
    },
    {
      id: "curves",
      name: "曲线优雅",
      image: "/backgrounds/bg-32.jpg",
      overlay: "curves",
    },
  ]

  const speedConfig = {
    slow: { duration: 8, interval: 12000 },
    normal: { duration: 6, interval: 8000 },
    fast: { duration: 4, interval: 5000 },
  }

  const intensityConfig = {
    low: { opacity: 0.3, scale: 0.8 },
    medium: { opacity: 0.5, scale: 1 },
    high: { opacity: 0.7, scale: 1.2 },
  }

  const config = speedConfig[speed]
  const intensitySettings = intensityConfig[intensity]

  // 自动切换背景
  useEffect(() => {
    if (variant === "auto") {
      const interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length)
      }, config.interval)
      return () => clearInterval(interval)
    }
  }, [variant, config.interval])

  // 根据variant设置固定背景
  useEffect(() => {
    if (variant !== "auto") {
      const bgIndex = backgrounds.findIndex((bg) => bg.id === variant)
      if (bgIndex !== -1) {
        setCurrentBg(bgIndex)
      }
    }
  }, [variant])

  const currentBackground = backgrounds[currentBg]

  // 生成动态圆点
  const generateDots = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <motion.div
        key={`dot-${i}`}
        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [0.5, 1.5, 0.5],
          opacity: [0.3, 0.8, 0.3],
          x: [0, Math.random() * 20 - 10, 0],
          y: [0, Math.random() * 20 - 10, 0],
        }}
        transition={{
          duration: config.duration + Math.random() * 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))
  }

  // 生成动态波浪线
  const generateWaves = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={`wave-${i}`}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${45 + i * 15}deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)`,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: config.duration * 2 + i,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    ))
  }

  // 生成动态曲线
  const generateCurves = () => {
    return Array.from({ length: 6 }, (_, i) => (
      <motion.div
        key={`curve-${i}`}
        className="absolute w-full h-full"
        style={{
          background: `radial-gradient(ellipse ${50 + i * 20}% ${30 + i * 10}% at ${50 + Math.sin(i) * 20}% ${
            50 + Math.cos(i) * 20
          }%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`,
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: config.duration * 3 + i * 0.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ))
  }

  const renderOverlay = () => {
    switch (currentBackground.overlay) {
      case "dots":
        return generateDots()
      case "waves":
        return generateWaves()
      case "curves":
        return generateCurves()
      default:
        return null
    }
  }

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* 背景图片层 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBackground.id}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBackground.image})`,
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: intensitySettings.opacity,
            scale: intensitySettings.scale,
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* 动态覆盖层 */}
      <div className="absolute inset-0 overflow-hidden">{renderOverlay()}</div>

      {/* 渐变遮罩层 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-blue-800/20"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(88, 28, 135, 0.1) 50%, rgba(30, 58, 138, 0.2) 100%)",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(37, 99, 235, 0.15) 100%)",
            "linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(88, 28, 135, 0.1) 50%, rgba(30, 58, 138, 0.2) 100%)",
          ],
        }}
        transition={{
          duration: config.duration * 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 网格效果层 */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: config.duration * 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 光晕效果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: config.duration * 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>

      {/* 背景切换指示器 */}
      {variant === "auto" && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {backgrounds.map((bg, index) => (
            <motion.button
              key={bg.id}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentBg ? "bg-blue-400 w-6" : "bg-white/30 hover:bg-white/50",
              )}
              onClick={() => setCurrentBg(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={bg.name}
            />
          ))}
        </div>
      )}

      {/* 性能控制按钮 */}
      <motion.button
        className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isVisible ? "隐藏动画" : "显示动画"}
      >
        {isVisible ? "🎨" : "⏸️"}
      </motion.button>
    </div>
  )
}
