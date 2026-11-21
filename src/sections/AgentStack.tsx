import { useLang, type Localized } from '../i18n'

/* Agent Stack: the four layers of instruments (MAP / CONSUME / PRODUCE /
   MARKET). Shown on about.html. */

const STACK_INTRO: Localized = {
  ja: '事業は発見（MAP）・消費（CONSUME）・データ生成（PRODUCE）・市場（MARKET）の4層の instruments で構成されます。いずれも、エコシステムを外から論じるためでなく、内側から観測・検証するために動かしています。',
  en: 'The business is made up of four layers of instruments — discovery (MAP), consumption (CONSUME), data production (PRODUCE) and market (MARKET). We run all of them not to comment on the ecosystem from outside, but to observe and verify it from within.',
  zh: '业务由发现（MAP）・消费（CONSUME）・数据生成（PRODUCE）・市场（MARKET）四层 instruments 构成。运行它们并非为了从外部评论生态，而是为了从内部观测和验证生态。',
}

const STACK_CHIPS: Localized<string[]> = {
  ja: ['per-callオンチェーン決済', '検証可能な実績', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
  en: ['Per-call on-chain settlement', 'Verifiable track record', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
  zh: ['per-call 链上支付', '可验证的业绩记录', 'HTTP 402', 'Solana / Base / Arc', 'ERC-8004 identity', 'REST + MCP'],
}

const STACK: { key: string; label: Localized; title: Localized; items: Localized<string[]> }[] = [
  {
    key: 'MAP',
    label: { ja: '発見', en: 'Discovery', zh: '发现' },
    title: { ja: 'エンドポイントを日次で収集・正規化', en: 'Collect & normalize endpoints daily', zh: '每日收集并规范化端点' },
    items: {
      ja: ['x402対応エンドポイントのカタログ', '何が・いくらで買えるかを観測する'],
      en: ['A catalog of x402-compatible endpoints', 'Observes what can be bought and at what price'],
      zh: ['x402 兼容端点的目录', '观测能以什么价格买到什么'],
    },
  },
  {
    key: 'CONSUME',
    label: { ja: '消費', en: 'Consumption', zh: '消费' },
    title: { ja: 'per-callでオンチェーン決済し記録する', en: 'Settle per-call on-chain and record', zh: '以 per-call 方式链上支付并记录' },
    items: {
      ja: ['ERC-8004 identity を持つエージェント', '取引の形式を検証する instrument'],
      en: ['An agent with an ERC-8004 identity', 'An instrument to verify the form of a transaction'],
      zh: ['拥有 ERC-8004 identity 的智能体', '验证交易形式的 instrument'],
    },
  },
  {
    key: 'PRODUCE',
    label: { ja: 'データ生成', en: 'Data production', zh: '数据生成' },
    title: { ja: '独自データと検証可能な実績を作る', en: 'Produce proprietary data & verifiable records', zh: '生成独有数据与可验证的业绩记录' },
    items: {
      ja: ['エージェント向けのデータ', '叩かれる側を観測する'],
      en: ['Data built for agents', 'Observes the side being called'],
      zh: ['面向智能体的数据', '观测被调用的一方'],
    },
  },
  {
    key: 'MARKET',
    label: { ja: '市場', en: 'Market', zh: '市场' },
    title: { ja: '売り手を比べ、測る場を作る', en: 'Build the place where sellers are compared and measured', zh: '打造比较和衡量卖方的场所' },
    items: {
      ja: ['買い手が条件を出し、売り手が競う（E5）', '売り手の402・決済・納品を外から測る（E4）'],
      en: ['Buyers post conditions, sellers compete (E5)', 'Measures sellers’ 402, payment and delivery from outside (E4)'],
      zh: ['买方提出条件，卖方竞争（E5）', '从外部检测卖方的 402・支付・交付（E4）'],
    },
  },
]

export function AgentStack() {
  const { lang } = useLang()
  return (
      <section id="architecture" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-fg">Agent Stack</h2>
          <span
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ color: 'rgb(var(--gold))', borderColor: 'rgb(var(--gold) / 0.45)', backgroundColor: 'rgb(var(--gold) / 0.08)' }}
          >
            instruments
          </span>
        </div>
        <p className="mt-4 text-fg/60 text-sm md:text-base leading-[1.7] max-w-3xl">{STACK_INTRO[lang]}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {STACK_CHIPS[lang].map((chip) => (
            <span key={chip} className="text-xs text-fg/70 px-3 py-1.5 rounded-full border border-fg/10 bg-fg/[0.03]">
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((layer) => (
            <div key={layer.key} className="liquid-glass rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-sm font-semibold text-fg">{layer.key}</span>
                <span className="text-xs text-fg/40">（{layer.label[lang]}）</span>
              </div>
              <p className="mt-2 text-sm text-fg/80">{layer.title[lang]}</p>
              <div className="mt-2 space-y-1">
                {layer.items[lang].map((item) => (
                  <p key={item} className="text-xs text-fg/50">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}
