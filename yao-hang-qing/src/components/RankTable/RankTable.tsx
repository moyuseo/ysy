import { useNavigate } from 'react-router-dom';
import { formatPrice, formatChange } from '../../utils/format';

interface RankItem {
  rank: number;
  herbName: string;
  spec: string;
  market: string;
  price: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface RankTableProps {
  items: RankItem[];
}

function getRankDisplay(rank: number) {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return rank;
  }
}

export default function RankTable({ items }: RankTableProps) {
  const navigate = useNavigate();

  function getChangeColor(trend: 'up' | 'down' | 'stable') {
    switch (trend) {
      case 'up': return 'text-up';
      case 'down': return 'text-down';
      case 'stable': return 'text-stable';
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="px-4 py-3 text-center font-medium w-16">排名</th>
            <th className="px-4 py-3 text-left font-medium">品种</th>
            <th className="px-4 py-3 text-left font-medium">规格</th>
            <th className="px-4 py-3 text-left font-medium">市场</th>
            <th className="px-4 py-3 text-right font-medium">价格</th>
            <th className="px-4 py-3 text-right font-medium">涨跌幅</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr
              key={item.rank}
              className={`${idx % 2 === 0 ? 'bg-card' : 'bg-[#FAFAF5]'} hover:bg-bg transition-colors`}
            >
              <td className="px-4 py-3 text-center text-base">{getRankDisplay(item.rank)}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => navigate(`/herb?name=${encodeURIComponent(item.herbName)}`)}
                  className="text-primary hover:underline font-medium"
                >
                  {item.herbName}
                </button>
              </td>
              <td className="px-4 py-3 text-text-secondary">{item.spec}</td>
              <td className="px-4 py-3 text-text-secondary">{item.market}</td>
              <td className="px-4 py-3 text-right font-data text-text">{formatPrice(item.price)}</td>
              <td className={`px-4 py-3 text-right font-data ${getChangeColor(item.trend)}`}>
                {formatChange(item.change)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
