import { Building2, Phone, Mail, MapPin, Leaf, TrendingUp, Users, BookOpen, Clock } from 'lucide-react';

const FEATURES = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: '实时行情',
    description: '覆盖亳州、安国、玉林、成都等全国主要中药材交易市场的价格数据'
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: '产地快报',
    description: '第一时间传递各主产区的种植面积、产量、天气等产地动态'
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: '品种分析',
    description: '专业分析师团队深度解读单品种行情走势与投资逻辑'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: '涨跌盘点',
    description: '定期盘点市场涨跌品种，把握市场整体趋势'
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: '供需对接',
    description: '提供供应、求购、招标等交易信息发布服务'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '药材知识',
    description: '系统整理中药材性味归经、功效主治、种植技术等百科知识'
  }
];

const CONTACT_INFO = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: '客服热线',
    value: '400-888-0000'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: '商务合作',
    value: 'business@yaohangqing.com'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: '数据反馈',
    value: 'feedback@yaohangqing.com'
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: '办公地址',
    value: '安徽省亳州市谯城区中药材交易中心'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg py-10">
      {/* Hero Section */}
      <div className="gradient-hero text-white py-20 mb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-6">关于我们</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              专业的中药材行情信息平台，助力您的业务决策
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-10 mb-10">
          <h2 className="font-serif text-3xl font-semibold text-text border-l-4 border-primary pl-4 mb-6">
            平台介绍
          </h2>
          <div className="space-y-4 text-text leading-relaxed text-lg">
            <p>
              中药材行情信息平台致力于为中药材行业从业者提供全面、及时、准确的市场行情数据与行业资讯服务。
              我们汇聚全国主要中药材交易市场的价格信息，覆盖根及根茎类、果实种子类、全草类、花类、叶类、
              树皮类、藤木类、动物类、矿石类、菌藻类、香料类等数十个品类，数百个常用药材品种。
            </p>
            <p>
              我们依托专业的数据采集团队和行业分析师，持续追踪中药材市场价格走势、产地动态、政策法规变化，
              为药农、药商、药企提供决策参考，助力中药材产业健康发展。
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-10 mb-10">
          <h2 className="font-serif text-3xl font-semibold text-text border-l-4 border-primary pl-4 mb-8">
            服务内容
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="p-6 bg-bg rounded-xl hover:bg-primary/5 transition-all duration-300">
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl border border-border-light shadow-sm p-10">
          <h2 className="font-serif text-3xl font-semibold text-text border-l-4 border-primary pl-4 mb-8">
            联系方式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONTACT_INFO.map((info, index) => (
              <div key={index} className="flex items-start gap-4 p-5 bg-bg rounded-xl">
                <div className="text-primary shrink-0">
                  {info.icon}
                </div>
                <div>
                  <div className="text-primary font-semibold text-lg mb-1">{info.label}</div>
                  <div className="text-text-muted text-lg">{info.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
