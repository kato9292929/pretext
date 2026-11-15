import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero, SectionEyebrow } from '../primitives'
import { Updates } from '../sections/Updates'
import { Insights } from '../sections/Insights'
import { useLang, type Lang, type Localized } from '../i18n'

const COPY = {
  ja: {
    pageTag: '考察・調査',
    title: '考察・調査',
    intro:
      '最新の note 記事、Update、Insights、マーケットの見立て、そして記事ライブラリ——x402 Inc. のリサーチをここに集約しています。',
    latest: 'Education',
    read: 'note で読む',
    thesisTag: 'x402 成長性分析',
    thesisTitle: 'Human → AI から AI ↔ AI へ——3つのフェーズ',
    libraryTag: 'これまでの note 記事',
    latestTag: '最新の note 記事',
  },
  en: {
    pageTag: 'Research',
    title: 'Research & Analysis',
    intro:
      'The latest note articles, updates, insights, our market thesis and the note library — all of x402 Inc.’s research, consolidated here.',
    latest: 'Education',
    read: 'Read on note',
    thesisTag: 'Growth analysis',
    thesisTitle: 'From Human → AI to AI ↔ AI — three phases',
    libraryTag: 'Earlier note articles',
    latestTag: 'Latest on note',
  },
  zh: {
    pageTag: '研究与分析',
    title: '研究与分析',
    intro: '最新 note 文章、最新动态、Insights、市场判断以及文章库——x402 Inc. 的研究都汇集在这里。',
    latest: 'Education',
    read: '在 note 上阅读',
    thesisTag: 'x402 成长性分析',
    thesisTitle: '从 Human → AI 到 AI ↔ AI——3 个阶段',
    libraryTag: '以往的 note 文章',
    latestTag: '最新 note 文章',
  },
} satisfies Record<Lang, Record<string, string>>

type TimelineItem = { phase: string; period: Localized; desc: Localized; current?: boolean }

const TIMELINE: TimelineItem[] = [
  {
    phase: 'Phase 1',
    period: { ja: 'Human → AI（現在〜2027年）', en: 'Human → AI (now–2027)', zh: 'Human → AI（现在〜2027 年）' },
    desc: {
      ja: '「人間が権限を委任し、エージェントが執行する」。限度額付きカード委任・プリロードウォレット・x402のAPIゲーティング。エージェントは人間の延長として動きます。x402はすでにここで機能しています。',
      en: '“Humans delegate authority; agents execute.” Limit-capped card delegation, preloaded wallets, x402 API gating. Agents act as an extension of humans. x402 already works here.',
      zh: '“人类委托权限，智能体执行。”带额度上限的银行卡委托、预充值钱包、x402 的 API 付费门槛。智能体作为人类的延伸行动。x402 已经在这一阶段发挥作用。',
    },
    current: true,
  },
  {
    phase: 'Phase 2',
    period: { ja: 'AI ↔ AI 企業間（2027〜2029年）', en: 'AI ↔ AI, enterprise (2027–2029)', zh: 'AI ↔ AI 企业间（2027〜2029 年）' },
    desc: {
      ja: '「エージェントが他のエージェントと条件交渉し、決済まで完結する（B2B）」。Google A2A・Stripe MPPがエージェント間の取引フレームワークを整備中。B2B意思決定者の53%が AI ↔ AI を許可すると回答済み。x402が決済レールとして採用されるシナリオが最も現実的です。',
      en: '“Agents negotiate terms with other agents and settle end-to-end (B2B).” Google A2A and Stripe MPP are building agent-to-agent transaction frameworks. 53% of B2B decision-makers say they’d allow AI ↔ AI. x402 being adopted as the settlement rail is the most realistic scenario.',
      zh: '“智能体与其他智能体协商条件，并完成支付（B2B）。”Google A2A 与 Stripe MPP 正在搭建智能体之间的交易框架。53% 的 B2B 决策者表示会允许 AI ↔ AI。x402 被采纳为结算通道是最现实的情景。',
    },
  },
  {
    phase: 'Phase 3',
    period: { ja: 'AI ↔ AI 成熟（2029年以降）', en: 'AI ↔ AI, mature (2029+)', zh: 'AI ↔ AI 成熟期（2029 年以后）' },
    desc: {
      ja: '「エージェントが独立した経済主体として市場に参加する」。信頼スコアリング・規制フレームワーク・エージェントIDの整備が条件。技術基盤はすでに今のx402の上に立っています。',
      en: '“Agents participate in the market as independent economic actors.” Conditional on trust scoring, regulatory frameworks and agent identity. The technical foundation already stands on today’s x402.',
      zh: '“智能体作为独立的经济主体参与市场。”前提是信任评分、监管框架与智能体身份的完善。技术基础已经建立在今天的 x402 之上。',
    },
  },
]

/* Latest note articles (newest first). Two groups: our own x402 / agent
   payments work, and industry moves. Titles are the note headlines. */
type Latest = { title: Localized; href: string; date: string }
type LatestGroup = { title: Localized; notes: Latest[] }

const N = (id: string) => `https://note.com/x402inc/n/${id}`

const LATEST: LatestGroup[] = [
  {
    title: { ja: 'x402・エージェント決済', en: 'x402 & agent payments', zh: 'x402 与智能体支付' },
    notes: [
      { date: '2026-11-15', href: N('nbdee8a8bb761'), title: { ja: 'ChatGPT Wallet：週12億人のChatGPTのPro会員から始まるネットワークトークンでのdotsの買い物', en: 'ChatGPT Wallet: shopping on dots with network tokens, starting with Pro members of ChatGPT’s 1.2 billion weekly users', zh: 'ChatGPT Wallet：从每周 12 亿用户的 ChatGPT Pro 会员开始，用网络令牌在 dots 购物' } },
      { date: '2026-11-15', href: N('n6efdd5be864f'), title: { ja: 'Stripe Link 日本における規制対応：不正の保護の外に置かれるエージェントの取引と200ドルの責任の上限', en: 'Stripe Link and regulation in Japan: agent transactions left outside fraud protection, and a $200 liability cap', zh: 'Stripe Link 在日本的合规：被排除在欺诈保护之外的智能体交易与 200 美元的责任上限' } },
      { date: '2026-11-15', href: N('na01607376cee'), title: { ja: 'Brave Search APIのx402：APIキーなしで1回0.005ドルで検索の結果を返す6つのエンドポイント', en: 'Brave Search API on x402: six endpoints that return search results for $0.005 per call, no API key', zh: 'Brave Search API 的 x402：无需 API 密钥、每次 0.005 美元返回搜索结果的 6 个端点' } },
      { date: '2026-11-13', href: N('nfc4ff5d5baa0'), title: { ja: 'x402 × クレジットカード実証4・5｜PR #3707 カードバインディングの PAY.JP テストモード実測 3.4秒', en: 'x402 × credit cards, trials 4–5 | PR #3707 card binding measured at 3.4 s in PAY.JP test mode', zh: 'x402 × 信用卡验证试点 4・5｜PR #3707 卡绑定在 PAY.JP 测试模式下实测 3.4 秒' } },
      { date: '2026-11-13', href: N('n6e80675741dc'), title: { ja: 'Claude Securityスキャンから段階リリースまでの開発セキュリティ体制②｜x402 sellerのコードを11項目で点検するClaude Codeスキル', en: 'Our development security from Claude Security scans to staged releases (2) | a Claude Code skill that checks x402 seller code on 11 points', zh: '从 Claude Security 扫描到分阶段发布的开发安全体系②｜用 11 项检查 x402 卖方代码的 Claude Code 技能' } },
      { date: '2026-11-13', href: N('n0dcc632af701'), title: { ja: 'x402市場の現在地：A to AよりB to Bに近いトランザクション86.8%の詳細分析', en: 'Where the x402 market stands: a detailed look at the 86.8% of transactions that look more B-to-B than A-to-A', zh: 'x402 市场现状：比 A to A 更接近 B to B 的 86.8% 交易的详细分析' } },
      { date: '2026-11-13', href: N('n3dfd424abd9c'), title: { ja: 'x402 Endpoint × x402 Seller Probe：払う前に「届くAPI」が分かる16万件のカタログと取引先の広がり', en: 'x402 Endpoint × x402 Seller Probe: a 160,000-entry catalog that shows which APIs deliver before you pay, and the spread of counterparties', zh: 'x402 Endpoint × x402 Seller Probe：付款前就能知道“能交付的 API”的 16 万条目录与交易对象的扩展' } },
      { date: '2026-11-13', href: N('nb2f12acdfac8'), title: { ja: 'Museの一般の利用者向けの設計：モデルを選ばせない1本のチャットと週5億トークンの有料プラン', en: 'Muse’s design for everyday users: one chat with no model picker, and a paid plan of 500 million tokens a week', zh: 'Muse 面向普通用户的设计：不让用户选模型的单一聊天与每周 5 亿 token 的付费方案' } },
      { date: '2026-11-13', href: N('n0f1c89c4b422'), title: { ja: 'ClaudeのWhiteboards・Sheets・Data：AIの会社が作る3つの共同作業の道具', en: 'Claude’s Whiteboards, Sheets and Data: three collaboration tools built by an AI company', zh: 'Claude 的 Whiteboards・Sheets・Data：AI 公司打造的 3 种协作工具' } },
    ],
  },
  {
    title: { ja: '業界の動き', en: 'Industry', zh: '行业动态' },
    notes: [
      { date: '2026-11-13', href: N('nad03d4e6b1eb'), title: { ja: 'CoinbaseのBrian Armstrong氏のエージェントの組み方：分野ごとのリードと1人のチーフ・オブ・スタッフ', en: 'How Coinbase’s Brian Armstrong organises his agents: a lead per area and one chief of staff', zh: 'Coinbase 的 Brian Armstrong 如何组织智能体：按领域设负责人，外加一位幕僚长' } },
      { date: '2026-11-13', href: N('nf381a43f8c51'), title: { ja: '機関向け暗号資産市場：ビットコイン7.4万ドル台の下で進む3つの配管', en: 'The institutional crypto market: three pieces of plumbing advancing with bitcoin around $74,000', zh: '面向机构的加密资产市场：比特币 7.4 万美元区间下推进的 3 条管道' } },
      { date: '2026-11-13', href: N('nc232ffa27b56'), title: { ja: 'iOSのサンドボックスの脱出worse_query：iOS 26.0〜26.7.2と27.2で他のアプリのデータに届く公開のPoC', en: 'worse_query, an iOS sandbox escape: a public PoC that reaches other apps’ data on iOS 26.0–26.7.2 and 27.2', zh: 'iOS 沙盒逃逸 worse_query：在 iOS 26.0〜26.7.2 与 27.2 上可访问其他应用数据的公开 PoC' } },
      { date: '2026-11-13', href: N('ne23d5fbd13fc'), title: { ja: 'freeeの会計事務所向けAIエージェント：1顧問先あたり月1,000円で記帳から申告書のチェックまでを担う4つのプリセット', en: 'freee’s AI agents for accounting firms: four presets covering bookkeeping to return checks for ¥1,000 per client a month', zh: 'freee 面向会计师事务所的 AI 智能体：每个客户每月 1,000 日元、从记账到申报书检查的 4 个预设' } },
      { date: '2026-11-13', href: N('n1fee4a086d87'), title: { ja: 'Businesses in ChatGPT：週12億人のChatGPTに自社の情報を載せて直す事業者のプロフィールのベータ', en: 'Businesses in ChatGPT: a beta of business profiles that let companies list and correct their information in ChatGPT, used by 1.2 billion people a week', zh: 'Businesses in ChatGPT：让企业在每周 12 亿用户的 ChatGPT 中发布并修正自身信息的商家资料测试版' } },
      { date: '2026-11-13', href: N('n9d69d342400b'), title: { ja: 'NVIDIAのCEO交代：約5,300億ドルの保証と約束を抱えるAIの資金の循環', en: 'NVIDIA’s CEO change: an AI funding loop carrying about $530 billion in guarantees and commitments', zh: 'NVIDIA 的 CEO 更替：承载约 5,300 亿美元担保与承诺的 AI 资金循环' } },
      { date: '2026-11-13', href: N('n7d15c99fe1f6'), title: { ja: 'フィンテック市場2026 M&A18件：作るのに5年かかるものを買う6つの理由', en: 'Fintech 2026, 18 M&A deals: six reasons to buy what would take five years to build', zh: '2026 年金融科技市场 18 起并购：买下需要 5 年才能做出来的东西的 6 个理由' } },
      { date: '2026-11-13', href: N('nedcbed6c6d55'), title: { ja: 'MiniPayのLink by Stripeでの入金：2,000万超のウォレットに加わるカードでのステーブルコインの購入', en: 'MiniPay top-ups with Link by Stripe: card purchases of stablecoins come to 20 million+ wallets', zh: 'MiniPay 通过 Link by Stripe 充值：2,000 万以上钱包新增用银行卡购买稳定币' } },
      { date: '2026-11-13', href: N('n0b111f134712'), title: { ja: 'Fintech協会の規制改革の提言（2026年11月）：22ページのうちAIエージェントに関わる3つの提案', en: 'The Fintech Association’s regulatory reform proposals (Nov 2026): the three of 22 pages that concern AI agents', zh: 'Fintech 协会的监管改革建议（2026 年 11 月）：22 页中与 AI 智能体相关的 3 项提案' } },
    ],
  },
]

type Note = { title: Localized; href: string }
type NoteColumn = { title: string; notes: Note[] }

const COLUMNS: NoteColumn[] = [
  {
    title: 'Vision',
    notes: [
      {
        title: {
          ja: 'AIエージェントがアクセスできないデータを、公共財にする',
          en: "Making data AI agents can't access a public good",
          zh: '让 AI 智能体无法访问的数据成为公共品',
        },
        href: 'https://note.com/x402inc/n/n9f72e49f7d6e',
      },
      {
        title: {
          ja: 'エージェンティックコマース元年の「現在地」：Human → AI 段階から AI ↔ AI への移行はいつ起きるか',
          en: 'The current state in year one of agentic commerce: when does the shift from Human → AI to AI ↔ AI happen?',
          zh: '智能体商务元年的“现状”：从 Human → AI 阶段向 AI ↔ AI 的转变何时发生',
        },
        href: 'https://note.com/x402inc/n/n3dc6f62c363d',
      },
      {
        title: {
          ja: 'ステーブルコイン決済の62.9%はB2B——Stripeが企業間の決済インフラを再設計する2026年',
          en: '62.9% of stablecoin payments are B2B — 2026, the year Stripe redesigns B2B payment infrastructure',
          zh: '稳定币支付的 62.9% 是 B2B——Stripe 重新设计企业间支付基础设施的 2026 年',
        },
        href: 'https://note.com/x402inc/n/nb266051df2bc',
      },
    ],
  },
  {
    title: 'Research',
    notes: [
      {
        title: {
          ja: 'Claude for Financial Services時代の「エージェント決済」——クレカで十分か、それともステーブルコインが必要か',
          en: '“Agent payments” in the Claude for Financial Services era — are cards enough, or do we need stablecoins?',
          zh: 'Claude for Financial Services 时代的“智能体支付”——信用卡就够了，还是需要稳定币',
        },
        href: 'https://note.com/x402inc/n/n0e30d662d0f0',
      },
      {
        title: {
          ja: 'Amex ACEの「インテントコントラクト」と「シングルユーストークン」——決済レイヤーに残る最後の空白',
          en: 'Amex ACE’s “intent contracts” and “single-use tokens” — the last gap in the payments layer',
          zh: 'Amex ACE 的“意图合约”与“一次性令牌”——支付层最后的空白',
        },
        href: 'https://note.com/x402inc/n/n3defba4a1a28',
      },
      {
        title: {
          ja: 'AIエージェント × クレジットカード：MoonAgents Card・Oobit Agent Cards・Stripe Issuing for agentsを整理する',
          en: 'AI agents × credit cards: sorting out MoonAgents Card, Oobit Agent Cards and Stripe Issuing for agents',
          zh: 'AI 智能体 × 信用卡：梳理 MoonAgents Card・Oobit Agent Cards・Stripe Issuing for agents',
        },
        href: 'https://note.com/x402inc/n/na798062b2b1a',
      },
      {
        title: {
          ja: 'AIエージェントがSubstackの有料記事を自律決済で読む時代——DripStackが示すx402の本命ユースケース',
          en: 'When AI agents read paywalled Substack posts via autonomous payment — the killer x402 use case DripStack shows',
          zh: 'AI 智能体通过自主支付阅读 Substack 付费文章的时代——DripStack 展示的 x402 核心用例',
        },
        href: 'https://note.com/x402inc/n/n9c179c890113',
      },
      {
        title: {
          ja: 'a16zが22億ドルを投じる理由：クリプトが「革命」を捨て「実用主義」を選んだ5つの決定的理由',
          en: 'Why a16z is investing $2.2B: five decisive reasons crypto traded “revolution” for “pragmatism”',
          zh: 'a16z 投入 22 亿美元的原因：加密行业放弃“革命”、选择“实用主义”的 5 个决定性理由',
        },
        href: 'https://note.com/x402inc/n/n117082cc82b5',
      },
      {
        title: {
          ja: 'Stripeが「AIの経済インフラ」を本気で作り始めた——Stripe Sessions 2026、288の発表を読み解く',
          en: 'Stripe is seriously building “the economic infrastructure for AI” — decoding 288 announcements from Stripe Sessions 2026',
          zh: 'Stripe 开始认真打造“AI 的经济基础设施”——解读 Stripe Sessions 2026 的 288 项发布',
        },
        href: 'https://note.com/x402inc/n/nd945306fb457',
      },
    ],
  },
  {
    title: 'Research to B',
    notes: [
      {
        title: {
          ja: 'ヘッドレスマーチャント普及後の未来図——エージェント決済はクレカで足りるのかx402 が要るのか',
          en: 'The future after headless merchants go mainstream — are cards enough for agent payments, or is x402 needed?',
          zh: '无头商户普及之后的未来图景——智能体支付用信用卡够不够，还是需要 x402',
        },
        href: 'https://note.com/x402inc/n/nf7b60bdf0a56',
      },
      {
        title: {
          ja: 'エージェント決済スタックの MCP / Wallet / CLI を比較する——Solana / Circle / MoonPay / OKX / Coinbase / Base',
          en: 'Comparing the MCP / Wallet / CLI of agent payment stacks — Solana / Circle / MoonPay / OKX / Coinbase / Base',
          zh: '比较智能体支付栈的 MCP / Wallet / CLI——Solana / Circle / MoonPay / OKX / Coinbase / Base',
        },
        href: 'https://note.com/x402inc/n/n823acd3be97e',
      },
      {
        title: {
          ja: '企業 AI 決済とは何か——承認付きの「サブスク払いのオンチェーン化」として実装する',
          en: 'What is enterprise AI payment — implementing it as approval-gated “on-chain subscription billing”',
          zh: '什么是企业 AI 支付——以带审批的“订阅付费上链”方式实现',
        },
        href: 'https://note.com/x402inc/n/na3d3b01dbd1c',
      },
      {
        title: {
          ja: 'エージェント決済の未来予想図——2026 年から 2029 年への 4 つの移行',
          en: 'A forecast for agent payments — four transitions from 2026 to 2029',
          zh: '智能体支付的未来预测——从 2026 年到 2029 年的 4 个转变',
        },
        href: 'https://note.com/x402inc/n/n57ac88867b5d',
      },
      {
        title: {
          ja: '需要は H→A、供給は A↔A——エージェント経済への先行投資をどう読むか',
          en: 'Demand is H→A, supply is A↔A — how to read early investment in the agent economy',
          zh: '需求是 H→A，供给是 A↔A——如何解读对智能体经济的先行投资',
        },
        href: 'https://note.com/x402inc/n/n86211ffa3ff9',
      },
      {
        title: {
          ja: '企業 AI が「自律決済」に到達するのはいつか——プラグイン経由クレカという現実と、x402 自律決済までの距離',
          en: 'When enterprise AI reaches “autonomous payment” — the reality of plugin-based cards and the distance to x402 autonomous payment',
          zh: '企业 AI 何时实现“自主支付”——经由插件的信用卡现实，与 x402 自主支付之间的距离',
        },
        href: 'https://note.com/x402inc/n/n89d4f38377cd',
      },
      {
        title: {
          ja: 'AI エージェントが稼いで使うバックエンド——5 月の業界進捗を踏まえて',
          en: 'The backend where AI agents earn and spend — in light of May’s industry progress',
          zh: 'AI 智能体赚钱与花钱的后端——基于 5 月的行业进展',
        },
        href: 'https://note.com/x402inc/n/nb02c810843f6',
      },
      {
        title: {
          ja: 'AI エージェントに商品を売らせるためのバックエンド——決済 4 層構造とエコシステム接続',
          en: 'The backend for letting AI agents sell products — a four-layer payment structure and ecosystem connectivity',
          zh: '让 AI 智能体销售商品的后端——支付的 4 层结构与生态连接',
        },
        href: 'https://note.com/x402inc/n/n72418e4adbac',
      },
      {
        title: {
          ja: 'エージェンティックコマースのフェーズ論を更新する——Dan Shipper の 6 つの予測と、5 月の業界進捗',
          en: 'Updating the phase theory of agentic commerce — Dan Shipper’s six predictions and May’s industry progress',
          zh: '更新智能体商务的阶段论——Dan Shipper 的 6 个预测与 5 月的行业进展',
        },
        href: 'https://note.com/x402inc/n/nb6f4cac169e8',
      },
    ],
  },
]

export function Research() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <>
      <PageHero eyebrow="Vision & Research" tag={t.pageTag} title={t.title} intro={t.intro} />

      {/* Latest note articles */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Latest" tag={t.latestTag} />
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {LATEST.map((g) => (
            <div key={g.title.en}>
              <h3 className="text-sm font-semibold text-fg/70 tracking-wide">{g.title[lang]}</h3>
              <div className="mt-4 grid gap-3">
                {g.notes.map((note) => (
                  <a
                    key={note.href}
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl p-4 flex items-start justify-between gap-3 group"
                  >
                    <span>
                      <span className="block font-mono text-[11px] text-fg/40">{note.date}</span>
                      <span className="mt-1 block text-sm text-fg/80 leading-[1.6]">{note.title[lang]}</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 flex-none text-fg/30 group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest updates + insights, consolidated at the top of the Journal */}
      <Updates />
      <Insights />

      {/* Market thesis timeline */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Market Thesis" tag={t.thesisTag} />
        <h2 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight">{t.thesisTitle}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {TIMELINE.map((item) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`liquid-glass rounded-2xl p-6 ${
                item.current ? 'ring-1 ring-gold/40' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gold">{item.phase}</span>
                {item.current && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold text-bg font-semibold">
                    NOW
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-fg">{item.period[lang]}</p>
              <p className="mt-3 text-sm text-fg/60 leading-[1.7]">{item.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full note library */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        <SectionEyebrow label="Library" tag={t.libraryTag} />
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-fg/70 uppercase tracking-wide">
                {col.title}
              </h3>
              <div className="mt-4 grid gap-3">
                {col.notes.map((note) => (
                  <a
                    key={note.href}
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl p-4 flex items-start justify-between gap-3 group"
                  >
                    <p className="text-sm text-fg/80 leading-[1.6]">{note.title[lang]}</p>
                    <ArrowUpRight className="w-3.5 h-3.5 flex-none text-fg/30 group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
