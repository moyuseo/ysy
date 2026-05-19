export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl text-text mb-8">关于我们</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-medium text-text mb-3">平台介绍</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            中药材行情信息平台致力于为中药材行业从业者提供全面、及时、准确的市场行情数据与行业资讯服务。平台汇聚全国主要中药材交易市场的价格信息，覆盖根及根茎类、果实种子类、全草类、花类、叶类、树皮类、藤木类、动物类、矿石类、菌藻类、香料类等数十个品类，数百个常用药材品种。我们依托专业的数据采集团队和行业分析师，持续追踪中药材市场价格走势、产地动态、政策法规变化，为药农、药商、药企提供决策参考，助力中药材产业健康发展。
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-text mb-3">服务内容</h2>
          <ul className="space-y-2">
            <li className="text-sm text-text-secondary">
              <span className="text-text">实时行情</span> — 覆盖亳州、安国、玉林、成都等全国主要中药材交易市场的价格数据
            </li>
            <li className="text-sm text-text-secondary">
              <span className="text-text">产地快报</span> — 第一时间传递各主产区的种植面积、产量、天气等产地动态
            </li>
            <li className="text-sm text-text-secondary">
              <span className="text-text">品种分析</span> — 专业分析师团队深度解读单品种行情走势与投资逻辑
            </li>
            <li className="text-sm text-text-secondary">
              <span className="text-text">涨跌盘点</span> — 定期盘点市场涨跌品种，把握市场整体趋势
            </li>
            <li className="text-sm text-text-secondary">
              <span className="text-text">供需对接</span> — 提供供应、求购、招标等交易信息发布服务
            </li>
            <li className="text-sm text-text-secondary">
              <span className="text-text">药材知识</span> — 系统整理中药材性味归经、功效主治、种植技术等百科知识
            </li>
            <li className="text-sm text-text-secondary">
              <span className="text-text">政策法规</span> — 及时发布国家药监局、中医药管理局等部门的最新政策法规
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-text mb-3">联系方式</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-text-tertiary mb-1">客服热线</div>
              <div className="text-sm text-text-secondary">400-888-0000</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">商务合作</div>
              <div className="text-sm text-text-secondary">business@yaohangqing.com</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">数据反馈</div>
              <div className="text-sm text-text-secondary">feedback@yaohangqing.com</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">办公地址</div>
              <div className="text-sm text-text-secondary">安徽省亳州市谯城区中药材交易中心</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
