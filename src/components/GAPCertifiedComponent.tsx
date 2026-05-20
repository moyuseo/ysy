import React from 'react';
import { GAPCertifiedProduct } from '../types';

interface GAPCertifiedComponentProps {
  product: GAPCertifiedProduct;
}

const GAPCertifiedComponent: React.FC<GAPCertifiedComponentProps> = ({ product }) => {
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
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">GAP认证</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-600">认证证书号：</span>
              <span className="font-mono">{product.certificateNo}</span>
            </div>
            <div>
              <span className="text-gray-600">认证机构：</span>
              {product.certifiedBy}
            </div>
            <div>
              <span className="text-gray-600">认证日期：</span>
              {product.certificationDate}
            </div>
            <div>
              <span className="text-gray-600">有效期至：</span>
              <span className="text-green-700 font-medium">{product.validUntil}</span>
            </div>
            <div>
              <span className="text-gray-600">基地位置：</span>
              {product.baseLocation}
            </div>
            <div>
              <span className="text-gray-600">种植面积：</span>
              {product.areaSize}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">主要产品</h4>
            <div className="flex flex-wrap gap-2">
              {product.mainProducts.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">{item}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">质量标准</h4>
            <div className="flex flex-wrap gap-2">
              {product.qualityStandards.map((standard, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{standard}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">生产信息</h4>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">企业名称：</span>{product.manufacturerName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">地址：</span>{product.manufacturerAddress}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">联系方式：</span>{product.contact}
            </p>
          </div>
        </div>
      </div>
      
      {product.certificateImage && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">证书展示</h4>
          <img 
            src={product.certificateImage} 
            alt="GAP认证证书" 
            className="w-full max-w-lg rounded-lg border border-gray-200" 
          />
        </div>
      )}
    </div>
  );
};

export default GAPCertifiedComponent;