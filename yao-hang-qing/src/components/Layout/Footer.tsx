import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1280px] mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 font-serif">关于我们</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  平台介绍
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  免责声明
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-serif">联系方式</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>客服电话：400-888-8888</li>
              <li>商务合作：business@yaohangqing.com</li>
              <li>工作时间：周一至周五 9:00-18:00</li>
              <li>地址：安徽省亳州市中药材市场</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-serif">友情链接</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="https://www.bozhou.gov.cn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  亳州市人民政府
                </a>
              </li>
              <li>
                <a href="https://www.nmpa.gov.cn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  国家药品监督管理局
                </a>
              </li>
              <li>
                <a href="https://www.satcm.gov.cn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  国家中医药管理局
                </a>
              </li>
              <li>
                <a href="https://www.cntcm.com.cn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  中国中医药报
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/60">
          © {new Date().getFullYear()} 药行情 版权所有 | 皖ICP备XXXXXXXX号
        </div>
      </div>
    </footer>
  );
}
