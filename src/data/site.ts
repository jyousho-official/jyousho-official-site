export const site = {
  name: '情報処理研究会',
  shortName: 'JYOUSHO',
  domain: 'jyousho-official-site.pages.dev',
  description: 'プログラミング、イラスト、CG、動画、音楽の5つの班で、デジタル作品の制作と発表に取り組む情報処理研究会の公式サイトです。',
  nav: [
    { href: '/about', label: '私たちについて' },
    { href: '/teams', label: '班紹介' },
    { href: '/works', label: '作品' },
    { href: '/festival', label: '文化祭' },
    { href: '/news', label: 'お知らせ' },
  ],
};

export const socialLinks = [
  { href: 'https://x.com/jousyo_tku', label: 'X', icon: 'x' },
  { href: 'https://www.youtube.com/@tkujyousho2037', label: 'YouTube', icon: 'youtube' },
  { href: 'https://www.instagram.com/jyousho0831', label: 'Instagram', icon: 'instagram' },
] as const;

export const teamLabels = {
  programming: 'プログラミング班',
  illustration: 'イラスト班',
  cg: 'CG班',
  video: '動画班',
  music: '音楽班',
} as const;

export const teams = [
  {
    id: 'programming',
    name: 'プログラミング班',
    file: 'programming.exe',
    icon: 'code',
    image: '/images/teams/programming.svg',
    description: '主にPythonやJavaScriptなどを使い、ゲームやWebアプリを制作します。',
    activity: 'WSLやGitHubを活用し、チームでの開発や個人制作を行います。',
    publishPlatform: 'GitHub',
  },
  {
    id: 'illustration',
    name: 'イラスト班',
    file: 'illustration.png',
    icon: 'pen',
    image: '/images/teams/illustration.svg',
    description: '主にイラスト制作と関連イベントへの参加、そして他班のプロジェクトにおけるイラスト部分での協力を行います。',
    activity: 'デジタル作画の練習から、Webや動画で使う素材づくりまで担当します。',
    publishPlatform: 'X',
  },
  {
    id: 'cg',
    name: 'CG班',
    file: 'cg.blend',
    icon: 'cube',
    image: '/images/teams/cg.svg',
    description: '基本はblenderによる3DCGモデリングからアニメーション制作をしています。',
    activity: 'Blenderなどを使い、映像やゲームに使える3D素材やシーンを制作します。',
    publishPlatform: 'InstagramとYouTube',
  },
  {
    id: 'video',
    name: '動画班',
    file: 'video.mp4',
    icon: 'video',
    image: '/images/teams/video.svg',
    description: '企画、撮影、編集を通して、活動紹介や作品発表の映像を制作します。',
    activity: '短編動画、告知映像、文化祭向けの展示映像などを形にします。',
    publishPlatform: 'YouTube',
  },
  {
    id: 'music',
    name: '音楽班',
    file: 'music.wav',
    icon: 'music',
    image: '/images/teams/music.svg',
    description: 'FL STUDIOを軸に自分の好きな音楽を表現する制作を行っています。',
    activity: 'ゲームや動画に合わせたBGM、ジングル、サウンド素材を制作します。',
    publishPlatform: 'YouTube',
  },
] as const;

export const festival = {
  year: '2026',
  date: '日程が決まり次第お知らせします',
  place: '場所が決まり次第お知らせします',
  time: '開催時間が決まり次第お知らせします',
  notice: '展示内容や来場案内は、準備状況に合わせて順次更新します。',
};
