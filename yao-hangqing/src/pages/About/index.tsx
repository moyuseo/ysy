import { CheckCircle, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="font-serif text-2xl font-bold text-text mb-6">关于我们</h1>

      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">平台介绍</h2>
          <p className="text-sm text-text leading-relaxed">
            中药材行情信息平台致力于为中药材行业从业者提供全面、及时、准确的市场行情数据与行业资讯服务。平台汇聚全国主要中药材交易市场的价格信息，覆盖根及根茎类、果实种子类、全草类、花类、叶类、树皮类、藤木类、动物类、矿石类、菌藻类、香料类等数十个品类，数百个常用药材品种。我们依托专业的数据采集团队和行业分析师，持续追踪中药材市场价格走势、产地动态、政策法规变化，为药农、药商、药企提供决策参考，助力中药材产业健康发展。
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">服务内容</h2>
          <ul className="space-y-3">
            {[
              '实时行情：覆盖亳州、安国、玉林、成都等全国主要中药材交易市场的价格数据',
              '产地快报：第一时间传递各主产区的种植面积、产量、天气等产地动态',
              '品种分析：专业分析师团队深度解读单品种行情走势与投资逻辑',
              '涨跌盘点：定期盘点市场涨跌品种，把握市场整体趋势',
              '供需对接：提供供应、求购、招标等交易信息发布服务',
              '药材知识：系统整理中药材性味归经、功效主治、种植技术等百科知识',
              '政策法规：及时发布国家药监局、中医药管理局等部门的最新政策法规',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-text">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-serif text-lg border-l-4 border-primary pl-3 mb-4">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">客服热线</div>
                <div className="text-sm text-text">400-888-0000</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">商务合作</div>
                <div className="text-sm text-text">business@yaohangqing.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">数据反馈</div>
                <div className="text-sm text-text">feedback@yaohangqing.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="text-xs text-text-secondary">办公地址</div>
                <div className="text-sm text-text">安徽省亳州市谯城区中药材交易中心</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
