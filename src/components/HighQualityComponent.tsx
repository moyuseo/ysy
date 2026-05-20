import React from 'react';
import { HighQualityProduct } from '../types';

interface HighQualityComponentProps {
  product: HighQualityProduct;
}

const HighQualityComponent: React.FC<HighQualityComponentProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {product.imageUrl && (
          <div className="md:w-1/3">
            <img src={product.imageUrl} alt={product.herbName} className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
        <div className="md:w-2/3">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{product.herbName}</h3>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">{product.standardType}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-600">产地：</span>
              {product.origin}
            </div>
            <div>
              <span className="text-gray-600">质量等级：</span>
              <span className="text-green-700 font-medium">{product.qualityLevel}</span>
            </div>
            <div>
              <span className="text-gray-600">库存：</span>
              <span className="text-green-700 font-medium">{product.stock} {product.unit}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">参考价格：</span>
              <span className="text-xl font-bold text-primary-700">{product.price} {product.unit}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">核心优势</h4>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">{feature}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">质检报告</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">{product.testingReport}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">生产信息</h4>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">生产企业：</span>{product.manufacturer}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">联系方式：</span>{product.contact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighQualityComponent;