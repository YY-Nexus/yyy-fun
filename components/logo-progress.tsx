"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProgressProps {
  progress: number
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "circular" | "pulse" | "rotate" | "glow"
  showProgress?: boolean
  className?: string
  children?: React.ReactNode
}

export function LogoProgress({
  progress,
  size = "md",
  variant = "circular",
  showProgress = true,
  className,
  children,
}: LogoProgressProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  const logoSizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const renderVariant = () => {
    switch (variant) {
      case "circular":
        return (
          <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
            {/* 背景圆环 */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-gray-200"
              />
              {/* 进度圆环 */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Logo中心 */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img src="/logo.png" alt="CloudCube Logo" className={cn("object-contain", logoSizeClasses[size])} />
              {showProgress && (
                <motion.div
                  className={cn("font-bold text-blue-600 mt-1", textSizeClasses[size])}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Math.round(progress)}%
                </motion.div>
              )}
            </motion.div>
          </div>
        )

      case "pulse":
        return (
          <div className={cn("relative flex flex-col items-center justify-center", className)}>
            <motion.div
              className={cn("relative", sizeClasses[size])}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* 脉冲背景 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />

              {/* Logo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center bg-white rounded-full shadow-lg">
                <img src="/logo.png" alt="CloudCube Logo" className={cn("object-contain", logoSizeClasses[size])} />
              </div>
            </motion.div>

            {showProgress && (
              <motion.div
                className={cn("font-bold text-blue-600 mt-2", textSizeClasses[size])}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
        )

      case "rotate":
        return (
          <div className={cn("relative flex flex-col items-center justify-center", className)}>
            <div className={cn("relative", sizeClasses[size])}>
              {/* 旋转外环 */}
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border-2 border-transparent border-b-cyan-400 border-l-blue-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Logo中心 */}
              <div className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                <motion.img
                  src="/logo.png"
                  alt="CloudCube Logo"
                  className={cn("object-contain", logoSizeClasses[size])}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {showProgress && (
              <motion.div
                className={cn("font-bold text-blue-600 mt-2", textSizeClasses[size])}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
        )

      case "glow":
        return (
          <div className={cn("relative flex flex-col items-center justify-center", className)}>
            <motion.div
              className={cn("relative", sizeClasses[size])}
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
                  "drop-shadow(0 0 20px rgba(139, 92, 246, 0.7))",
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* 发光背景 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-30 blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Logo */}
              <div className="relative z-10 w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center">
                <motion.img
                  src="/logo.png"
                  alt="CloudCube Logo"
                  className={cn("object-contain", logoSizeClasses[size])}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* 进度条 */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {showProgress && (
              <motion.div
                className={cn("font-bold text-blue-600 mt-6", textSizeClasses[size])}
                animate={{
                  textShadow: [
                    "0 0 5px rgba(59, 130, 246, 0.5)",
                    "0 0 10px rgba(139, 92, 246, 0.7)",
                    "0 0 5px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderVariant()}
      {children && <div className="text-center text-muted-foreground">{children}</div>}
    </div>
  )
}
