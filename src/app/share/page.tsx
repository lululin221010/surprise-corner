'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'

const SITE_URL = 'surprise-corner.vercel.app'
const CAPTION = '🐾魯魯今天撿到的小玩具，換你來玩 → https://surprise-corner.vercel.app/wonderland #驚喜角落'

function drawFramedImage(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  logo: HTMLImageElement | null
) {
  const maxW = 1080
  const scale = Math.min(1, maxW / img.naturalWidth)
  const w = Math.round(img.naturalWidth * scale)
  const h = Math.round(img.naturalHeight * scale)
  const border = Math.max(14, Math.round(w * 0.028))

  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const radius = Math.round(w * 0.035)

  // gradient border
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#34d399')
  grad.addColorStop(1, '#fbbf24')
  roundRectPath(ctx, 0, 0, w, h, radius)
  ctx.fillStyle = grad
  ctx.fill()

  // photo, inset by border
  ctx.save()
  roundRectPath(ctx, border, border, w - border * 2, h - border * 2, radius * 0.72)
  ctx.clip()
  ctx.drawImage(img, border, border, w - border * 2, h - border * 2)
  ctx.restore()

  // badge pill top-left
  const padX = Math.round(w * 0.018)
  const pillH = Math.max(30, Math.round(w * 0.052))
  const avatarSize = pillH - 10
  const fontSize = Math.max(13, Math.round(pillH * 0.42))
  ctx.font = `600 ${fontSize}px "Noto Sans TC", "PingFang TC", sans-serif`
  const label = '魯魯今天撿到'
  const textW = ctx.measureText(label).width
  const pillW = avatarSize + 10 + textW + 24
  const pillX = border + padX
  const pillY = border + padX

  ctx.save()
  roundRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2)
  ctx.fillStyle = 'rgba(15, 8, 35, 0.82)'
  ctx.fill()
  ctx.lineWidth = 1.5
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.55)'
  roundRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2)
  ctx.stroke()
  ctx.restore()

  if (logo) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(pillX + 5 + avatarSize / 2, pillY + pillH / 2, avatarSize / 2, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(logo, pillX + 5, pillY + 5, avatarSize, avatarSize)
    ctx.restore()
  }

  ctx.fillStyle = '#a7f3d4'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, pillX + 5 + avatarSize + 10, pillY + pillH / 2 + 1)

  // site url bottom-right
  const urlFontSize = Math.max(11, Math.round(w * 0.014))
  ctx.font = `500 ${urlFontSize}px sans-serif`
  ctx.fillStyle = 'rgba(255,255,255,0.72)'
  ctx.textAlign = 'right'
  ctx.fillText(SITE_URL, w - border - padX, h - border - padX)
  ctx.textAlign = 'left'
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export default function SharePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('這個檔案看起來不是圖片，換一張試試')
      return
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const logo = new Image()
        logo.onload = () => {
          const canvas = canvasRef.current
          if (canvas) {
            drawFramedImage(canvas, img, logo)
            setReady(true)
          }
        }
        logo.onerror = () => {
          const canvas = canvasRef.current
          if (canvas) {
            drawFramedImage(canvas, img, null)
            setReady(true)
          }
        }
        logo.src = '/logo.png'
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'lulu-find.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  async function handleShare() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob(async (blob) => {
      if (!blob) return
      const file = new File([blob], 'lulu-find.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: CAPTION })
        } catch {
          // 使用者取消分享，不用特別處理
        }
      } else {
        handleDownload()
      }
    }, 'image/png')
  }

  function handleCopyCaption() {
    navigator.clipboard.writeText(CAPTION).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="min-h-screen text-white" style={{
      background: 'radial-gradient(ellipse at 20% 0%, rgba(139,92,246,0.35) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(236,72,153,0.2) 0%, transparent 45%), #0f0823',
    }}>
      <div className="max-w-lg mx-auto px-6 py-10">
        <Link href="/wonderland" className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm mb-8">
          ← 返回驚喜樂世界
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-100 mb-4">
            🐾 分享你的成果
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">玩出來的東西，秀給大家看</h1>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            上傳你在外部小工具玩出來的照片，自動幫你加上魯魯的邊框，一鍵下載分享。全部在你的瀏覽器裡完成，照片不會上傳到任何伺服器。
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-6">
          <p className="text-xs font-semibold text-amber-200/80 mb-3 tracking-wide">還沒有照片？先照這4步走一遍</p>
          <ol className="space-y-2.5">
            {[
              '到「魯魯今天撿到」卡片點連結，玩外部的小工具',
              '玩出結果後，把滑鼠移到圖片上，點右下角的下載／分享圖示存下來',
              '回到這一頁，點下面的上傳框，選你剛存的圖',
              '完成！自動加框，下面就能一鍵分享或下載',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-purple-100/80 leading-relaxed">
                <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-3 pt-3 border-t border-white/10 text-xs text-purple-300/50 leading-relaxed">
            💡 玩到外語的工具看不懂介面？瀏覽器網址列通常有「翻譯」按鈕，點一下整頁翻成中文就能玩了。
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {!ready && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed border-purple-400/30 py-14 text-center hover:border-emerald-400/50 hover:bg-white/[0.02] transition-colors"
          >
            <div className="text-3xl mb-3">📷</div>
            <div className="text-purple-100 font-semibold text-sm mb-1">點這裡上傳照片</div>
            <div className="text-purple-300/50 text-xs">支援 JPG / PNG</div>
          </button>
        )}

        {error && <p className="text-red-300 text-sm mt-3">{error}</p>}

        <canvas
          ref={canvasRef}
          className={ready ? 'w-full rounded-2xl mt-2' : 'hidden'}
        />

        {ready && (
          <div className="mt-6 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 text-emerald-950 font-bold text-sm py-3"
              >
                分享出去
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 rounded-full border border-purple-400/30 text-purple-100 font-semibold text-sm py-3"
              >
                下載圖片
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex items-center justify-between gap-3">
              <p className="text-xs text-purple-200/70 leading-relaxed">{CAPTION}</p>
              <button
                onClick={handleCopyCaption}
                className="shrink-0 text-xs font-semibold text-emerald-300 border border-emerald-400/30 rounded-full px-3 py-1.5 whitespace-nowrap"
              >
                {copied ? '已複製' : '複製文字'}
              </button>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-center text-xs text-purple-300/50 py-2"
            >
              換一張照片
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
