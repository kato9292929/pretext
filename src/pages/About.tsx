import { Fragment } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../primitives'
import { useLang, type Lang, type Localized } from '../i18n'

// Copy: about-page-copy-2026-10-20.md. `**text**` renders as bold.
const COPY = {
  ja: {
    pageTag: '分析',
    title: '未知の売り手とエージェントが取引するための3つの確認：認可・履行・評判',
    intro:
      'x402 で「1リクエストごとに USDC を払う」決済はすでに動いている。残っている問題は、初めて会う売り手にエージェントが安心して払えるかである。このページでは、誰が支払いを許可したか（認可）、売り手が本当に届けたか（履行）、その売り手が過去にどう振る舞ったか（評判）の3つに分けて、いま標準で決まっていることと、まだ誰も決めていないことを整理する。x402 の仕組みそのものは Endpoint ページに移した。',

    s1tag: 'エージェントが買い手になる取引の現在地',
    s1: [
      'AI エージェントが人の代わりに商品や API を探し、比べ、支払いまで済ませる取引が、2026年に入って実際の商取引として始まった。利用者は「検索して自分で選ぶ」のではなく、「条件を渡してエージェントに任せる」ようになっている。',
      '消費者調査では、33% が「1年以内に購買の10%以上を AI に任せる」と答え、2030年の市場規模を世界で750兆円とする予測もある（いずれも各社の予測で、定義と期間は出典ごとに異なる）。',
      '売り手の側から見ると、この変化は「エージェントに見つけてもらい、エージェントが止まらずに払える仕組みを持っているか」が、取引に入れるかどうかを決めるということである。',
    ],
    strangerTag: '初めて会う相手と取引できるか',
    stranger:
      '最大の壁は、事前に契約も口座もない相手同士が、見つけてその場で取引を終えられるかである。x402 のような決済の仕組みは整ったので、競争はその先の「相手が本物か、届くか、過去に問題を起こしていないか」をどう確かめるかに移っている。',

    s2tag: 'エージェントと既存の店をつなぐ規格',
    s2: [
      'エージェントと既存の EC や API をつなぐ部分は、各社が独自に作る段階を過ぎ、業界の規格を選んで使う段階になった。どの規格を選ぶかは、機能の差ではなく、その規格を支えている団体と参加企業で決まる。',
    ],
    acpWarnTitle: '略称「ACP」の見分け方',
    acpWarnLead: '同じ ACP という略称が2つある。',
    acpWarn: [
      '**Agentic Commerce Protocol（OpenAI × Stripe）**：人の名義で買う。承認は人に残り、既存のカード網で決済する（Class 3）',
      '**Agent Commerce Protocol（Virtuals Protocol）**：エージェント同士の受発注。エスクローと評価の段階を内蔵し、ステーブルコインで決済する',
    ],
    acpWarnClose:
      '自社の用途が「人の代わりに買う」のか「エージェント同士で売り買いする」のかを分け、主体名を併記して書く。',

    s3tag: '3つの確認のうち、決まったものと空白のもの',
    s3: [
      '**認可（誰が支払いを許可したか）**は、AP2 v0.2 で「人がその場にいない自律取引」まで標準化が終わった。AP2 は Intent・Cart・Payment の3つの委任（Mandate）を W3C Verifiable Credentials として扱い、後から書き換えられない許可の連鎖を作る。これで加盟店は、身に覚えのないチャージバックを受けにくくなる。',
      'ただし、これで確かめられるのは買い手の正当性だけである。**売り手が正しく届けたか（履行）**と、**その売り手が過去にどう振る舞ったか（評判）**は、まだ標準がない。ERC-8004 が定める3つの登録簿に当てはめると、AP2 が埋めているのは Identity だけである。',
    ],
    s3after:
      '規格が揃ってくると、各社の違いは規格そのものではなく、「どの売り手が何件届け、何件届けなかったか」の記録をどれだけ持っているかに移る。',

    classesTag: 'Agent Economy Classes：取引の相手と、起案・承認の分け方',
    classes: [
      'エージェント決済は1つの形に収束しない。当社は「誰に払うか」で Class を分け、そこに2つの軸を重ねて整理している。',
    ],
    classesNote:
      'この2軸で、境界に立つ複合型（型α・型β・型P）も同じ表に置ける。これは4段の分岐による整理で、実証で確かめた分類ではない。実装の一覧はホームの Ecosystem と再設計ノートにある。',
    classesLink: '再設計ノートを読む',

    s4tag: '実装の指針：鍵・範囲・判断を分ける',
    s4: [
      '現実的な出発点は、人の名義で代理購買する Class 3 である。実装では AWS AgentCore Payments の「支払いの制御はモデルの外に置く」という考え方に従い、責任を3つに分ける。残る1つ（エージェントへの与信）は、まだ誰も解いていない。',
    ],
    finality: [
      '**200 OK と送金の確定は別である。** AgentCore の警告どおり、実装では settlement_verified=false になる場合が多い。「リクエストを受け付けた」と「チェーン上で送金が確定した」は別の出来事で、API の 200 OK を決済の確定と見なしてはいけない。当社の x402 RFQ Market でも、送金は確定したのにデータが届かない取引が devnet で実際に起きている。',
      '**金額の上限だけでは防げない失敗がある。** OpenClaw の事例では、エージェントが委任の範囲内で「第三者の予約を取り消す」という不適切な手段を選んだ。金額の上限は手段の選び方を縛らないので、別に紛争の規則が要る。',
    ],
    anchorTag: 'カード3社と x402：どこで取引を守るか',
    anchorNote: 'どの網を使うかは、「取引を守る仕組みをどこに置くか」で決まる。',
    anchorFit: '向く取引',

    s5tag: '結論：どこで差がつくか',
    planTitle: '最初の90日でやること',
    plan: [
      '自社の API を UCP / MCP などの規格に対応させ、外部のエージェントから見つかるようにする',
      'AgentCore と同じ構成で、秘密鍵を LLM の文脈から物理的に切り離す',
      'World ID などの人間性の証明を組み合わせ、責任の所在を記録する',
      '規格が扱わない「届いたか」のデータを構造化し、売り手ごとの検証可能な実績として蓄積する',
    ],
    s5close:
      'AI が財布を持つようになると、経済活動は「検索して判断する」から「委任して検証する」に変わる。規格が揃った世界で差がつくのは技術ではなく、その上に積み上げた「誰が何を届けたか」の検証可能な記録である。x402 Inc. は、この記録を作るために、カタログ（x402 Endpoint）・買い手（x402 Autonomous Agent）・売り手（Onchain Stock Data、Japan Inflation Nowcall）・市場（x402 RFQ Market、x402 Seller Probe）の4つの役を自社で動かしている。',
  },
  en: {
    pageTag: 'Analysis',
    title: 'Three checks for agents to trade with unknown sellers: authorization, fulfillment, reputation',
    intro:
      'Paying in USDC per request over x402 already works. The open question is whether an agent can safely pay a seller it has never met. This page splits that into three checks — who authorized the payment (authorization), whether the seller actually delivered (fulfillment), and how the seller has behaved before (reputation) — and sorts out what standards already settle and what nobody has settled yet. The x402 mechanics themselves now live on the Endpoint page.',

    s1tag: 'Where agent-as-buyer commerce stands',
    s1: [
      'Transactions in which an AI agent finds, compares and pays for products or APIs on a person’s behalf began as real commerce in 2026. Users no longer search and choose themselves; they hand over conditions and let the agent do it.',
      'In consumer surveys, 33% say they will hand 10%+ of their purchases to AI within a year, and one projection puts the global market at ¥750T by 2030 (all figures are third-party projections; definitions and periods vary by source).',
      'From the seller’s side, this means that whether you can be found by agents — and whether agents can pay you without stopping — decides whether you get into the transaction at all.',
    ],
    strangerTag: 'Can you trade with someone you have never met?',
    stranger:
      'The biggest barrier is whether two parties with no prior contract or account can find each other and finish a transaction on the spot. Payment rails like x402 are in place, so competition has moved on to how you check that the counterparty is real, will deliver, and has not caused problems before.',

    s2tag: 'Standards that connect agents to existing stores',
    s2: [
      'The part that connects agents to existing e-commerce and APIs has moved past each company building its own, to choosing and using an industry standard. Which standard to pick is decided not by feature differences but by the bodies and companies backing it.',
    ],
    acpWarnTitle: 'Telling the two “ACP”s apart',
    acpWarnLead: 'Two different things share the abbreviation ACP.',
    acpWarn: [
      '**Agentic Commerce Protocol (OpenAI × Stripe)**: buys under a person’s name. Approval stays with the person, and payment runs on existing card networks (Class 3)',
      '**Agent Commerce Protocol (Virtuals Protocol)**: agent-to-agent ordering. Escrow and evaluation stages are built in, and payment is in stablecoins',
    ],
    acpWarnClose:
      'Separate whether your use case is “buying on a person’s behalf” or “agents buying and selling with each other,” and always write the party’s name alongside.',

    s3tag: 'Of the three checks, what is settled and what is open',
    s3: [
      '**Authorization (who allowed the payment)** has been standardized through AP2 v0.2, up to “autonomous transactions with no person present.” AP2 treats its three mandates — Intent, Cart and Payment — as W3C Verifiable Credentials, forming a chain of permission that cannot be rewritten afterwards. Merchants become less exposed to chargebacks they know nothing about.',
      'But this only confirms the buyer is legitimate. **Whether the seller delivered correctly (fulfillment)** and **how that seller has behaved before (reputation)** still have no standard. Mapped onto the three registries ERC-8004 defines, AP2 fills only Identity.',
    ],
    s3after:
      'As standards converge, what separates companies is no longer the standard itself but how much record they hold of which sellers delivered how many times, and how many times they did not.',

    classesTag: 'Agent Economy Classes: the counterparty, and how proposing and approving are split',
    classes: [
      'Agent payments do not converge on one form. We split classes by who gets paid, then overlay two axes.',
    ],
    classesNote:
      'On these two axes, boundary cases (types α, β and P) fit in the same table. This is an organization by four splits, not a classification confirmed by experiment. The implementation map lives in the Ecosystem on the home page and in the redesign note.',
    classesLink: 'Read the redesign note',

    s4tag: 'Implementation guidance: separate keys, scope and judgment',
    s4: [
      'The realistic starting point is Class 3 — proxy purchasing under a person’s name. In implementation, follow AWS AgentCore Payments’ principle of keeping payment control outside the model, and split responsibility into three. The remaining one (underwriting the agent) has not been solved by anyone yet.',
    ],
    finality: [
      '**A 200 OK is not settled money.** As AgentCore warns, settlement_verified=false is common in practice. “The request was accepted” and “the transfer was confirmed on-chain” are separate events; never treat an API 200 OK as settlement. On our own x402 RFQ Market, a trade where the transfer settled but the data never arrived has actually happened on devnet.',
      '**Some failures a spend cap cannot prevent.** In the OpenClaw case, an agent chose an inappropriate means within its delegated scope — cancelling a third party’s reservation. A spend cap does not constrain how means are chosen, so separate dispute rules are needed.',
    ],
    anchorTag: 'Card networks vs x402: where the transaction is protected',
    anchorNote: 'Which network to use depends on where you put the mechanism that protects the transaction.',
    anchorFit: 'Suited to',

    s5tag: 'Conclusion: where the difference is made',
    planTitle: 'What to do in the first 90 days',
    plan: [
      'Make your APIs support standards such as UCP / MCP so that external agents can find them',
      'With the same setup as AgentCore, physically separate private keys from the LLM context',
      'Combine proof of personhood such as World ID, and record where responsibility lies',
      'Structure the “was it delivered” data standards do not cover, and accumulate it as a verifiable track record per seller',
    ],
    s5close:
      'Once AI holds a wallet, economic activity shifts from “search and judge” to “delegate and verify.” In a world where standards have converged, the difference is made not by technology but by the verifiable record built on top of it — who delivered what. To build that record, x402 Inc. runs four roles itself: the catalog (x402 Endpoint), the buyer (x402 Autonomous Agent), the sellers (Onchain Stock Data, Japan Inflation Nowcall) and the market (x402 RFQ Market, x402 Seller Probe).',
  },
} satisfies Record<Lang, Record<string, unknown>>

type Protocol = { name: string; gov: Localized; func: Localized; value: Localized }
const PROTOCOLS: Protocol[] = [
  {
    name: 'AP2',
    gov: { ja: 'FIDO Alliance', en: 'FIDO Alliance' },
    func: { ja: '誰が支払いを許可したかの証明', en: 'Proving who authorized the payment' },
    value: {
      ja: '人がその場にいない自律取引を W3C の形式で正当化',
      en: 'Legitimizes autonomous transactions with no person present, in W3C format',
    },
  },
  {
    name: 'UCP',
    gov: { ja: 'Tech Council（10社）', en: 'Tech Council (10 firms)' },
    func: { ja: '商品の発見・プロファイル・カート', en: 'Product discovery, profiles, cart' },
    value: {
      ja: '出店を許可制でなくす。Shopify 等が対応',
      en: 'Removes permission gates on listing. Supported by Shopify and others',
    },
  },
  {
    name: 'x402',
    gov: { ja: 'Linux Foundation', en: 'Linux Foundation' },
    func: { ja: 'HTTP 402 でリクエスト単位に支払う', en: 'Pay per request over HTTP 402' },
    value: {
      ja: 'ステーブルコインで送金が確定すれば取り消せない',
      en: 'Once a stablecoin transfer settles, it cannot be reversed',
    },
  },
  {
    name: 'ACP（OpenAI）',
    gov: { ja: 'OpenAI / Stripe', en: 'OpenAI / Stripe' },
    func: { ja: 'チャット内での支払いの実行', en: 'Executing payment inside a chat' },
    value: {
      ja: '人の名義で買う取引（Class 3）。既存のカード網を使う',
      en: 'Purchases under a person’s name (Class 3). Uses existing card networks',
    },
  },
  {
    name: 'Adyen Agentic',
    gov: { ja: 'Adyen（単一企業）', en: 'Adyen (single company)' },
    func: { ja: 'Feed / Cart / Pay の API', en: 'Feed / Cart / Pay APIs' },
    value: {
      ja: '既存のトークン化と不正対策をそのまま AI に適用',
      en: 'Applies existing tokenization and fraud controls directly to AI',
    },
  },
]

type Registry = { name: string; role: Localized; state: Localized; solved: boolean }
const REGISTRIES: Registry[] = [
  {
    name: 'Identity',
    role: { ja: '誰か', en: 'Who' },
    state: { ja: 'AP2 で解決済み', en: 'Solved by AP2' },
    solved: true,
  },
  {
    name: 'Reputation',
    role: { ja: '実績・来歴', en: 'Track record' },
    state: { ja: '空白（履行の検証データが要る）', en: 'Open (needs fulfillment data)' },
    solved: false,
  },
  {
    name: 'Validation',
    role: { ja: '履行の正しさ', en: 'Correct fulfillment' },
    state: { ja: '空白（第三者の検証が要る）', en: 'Open (needs third-party checks)' },
    solved: false,
  },
]

type Anchor = { name: string; anchor: Localized; note: Localized; fit: Localized }
const ANCHORS: Anchor[] = [
  {
    name: 'Visa',
    anchor: { ja: 'Who', en: 'Who' },
    note: { ja: '正規のエージェントの名簿を重視', en: 'Emphasizes a registry of legitimate agents' },
    fit: { ja: '名簿に載った相手との取引', en: 'Trades with registered counterparties' },
  },
  {
    name: 'Mastercard',
    anchor: { ja: 'How', en: 'How' },
    note: {
      ja: '保証付きの決済。一定の取り消しを残す',
      en: 'Guaranteed settlement, keeping some ability to reverse',
    },
    fit: { ja: '取り消しが必要な取引', en: 'Trades that need reversals' },
  },
  {
    name: 'American Express',
    anchor: { ja: 'What', en: 'What' },
    note: {
      ja: '「意図からの逸脱」を自社で判定し補償',
      en: 'Judges “deviation from intent” in-house and compensates',
    },
    fit: { ja: '手厚いが、閉じた系の中の取引', en: 'Well covered, but inside a closed system' },
  },
  {
    name: 'x402',
    anchor: { ja: 'Finality', en: 'Finality' },
    note: {
      ja: '送金が確定したら取り消せない',
      en: 'Once a transfer settles, it cannot be reversed',
    },
    fit: { ja: '機械同士の少額・高頻度の取引', en: 'Small, high-frequency machine-to-machine trades' },
  },
]

const DELEGATION: { id: string; label: Localized; note: Localized; open: boolean }[] = [
  {
    id: 'A',
    label: { ja: '鍵の隔離', en: 'Key isolation' },
    note: { ja: '秘密鍵と支払いヘッダをモデルに渡さない', en: 'Never pass private keys or payment headers to the model' },
    open: false,
  },
  {
    id: 'B',
    label: { ja: '支出範囲の拘束', en: 'Bounded spend' },
    note: { ja: 'ApprovalGrant を使い捨ての権限として渡す', en: 'Hand over an ApprovalGrant as a single-use permission' },
    open: false,
  },
  {
    id: 'C',
    label: { ja: '判断の責任', en: 'Responsibility for judgment' },
    note: { ja: '人の承認記録と突き合わせる', en: 'Reconcile with the person’s approval records' },
    open: false,
  },
  {
    id: 'D',
    label: { ja: 'エージェントへの与信', en: 'Underwriting the agent' },
    note: { ja: '未解決', en: 'Unsolved' },
    open: true,
  },
]

const AXES: { k: Localized; v: Localized }[] = [
  {
    k: { ja: '軸①｜局面', en: 'Axis 1 | context' },
    v: {
      ja: '誰が起案し、誰が承認するか。社内で起案と承認を分ける形から、委任された枠の中でエージェントが自律的に払う形まで',
      en: 'Who proposes and who approves — from separating proposal and approval inside a company, to an agent paying autonomously within a delegated limit',
    },
  },
  {
    k: { ja: '軸②｜経済形', en: 'Axis 2 | economic form' },
    v: {
      ja: 'カード網に載る取引（Class 3）か、口座のない相手に1コールずつ払う取引（Class 4・5）か',
      en: 'Trades that run on card networks (Class 3), or paying a party with no account one call at a time (Class 4 / 5)',
    },
  },
]

/* Renders `**bold**` segments inside a copy string. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

function Prose({ tag, paras }: { tag: string; paras: string[] }) {
  return (
    <motion.div {...fadeUp} className="max-w-3xl">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">{tag}</h2>
      <div className="mt-5 space-y-5">
        {paras.map((p, i) => (
          <p key={i} className="text-fg/70 text-base leading-[1.9]">
            <Rich text={p} />
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
      <PageHero eyebrow="Trust layer" tag={S('pageTag')} title={S('title')} intro={S('intro')} />

      {/* Where it stands + trading with strangers */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12 space-y-8">
        <Prose tag={S('s1tag')} paras={A('s1')} />
        <div className="liquid-glass rounded-2xl p-6 max-w-3xl">
          <h2 className="text-base md:text-lg font-semibold text-fg">{S('strangerTag')}</h2>
          <p className="mt-3 text-sm text-fg/70 leading-[1.9]">{S('stranger')}</p>
        </div>
      </section>

      {/* Standards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('s2tag')} paras={A('s2')} />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROTOCOLS.map((p, i) => (
            <motion.div
              key={p.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
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
          <h3 className="text-sm font-semibold text-fg">{S('acpWarnTitle')}</h3>
          <p className="mt-3 text-sm text-fg/70 leading-[1.7]">{S('acpWarnLead')}</p>
          <ul className="mt-3 space-y-3">
            {A('acpWarn').map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-fg/70 leading-[1.7]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                <span>
                  <Rich text={c} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-fg/70 leading-[1.7]">{S('acpWarnClose')}</p>
        </div>
      </section>

      {/* Authorization / fulfillment / reputation + ERC-8004 */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('s3tag')} paras={A('s3')} />
        <div className="mt-8 grid sm:grid-cols-3 gap-5 max-w-3xl">
          {REGISTRIES.map((r) => (
            <motion.div key={r.name} {...fadeUp} className="liquid-glass rounded-2xl p-5">
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
        <p className="mt-8 max-w-3xl text-fg/70 text-base leading-[1.9]">{S('s3after')}</p>
      </section>

      {/* Agent Economy Classes — two axes */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('classesTag')} paras={A('classes')} />
        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-3xl">
          {AXES.map((ax) => (
            <motion.div key={ax.k.en} {...fadeUp} className="liquid-glass rounded-2xl p-6">
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

      {/* Implementation guidance */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('s4tag')} paras={A('s4')} />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DELEGATION.map((d) => (
            <motion.div key={d.id} {...fadeUp} className="liquid-glass rounded-2xl p-5">
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

        <div className="mt-6 liquid-glass rounded-2xl p-6 max-w-3xl space-y-4">
          {A('finality').map((c) => (
            <p key={c} className="text-sm text-fg/70 leading-[1.8]">
              <Rich text={c} />
            </p>
          ))}
        </div>
      </section>

      {/* Card networks vs x402 */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <Prose tag={S('anchorTag')} paras={[S('anchorNote')]} />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ANCHORS.map((a) => (
            <motion.div key={a.name} {...fadeUp} className="liquid-glass rounded-2xl p-5 flex flex-col">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-fg">{a.name}</p>
                <span className="text-[11px] font-mono text-gold">{a.anchor[lang]}</span>
              </div>
              <p className="mt-3 text-sm text-fg/60 leading-[1.7] flex-1">{a.note[lang]}</p>
              <p className="mt-4 pt-3 border-t border-fg/10 text-xs text-fg/50 leading-[1.6]">
                <span className="text-fg/40">{S('anchorFit')}：</span>
                {a.fit[lang]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">{S('s5tag')}</h2>
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
    </>
  )
}
