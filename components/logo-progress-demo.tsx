"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogoProgress } from "@/components/logo-progress"
import { Play, Pause, RotateCcw } from "lucide-react"

export function LogoProgressDemo() {
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false)
            return 100
          }
          return prev + 1
        })
      }, 50)
    }

    return () => clearInterval(interval)
  }, [isRunning, progress])

  const startDemo = () => {
    setIsRunning(true)
  }

  const pauseDemo = () => {
    setIsRunning(false)
  }

  const resetDemo = () => {
    setProgress(0)
    setIsRunning(false)
  }

  const variants = [
    { name: "环形进度", value: "circular", description: "经典的环形进度指示器" },
    { name: "脉冲效果", value: "pulse", description: "动态脉冲呼吸效果" },
    { name: "旋转动画", value: "rotate", description: "多层旋转动画效果" },
    { name: "发光效果", value: "glow", description: "炫酷的发光渐变效果" },
  ] as const

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Logo动画进度效果</h2>
        <p className="text-muted-foreground">可复用的品牌化进度指示器组件</p>
      </div>

      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle>演示控制</CardTitle>
          <CardDescription>控制进度动画的播放和重置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={startDemo} disabled={isRunning || progress >= 100}>
              <Play className="w-4 h-4 mr-2" />
              开始演示
            </Button>
            <Button onClick={pauseDemo} disabled={!isRunning} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              暂停
            </Button>
            <Button onClick={resetDemo} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
            <Badge variant="outline" className="ml-auto">
              进度: {Math.round(progress)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 动画效果展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {variants.map((variant) => (
          <Card key={variant.value} className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{variant.name}</CardTitle>
              <CardDescription>{variant.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <LogoProgress progress={progress} variant={variant.value} size="lg" showProgress={true}>
                <div className="text-sm text-muted-foreground mt-2">{variant.name}</div>
              </LogoProgress>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 尺寸展示 */}
      <Card>
        <CardHeader>
          <CardTitle>不同尺寸展示</CardTitle>
          <CardDescription>同一动画效果的不同尺寸变体</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center gap-8 py-4">
            <div className="text-center">
              <LogoProgress progress={progress} variant="circular" size="sm" />
              <div className="text-xs text-muted-foreground mt-2">小尺寸</div>
            </div>
            <div className="text-center">
              <LogoProgress progress={progress} variant="circular" size="md" />
              <div className="text-xs text-muted-foreground mt-2">中尺寸</div>
            </div>
            <div className="text-center">
              <LogoProgress progress={progress} variant="circular" size="lg" />
              <div className="text-xs text-muted-foreground mt-2">大尺寸</div>
            </div>
            <div className="text-center">
              <LogoProgress progress={progress} variant="circular" size="xl" />
              <div className="text-xs text-muted-foreground mt-2">超大尺寸</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
          <CardDescription>如何在项目中使用这些进度动画组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">基础用法</h4>
            <code className="text-sm bg-background p-2 rounded block">
              {`<LogoProgress progress={75} variant="circular" size="md" />`}
            </code>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">自定义样式</h4>
            <code className="text-sm bg-background p-2 rounded block">
              {`<LogoProgress 
  progress={progress} 
  variant="glow" 
  size="lg" 
  showProgress={false}
  className="custom-class"
>
  自定义文本
</LogoProgress>`}
            </code>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-semibold mb-2">可用变体</h4>
              <ul className="text-sm space-y-1">
                <li>
                  • <code>circular</code> - 环形进度
                </li>
                <li>
                  • <code>pulse</code> - 脉冲效果
                </li>
                <li>
                  • <code>rotate</code> - 旋转动画
                </li>
                <li>
                  • <code>glow</code> - 发光效果
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">可用尺寸</h4>
              <ul className="text-sm space-y-1">
                <li>
                  • <code>sm</code> - 小尺寸 (64px)
                </li>
                <li>
                  • <code>md</code> - 中尺寸 (96px)
                </li>
                <li>
                  • <code>lg</code> - 大尺寸 (128px)
                </li>
                <li>
                  • <code>xl</code> - 超大尺寸 (192px)
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
