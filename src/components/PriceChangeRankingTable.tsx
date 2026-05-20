import React from 'react';
import { PriceChangeRanking } from '../types';

interface PriceChangeRankingTableProps {
  rankings: PriceChangeRanking[];
}

const PriceChangeRankingTable: React.FC<PriceChangeRankingTableProps> = ({ rankings }) => {
  const risingItems = rankings.filter(item => item.trend === 'up');
  const fallingItems = rankings.filter(item => item.trend === 'down');

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800';
    if (rank === 2) return 'bg-gray-100 text-gray-800';
    if (rank === 3) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-50 text-gray-600';
  };

  const renderRankingItem = (item: PriceChangeRanking) => (
    <tr key={item.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${getRankStyle(item.rank)}`}>
          {item.rank}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-900">{item.herbName}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500">{item.origin}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-900">{item.currentPrice} {item.unit}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          {item.trend === 'up' ? (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
          </span>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">涨幅排行</h3>
          </div>
          <p className="text-sm text-gray-500">价格上涨幅度最大的品种</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">品种</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产地</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">涨幅</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {risingItems.map(renderRankingItem)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">跌幅排行</h3>
          </div>
          <p className="text-sm text-gray-500">价格下跌幅度最大的品种</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">品种</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产地</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">跌幅</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fallingItems.map(renderRankingItem)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceChangeRankingTable;