export interface EODSnapshot {
  date: string
  equity: number
}

export interface DrawdownPoint {
  date: string
  drawdown: number
}

export interface OpenTrade {
  symbol: string
  date: string
  side: string
  status?: string
  shares?: string
  entry_price?: string
  stop_level?: string
  target?: string
  sector?: string
  time_stop?: string
  catalyst?: string
  thesis?: string
}

export interface Research {
  raw?: string
  regime_note?: string
  vix?: string
  decision?: string
}

export interface SnapshotData {
  equity_history: EODSnapshot[]
  open_trades: OpenTrade[]
  research: Research
  phase_pnl: string
  week_return: string
}

export interface Position {
  symbol: string
  qty: string
  avg_entry_price: string
  current_price: string
  unrealized_pl: string
  unrealized_plpc: string
  has_stop: boolean
  stop_level?: string
  target?: string
  sector?: string
  time_stop?: string
  entry_date?: string
}

export interface LiveData {
  source: 'live'
  equity: number
  cash: number
  day_pnl: number
  positions: Position[]
  orders: unknown[]
}

export interface TradeStats {
  total_trades: number
  wins: number
  losses: number
  win_rate: number | null
  profit_factor: number | null
  net_pnl: number
  gross_win: number
  gross_loss: number
}

export interface DrawdownData {
  max_drawdown: number
  current_drawdown: number
  series: DrawdownPoint[]
}

export interface RMultiple {
  symbol: string
  date: string
  r: number
}

export interface RBucket {
  label: string
  count: number
}

export interface RMultiplesData {
  trades: RMultiple[]
  buckets: RBucket[]
  avg_r: number | null
  count: number
}

export interface Streaks {
  current_streak: number
  current_type: 'W' | 'L' | null
  best_win_streak: number
}

export interface SectorPnl {
  [sector: string]: { pnl: number; count: number }
}

export interface AnalyticsData {
  equity_history: EODSnapshot[]
  drawdown: DrawdownData
  stats: TradeStats
  r_multiples: RMultiplesData
  sector_pnl: SectorPnl
  streaks: Streaks
  open_trades: OpenTrade[]
  closed_count: number
}

export interface Headline {
  headline: string
  source: string
  created_at: string
  url: string
  symbols: string[]
}

export interface NewsData {
  symbols: string[]
  headlines: Headline[]
  error?: string
}

export interface SparklineBar {
  date: string
  close: number
}

export type SparklineData = Record<string, SparklineBar[]>
