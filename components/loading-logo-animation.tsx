"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingLogoAnimationProps {
  size?: "sm" | "md" | "lg" | "xl"
  showProgress?: boolean
  progress?: number
  showText?: boolean
  text?: string
  variant?: "default" | "minimal" | "colorful"
  className?: string
}

export function LoadingLogoAnimation({
  size = "md",
  showProgress = true,
  progress = 0,
  showText = true,
  text = "Loading...",
  variant = "default",
  className,
}: LoadingLogoAnimationProps) {
  const sizeConfig = {
    sm: {
      container: "w-16 h-16",
      logo: "w-12 h-12",
      text: "text-sm",
      progress: "text-xs",
    },
    md: {
      container: "w-24 h-24",
      logo: "w-20 h-20",
      text: "text-base",
      progress: "text-sm",
    },
    lg: {
      container: "w-32 h-32",
      logo: "w-28 h-28",
      text: "text-lg",
      progress: "text-base",
    },
    xl: {
      container: "w-48 h-48",
      logo: "w-44 h-44",
      text: "text-xl",
      progress: "text-lg",
    },
  }

  const config = sizeConfig[size]
  const circumference = 2 * Math.PI * 45

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      {/* 主要Logo动画容器 */}
      <div className={cn("relative", config.container)}>
        {/* 进度环 */}
        {showProgress && (
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* 背景环 */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            {/* 进度环 - 使用YYC³主题色 */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="50%" stopColor="#00B4D8" />
                <stop offset="100%" stopColor="#0077B6" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* YYC³ Logo */}
        <motion.div
          className={cn("relative z-10 flex items-center justify-center", config.container)}
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 15, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {variant === "minimal" ? (
            // 简化版本 - 使用文字
            <motion.div
              className={cn("font-bold text-center", config.logo)}
              style={{
                background: "linear-gradient(45deg, #00D4FF, #00B4D8, #0077B6)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              YYC³
            </motion.div>
          ) : (
            // 完整版本 - 使用新的YYC³图片
            <motion.img
              src="/yyc3-logo.png"
              alt="YYC³ Logo"
              className={cn("object-contain drop-shadow-lg", config.logo)}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}

          {/* 3D光晕效果 - 使用YYC³主题色 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 212, 255, 0.3)",
                "0 0 30px rgba(0, 180, 216, 0.4)",
                "0 0 25px rgba(0, 119, 182, 0.3)",
                "0 0 20px rgba(0, 212, 255, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* 进度百分比 */}
        {showProgress && (
          <motion.div
            className={cn("absolute inset-0 flex items-center justify-center", config.progress)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="font-bold text-cyan-600"
              animate={{
                color: ["#00D4FF", "#00B4D8", "#0077B6", "#00D4FF"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* 加载文字 */}
      {showText && (
        <motion.div
          className={cn("text-center", config.text)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            className="font-semibold"
            style={{
              background: "linear-gradient(45deg, #00D4FF, #00B4D8, #0077B6)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.span>

          {/* 动态点点点 */}
          <motion.span
            className="ml-1"
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
            >
              .
            </motion.span>
          </motion.span>
        </motion.div>
      )}

      {/* 装饰性粒子效果 - YYC³主题色 */}
      {variant === "colorful" && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{
                left: `${20 + Math.cos(i * 0.785) * 30}%`,
                top: `${20 + Math.sin(i * 0.785) * 30}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
