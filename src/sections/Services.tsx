import { useState } from 'react'
import { motion } from 'motion/react'
import { SectionEyebrow, Pill, CONTACT_EMAIL } from '../primitives'
import { useLang, type Localized } from '../i18n'

type Tool = { name: string; src?: string; alt: string; href?: string }

/**
 * Tools actually used, defined in one place. Drop a file into public/logos/
 * (e.g. public/logos/claude.svg) and the label switches from plain text to the
 * image automatically. If the file is absent the image simply doesn't render
 * and the `name` text stands in — no error, no layout shift.
 */
const TOOLS = {
  claude: { name: 'Claude', src: '/logos/claude.svg', alt: 'Claude' },
  claudeCode: { name: 'Claude Code', src: '/logos/claude-code.svg', alt: 'Claude Code' },
  vercel: { name: 'Vercel', src: '/logos/vercel.svg', alt: 'Vercel' },
  higgsfield: { name: 'Higgsfield', src: '/logos/higgsfield.svg', alt: 'Higgsfield' },
} satisfies Record<string, Tool>

type Card = { name: string; desc: string; scope: string; tools: Tool[] }

const COPY: Localized<{
  lead: string
  scopeLabel: string
  toolsLabel: string
  contact: string
  cards: Card[]
}> = {
  ja: {
    lead: '自社サイトと各プロダクトを制作・運用している体制を、外部向けにも提供します。',
    scopeLabel: '対応範囲',
    toolsLabel: '使用ツール',
    contact: 'お問い合わせ',
    cards: [
      {
        name: 'サイト制作',
        desc: 'Claude Code を用いた Web サイト・LP・ドキュメントサイトの実装。自社サイトおよび各プロダクトのフロントエンドを同じ体制で構築・運用している。',
        scope: '設計 / 実装 / デプロイ / 公開後の更新',
        tools: [TOOLS.claudeCode, TOOLS.vercel],
      },
      {
        name: '動画制作',
        desc: 'Claude Code と生成 AI モデルを用いたショート動画の制作。静止画からの動画生成、字幕・音声の付与を含む。',
        scope: '構成 / 素材生成 / 編集 / 配信先の規格に合わせた書き出し',
        tools: [TOOLS.claudeCode, TOOLS.higgsfield],
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
    contact: 'Contact',
    cards: [
      {
        name: 'Web development',
        desc: 'Implementation of websites, landing pages, and documentation sites with Claude Code. We build and run our own site and each product’s frontend with the same setup.',
        scope: 'Design / Implementation / Deployment / Post-launch updates',
        tools: [TOOLS.claudeCode, TOOLS.vercel],
      },
      {
        name: 'Video production',
        desc: 'Short-form video production with Claude Code and generative AI models. Includes image-to-video generation and adding captions and audio.',
        scope: 'Structure / Asset generation / Editing / Export to each platform’s spec',
        tools: [TOOLS.claudeCode, TOOLS.higgsfield],
      },
      {
        name: 'AI agent training',
        desc: 'Training for adopting Claude / Claude Code into your work. Includes designing the permissions, limits, and approval flows for letting agents call external APIs.',
        scope: 'Lectures / Hands-on environment setup / Operational rules',
        tools: [TOOLS.claude, TOOLS.claudeCode],
      },
    ],
  },
}

function ToolBadge({ tool }: { tool: Tool }) {
  const [imgShown, setImgShown] = useState(false)
  const inner = (
    <>
      {tool.src && (
        <img
          src={tool.src}
          alt={tool.alt}
          onLoad={() => setImgShown(true)}
          onError={() => setImgShown(false)}
          className={imgShown ? 'h-4 w-auto' : 'hidden'}
        />
      )}
      {!imgShown && <span>{tool.name}</span>}
    </>
  )
  const className =
    'inline-flex items-center gap-1.5 rounded-full border border-fg/10 px-2.5 py-1 text-xs text-fg/60'
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
