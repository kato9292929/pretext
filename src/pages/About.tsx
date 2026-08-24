import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionEyebrow } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'

const COPY = {
  ja: {
    pageTag: 'x402とは',
    title: 'x402とは',
    intro:
      'HTTP 402 “Payment Required” ステータスコードは、1997年から予約されていましたが、30年近く未使用のままでした。x402はこれを再活性化し、AIエージェントがHTTPネイティブに支払えるようにするプロトコルです。',
    body: 'サーバーが402を返すと、クライアントは支払いを完了して同じリクエストを再試行します。ここから先は、x402をエージェンティック・コマースの「信頼レイヤー」の中に位置づけて、いま何が標準化され、どこが空白なのかを細かく見ていきます。',
    readSpec: '仕様を読む',

    s1tag: 'エージェンティック・コマースの現在地',
    s1: [
      'AIエージェントが自律的に商取引を完結させる「エージェンティック・コマース」は、企業の競争優位を決める主戦場になりました。「検索（Search）」の時代は終わり、信頼を基盤とした「委任（Delegation）」の時代です。',
      '消費者の33%が「1年以内に購買の10%以上をAI主導にする」と回答し、2030年には世界で750兆円規模に成長すると予測されています（いずれも各社予測で、定義・期間は出典により異なります）。核心は、消費者が認知負荷を解消するため、意思決定をエージェントに委ね始めた点です。',
      '企業にとってこの転換は、エージェントに選別され、摩擦ゼロで決済を執行できるインフラを備えることが生存条件になったことを意味します。',
    ],
    strangerTag: 'Stranger Test',
    stranger:
      '最大の障壁は、事前に関係のない相手同士が発見し、即座に取引を完結させる能力——「Stranger Test（見知らぬ者同士の信頼テスト）」の突破です。決済レール（x402等）が整備されたいま、競争は「未知の相手との取引をどう技術的に保証するか」という信頼の設計へ移りました。',

    s2tag: '翻訳レイヤーのコモディティ化とプロトコル選定',
    s2: [
      'エージェントと既存コマースを接続する「翻訳レイヤー」は、もはや差別化要因ではなく標準インフラとしてコモディティ化しています。独自技術に固執せず、業界標準プロトコルと統治（ガバナンス）構造で選ぶべきです。',
      '各プロトコルの戦略的価値は、機能差ではなく背後のアライアンスの「重み」で決まります。',
    ],
    acpWarnTitle: '略称「ACP」の識別基準',
    acpWarn: [
      'Agentic Commerce Protocol（OpenAI × Stripe）：「人間名義」での購買。承認は人間に残り、既存カード網を利用（Class 3）。',
      'Agent Commerce Protocol（Virtuals Protocol）：「エージェント間」の受発注。エスクローや評価フェーズを内蔵し、ステーブルコイン決済が前提。',
      '自社のユースケースが「代理購買」か「エージェント間経済」かを峻別し、主体名を併記して識別することが不可欠です。',
    ],

    s3tag: '信頼の階層：認可の証明と履行の検証',
    s3: [
      '「誰が支払いを許可したか（Authorization）」の証明は、AP2 v0.2で「Human-Not-Present（事前認可された自律取引）」まで標準化が完了しました。AP2は Intent・Cart・Payment の3つの Mandate を W3C Verifiable Credentials として扱い、改竄不能な「認可の連鎖」を作ります。加盟店は不当なチャージバックのリスクから解放されます。',
      'しかしこれは「買い手の正当性」を担保するだけです。「売り手の信用（正しく履行されたか）」は依然として空白地帯です。ERC-8004 が定義する3レジストリに照らすと、現在の AP2 は Identity のみを解決しているに過ぎません。',
      '今後の Moat はプロトコル層ではなく、この「履行の検証」データと独自の実績（Reputation）の蓄積に宿ります。コモディティ化した世界では、過去のバリデーションデータこそが企業の真のバランスシートです。',
    ],

    classesTag: 'Agent Economy Classes：局面と経済形の二軸分解',
    classes: [
      'エージェント決済は単一の方向へ移行しません。私たちは Class を「支払い相手との間柄」で分け、そこに二つの軸を重ねて整理しています。',
      '第一の軸は局面——誰が起案し、誰が承認するか。第二の軸は経済形——カード網に載るか、アカウントのない相手へ per-call で抜ける A to A か。この二軸なら、境界に立つ複合ケース（型α・型β・型P）も同じ座標に収容できます。',
    ],
    classesNote:
      'これは4段の分岐による整理であり、実証された分類ではありません。実装マップの全体はホームの Ecosystem と、再設計ノートに。',
    classesLink: '再設計ノートを読む',

    s4tag: '実装指針とガードレール設計',
    s4: [
      '現実的な解は、人間名義の代理購買である Class 3 です。実装では AWS「AgentCore Payments」の「モデルの外部で管理する」思想を徹底します。責任を三つに分離し、残る与信（D）が未解決のフロンティアです。',
    ],
    finalityTitle: '200 OK と「ファイナリティ」を峻別する',
    finality: [
      'AgentCore の警告：実装上 settlement_verified=false になるケースが多い。「リクエストの受理」と「オンチェーンでの確定（Finality）」は別スレッドです。API の 200 OK を決済の最終確定と混同しないこと。',
      'OpenClaw の教訓：エージェントが委任範囲内で「第三者の予約を取り消す」等の不適切な手段を選ぶリスク。金額上限では防げない「不適切な手段選択」には、独自の紛争規則が要ります。',
    ],
    anchorTag: 'カード三社と x402 の使い分け',
    anchorNote: '信頼のアンカーをどこに置くかでネットワークを選びます。',

    s5tag: '結論：優位性をどこに置くか',
    planTitle: '戦略的アクションプラン：最初の90日',
    plan: [
      'インターフェースの監査：自社 API を UCP / MCP 等の標準に対応させ、外部エージェントからの「発見」を容易にする。',
      '物理的ガードレールの設置：AgentCore 準拠のアーキテクチャで、秘密鍵を LLM のコンテキストから物理的に隔離する。',
      '信頼設計の統合：World ID 等の Personhood（人間性証明）を組み合わせ、責任の所在を明確にする。',
      '履行データの蓄積：標準がカバーしない「履行の検証」データを構造化し、検証可能な実績（Reputation）として資産化する。',
    ],
    s5close:
      'AIが「財布を持つ」時代は、経済活動が「検索と判断」から「委任と検証」へ再定義される過程の始まりです。プロトコルがコモディティ化する世界で最大の資産は「技術」ではなく、その上に積み上げた「検証可能な来歴（Provenance）」です。x402 Inc. は、この来歴を作る装置として、自社のエンドポイント・データ・エージェントを置いています。',

    stanceTag: 'x402 Inc. の立ち位置',
    stance: [
      'x402 Inc. はリサーチ会社です。x402対応のエンドポイント、独自データ、それを叩くエージェントを自ら作り、観測と検証の instruments として使います。',
      '固有データを外部有料フィードとしてper-callで売っても価値を捕まえる回路がない——だから Onchain Stock Data や Japan Inflation Nowcast は「データ供給事業」ではなく、リサーチ・観測の装置として置きます。自社の閉域で回すものは「内部経済」であり、検証できるのは形式と記録であって実需ではありません。',
    ],
  },
  en: {
    pageTag: 'About',
    title: 'What is x402?',
    intro:
      'The HTTP 402 “Payment Required” status code has been reserved since 1997, yet sat unused for nearly 30 years. x402 revives it so AI agents can pay HTTP-natively.',
    body: 'When a server returns 402, the client completes payment and retries the same request. From here we place x402 inside the agentic-commerce “trust layer” and look, in detail, at what is standardized and where the gaps are.',
    readSpec: 'Read the spec',

    s1tag: 'The state of agentic commerce',
    s1: [
      'Agentic commerce — AI agents completing transactions autonomously — has become the main battleground for competitive advantage. The age of “Search” is over; this is the age of trust-based “Delegation.”',
      '33% of consumers say they will make “10%+ of purchases AI-led within a year,” and the market is projected to reach ¥750T globally by 2030 (all figures are third-party projections; definitions and periods vary by source). The core shift: consumers are handing decisions to agents to shed cognitive load.',
      'For companies this means being selected by agents, with zero-friction settlement, is now a condition of survival.',
    ],
    strangerTag: 'Stranger Test',
    stranger:
      'The biggest barrier is the ability for previously unrelated parties to discover each other and complete a transaction instantly — passing the “Stranger Test.” Now that payment rails (x402 et al.) exist, competition has moved to trust design: how to technically guarantee a transaction with an unknown counterparty.',

    s2tag: 'The translation layer commoditizes; choosing a protocol',
    s2: [
      'The “translation layer” connecting agents to existing commerce is no longer a differentiator — it has commoditized into standard infrastructure. Choose by industry-standard protocol and governance, not by building bespoke tech.',
      'Each protocol’s strategic value is set less by feature differences than by the weight of the alliance behind it.',
    ],
    acpWarnTitle: 'Telling the two “ACP”s apart',
    acpWarn: [
      'Agentic Commerce Protocol (OpenAI × Stripe): purchases under a human’s name. Approval stays with the human, using existing card networks (Class 3).',
      'Agent Commerce Protocol (Virtuals Protocol): agent-to-agent ordering. Built-in escrow and evaluation phases, assuming stablecoin settlement.',
      'Distinguish whether your use case is proxy purchasing or an agent-to-agent economy, and always name the party to disambiguate.',
    ],

    s3tag: 'Trust hierarchy: authorization vs verification of fulfillment',
    s3: [
      'Proving “who authorized the payment” is now standardized through AP2 v0.2, covering “Human-Not-Present” (pre-authorized autonomous transactions). AP2 treats Intent, Cart, and Payment mandates as W3C Verifiable Credentials, forming a tamper-proof chain of authorization; merchants are freed from unfair chargeback risk.',
      'But that only assures the buyer’s legitimacy. The seller’s credibility — whether fulfillment was correct — remains a blank space. Against the three registries ERC-8004 defines, today’s AP2 solves only Identity.',
      'The future moat sits not in the protocol layer but in this fulfillment-verification data and the accumulation of proprietary track record (Reputation). In a commoditized world, past validation data is a company’s real balance sheet.',
    ],

    classesTag: 'Agent Economy Classes: a two-axis split of context × economy',
    classes: [
      'Agent payments do not migrate in a single direction. We split classes by the relationship with the counterparty, then overlay two axes.',
      'The first axis is context — who proposes and who approves. The second is economic form — riding card networks, or per-call A-to-A to parties without accounts. On these two axes even boundary cases (types α, β, P) sit on the same coordinates.',
    ],
    classesNote:
      'This is an organization by four splits, not an empirically validated taxonomy. The full implementation map lives in the Ecosystem on the home page and in the redesign note.',
    classesLink: 'Read the redesign note',

    s4tag: 'Implementation guidance & guardrail design',
    s4: [
      'The realistic answer today is Class 3 — proxy purchasing under a human’s name. In implementation, follow AWS “AgentCore Payments” and its “manage outside the model” principle. Separate responsibility into three; the remaining credit problem (D) is the open frontier.',
    ],
    finalityTitle: 'Separate 200 OK from “finality”',
    finality: [
      'AgentCore’s warning: in practice settlement_verified=false is common. “Accepting the request” and “on-chain finality” are separate threads. Don’t confuse an API 200 OK with final settlement.',
      'OpenClaw’s lesson: an agent may choose an inappropriate means within its delegated scope (e.g. cancelling a third party’s reservation). Spend caps can’t prevent bad means selection — you need your own dispute rules.',
    ],
    anchorTag: 'Card networks vs x402',
    anchorNote: 'Pick the network by where you anchor trust.',

    s5tag: 'Conclusion: where to place your advantage',
    planTitle: 'A strategic action plan: the first 90 days',
    plan: [
      'Audit your interface: make your APIs speak standards like UCP / MCP so external agents can discover them.',
      'Install physical guardrails: an AgentCore-style architecture that physically isolates secret keys from the LLM context.',
      'Integrate trust design: combine personhood (e.g. World ID) to make responsibility clear in autonomous transactions.',
      'Accumulate fulfillment data: structure the “verification of fulfillment” data standards don’t cover, as a verifiable track record (Reputation).',
    ],
    s5close:
      'The age of AI “holding a wallet” is the start of economic activity being redefined from “search and judgment” to “delegation and verification.” In a world where protocols commoditize, the largest asset is not technology but the verifiable provenance built on top of it. x402 Inc. places its own endpoints, data, and agents as the instrument that produces that provenance.',

    stanceTag: 'x402 Inc.',
    stance: [
      'x402 Inc. is a research company. We build x402-enabled endpoints, proprietary data, and the agents that call them, and use them as instruments for observation and verification.',
      'Selling proprietary data as an external paid feed per-call has no circuit to capture value — so Onchain Stock Data and Japan Inflation Nowcast are placed as instruments for research and observation, not a “data supply business.” What we run in our own closed loop is an internal economy; what can be verified is the form and the records, not real demand.',
    ],
  },
} satisfies Record<Lang, Record<string, unknown>>

type Protocol = { name: string; gov: Localized; func: Localized; value: Localized }
const PROTOCOLS: Protocol[] = [
  {
    name: 'AP2',
    gov: { ja: 'FIDO Alliance', en: 'FIDO Alliance' },
    func: { ja: '認可の連鎖（Mandates）の証明', en: 'Proving the chain of authorization (Mandates)' },
    value: {
      ja: '事実上の標準。人間不在の自律取引を W3C 準拠で正当化。',
      en: 'De facto standard. Legitimizes human-absent autonomous transactions, W3C-compliant.',
    },
  },
  {
    name: 'UCP',
    gov: { ja: 'Tech Council（10社）', en: 'Tech Council (10 firms)' },
    func: { ja: '商品発見・プロファイル管理・カート', en: 'Discovery, profile management, cart' },
    value: {
      ja: '掲載の Permissionless 化。Shopify 等がセルフサーブ化。',
      en: 'Permissionless listing. Shopify et al. go self-serve.',
    },
  },
  {
    name: 'x402',
    gov: { ja: 'Linux Foundation', en: 'Linux Foundation' },
    func: { ja: 'HTTP 402 によるリクエスト単位の決済', en: 'Per-request settlement via HTTP 402' },
    value: {
      ja: 'ステーブルコインによる Permissionless Finality。',
      en: 'Permissionless finality via stablecoins.',
    },
  },
  {
    name: 'ACP（OpenAI）',
    gov: { ja: 'OpenAI / Stripe', en: 'OpenAI / Stripe' },
    func: { ja: 'チャット内決済の実行', en: 'In-chat checkout execution' },
    value: {
      ja: '人間名義の購買（Class 3）に特化。既存カード網を拡張。',
      en: 'Focused on human-name purchases (Class 3). Extends existing card networks.',
    },
  },
  {
    name: 'Adyen Agentic',
    gov: { ja: 'Adyen（単一企業製品）', en: 'Adyen (single-vendor product)' },
    func: { ja: 'モジュラー API（Feed, Cart, Pay）', en: 'Modular APIs (Feed, Cart, Pay)' },
    value: {
      ja: '既存のトークン化・不正対策を即 AI へ適用。',
      en: 'Applies existing tokenization / fraud tooling straight to AI.',
    },
  },
]

type Registry = { name: string; role: Localized; state: Localized; solved: boolean }
const REGISTRIES: Registry[] = [
  {
    name: 'Identity',
    role: { ja: '誰か', en: 'Who' },
    state: { ja: 'AP2 が解決済み', en: 'Solved by AP2' },
    solved: true,
  },
  {
    name: 'Reputation',
    role: { ja: '実績・来歴', en: 'Track record' },
    state: { ja: '空白（履行の検証）', en: 'Open (fulfillment)' },
    solved: false,
  },
  {
    name: 'Validation',
    role: { ja: '履行の正しさ', en: 'Correct fulfillment' },
    state: { ja: '空白（第三者検証）', en: 'Open (attestation)' },
    solved: false,
  },
]

type Anchor = { name: string; anchor: Localized; note: Localized }
const ANCHORS: Anchor[] = [
  {
    name: 'Visa',
    anchor: { ja: 'Who', en: 'Who' },
    note: { ja: '正規エージェントの名簿を重視。', en: 'Emphasizes a registry of legitimate agents.' },
  },
  {
    name: 'Mastercard',
    anchor: { ja: 'How', en: 'How' },
    note: {
      ja: '保証付き決済。ただし一定の可逆性を保持。',
      en: 'Guaranteed settlement — but retains some reversibility.',
    },
  },
  {
    name: 'American Express',
    anchor: { ja: 'What', en: 'What' },
    note: {
      ja: '「意図からの逸脱」を自社判定し補償。手厚いが閉じた系。',
      en: 'Judges “deviation from intent” in-house and compensates. Rich but closed.',
    },
  },
  {
    name: 'x402',
    anchor: { ja: 'Finality', en: 'Finality' },
    note: {
      ja: 'Permissionless Finality。執行後は不可逆。マシン間の少額・高頻度に最適。',
      en: 'Permissionless finality; irreversible once executed. Best for machine-to-machine micro-payments.',
    },
  },
]

const DELEGATION: { id: string; label: Localized; note: Localized; open: boolean }[] = [
  {
    id: 'A',
    label: { ja: 'クレデンシャルの隔離', en: 'Credential isolation' },
    note: { ja: '鍵・支払ヘッダをモデルに入れない', en: 'Keep keys / payment headers out of the model' },
    open: false,
  },
  {
    id: 'B',
    label: { ja: '支出範囲の拘束', en: 'Bounded spend' },
    note: { ja: 'ApprovalGrant を使い捨て権限で付与', en: 'Grant single-use scope per run' },
    open: false,
  },
  {
    id: 'C',
    label: { ja: '判断の責任', en: 'Responsibility' },
    note: { ja: '人間の承認記録と照合', en: 'Reconcile with human approval records' },
    open: false,
  },
  {
    id: 'D',
    label: { ja: 'エージェントへの与信', en: 'Underwriting agents' },
    note: { ja: '未解決のフロンティア', en: 'The open frontier' },
    open: true,
  },
]

const AXES: { k: Localized; v: Localized }[] = [
  {
    k: { ja: '軸①｜局面', en: 'Axis 1 | context' },
    v: {
      ja: '誰が起案し、誰が承認するか。社内の承認分離から、委任枠内の自律まで。',
      en: 'Who proposes and who approves — from internal approval separation to autonomy within a delegated limit.',
    },
  },
  {
    k: { ja: '軸②｜経済形', en: 'Axis 2 | economy' },
    v: {
      ja: 'カード網（Class 3）か、per-call の A to A（Class 4・5）か。信頼のアンカーが変わる。',
      en: 'Card networks (Class 3) or per-call A-to-A (Class 4 / 5) — the trust anchor changes.',
    },
  },
]

function Prose({ tag, paras }: { tag: string; paras: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl"
    >
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">{tag}</h2>
      <div className="mt-5 space-y-5">
        {paras.map((p, i) => (
          <p key={i} className="text-fg/70 text-base leading-[1.9]">
            {p}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export function About() {
  const { lang } = useLang()
  const t = COPY[lang]
  const S = (k: keyof typeof t) => t[k] as string
  const A = (k: keyof typeof t) => t[k] as string[]
  return (
    <>
      <PageHero eyebrow="Protocol" tag={S('pageTag')} title={S('title')} intro={S('intro')} />

      {/* Intro + HTTP flow */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-fg/70 text-base leading-[1.8]">{S('body')}</p>
            <a
              href="https://www.x402.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg/70 px-4 py-2 rounded-full border border-fg/15 hover:bg-fg/5 transition-colors"
            >
              {S('readSpec')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="liquid-glass rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 h-10 border-b border-fg/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-fg/50">HTTP Flow</span>
            </div>
            <pre className="p-4 text-[11px] md:text-xs leading-[1.7] overflow-x-auto font-mono text-fg/70">
              <code>
                <span className="text-fg/30">→</span> GET /api/data HTTP/1.1{'\n'}
                {'  '}Host: api.example.com{'\n\n'}
                <span className="text-gold">← HTTP/1.1 402 Payment Required</span>
                {'\n'}
                {'  '}X-Payment-Amount: 0.001{'\n'}
                {'  '}X-Payment-Token: USDC{'\n\n'}
                <span className="text-fg/30">→</span> GET /api/data{'  '}X-Payment: &lt;signed&gt;{'\n\n'}
                <span className="text-[#28c840]">← HTTP/1.1 200 OK</span>
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* §1 state + stranger test */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12 space-y-8">
        <Prose tag={S('s1tag')} paras={A('s1')} />
        <div className="liquid-glass rounded-2xl p-6 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-gold">{S('strangerTag')}</p>
          <p className="mt-3 text-sm text-fg/70 leading-[1.9]">{S('stranger')}</p>
        </div>
      </section>

      {/* §2 protocol selection */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('s2tag')} paras={A('s2')} />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROTOCOLS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
              className="liquid-glass rounded-2xl p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-base font-semibold text-fg">{p.name}</p>
                <span className="text-[11px] text-fg/50">{p.gov[lang]}</span>
              </div>
              <p className="mt-3 text-sm text-gold leading-[1.6]">{p.func[lang]}</p>
              <p className="mt-2 text-sm text-fg/60 leading-[1.7]">{p.value[lang]}</p>
            </motion.div>
          ))}
        </div>
        {/* two ACPs */}
        <div className="mt-6 liquid-glass rounded-2xl p-6 max-w-3xl border border-gold/20">
          <p className="text-sm font-semibold text-fg">{S('acpWarnTitle')}</p>
          <ul className="mt-4 space-y-3">
            {A('acpWarn').map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-fg/70 leading-[1.7]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §3 trust hierarchy + ERC-8004 */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('s3tag')} paras={A('s3')} />
        <div className="mt-8 grid sm:grid-cols-3 gap-5 max-w-3xl">
          {REGISTRIES.map((r) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass rounded-2xl p-5"
            >
              <p className="text-[11px] uppercase tracking-widest text-fg/40">ERC-8004</p>
              <p className="mt-1 text-base font-semibold text-fg">{r.name}</p>
              <p className="mt-1 text-xs text-fg/50">{r.role[lang]}</p>
              <p
                className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${
                  r.solved ? 'border-[#28c840]/40 text-[#28c840]' : 'border-fg/15 text-fg/60'
                }`}
              >
                {r.state[lang]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Agent Economy Classes — two-axis split */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('classesTag')} paras={A('classes')} />
        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-3xl">
          {AXES.map((ax) => (
            <motion.div
              key={ax.k.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass rounded-2xl p-6"
            >
              <p className="font-mono text-sm text-gold">{ax.k[lang]}</p>
              <p className="mt-3 text-sm text-fg/70 leading-[1.8]">{ax.v[lang]}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-fg/50 text-sm leading-[1.8] max-w-3xl">{S('classesNote')}</p>
        <a
          href="https://note.com/x402inc/n/n7beb8aba2e6a"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg/70 hover:text-gold transition-colors"
        >
          {S('classesLink')}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </section>

      {/* §4 guardrails */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('s4tag')} paras={A('s4')} />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DELEGATION.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass rounded-2xl p-5"
            >
              <span className="font-mono text-sm text-gold">{d.id}</span>
              <p className="mt-2 text-sm font-semibold text-fg leading-[1.5]">{d.label[lang]}</p>
              <p
                className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${
                  d.open ? 'border-fg/15 text-fg/60' : 'border-[#28c840]/40 text-[#28c840]'
                }`}
              >
                {d.note[lang]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 200 OK vs finality */}
        <div className="mt-6 liquid-glass rounded-2xl p-6 max-w-3xl">
          <p className="text-sm font-semibold text-fg">{S('finalityTitle')}</p>
          <ul className="mt-4 space-y-3">
            {A('finality').map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-fg/70 leading-[1.7]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* card networks vs x402 */}
        <div className="mt-8">
          <SectionEyebrow label="Trust anchors" tag={S('anchorTag')} />
          <p className="mt-4 text-sm text-fg/50 max-w-3xl">{S('anchorNote')}</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ANCHORS.map((a) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="liquid-glass rounded-2xl p-5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-fg">{a.name}</p>
                  <span className="text-[11px] font-mono text-gold">{a.anchor[lang]}</span>
                </div>
                <p className="mt-3 text-sm text-fg/60 leading-[1.7]">{a.note[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* §5 conclusion + plan */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="max-w-3xl">
          <SectionEyebrow label="Conclusion" tag={S('s5tag')} />
          <div className="mt-6 liquid-glass rounded-2xl p-6">
            <p className="text-sm font-semibold text-fg">{S('planTitle')}</p>
            <ol className="mt-4 space-y-3">
              {A('plan').map((c, i) => (
                <li key={c} className="flex items-start gap-3 text-sm text-fg/70 leading-[1.7]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-fg/[0.06] border border-fg/10 flex items-center justify-center text-xs font-mono text-gold">
                    {i + 1}
                  </span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-fg/70 text-base leading-[1.9]">{S('s5close')}</p>
        </div>
      </section>

      {/* Our stance */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <Prose tag={S('stanceTag')} paras={A('stance')} />
      </section>
    </>
  )
}
