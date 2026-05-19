import { Leaf, Users, Target, Award, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl text-ink tracking-wide mb-4">关于我们</h1>
        <p className="text-ink-light text-lg max-w-2xl mx-auto">
          专注中药材价格信息服务，汇聚行业数据，传承千年智慧
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="paper-card p-8 text-center group">
          <div className="w-16 h-16 bg-indigo-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo transition-colors">
            <Leaf className="w-8 h-8 text-indigo group-hover:text-white" />
          </div>
          <h3 className="font-serif text-xl text-ink mb-3">专业数据</h3>
          <p className="text-ink-light text-sm leading-relaxed">
            覆盖全国主要中药材市场，每日更新价格数据，确保信息准确及时
          </p>
        </div>
        <div className="paper-card p-8 text-center group">
          <div className="w-16 h-16 bg-cinnabar-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cinnabar transition-colors">
            <Users className="w-8 h-8 text-cinnabar group-hover:text-white" />
          </div>
          <h3 className="font-serif text-xl text-ink mb-3">专业团队</h3>
          <p className="text-ink-light text-sm leading-relaxed">
            拥有资深中药材行业专家团队，深入产地一线，提供专业分析
          </p>
        </div>
        <div className="paper-card p-8 text-center group">
          <div className="w-16 h-16 bg-ochre-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-ochre transition-colors">
            <Target className="w-8 h-8 text-ochre group-hover:text-white" />
          </div>
          <h3 className="font-serif text-xl text-ink mb-3">服务宗旨</h3>
          <p className="text-ink-light text-sm leading-relaxed">
            以数据驱动决策，助力中药材行业数字化转型，服务产业链各方
          </p>
        </div>
      </div>

      <div className="paper-card p-10 mb-16">
        <h2 className="font-serif text-2xl text-ink mb-8 text-center">我们的优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-jade-muted rounded flex items-center justify-center">
              <Award className="w-6 h-6 text-jade" />
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-2">数据权威</h4>
              <p className="text-sm text-ink-light leading-relaxed">
                与全国各大中药材市场建立长期合作关系，数据来源可靠，覆盖品种广泛
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-jade-muted rounded flex items-center justify-center">
              <Award className="w-6 h-6 text-jade" />
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-2">更新及时</h4>
              <p className="text-sm text-ink-light leading-relaxed">
                每日采集市场行情，实时更新价格数据，帮助用户把握市场动态
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-jade-muted rounded flex items-center justify-center">
              <Award className="w-6 h-6 text-jade" />
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-2">分析专业</h4>
              <p className="text-sm text-ink-light leading-relaxed">
                专业团队提供行情分析报告，解读市场趋势，辅助经营决策
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-jade-muted rounded flex items-center justify-center">
              <Award className="w-6 h-6 text-jade" />
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-2">服务全面</h4>
              <p className="text-sm text-ink-light leading-relaxed">
                提供价格查询、供求对接、资讯推送等一站式服务，满足多元化需求
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="paper-card p-10">
        <h2 className="font-serif text-2xl text-ink mb-8 text-center">联系我们</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 bg-indigo-muted rounded flex items-center justify-center">
              <Phone className="w-6 h-6 text-indigo" />
            </div>
            <div>
              <div className="text-sm text-ink-muted mb-1">服务热线</div>
              <div className="font-mono text-ink font-semibold">400-888-8888</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 bg-indigo-muted rounded flex items-center justify-center">
              <Mail className="w-6 h-6 text-indigo" />
            </div>
            <div>
              <div className="text-sm text-ink-muted mb-1">电子邮箱</div>
              <div className="font-mono text-ink font-semibold">service@yaohangqing.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 bg-indigo-muted rounded flex items-center justify-center">
              <MapPin className="w-6 h-6 text-indigo" />
            </div>
            <div>
              <div className="text-sm text-ink-muted mb-1">公司地址</div>
              <div className="text-ink font-semibold">安徽省亳州市中药材交易中心</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
