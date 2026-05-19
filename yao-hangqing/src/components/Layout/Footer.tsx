import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80 mt-12">
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-6 h-6 text-primary-lightest" />
              <span className="font-serif text-lg font-bold text-white">药行情</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              专业的中药材行情信息平台，提供实时价格、供求信息、行业资讯、品种百科等一站式服务。
            </p>
          </div>

          <div>
            <h4 className="font-medium text-white mb-3">快速导航</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/price" className="hover:text-white transition-colors">行情价格</Link>
              <Link to="/trade" className="hover:text-white transition-colors">供求信息</Link>
              <Link to="/rank" className="hover:text-white transition-colors">涨跌排行</Link>
              <Link to="/news" className="hover:text-white transition-colors">资讯中心</Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-3">更多服务</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/wiki" className="hover:text-white transition-colors">知识百科</Link>
              <Link to="/search" className="hover:text-white transition-colors">品种搜索</Link>
              <Link to="/about" className="hover:text-white transition-colors">关于我们</Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-3">联系方式</h4>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <span>客服热线：400-888-8888</span>
              <span>工作时间：周一至周五 9:00-18:00</span>
              <span>邮箱：service@yaohangqing.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <span>Copyright © 2026 药行情 All Rights Reserved</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span>免责声明</span>
            <span>隐私政策</span>
            <span>友情链接</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
