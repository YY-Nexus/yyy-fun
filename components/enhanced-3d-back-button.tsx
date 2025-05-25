"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Enhanced3DBackButtonProps {
  onClick: () => void
  text?: string
  variant?: "default" | "minimal" | "floating"
  className?: string
}

export function Enhanced3DBackButton({
  onClick,
  text = "返回",
  variant = "default",
  className,
}: Enhanced3DBackButtonProps) {
  const variants = {
    default: "flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200",
    minimal: "flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100",
    floating:
      "fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl border border-gray-200 hover:shadow-2xl",
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(variants[variant], className)}
        style={{ padding: 0, background: "transparent" }}
      >
        {/* 3D返回箭头 */}
        <motion.div
          className="relative w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.1,
            rotateY: -10,
            rotateX: -5,
          }}
          whileTap={{
            scale: 0.95,
            rotateY: 5,
            rotateX: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* 3D背景层 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(145deg, #3B82F6, #1E40AF)",
              transform: "translateZ(-3px)",
              boxShadow: "0 4px 8px rgba(59, 130, 246, 0.3)",
            }}
            animate={{
              background: [
                "linear-gradient(145deg, #3B82F6, #1E40AF)",
                "linear-gradient(145deg, #60A5FA, #3B82F6)",
                "linear-gradient(145deg, #3B82F6, #1E40AF)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* 高光层 */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)",
              transform: "translateZ(1px)",
            }}
          />

          {/* 箭头图标 */}
          <motion.div
            className="relative z-10 text-white font-bold text-lg"
            style={{
              transform: "translateZ(4px)",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
            animate={{
              rotateY: [0, -5, 5, 0],
              x: [0, -1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            ←
          </motion.div>

          {/* 边缘高光 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            style={{
              transform: "translateZ(2px)",
            }}
          />

          {/* 内阴影 */}
          <motion.div
            className="absolute inset-1 rounded-full"
            style={{
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
              transform: "translateZ(1px)",
            }}
          />
        </motion.div>

        {/* 返回文字 - 隐藏文字，只保留图标 */}
        {/* 
        <motion.span
          className="font-medium text-gray-700 hidden sm:inline"
          whileHover={{
            x: 2,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
        */}
      </Button>
    </motion.div>
  )
}
