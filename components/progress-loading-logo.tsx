"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressLoadingLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero"
  progress?: number
  showProgress?: boolean
  showText?: boolean
  text?: string
  variant?: "default" | "minimal" | "glow" | "pulse"
  className?: string
  onComplete?: () => void
}

export function ProgressLoadingLogo({
  size = "lg",
  progress = 0,
  showProgress = true,
  showText = true,
  text = "加载中",
  variant = "default",
  className,
  onComplete,
}: ProgressLoadingLogoProps) {
  const sizeConfig = {
    sm: {
      container: "w-20 h-20",
      logo: "w-16 h-16",
      text: "text-sm",
      progress: "text-xs",
      ring: 60,
    },
    md: {
      container: "w-28 h-28",
      logo: "w-24 h-24",
      text: "text-base",
      progress: "text-sm",
      ring: 80,
    },
    lg: {
      container: "w-36 h-36",
      logo: "w-32 h-32",
      text: "text-lg",
      progress: "text-base",
      ring: 100,
    },
    xl: {
      container: "w-48 h-48",
      logo: "w-44 h-44",
      text: "text-xl",
      progress: "text-lg",
      ring: 140,
    },
    hero: {
      container: "w-64 h-64 md:w-80 md:h-80",
      logo: "w-60 h-60 md:w-76 md:h-76",
      text: "text-2xl",
      progress: "text-xl",
      ring: 200,
    },
  }

  const config = sizeConfig[size]
  const circumference = 2 * Math.PI * (config.ring / 2 - 10)

  // 当进度达到100%时触发完成回调
  if (progress >= 100 && onComplete) {
    setTimeout(onComplete, 500)
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      {/* 主要Logo动画容器 */}
      <div className={cn("relative", config.container)}>
        {/* 外层进度环 */}
        {showProgress && (
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox={`0 0 ${config.ring} ${config.ring}`}
          >
            {/* 背景环 */}
            <circle
              cx={config.ring / 2}
              cy={config.ring / 2}
              r={config.ring / 2 - 10}
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-sm"
            />
            {/* 进度环 */}
            <motion.circle
              cx={config.ring / 2}
              cy={config.ring / 2}
              r={config.ring / 2 - 10}
              stroke="url(#progressGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="25%" stopColor="#00B4D8" />
                <stop offset="50%" stopColor="#0077B6" />
                <stop offset="75%" stopColor="#023E8A" />
                <stop offset="100%" stopColor="#03045E" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* YYC³ Logo主体 */}
        <motion.div
          className={cn("relative z-10 flex items-center justify-center", config.container)}
          initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D旋转动画 */}
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={
              variant !== "minimal"
                ? {
                    rotateY: [0, 12, -12, 0],
                    rotateX: [0, -6, 6, 0],
                    rotateZ: [0, 2, -2, 0],
                  }
                : {}
            }
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.img
              src="/yyc3-logo.png"
              alt="YYC³ Logo"
              className={cn("object-contain drop-shadow-2xl", config.logo)}
              animate={
                variant === "pulse"
                  ? {
                      scale: [1, 1.05, 1],
                      filter: [
                        "brightness(1) saturate(1)",
                        "brightness(1.1) saturate(1.1)",
                        "brightness(1) saturate(1)",
                      ],
                    }
                  : variant === "glow"
                    ? {
                        filter: [
                          "drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))",
                          "drop-shadow(0 0 20px rgba(0, 212, 255, 0.6))",
                          "drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))",
                        ],
                      }
                    : {
                        scale: [1, 1.02, 1],
                      }
              }
              transition={{
                duration: variant === "pulse" ? 2 : 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* 3D深度阴影 */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              transform: "translateZ(-15px) translateX(6px) translateY(6px)",
              filter: "blur(12px)",
              opacity: 0.4,
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <img
              src="/yyc3-logo.png"
              alt=""
              className={cn("w-full h-full object-contain", config.logo)}
              style={{
                filter: "brightness(0.2) saturate(0) sepia(1) hue-rotate(180deg)",
              }}
            />
          </motion.div>

          {/* 光晕效果 */}
          {variant === "glow" && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(0, 180, 216, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(0, 119, 182, 0.2) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)",
                ],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* 进度百分比显示 */}
        {showProgress && (
          <motion.div
            className={cn(
              "absolute inset-0 flex items-center justify-center z-20",
              config.progress,
              "font-bold text-cyan-600",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-cyan-200"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 4px 6px rgba(0, 212, 255, 0.2)",
                  "0 6px 12px rgba(0, 212, 255, 0.3)",
                  "0 4px 6px rgba(0, 212, 255, 0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.span
                animate={{
                  color: ["#0891b2", "#0e7490", "#155e75", "#0891b2"],
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
          </motion.div>
        )}
      </div>

      {/* 加载文字 */}
      {showText && (
        <motion.div
          className={cn("text-center", config.text)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.span
            className="font-semibold"
            style={{
              background: "linear-gradient(45deg, #00D4FF, #00B4D8, #0077B6, #023E8A)",
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
          <motion.span className="ml-1">
            {[0, 0.3, 0.6].map((delay, index) => (
              <motion.span
                key={index}
                className="text-cyan-500"
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            ))}
          </motion.span>
        </motion.div>
      )}

      {/* 装饰性粒子效果 */}
      {variant !== "minimal" && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{
                left: `${30 + Math.cos(i * 0.785) * 25}%`,
                top: `${30 + Math.sin(i * 0.785) * 25}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
                x: [0, Math.cos(i * 0.785) * 10, 0],
                y: [0, Math.sin(i * 0.785) * 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* 完成动画效果 */}
      {progress >= 100 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 2, 3],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            style={{
              background: "radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
