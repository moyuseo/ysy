import { Leaf, Users, Target, Award, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="text-center mb-16 anim-up">
        <h1 className="section-title text-3xl mb-4">关于我们</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          专注中药材价格信息服务，汇聚行业数据，传承千年智慧
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card p-8 text-center group anim-up d1">
          <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-800 transition-colors">
            <Leaf className="w-8 h-8 text-green-700 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-serif text-xl text-slate-900 mb-3">专业数据</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            覆盖全国主要中药材市场，每日更新价格数据，确保信息准确及时
          </p>
        </div>
        <div className="card p-8 text-center group anim-up d2">
          <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-800 transition-colors">
            <Users className="w-8 h-8 text-green-700 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-serif text-xl text-slate-900 mb-3">专业团队</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            拥有资深中药材行业专家团队，深入产地一线，提供专业分析
          </p>
        </div>
        <div className="card p-8 text-center group anim-up d3">
          <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-800 transition-colors">
            <Target className="w-8 h-8 text-green-700 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-serif text-xl text-slate-900 mb-3">服务宗旨</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            以数据驱动决策，助力中药材行业数字化转型，服务产业链各方
          </p>
        </div>
      </div>

      <div className="card mb-16 anim-up d4">
        <div className="card-head justify-center">
          <h2 className="section-title">我们的优势</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">数据权威</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  与全国各大中药材市场建立长期合作关系，数据来源可靠，覆盖品种广泛
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">更新及时</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  每日采集市场行情，实时更新价格数据，帮助用户把握市场动态
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">分析专业</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  专业团队提供行情分析报告，解读市场趋势，辅助经营决策
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">服务全面</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  提供价格查询、供求对接、资讯推送等一站式服务，满足多元化需求
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card anim-up d5">
        <div className="card-head justify-center">
          <h2 className="section-title">联系我们</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">服务热线</div>
                <div className="font-mono text-slate-900 font-semibold">400-888-8888</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">电子邮箱</div>
                <div className="font-mono text-slate-900 font-semibold">service@yaohangqing.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">公司地址</div>
                <div className="text-slate-900 font-semibold">安徽省亳州市中药材交易中心</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
