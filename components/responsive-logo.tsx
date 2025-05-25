"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ResponsiveLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  interactive?: boolean
  onClick?: () => void
  className?: string
}

export function ResponsiveLogo({
  size = "md",
  showText = true,
  interactive = true,
  onClick,
  className,
}: ResponsiveLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const sizeConfig = {
    sm: {
      logo: "w-8 h-8",
      text: "text-lg",
      container: "gap-2",
    },
    md: {
      logo: "w-10 h-10 md:w-12 md:h-12",
      text: "text-xl md:text-2xl",
      container: "gap-3 md:gap-4",
    },
    lg: {
      logo: "w-12 h-12 md:w-16 md:h-16",
      text: "text-2xl md:text-3xl",
      container: "gap-4 md:gap-6",
    },
  }

  const config = sizeConfig[size]

  const logoVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      filter: [
        "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        "drop-shadow(0 4px 8px rgba(59,130,246,0.3))",
        "drop-shadow(0 6px 12px rgba(139,92,246,0.4))",
      ],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        rotate: {
          duration: 0.8,
          ease: "easeInOut",
        },
      },
    },
    pressed: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  }

  const textVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    hover: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    hover: {
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 1.4],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  return (
    <motion.div
      className={cn(
        "flex items-center cursor-pointer select-none relative",
        config.container,
        interactive && "group",
        className,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => {
        setIsPressed(false)
        onClick?.()
      }}
      onTapCancel={() => setIsPressed(false)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Logo容器 */}
      <div className="relative">
        {/* 发光背景效果 */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full blur-md"
              variants={glowVariants}
              initial="initial"
              animate="hover"
              exit="initial"
            />
          )}
        </AnimatePresence>

        {/* Logo图片 */}
        <motion.img
          src="/logo.png"
          alt="CloudCube Logo"
          className={cn("object-contain relative z-10", config.logo)}
          variants={logoVariants}
          initial="initial"
          animate={isPressed ? "pressed" : isHovered ? "hover" : "initial"}
        />

        {/* 悬停时的装饰元素 */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-500 rounded-full z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 品牌文字 */}
      {showText && (
        <div className="flex flex-col">
          <motion.h1
            className={cn(
              "font-bold leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent",
              "bg-[length:200%_100%]",
              config.text,
            )}
            variants={textVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            YYC³
          </motion.h1>
          <motion.p
            className="text-xs md:text-sm text-gray-600 leading-tight hidden sm:block"
            initial={{ opacity: 0.7 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              x: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            NetTrack
          </motion.p>
        </div>
      )}

      {/* 移动端简化显示 */}
      {showText && (
        <motion.div
          className="sm:hidden flex items-center gap-1"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          <span className={cn("font-bold text-blue-600", size === "sm" ? "text-sm" : "text-base")}>YYC³</span>
        </motion.div>
      )}

      {/* 交互提示 */}
      <AnimatePresence>
        {isHovered && interactive && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-30"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            返回首页
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-black/80" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
