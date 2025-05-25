import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface FeedbackData {
  type: string
  title: string
  content: string
  rating?: number
  email?: string
  name?: string
  allowContact: boolean
  userAgent?: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const feedbackData: FeedbackData = await request.json()

    // 验证必填字段
    if (!feedbackData.type || !feedbackData.title || !feedbackData.content) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 })
    }

    // 构建邮件内容
    const emailContent = generateEmailContent(feedbackData)

    // 发送邮件到指定邮箱
    const emailResult = await sendFeedbackEmail(emailContent, feedbackData)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "反馈已成功提交",
        feedbackId: `FB${Date.now()}`,
      })
    } else {
      return NextResponse.json({ error: "邮件发送失败，请稍后重试" }, { status: 500 })
    }
  } catch (error) {
    console.error("反馈提交错误:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}

function generateEmailContent(data: FeedbackData): string {
  const typeLabels: { [key: string]: string } = {
    bug: "问题报告",
    suggestion: "功能建议",
    compliment: "表扬反馈",
    question: "使用咨询",
    other: "其他反馈",
  }

  const ratingText = data.rating
    ? `⭐ 用户评分: ${data.rating}/5 (${
        data.rating === 5
          ? "非常满意"
          : data.rating === 4
            ? "满意"
            : data.rating === 3
              ? "一般"
              : data.rating === 2
                ? "不满意"
                : "非常不满意"
      })`
    : ""

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>YYC³ NetTrack 用户反馈</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
        .footer { margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 4px; font-size: 12px; color: #666; }
        .priority { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
        .priority-high { background: #fee; color: #c53030; }
        .priority-medium { background: #fef5e7; color: #d69e2e; }
        .priority-low { background: #f0fff4; color: #38a169; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🔔 YYC³ NetTrack 用户反馈</h2>
            <p>收到新的用户反馈，请及时处理</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">反馈类型:</div>
                <div class="value">
                    ${typeLabels[data.type] || data.type}
                    <span class="priority ${data.type === "bug" ? "priority-high" : "priority-medium"}">
                        ${data.type === "bug" ? "高优先级" : "中优先级"}
                    </span>
                </div>
            </div>
            
            <div class="field">
                <div class="label">反馈标题:</div>
                <div class="value">${data.title}</div>
            </div>
            
            <div class="field">
                <div class="label">详细内容:</div>
                <div class="value">${data.content.replace(/\n/g, "<br>")}</div>
            </div>
            
            ${
              ratingText
                ? `
            <div class="field">
                <div class="label">用户评分:</div>
                <div class="value">${ratingText}</div>
            </div>
            `
                : ""
            }
            
            ${
              data.name
                ? `
            <div class="field">
                <div class="label">用户姓名:</div>
                <div class="value">${data.name}</div>
            </div>
            `
                : ""
            }
            
            ${
              data.email
                ? `
            <div class="field">
                <div class="label">联系邮箱:</div>
                <div class="value">${data.email}</div>
            </div>
            `
                : ""
            }
            
            <div class="field">
                <div class="label">是否同意后续联系:</div>
                <div class="value">${data.allowContact ? "✅ 是" : "❌ 否"}</div>
            </div>
            
            <div class="field">
                <div class="label">提交时间:</div>
                <div class="value">${new Date(data.timestamp).toLocaleString("zh-CN")}</div>
            </div>
            
            ${
              data.userAgent
                ? `
            <div class="field">
                <div class="label">用户环境:</div>
                <div class="value" style="font-size: 11px; color: #666;">${data.userAgent}</div>
            </div>
            `
                : ""
            }
        </div>
        
        <div class="footer">
            <p><strong>处理建议:</strong></p>
            <ul>
                ${data.type === "bug" ? "<li>🔴 高优先级问题，建议24小时内响应</li>" : ""}
                ${data.email && data.allowContact ? "<li>📧 用户同意后续联系，可直接回复邮件</li>" : ""}
                ${data.type === "suggestion" ? "<li>💡 功能建议，可纳入产品规划考虑</li>" : ""}
                ${data.type === "compliment" ? "<li>❤️ 用户表扬，可用于产品推广素材</li>" : ""}
            </ul>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p>此邮件由 YYC³ NetTrack 反馈系统自动发送</p>
            <p>平台地址: <a href="https://yyc3.com">https://yyc3.com</a></p>
        </div>
    </div>
</body>
</html>
  `.trim()
}

async function sendFeedbackEmail(content: string, data: FeedbackData) {
  const FEEDBACK_EMAIL = process.env.FEEDBACK_EMAIL || "china@0379.email"

  try {
    // 创建 SMTP 传输器 - 使用 SSL 加密（端口465）
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.exmail.qq.com",
      port: Number.parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // 465端口使用SSL加密
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // 发送邮件
    const mailOptions = {
      from: `"YYC³ NetTrack 反馈系统" <${process.env.SMTP_USER}>`,
      to: FEEDBACK_EMAIL,
      subject: `[YYC³反馈] ${data.type === "bug" ? "🔴" : data.type === "suggestion" ? "💡" : "📝"} ${data.title}`,
      html: content,
      replyTo: data.email && data.allowContact ? data.email : undefined,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("✅ 邮件发送成功:", result.messageId)

    return { success: true }
  } catch (error) {
    console.error("❌ SMTP邮件发送失败:", error)

    // 备用方案：记录到服务器日志
    console.log("=== 用户反馈记录 ===")
    console.log(`时间: ${new Date(data.timestamp).toLocaleString()}`)
    console.log(`类型: ${data.type}`)
    console.log(`标题: ${data.title}`)
    console.log(`内容: ${data.content}`)
    console.log(`用户: ${data.name || "匿名"} (${data.email || "无邮箱"})`)
    console.log("==================")

    return { success: true } // 即使邮件发送失败，也返回成功以免影响用户体验
  }
}
