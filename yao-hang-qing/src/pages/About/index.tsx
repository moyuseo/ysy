import { Activity, Handshake, Newspaper, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold text-primary">关于药行情</h1>
        <p className="text-text-secondary">
          专注中药材市场行情，服务中医药产业发展
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center border-l-4 border-primary pl-3 text-xl font-bold text-text">
          平台介绍
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
          <p>
            药行情是国内专业的中药材市场行情信息服务平台，致力于为中药材产业链上下游企业提供全面、及时、准确的市场行情数据与资讯服务。平台覆盖全国主要中药材专业市场，实时追踪数百种大宗及道地药材的价格走势、供需动态与政策变化，帮助从业者把握市场脉搏，做出科学决策。
          </p>
          <p>
            我们依托专业的数据采集团队和行业分析师，建立了完善的中药材行情监测体系，涵盖亳州、安国、成都、廉桥、玉林等全国十七大中药材专业市场，为药材种植户、经营商、饮片厂、制药企业及投资机构提供一站式行情信息服务。
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 flex items-center border-l-4 border-primary pl-3 text-xl font-bold text-text">
          我们的优势
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-bold text-text">实时行情</h3>
            <p className="text-sm text-text-secondary">
              覆盖全国主要药材市场，每日更新价格数据，涨跌趋势一目了然，助您快速掌握市场动态。
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Handshake className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-bold text-text">供求对接</h3>
            <p className="text-sm text-text-secondary">
              汇集海量供求信息，打通产供销链条，为买卖双方搭建高效对接平台，降低交易成本。
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Newspaper className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-bold text-text">专业资讯</h3>
            <p className="text-sm text-text-secondary">
              资深行业分析师团队，提供深度行情解读、产地快报、政策法规等专业资讯，洞察市场先机。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 flex items-center border-l-4 border-primary pl-3 text-xl font-bold text-text">
          联系方式
        </h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">联系电话</p>
                <p className="text-sm font-medium text-text">400-888-6688</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">电子邮箱</p>
                <p className="text-sm font-medium text-text">service@yaohangqing.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">公司地址</p>
                <p className="text-sm font-medium text-text">安徽省亳州市谯城区中药材交易中心</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">工作时间</p>
                <p className="text-sm font-medium text-text">周一至周五 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center border-l-4 border-primary pl-3 text-xl font-bold text-text">
          免责声明
        </h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm leading-relaxed text-text-secondary">
            本平台所提供的中药材行情数据及资讯信息仅供参考，不构成任何投资建议或交易依据。中药材价格受产地、品质、市场供需等多种因素影响，实际交易价格可能与平台展示价格存在差异。用户应根据自身情况独立判断，自行承担交易风险。本平台不对因使用本站信息而造成的任何损失承担责任。
          </p>
        </div>
      </section>
    </div>
  );
}
