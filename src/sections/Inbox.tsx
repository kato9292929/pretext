import { motion } from 'motion/react'
import {
  Sparkles,
  Inbox as InboxIcon,
  Star,
  Send,
  File,
  Archive,
  Trash,
  Search,
  Reply,
  Forward,
  Trash2,
  MoreHorizontal,
  Paperclip,
} from 'lucide-react'

const NAV = [
  { icon: InboxIcon, label: 'Inbox', count: 12, active: true },
  { icon: Star, label: 'Starred', count: 3 },
  { icon: Send, label: 'Sent' },
  { icon: File, label: 'Drafts', count: 2 },
  { icon: Archive, label: 'Archive' },
  { icon: Trash, label: 'Trash' },
]

const LABELS = [
  { name: 'Work', color: '#00d2ff' },
  { name: 'Personal', color: '#A4F4FD' },
  { name: 'Travel', color: '#f59e0b' },
  { name: 'Finance', color: '#10b981' },
]

const MESSAGES = [
  {
    name: 'Linear',
    subject: 'Weekly product digest',
    preview: 'Your team shipped 23 issues this week...',
    time: '9:41 AM',
    unread: true,
    active: true,
  },
  {
    name: 'Sophia Chen',
    subject: 'Re: Q3 roadmap review',
    preview: 'Thanks for sending the deck over. I had a few thoughts...',
    time: '8:12 AM',
    unread: true,
  },
  {
    name: 'Figma',
    subject: 'Marcus commented on your file',
    preview: 'Love the new direction on the landing hero.',
    time: 'Yesterday',
  },
  {
    name: 'Stripe',
    subject: 'Payout of $12,480.00 sent',
    preview: 'Your payout is on its way to your bank...',
    time: 'Yesterday',
  },
  {
    name: 'Vercel',
    subject: 'Deployment ready for aura-web',
    preview: 'Preview is live at aura-web-g3f.vercel.app',
    time: 'Mon',
  },
  {
    name: 'GitHub',
    subject: '[aura/core] PR #482 approved',
    preview: 'david-lim approved your pull request.',
    time: 'Mon',
  },
]

export function Inbox() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center px-4 h-10 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <div className="flex-1 text-center text-xs text-white/50">Aura — Inbox</div>
          <div className="w-14" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-12 h-[520px]">
          {/* Sidebar */}
          <div className="col-span-3 border-r border-white/10 bg-black/30 p-4 flex flex-col gap-4 overflow-y-auto">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2">
              <Sparkles className="w-3.5 h-3.5" />
              Compose with Aura
            </button>

            <nav className="flex flex-col gap-0.5">
              {NAV.map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs transition-colors ${
                    item.active
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count != null && <span className="text-white/40">{item.count}</span>}
                </button>
              ))}
            </nav>

            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40 px-2.5 mb-2">
                Labels
              </p>
              <div className="flex flex-col gap-0.5">
                {LABELS.map((label) => (
                  <div
                    key={label.name}
                    className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-white/60"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: label.color }} />
                    <span>{label.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message list */}
          <div className="col-span-4 border-r border-white/10 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/10 text-white/40">
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search mail</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {MESSAGES.map((msg) => (
                <div
                  key={msg.subject}
                  className={`px-4 py-3 border-b border-white/5 cursor-pointer transition-colors ${
                    msg.active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs ${
                        msg.unread ? 'text-white font-semibold' : 'text-white/70'
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-white/40">{msg.time}</span>
                  </div>
                  <p
                    className={`text-xs mt-0.5 ${
                      msg.unread ? 'text-white/90' : 'text-white/60'
                    }`}
                  >
                    {msg.subject}
                  </p>
                  <p className="text-[11px] text-white/40 mt-0.5 truncate">{msg.preview}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reader */}
          <div className="col-span-5 flex flex-col overflow-hidden">
            <div className="flex items-center gap-1 px-4 h-11 border-b border-white/10">
              {[Reply, Forward, Archive, Trash2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
              <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/70 ml-auto">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <h3 className="text-lg font-semibold text-white">Weekly product digest</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] flex items-center justify-center text-xs font-semibold text-white">
                  L
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white">Linear</p>
                  <p className="text-[10px] text-white/50">to me · 9:41 AM</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/60">
                  Work
                </span>
              </div>

              {/* Summary by Aura */}
              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: '#A4F4FD' }} />
                  <span className="text-xs font-semibold text-white">Summary by Aura</span>
                </div>
                <p className="text-xs text-white/70 leading-[1.5]">
                  Your team closed 23 issues, merged 14 PRs, and shipped 2 features. Top contributor:
                  Marcus. No action needed.
                </p>
              </div>

              <div className="mt-5 space-y-3 text-xs text-white/70 leading-[1.6]">
                <p>Hi team,</p>
                <p>
                  Here is your weekly digest of everything happening across your projects. This was a
                  strong week with significant progress on the Q3 roadmap.
                </p>
                <p>
                  Twenty-three issues were closed, fourteen pull requests were merged, and two
                  customer-facing features went out. The velocity trend continues to climb.
                </p>
                <p>Let me know if you would like a deeper breakdown by project or contributor.</p>
                <p className="text-white/50">— The Linear team</p>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
                <Paperclip className="w-3.5 h-3.5" />
                digest-may-6.pdf
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
