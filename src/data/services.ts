import type { Localized } from '../i18n'

/* Services that take x402 payments: our own products and the intel APIs.
   Prices and URLs are the real ones (see the products page); nothing here is
   an estimate. Shared by the about-page catalog and the home phone. */

export const ENDPOINT = 'https://endpoint.x402jp.com/'

export type Service = {
  group: 'own' | 'intel'
  mark: string
  color: string
  name: string
  desc: Localized
  price: { free?: boolean; from?: string; label?: Localized }
  url: string
}

export const SERVICES: Service[] = [
  { group: 'own', mark: 'J', color: '#2f7d6d', name: 'Japan Inflation Nowcall', desc: { ja: '東京の店頭価格から作る食品物価指数', en: 'A food price index built from Tokyo shelf prices', zh: '基于东京门店货架价格编制的食品物价指数' }, price: { from: '$0.01' }, url: 'https://jin.x402jp.com/api/jin/latest' },
  { group: 'own', mark: 'O', color: '#2563eb', name: 'Onchain Stock Data', desc: { ja: '米国株・日本株のカタリストと採点の記録', en: 'Catalysts and scoring records for US and Japanese stocks', zh: '美股与日股的催化剂及评分记录' }, price: { from: '$0.01' }, url: 'https://osd.x402jp.com/api/alpha/portfolio/current' },
  { group: 'own', mark: 'R', color: '#7c3aed', name: 'x402 RFQ Market', desc: { ja: '条件を出し、売り手に見積もりを競わせる市場（devnet）', en: 'Post conditions and let sellers compete on quotes (devnet)', zh: '提出条件，由卖方竞相报价的市场（devnet）' }, price: { label: { ja: '落札価格の1%', en: '1% of the winning price', zh: '成交价的1%' } }, url: 'https://rfq.x402jp.com/' },
  { group: 'own', mark: 'P', color: '#0f766e', name: 'x402 Seller Probe', desc: { ja: '売り手の 402・決済・納品を外から測ったスコア', en: 'Scores from measuring sellers’ 402, payment and delivery', zh: '从外部测量卖方 402、支付与交付所得的评分' }, price: { free: true }, url: 'https://probe.x402jp.com/' },
  { group: 'own', mark: 'E', color: '#b45309', name: 'x402 Endpoint', desc: { ja: '161,826 エンドポイントの日次カタログ（2026年10月19日時点）', en: 'A daily catalog of 161,826 endpoints (as of Oct 19, 2026)', zh: '161,826 个端点的每日目录（截至2026年10月19日）' }, price: { free: true }, url: ENDPOINT },
  { group: 'intel', mark: 'M', color: '#1d4ed8', name: 'APAC Macro Dashboard', desc: { ja: 'APAC マクロ：金利・為替・フロー・リスク', en: 'APAC macro: rates, FX, flows and risk regime', zh: 'APAC 宏观：利率、汇率、资金流与风险' }, price: { from: '$0.30' }, url: 'https://x402amd.vercel.app/api/macro/dashboard' },
  { group: 'intel', mark: 'Y', color: '#0891b2', name: 'Yield Intelligence', desc: { ja: 'DeFi の利回りとスマートマネー残高', en: 'DeFi yields and smart-money balances', zh: 'DeFi 收益率与聪明钱持仓' }, price: { from: '$0.20' }, url: 'https://x402yi.vercel.app/api/yield/scan' },
  { group: 'intel', mark: 'R', color: '#be185d', name: 'Japan Real Estate Yield', desc: { ja: '日本の不動産利回り（エリア指定）', en: 'Japanese real estate yields by area', zh: '日本房地产收益率（按区域）' }, price: { from: '$0.30' }, url: 'https://x402-jrey.vercel.app/api/realestate/yield?area=tokyo' },
  { group: 'intel', mark: 'D', color: '#9333ea', name: 'Divergence Analyzer', desc: { ja: '予測市場とオンチェーンフローの乖離', en: 'Divergence between prediction markets and on-chain flows', zh: '预测市场与链上资金流的背离' }, price: { from: '$0.15' }, url: 'https://x402nansenpolymarket.vercel.app/api/divergence/scan' },
  { group: 'intel', mark: 'S', color: '#ca8a04', name: 'Smart Money Screener', desc: { ja: 'スマートマネーが買っているトークン', en: 'Tokens that smart money is buying', zh: '聪明钱正在买入的代币' }, price: { from: '$0.05' }, url: 'https://smartmoneyscreener.vercel.app/api/screener/smart-money' },
]
