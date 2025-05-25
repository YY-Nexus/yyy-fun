"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedBackButtonProps {
  onClick: () => void
  text?: string
  variant?: "default" | "minimal" | "floating"
  className?: string
}

export function EnhancedBackButton({
  onClick,
  text = "返回",
  variant = "default",
  className,
}: EnhancedBackButtonProps) {
  const variants = {
    default:
      "flex items-center gap-3 px-4 py-2 rounded-full border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 bg-white shadow-sm",
    minimal: "flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100",
    floating:
      "fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl",
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <Button variant="ghost" onClick={onClick} className={cn(variants[variant], className)}>
        {/* 圆形返回图标 */}
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="text-white font-bold text-lg" initial={{ rotate: 0 }} whileHover={{ rotate: -10 }}>
            ←
          </motion.div>
        </motion.div>

        {/* 返回文字 - 隐藏文字显示 */}
        {/* 
<span className="font-medium text-gray-700 hidden sm:inline">{text}</span>
*/}
      </Button>
    </motion.div>
  )
}
