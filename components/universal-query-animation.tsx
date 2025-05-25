"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UniversalQueryAnimationProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero"
  progress?: number
  showProgress?: boolean
  showText?: boolean
  text?: string
  subText?: string
  variant?: "default" | "minimal" | "glow" | "pulse" | "wave" | "scan"
  className?: string
  onComplete?: () => void
  icon?: React.ReactNode
  color?: "blue" | "green" | "purple" | "orange" | "red" | "cyan"
  duration?: number // 新增：总动画持续时间（秒）
  isActive?: boolean // 新增：是否激活动画
}

export function UniversalQueryAnimation({
  size = "lg",
  progress = 0,
  showProgress = true,
  showText = true,
  text = "查询中",
  subText,
  variant = "default",
  className,
  onComplete,
  icon,
  color = "cyan",
  duration = 10, // 默认10秒
  isActive = true,
}: UniversalQueryAnimationProps) {
  const sizeConfig = {
    sm: {
      container: "w-20 h-20",
      logo: "w-16 h-16",
      text: "text-sm",
      subText: "text-xs",
      progress: "text-xs",
      ring: 60,
    },
    md: {
      container: "w-28 h-28",
      logo: "w-24 h-24",
      text: "text-base",
      subText: "text-sm",
      progress: "text-sm",
      ring: 80,
    },
    lg: {
      container: "w-36 h-36",
      logo: "w-32 h-32",
      text: "text-lg",
      subText: "text-base",
      progress: "text-base",
      ring: 100,
    },
    xl: {
      container: "w-48 h-48",
      logo: "w-44 h-44",
      text: "text-xl",
      subText: "text-lg",
      progress: "text-lg",
      ring: 140,
    },
    hero: {
      container: "w-64 h-64 md:w-80 md:h-80",
      logo: "w-60 h-60 md:w-76 md:h-76",
      text: "text-2xl",
      subText: "text-xl",
      progress: "text-xl",
      ring: 200,
    },
  }

  const colorConfig = {
    blue: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      tertiary: "#93C5FD",
      gradient: "from-blue-500 to-blue-600",
      glow: "rgba(59, 130, 246, 0.3)",
    },
    green: {
      primary: "#10B981",
      secondary: "#34D399",
      tertiary: "#6EE7B7",
      gradient: "from-green-500 to-green-600",
      glow: "rgba(16, 185, 129, 0.3)",
    },
    purple: {
      primary: "#8B5CF6",
      secondary: "#A78BFA",
      tertiary: "#C4B5FD",
      gradient: "from-purple-500 to-purple-600",
      glow: "rgba(139, 92, 246, 0.3)",
    },
    orange: {
      primary: "#F59E0B",
      secondary: "#FBBF24",
      tertiary: "#FCD34D",
      gradient: "from-orange-500 to-orange-600",
      glow: "rgba(245, 158, 11, 0.3)",
    },
    red: {
      primary: "#EF4444",
      secondary: "#F87171",
      tertiary: "#FCA5A5",
      gradient: "from-red-500 to-red-600",
      glow: "rgba(239, 68, 68, 0.3)",
    },
    cyan: {
      primary: "#00D4FF",
      secondary: "#00B4D8",
      tertiary: "#0077B6",
      gradient: "from-cyan-500 to-cyan-600",
      glow: "rgba(0, 212, 255, 0.3)",
    },
  }

  const config = sizeConfig[size]
  const colors = colorConfig[color]
  const circumference = 2 * Math.PI * (config.ring / 2 - 10)

  // 计算基于进度的动画参数
  const progressRatio = Math.min(progress / 100, 1)
  const animationSpeed = isActive ? 1 : 0.3 // 激活时正常速度，否则慢速

  // 根据进度调整动画强度
  const getAnimationIntensity = () => {
    if (!isActive) return 0.5
    return 0.5 + progressRatio * 0.5 // 从0.5到1.0
  }

  const animationIntensity = getAnimationIntensity()

  // 当进度达到100%时触发完成回调
  if (progress >= 100 && onComplete) {
    setTimeout(onComplete, 500)
  }

  const renderCenterContent = () => {
    if (icon) {
      return (
        <motion.div
          className={cn("flex items-center justify-center", config.logo)}
          animate={
            variant !== "minimal" && isActive
              ? {
                  rotateY: [0, 12 * animationIntensity, -12 * animationIntensity, 0],
                  rotateX: [0, -6 * animationIntensity, 6 * animationIntensity, 0],
                  scale: [1, 1 + 0.05 * animationIntensity, 1],
                }
              : {}
          }
          transition={{
            duration: duration * 0.4 * animationSpeed, // 动画时间与总时长同步
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      )
    }

    // 默认使用YYC³ Logo
    return (
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
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={
            variant !== "minimal" && isActive
              ? {
                  rotateY: [0, 12 * animationIntensity, -12 * animationIntensity, 0],
                  rotateX: [0, -6 * animationIntensity, 6 * animationIntensity, 0],
                  rotateZ: [0, 2 * animationIntensity, -2 * animationIntensity, 0],
                }
              : {}
          }
          transition={{
            duration: duration * 0.6 * animationSpeed, // 主logo动画时间
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src="/yyc3-logo.png"
            alt="YYC³ Logo"
            className={cn("object-contain drop-shadow-2xl", config.logo)}
            animate={
              variant === "pulse" && isActive
                ? {
                    scale: [1, 1 + 0.05 * animationIntensity, 1],
                    filter: [
                      "brightness(1) saturate(1)",
                      `brightness(${1 + 0.1 * animationIntensity}) saturate(${1 + 0.1 * animationIntensity})`,
                      "brightness(1) saturate(1)",
                    ],
                  }
                : variant === "glow" && isActive
                  ? {
                      filter: [
                        `drop-shadow(0 0 ${10 * animationIntensity}px ${colors.glow})`,
                        `drop-shadow(0 0 ${20 * animationIntensity}px ${colors.glow})`,
                        `drop-shadow(0 0 ${10 * animationIntensity}px ${colors.glow})`,
                      ],
                    }
                  : isActive
                    ? {
                        scale: [1, 1 + 0.02 * animationIntensity, 1],
                      }
                    : {}
            }
            transition={{
              duration: variant === "pulse" ? duration * 0.2 * animationSpeed : duration * 0.3 * animationSpeed,
              repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* 3D深度阴影 - 与进度同步 */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            transform: "translateZ(-15px) translateX(6px) translateY(6px)",
            filter: "blur(12px)",
            opacity: 0.4,
          }}
          animate={
            isActive
              ? {
                  opacity: [0.3, 0.3 + 0.2 * animationIntensity, 0.3],
                }
              : {}
          }
          transition={{
            duration: duration * 0.4 * animationSpeed,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
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
      </motion.div>
    )
  }

  const renderProgressRing = () => {
    if (!showProgress) return null

    return (
      <svg
        className="absolute inset-0 w-full h-full transform -rotate-90"
        viewBox={`0 0 ${config.ring} ${config.ring}`}
      >
        {/* 背景环 */}
        <circle
          cx={config.ring / 2}
          cy={config.ring / 2}
          r={config.ring / 2 - 10}
          stroke={`${colors.primary}20`}
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />

        {/* 进度环 - 平滑过渡 */}
        <motion.circle
          cx={config.ring / 2}
          cy={config.ring / 2}
          r={config.ring / 2 - 10}
          stroke={`url(#progressGradient-${color})`}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (progress / 100) * circumference,
            // 进度环的脉动效果与进度同步
            strokeWidth: isActive ? [4, 4 + 2 * animationIntensity, 4] : 4,
          }}
          transition={{
            strokeDashoffset: { duration: 0.8, ease: "easeInOut" },
            strokeWidth: {
              duration: duration * 0.5 * animationSpeed,
              repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            },
          }}
          className="drop-shadow-lg"
        />

        {/* 扫描效果 - 速度与进度同步 */}
        {variant === "scan" && isActive && (
          <motion.circle
            cx={config.ring / 2}
            cy={config.ring / 2}
            r={config.ring / 2 - 10}
            stroke={colors.secondary}
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 20"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: duration * 0.2 * animationSpeed, // 扫描速度与总时长同步
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )}

        <defs>
          <linearGradient id={`progressGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.tertiary} />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  const renderWaveEffect = () => {
    if (variant !== "wave" || !isActive) return null

    return (
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 opacity-30"
            style={{
              borderColor: colors.primary,
            }}
            animate={{
              scale: [1, 2 * animationIntensity, 3 * animationIntensity],
              opacity: [0.6 * animationIntensity, 0.3 * animationIntensity, 0],
            }}
            transition={{
              duration: duration * 0.3 * animationSpeed, // 波浪效果与总时长同步
              repeat: Number.POSITIVE_INFINITY,
              delay: i * (duration * 0.1 * animationSpeed), // 延迟也与时长同步
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      {/* 主要动画容器 */}
      <div className={cn("relative", config.container)}>
        {renderProgressRing()}
        {renderCenterContent()}
        {renderWaveEffect()}

        {/* 光晕效果 - 强度与进度同步 */}
        {variant === "glow" && isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              backgroundImage: [
                `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                `radial-gradient(circle, ${colors.secondary}${Math.floor(40 * animationIntensity).toString(16)} 0%, transparent 70%)`,
                `radial-gradient(circle, ${colors.tertiary}${Math.floor(30 * animationIntensity).toString(16)} 0%, transparent 70%)`,
                `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
              ],
              scale: [1, 1 + 0.2 * animationIntensity, 1],
            }}
            transition={{
              duration: duration * 0.4 * animationSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}

        {/* 进度百分比显示 - 动画与进度同步 */}
        {showProgress && (
          <motion.div
            className={cn("absolute inset-0 flex items-center justify-center z-20", config.progress, "font-bold")}
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border"
              style={{ borderColor: `${colors.primary}40` }}
              animate={
                isActive
                  ? {
                      scale: [1, 1 + 0.05 * animationIntensity, 1],
                      boxShadow: [
                        `0 4px 6px ${colors.glow}`,
                        `0 ${6 + 6 * animationIntensity}px ${12 + 12 * animationIntensity}px ${colors.glow}`,
                        `0 4px 6px ${colors.glow}`,
                      ],
                    }
                  : {}
              }
              transition={{
                duration: duration * 0.2 * animationSpeed,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            >
              <motion.span
                animate={
                  isActive
                    ? {
                        color: [colors.primary, colors.secondary, colors.tertiary, colors.primary],
                      }
                    : {}
                }
                transition={{
                  duration: duration * 0.3 * animationSpeed,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* 加载文字 - 动画速度与进度同步 */}
      {showText && (
        <motion.div
          className={cn("text-center", config.text)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.span
            className="font-semibold bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})`,
              backgroundSize: "400% 400%",
            }}
            animate={
              isActive
                ? {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }
                : {}
            }
            transition={{
              duration: duration * 0.3 * animationSpeed,
              repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.span>

          {/* 动态点点点 - 频率与进度同步 */}
          <motion.span className="ml-1">
            {[0, 0.3, 0.6].map((delay, index) => (
              <motion.span
                key={index}
                style={{ color: colors.primary }}
                animate={isActive ? { opacity: [0, 1, 0] } : { opacity: 0.5 }}
                transition={{
                  duration: duration * 0.15 * animationSpeed,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  delay: delay * animationSpeed,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            ))}
          </motion.span>

          {/* 副文本 */}
          {subText && (
            <motion.div
              className={cn("mt-2 opacity-70", config.subText)}
              style={{ color: colors.secondary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
            >
              {subText}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* 装饰性粒子效果 - 活跃度与进度同步 */}
      {variant !== "minimal" && isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: colors.primary,
                left: `${30 + Math.cos(i * 0.785) * 25}%`,
                top: `${30 + Math.sin(i * 0.785) * 25}%`,
              }}
              animate={{
                scale: [0, animationIntensity, 0],
                opacity: [0, 0.8 * animationIntensity, 0],
                rotate: [0, 360],
                x: [0, Math.cos(i * 0.785) * 10 * animationIntensity, 0],
                y: [0, Math.sin(i * 0.785) * 10 * animationIntensity, 0],
              }}
              transition={{
                duration: duration * 0.3 * animationSpeed,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * (duration * 0.03 * animationSpeed),
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
              backgroundImage: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
