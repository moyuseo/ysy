import React from 'react';
import { TraceabilityProduct } from '../types';

interface TraceabilityComponentProps {
  product: TraceabilityProduct;
}

const TraceabilityComponent: React.FC<TraceabilityComponentProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {product.imageUrl && (
          <div className="md:w-1/3">
            <img src={product.imageUrl} alt={product.herbName} className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.herbName}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div><span className="text-gray-600">批号：</span>{product.batchNo}</div>
            <div><span className="text-gray-600">溯源码：</span><span className="font-mono text-primary-700">{product.traceCode}</span></div>
            <div><span className="text-gray-600">产地：</span>{product.origin}</div>
            <div><span className="text-gray-600">规格：</span>{product.specifications}</div>
            <div><span className="text-gray-600">质量等级：</span><span className="text-green-700 font-medium">{product.qualityLevel}</span></div>
            <div><span className="text-gray-600">生产日期：</span>{product.productionDate}</div>
            <div><span className="text-gray-600">有效期至：</span>{product.expiryDate}</div>
            <div><span className="text-gray-600">供应商：</span>{product.supplierName}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">完整溯源流程</h4>
        <div className="relative">
          {product.traceRecords.map((record, index) => (
            <div key={record.id} className="flex gap-4 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                {index < product.traceRecords.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                )}
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-gray-900">{record.title}</h5>
                  <span className="text-sm text-gray-500">{record.date}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">地点：</span>{record.location}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">操作员：</span>{record.operator}
                </div>
                <div className="text-sm text-gray-700">{record.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TraceabilityComponent;