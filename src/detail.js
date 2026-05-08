import './style.css'

const projects = {
  1: {
    index: 'PROJECT 01',
    title: '花小猪司机端改版',
    desc: '参与花小猪司机端“司机福利社”卡券体验优化，围绕权益展示、购买路径和分类逻辑进行重新梳理，提升司机对福利卡券的理解和使用效率。',
    tags: ['UI/UX', '司机端', '卡券优化', '体验设计'],
    images: [
      '/images/project-1/01.jpg',
      '/images/project-1/02.jpg',
      '/images/project-1/03.jpg',
      '/images/project-1/04.jpg',
      '/images/project-1/05.jpg',
      '/images/project-1/06.jpg',
      '/images/project-1/07.jpg',
      '/images/project-1/08.jpg',
      '/images/project-1/09.jpg',
      '/images/project-1/10.jpg',
      '/images/project-1/11.jpg',
      '/images/project-1/12.jpg',
      '/images/project-1/13.jpg',
      '/images/project-1/14.jpg',
    ],
  },

  2: {
    index: 'PROJECT 02',
    title: '聚好赚工作台与司机队长需求',
    desc: '围绕聚好赚代驾活动与司机队长任务场景，梳理运营端、司机端和活动页面之间的信息关系，优化任务配置、审核与活动展示逻辑。',
    tags: ['B端设计', '运营后台', '司机活动', '信息架构'],
    images: [
      '/images/project-2/01.jpg',
      '/images/project-2/02.jpg',
      '/images/project-2/03.jpg',
      '/images/project-2/04.jpg',
    ],
  },

  3: {
    index: 'PROJECT 03',
    title: '聚好赚代驾司推乘营销活动',
    desc: '针对司机邀请乘客返现活动，设计活动页视觉、规则说明、进度反馈与结果状态展示，提升司机对活动机制的理解和参与意愿。',
    tags: ['UI设计', '移动端', 'AIGC', '活动设计'],
    images: [
      '/images/project-3/01.jpg',
      '/images/project-3/02.jpg',
      '/images/project-3/03.jpg',
      '/images/project-3/04.jpg',
    ],
  },

  4: {
    index: 'PROJECT 04',
    title: '品牌IP与活动物料系统设计',
    desc: '围绕品牌IP形象和活动传播场景，完成活动页面、视觉物料和辅助图形系统设计，增强品牌识别度和传播统一性。',
    tags: ['品牌设计', 'IP设计', '视觉系统', '活动物料'],
    images: [
      '/images/project-4/01.jpg',
      '/images/project-4/02.jpg',
      '/images/project-4/03.jpg',
      '/images/project-4/04.jpg',
      '/images/project-4/05.jpg',
      '/images/project-4/06.jpg',
      '/images/project-4/07.jpg',
      '/images/project-4/08.jpg',
      '/images/project-4/09.jpg',
      '/images/project-4/10.jpg',
    ],
  },

other: {
  index: 'PROJECT ETC',
  title: '其他项目',
  desc: '这里展示更多设计探索、视觉练习、AIGC尝试、课程作业与过往项目沉淀，作为主项目之外的补充内容。',
  tags: ['视觉设计', 'AIGC', '练习项目', '设计探索'],
  images: [
    '/images/project-other/01.jpg',
    '/images/project-other/02.jpg',
  ],
},
}
const params = new URLSearchParams(window.location.search)
const projectId = params.get('id') || '1'
const project = projects[projectId]

const projectGallery = document.querySelector('#project-gallery')
const headerTitle = document.querySelector('#header-title')

if (!project) {
  headerTitle.textContent = '项目不存在'
  projectGallery.innerHTML = '<p class="text-center text-gray-400 py-20 text-xl">没有找到这个项目，请返回作品展示页重新选择。</p>'
} else {
  headerTitle.textContent = project.title

  projectGallery.innerHTML = project.images
    .map((src, index) => {
      return `
        <div class="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
          <img 
            src="${src}" 
            alt="${project.title} 第 ${index + 1} 页" 
            class="w-full h-auto block"
          />
        </div>
      `
    })
    .join('')
}