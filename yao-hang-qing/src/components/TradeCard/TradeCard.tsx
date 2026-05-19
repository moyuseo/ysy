import type { Trade } from '../../types';
import { TRADE_TYPE_LABELS } from '../../utils/constants';

interface TradeCardProps {
  trade: Trade;
}

export default function TradeCard({ trade }: TradeCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex">
        <div className="w-28 shrink-0 bg-bg flex items-center justify-center">
          {trade.imageUrl ? (
            <img
              src={trade.imageUrl}
              alt={trade.herbName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl text-text-secondary">🌿</span>
          )}
        </div>

        <div className="flex-1 p-3">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
              {TRADE_TYPE_LABELS[trade.type]}
            </span>
            {trade.isPromoted && (
              <span className="rounded bg-gold/20 px-1.5 py-0.5 text-xs font-medium text-gold">
                推广
              </span>
            )}
          </div>

          <h3 className="mb-1 text-sm font-medium text-text">{trade.herbName}</h3>

          <div className="space-y-0.5 text-xs text-text-secondary">
            <div className="flex gap-3">
              <span>规格: {trade.spec}</span>
              <span>产地: {trade.origin}</span>
            </div>
            <div className="flex gap-3">
              <span>数量: {trade.quantity}</span>
              <span className="font-data text-text">{trade.price}</span>
            </div>
            <div>联系: {trade.contact}</div>
          </div>

          {trade.type === 'demand' && (
            <div className="mt-1.5 flex gap-3 text-xs text-text-secondary">
              {trade.quoteCount !== undefined && <span>报价: {trade.quoteCount}条</span>}
              {trade.remainingDays !== undefined && <span>剩余: {trade.remainingDays}天</span>}
            </div>
          )}

          {trade.type === 'bidding' && trade.company && (
            <div className="mt-1.5 text-xs text-text-secondary">
              招标单位: {trade.company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
