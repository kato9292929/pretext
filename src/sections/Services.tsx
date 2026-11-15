import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow, Pill, CONTACT_EMAIL } from '../primitives'
import { useLang, type Localized } from '../i18n'

// mark: a square icon shown next to the name (rather than a wordmark that replaces it)
type Tool = { name: string; src?: string; alt: string; href?: string; mark?: boolean }
type Case = { label: string; href: string }
// Video case: links to the video and the note write-up
type VideoCase = { title: Localized; youtube: string; note: string }

/**
 * Tools actually used, defined in one place. Drop a file into public/logos/
 * (e.g. public/logos/claude.svg) and the label switches from plain text to the
 * image automatically. If the file is absent the image simply doesn't render
 * and the `name` text stands in — no error, no layout shift.
 */
const TOOLS = {
  claude: { name: 'Claude', src: '/logos/claude.svg', alt: 'Claude' },
  claudeCode: { name: 'Claude Code', src: '/logos/claude-mark.svg', alt: '', mark: true },
  muse: { name: 'Muse', src: '/logos/muse.webp', alt: '', mark: true },
  vercel: { name: 'Vercel', src: '/logos/vercel.svg', alt: 'Vercel' },
  higgsfield: { name: 'Higgsfield', src: '/logos/higgsfield.svg', alt: 'Higgsfield' },
} satisfies Record<string, Tool>

type Card = { name: string; desc: string; scope: string; tools: Tool[]; cases?: Case[]; videos?: VideoCase[] }

const VIDEOS: VideoCase[] = [
  {
    title: { ja: 'ブランドフィルム：HTML 1枚と ffmpeg で52秒', en: 'Brand film: 52 seconds from one HTML file and ffmpeg', zh: '品牌短片：用一个 HTML 文件和 ffmpeg 制作的52秒' },
    youtube: 'https://youtu.be/x9l4dw9ZImE',
    note: 'https://note.com/x402inc/n/n23b844a08d4f',
  },
  {
    title: { ja: 'Muse：海底に沈んだムー大陸の遺跡（30秒）', en: 'Muse: the sunken ruins of Mu (30 seconds)', zh: 'Muse：沉入海底的姆大陆遗迹（30秒）' },
    youtube: 'https://youtu.be/uKkEAarwPP0',
    note: 'https://note.com/x402inc/n/n10995ab7d1bc',
  },
]

const CASES: Case[] = [
  { label: 'x402 Endpoint', href: 'https://endpoint.x402jp.com/' },
  { label: 'Onchain Stock Data', href: 'https://osd.x402jp.com/' },
]

const COPY: Localized<{
  lead: string
  scopeLabel: string
  toolsLabel: string
  caseLabel: string
  contact: string
  cards: Card[]
}> = {
  ja: {
    lead: '自社サイトと各プロダクトを制作・運用している体制を、外部向けにも提供します。',
    scopeLabel: '対応範囲',
    toolsLabel: '使用ツール',
    caseLabel: '事例',
    contact: 'お問い合わせ',
    cards: [
      {
        name: 'サイト制作',
        desc: 'Claude Code を用いた Web サイト・LP・ドキュメントサイトの実装。自社サイトおよび各プロダクトのフロントエンドを同じ体制で構築・運用している。',
        scope: '設計 / 実装 / デプロイ / 公開後の更新',
        tools: [TOOLS.claudeCode, TOOLS.vercel],
        cases: CASES,
      },
      {
        name: '動画制作',
        desc: 'Claude Code と生成 AI モデルを用いたショート動画の制作。静止画からの動画生成、字幕・音声の付与を含む。',
        scope: '構成 / 素材生成 / 編集 / 配信先の規格に合わせた書き出し',
        tools: [TOOLS.claudeCode, TOOLS.muse, TOOLS.higgsfield],
        videos: VIDEOS,
      },
      {
        name: 'AIエージェント研修',
        desc: 'Claude / Claude Code を業務に導入するための研修。エージェントに外部 API を呼ばせる際の権限・上限・承認フローの設計を含む。',
        scope: '座学 / 環境構築の同伴 / 運用ルールの整備',
        tools: [TOOLS.claude, TOOLS.claudeCode],
      },
    ],
  },
  en: {
    lead: 'The same setup we use to build and run our own site and products, offered externally.',
    scopeLabel: 'Scope',
    toolsLabel: 'Tools',
    caseLabel: 'Case studies',
    contact: 'Contact',
    cards: [
      {
        name: 'Web development',
        desc: 'Implementation of websites, landing pages, and documentation sites with Claude Code. We build and run our own site and each product’s frontend with the same setup.',
        scope: 'Design / Implementation / Deployment / Post-launch updates',
        tools: [TOOLS.claudeCode, TOOLS.vercel],
        cases: CASES,
      },
      {
        name: 'Video production',
        desc: 'Short-form video production with Claude Code and generative AI models. Includes image-to-video generation and adding captions and audio.',
        scope: 'Structure / Asset generation / Editing / Export to each platform’s spec',
        tools: [TOOLS.claudeCode, TOOLS.muse, TOOLS.higgsfield],
        videos: VIDEOS,
      },
      {
        name: 'AI agent training',
        desc: 'Training for adopting Claude / Claude Code into your work. Includes designing the permissions, limits, and approval flows for letting agents call external APIs.',
        scope: 'Lectures / Hands-on environment setup / Operational rules',
        tools: [TOOLS.claude, TOOLS.claudeCode],
      },
    ],
  },
  zh: {
    lead: '我们将制作和运营自家网站及各产品的团队体系，同样对外提供。',
    scopeLabel: '服务范围',
    toolsLabel: '使用工具',
    caseLabel: '案例',
    contact: '联系我们',
    cards: [
      {
        name: '网站制作',
        desc: '使用 Claude Code 实现网站・落地页・文档站点。自家网站及各产品的前端也由同一团队体系构建和运营。',
        scope: '设计 / 实现 / 部署 / 上线后的更新',
        tools: [TOOLS.claudeCode, TOOLS.vercel],
        cases: CASES,
      },
      {
        name: '视频制作',
        desc: '使用 Claude Code 与生成式 AI 模型制作短视频。包括由静态图像生成视频，以及添加字幕和音频。',
        scope: '构思 / 素材生成 / 剪辑 / 按发布平台规格导出',
        tools: [TOOLS.claudeCode, TOOLS.muse, TOOLS.higgsfield],
        videos: VIDEOS,
      },
      {
        name: 'AI 智能体培训',
        desc: '帮助企业将 Claude / Claude Code 引入业务的培训。包括让智能体调用外部 API 时的权限・上限・审批流程设计。',
        scope: '讲授 / 陪同搭建环境 / 制定运营规则',
        tools: [TOOLS.claude, TOOLS.claudeCode],
      },
    ],
  },
}

function ToolBadge({ tool }: { tool: Tool }) {
  const [imgShown, setImgShown] = useState(false)
  const inner = (
    <>
      {tool.mark && tool.src ? (
        // square icon next to the name; shown from the static HTML (no load check)
        <img src={tool.src} alt={tool.alt} width={20} height={20} className="h-5 w-5 rounded-md object-cover" />
      ) : (
        tool.src && (
          <img
            src={tool.src}
            alt={tool.alt}
            onLoad={() => setImgShown(true)}
            onError={() => setImgShown(false)}
            className={imgShown ? 'h-4 w-auto' : 'hidden'}
          />
        )
      )}
      {(!imgShown || tool.mark) && <span>{tool.name}</span>}
    </>
  )
  const className =
    'inline-flex items-center gap-1.5 rounded-full border border-fg/15 bg-fg/[0.04] py-1 pl-1.5 pr-3 text-xs text-fg/80'
  return tool.href ? (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-colors hover:text-fg/80`}
    >
      {inner}
    </a>
  ) : (
    <span className={className}>{inner}</span>
  )
}

export function Services() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="services" className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <SectionEyebrow label="Services" tag="For Enterprise" heading />
        <p className="mt-6 text-fg/60 text-base leading-[1.7]">{t.lead}</p>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.cards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="liquid-glass rounded-2xl p-6 flex flex-col"
          >
            <h3 className="text-base font-semibold text-fg">{card.name}</h3>
            <p className="mt-3 text-sm text-fg/70 leading-[1.7] flex-1">{card.desc}</p>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-widest text-fg/40">{t.scopeLabel}</p>
              <p className="mt-1.5 text-sm text-fg/70 leading-[1.6]">{card.scope}</p>
            </div>

            {card.cases && card.cases.length > 0 && (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-fg/40">{t.caseLabel}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {card.cases.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-fg/10 px-2.5 py-1 text-xs text-fg/70 hover:text-gold hover:border-gold/40 transition-colors"
                    >
                      {c.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {card.videos && card.videos.length > 0 && (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-fg/40">{t.caseLabel}</p>
                <div className="mt-2 space-y-2.5">
                  {card.videos.map((v) => (
                    <div key={v.youtube}>
                      <p className="text-xs text-fg/80 leading-[1.5]">{v.title[lang]}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {[
                          ['YouTube', v.youtube],
                          ['note', v.note],
                        ].map(([label, href]) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-fg/10 px-2.5 py-1 text-xs text-fg/70 hover:text-gold hover:border-gold/40 transition-colors"
                          >
                            {label}
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {card.tools.length > 0 && (
              <div className="mt-5 pt-4 border-t border-fg/10">
                <p className="text-xs uppercase tracking-widest text-fg/40">{t.toolsLabel}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {card.tools.map((tool) => (
                    <ToolBadge key={tool.name} tool={tool} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex">
        <Pill label={t.contact} href={`mailto:${CONTACT_EMAIL}`} gold />
      </div>
    </section>
  )
}
