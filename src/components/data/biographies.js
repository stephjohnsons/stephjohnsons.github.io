import { reactive } from 'vue'

export const biographies = {
  English: [
    'performer | educator | curator',
    'Stephen has performed extensively and internationally across 3 continents as a cellist. A native of Kota Kinabalu, he has performed in orchestras such as the Denver Philharmonic, American Festival, the National Symphony of Malaysia, the Malaysian Philharmonic, among many others. Having studied and attended masterclasses with cellists Julie Dessureault, Asier Polo, Jacob Shaw, Leonid Shukaev, Thomas Duran, Thomas Loewenheim, and the late Alexander Buzlov, Stephen was greatly influenced to be a great enthusiast of various genres and soundscapes. ',
    'As a performer, he favours creative communication between artistic hive minds to generate exhilarating experiences for attending audiences. He frequently performs with the DSCH Quartet and Kamerata Kuala Lumpur, and has performed in chamber recitals with Giacomo Banella, Ng Chong Lim, Poom Prommachart, P’ng Tean Hwa, to name a few. Stephen was also invited to the Mas Palou Artist Residency in 2023 together with Daniel Bucurescu for their interdisciplinary project in social identity: „no!“.',
    'His recent performances also showcase his versatility, as he has appeared in concerts with Pradeep Kumar, Nathania Ong, Joe Flizzow, and Izen Kong; as well as corporate events with Viu, Tatler, HSBC, Maybank, Signature Kitchen, and Kenanga. Stephen also performs regularly with Tarakucha!, a Malaysian big band featuring Malayan songs of the 60s and 70s.',
    'As an educator, Stephen has extensive cello pedagogical experience - he taught at the British International School, Epsom College, University of Malaya, and Sunway University, prior to accepting a full time tenured position with the UCSI University in 2019. Stephen also occasionally tutors for the ‘Genius Seni Muzik’, the youth orchestra programme at the Istana Budaya, Kuala Lumpur. Even after his departure from academia in 2024, Stephen still teaches at UCSI University and University of Malaya as an adjunct instructor. ',
    'Stephen performs on a 2014 Han Zhao-sheng cello. ',
    'Last edited Feb 2025. Do not use or amend without permission.'
  ],
  Chinese: [
    '演奏家 | 教育家 | 藝術策展家',
    '鄒子傑，來自馬來西亞沙巴州，音樂啟蒙於十二歲。 2012 年，赴吉隆坡思达雅大學音樂學院修讀音樂學系，主脩大提琴演奏。 2016 年，他獲得古典音樂榮譽學士學位。同年，他獲得思达雅大學全額獎學金，繼續深造音樂表演學，並於 2018 年獲得碩士學位。曾師事 Julie Dessureault 及 Thomas Duran、衛奇塔州立大學的 Leonid Shukaev 教授、加州州立大學弗雷斯諾分校的弦樂主任 Thomas Loewenheim 教授，以及已故著名的大提琴獨奏家 Alexander Buzlov，從而受益於不同音樂風格與背景的影響。',
    '作為一名大提琴演奏家，鄒子傑熱衷和其他藝術家和音樂家進行集體創作和思維交流。他也熱衷於創造獨特的視覺和聽覺效果，並使用獨特的音樂技巧或表演方式，以激發聽眾的觀賞體驗。',
    '擁有樂團與室內樂演奏經驗豐富的他，曾獲得法國阿爾卑斯山音樂節以及怡保音樂節的室內樂演奏比賽榮獲優等獎。此外，曾多次遠赴於歐洲、美國以及亞洲各地參與樂團及室內樂演出，其中包括美國節慶管弦樂團、美國丹佛愛樂樂團、國際青年交響樂團等。 2022 年，參與德國慕尼黑音樂巡演、迪士尼管弦樂團音樂會、張藝興新馬巡演、及於意大利大提琴家 Giacomo Banella 的獨奏音樂會擔任大提琴協演。 2023 年，遠赴西班牙參與 Mas Palou 藝術家駐村計劃，以及於馬來西亞各地和遠赴印尼鋼琴三重奏和鋼琴五重奏巡演。',
    '除了熱愛演出，鄒子傑也熱衷投入於音樂相關行政與教育。除了大提琴教學，他也是思达雅大學音樂學院和雙威大學音樂系的兼任講師。同時，他也於吉隆坡 Kamerata 弦樂團擔任主席一職。',
    '鄒子傑目前使用著名制琴師——韓兆生老師於 2014 年所製的大提琴。',
    '編輯於 2024年4月。請勿未經許可擅自使用或修改。'
  ],
  Malay: [
    'pemuzik | pendidik | kurator seni',
    'Stephen merupai seorang pemuzik violoncello yang berasal dari Kota Kinabalu. Beliau telah tampil di tiga benua bersama pelbagai kumpulan seperti Orkestra Festival Amerika, YPHIL, Orkestra Simfoni Kebangsaan Malaysia, dan sebagainya.',
    'Stephen juga memiliki minat yang mendalam terhadap genre-genre bukan klasikal, dan persembahannya seringkali dibentangkan dengan catan bunyi yang luas. Keberhasilan ini sebahagian besarnya adalah hasil daripada pengalaman beliau menghadiri kelas dengan pemain-pemain cello dari pelbagai latar belakang seperti Julie Dessureault, Asier Polo, Jacob Shaw, Leonid Shukaev, Thomas Duran, Thomas Loewenheim, dan mendiang Alexander Buzlov.',
    'Pada musim 2022/23, beliau telah menampilkan konsert bersama Orkestra Filharmonik Denver di Munich, Jerman; dua konsert Disney di Malaysia; konsert jelajah bersama Lay Zhang di Singapura dan Malaysia; resital cello-bass bersama Giacomo Banella, dan penglibatannya di Residensi Seniman Mas Palou 2023 di Sepanyol. Belakangan ini, Stephen akan teruskan pengurusan and kurator projek interdisipliner/sosio-artistik “no!” bersama pianis Jerman Daniel Bucurescu dan memberikan perhatian sepenuhnya kepada kuintet pianonya dengan ahli-ahli fakulti Universiti UCSI.',
    'Sebagai seorang pendidik, Stephen memiliki pengalaman pedagogi cello yang luas - beliau telah mengajar di British International School, Epsom College, Universiti Malaya, dan kemudian menerima diplomanya dalam pendidikan pada tahun 2022. Stephen juga sesekali menjadi tutor untuk program orkestra belia ‘Genius Seni Muzik’, di Istana Budaya, Kuala Lumpur. Stephen turut kepala program Diploma di Institut Musik UCSI pada 2021-2022; kini beliau mengajar di Universiti UCSI dan Sunway sebagai pengajar sambilan.',
    'Stephen memain cello Han Zhao-Sheng, buatan tahun 2014.',
    'Sunting terakhir pada April 2024. Dilarang mengguna atau mengubah bio ini tanpa kebenaran.'
  ],
  German: [
    'Musiker | Pädagoge | Kunstkurator',
    'Stephen hat als Cellist umfangreiche und internationale Auftritte auf drei Kontinenten absolviert. Gebürtig aus Kota Kinabalu, hat er mit dem American Festival Orchestra, dem YPHIL International Philharmonic und dem National Symphony Orchestra of Malaysia, unter vielen anderen, musiziert. Durch das Studium und die Teilnahme an Meisterkursen bei Cellisten wie Julie Dessureault, Asier Polo, Jacob Shaw, Leonid Shukaev, Thomas Duran, Thomas Loewenheim und dem verstorbenen Alexander Buzlov, wurde Stephen stark beeinflusst und ist ein großer Enthusiast verschiedener Genres und Klangwelten geworden.',
    'Als Interpret bevorzugt er die kreative Kommunikation zwischen künstlerischen Zentren, um aufregende Erlebnisse für das Publikum zu schaffen. In seiner jüngsten Saison spielte er Konzerte mit der Denver Philharmonic und dem Chor der Bayerische Philharmonie im Herkulessaal in München, Deutschland; zwei Disney-Konzerte in Malaysia; eine Konzerttournee mit Lay Zhang in Singapur und Malaysia; ein Cello-Bass-Recital mit Giacomo Banella.',
    'Zu den bemerkenswerten Projekten in der Saison 2023/2024 gehören sein Engagement bei der Mas Palou Artist Residency 2023 in Spanien, das Kuratieren eines interdisziplinären/sozio-künstlerischen Projekts „no!“ mit dem deutschen Pianisten Daniel Bucurescu, eine Klavierquintett-Konzerttournee in Indonesien, Vorstellungen mit der Big Band Tarakucha! mit den Sängern Sean Ghazi & Ida Mariana und das Heimkehrkonzert der singapurischen Sängerin Nathania Ong im Esplanade.',
    'Als Pädagoge verfügt Stephen über umfangreiche pädagogische Erfahrungen im Cello-Unterricht – er unterrichtete an der British International School, dem Epsom College, der Universität Malaya und erhielt später im Jahr 2022 sein Diplom in Pädagogik. Gelegentlich unterrichtet Stephen auch für das ‚Genius Seni Muzik‘, das Jugendorchesterprogramm am Istana Budaya, Kuala Lumpur. Früher war er Leiter der Diplomprogramme am UCSI Institute of Music; derzeit lehrt er als Dozent an den Universitäten UCSI und Sunway.',
    'Stephen spielt auf einem Cello von Han Zhao-sheng aus dem Jahr 2014.',
    'Zuletzt bearbeitet im April 2024. Nicht ohne Erlaubnis verwenden oder ändern.'
  ]
}

export const teachingBio = [
  'Stephen Tseu is the cello faculty at the University of Malaya and the UCSI Institute of Music, where he used to teach music theory and chamber music. Previously, he was a peripatetic cello and string tutor at the Epsom College, British International School, Yamaha Tawau, as well as at the Kian Kok Middle School.',
  'In academia, Stephen was appointed the Head of Diploma Programmes at the Institute of Music, UCSI University for 2 years from 2021, where he oversees and manages the curriculum for Diploma in Music programmes. As a lecturer, he has taught theory, string quartet studies, string pedagogy, performance skills, and chamber music classes.',
  'Stephen is a long-time tutor for the Genius Seni Muzik (formerly Permata Seni) programme at the Istana Budaya, and has experience teaching solo- and ensemble style playing on the cello. In his lessons, Stephen focuses mainly on the connection of kinesiological awareness to tone colour and concepts of acoustical aesthetics in his lessons.',
  'Stephen is the co-author, with Yew Cheong Choong, of Music Theory Rudiments (UCSI University Press, 2024), a theory book focused on preparing prospective students for tertiary level theory classes at his alma mater. His research focuses on performance studies, string pedagogy, and cultural management studies, as well as an accomplished performing cellist outside of research.',
  'Updated Mar 2025. Do not use or amend without permission.'
]

export const teachingProfile = reactive({
  Philosophy: [
    'Awareness of body (coordination, body muscles)',
    'Aural and theoretical understanding of music',
    'Tone production on cello'
  ],
  'Classes Offered': [
    'Individual cello lessons',
    'Group cello lessons',
    'Chamber music coaching',
    'Music theory lessons'
  ],
  'Other Trainings and Experience': [
    'Classroom Management & Safety',
    'Special Educational Needs (SEN)',
    'Postgraduate Diploma in Education'
  ]
})

export const devBio = [
  "Outside of music, I develop websites and I love all things tech and artsy. When I'm not practicing on my cello, I'm usually knee-deep in looking out for latest design trends and web development technologies. I started out in mid-2021 as a self-taught developer, and since learning the bits and pieces of the tech industry, I decided that I would dive into the industry in early 2023, and got a position as a software developer later.",
  'In web development, I currently specialise in front-end development, but I have a little bit of experience with everything from UI/UX writing and design to coding to QA, and also project management.',
  'I am currently on a career hiatus and is currently freelancing as a performing cellist.',
  'Updated Jul 2024. Do not use or amend without permission.'
]

export const devProfile = reactive({
  'Music Software': ['Logic Pro', 'MainStage', 'Sibelius', 'Finale'],
  'Music Education': [
    'Higher Education Curriculum and Syllabi Writing (MQA)',
    'Classroom and Lesson Management',
    'Digital integration and process improvement',
    'Google Workspace',
    'Microsoft Office and 365 Apps'
  ],
  'Web Development': [
    'Javascript, Typescript',
    'Vue.js (Nuxt), Angular, React (Next.js)',
    'Bootstrap and Tailwind CSS',
    'GraphQL',
    'API Integration and Testing (Postman)',
    'Ruby on Rails',
    'Node.js',
    'Python',
    'Version Control (GitHub, GitLab, Git)'
  ],
  'Content Management System': ['Wordpress', 'Wix'],
  'Project Management': ['ClickUp', 'Trello', 'Slack (integrated with PM tools)'],
  Wireframing: ['Figma', 'Adobe XD'],
  'Graphic Design': ['Adobe Photoshop', 'Adobe Illustrator'],
  'Marketing and CRM': ['Mailchimp', 'Yapsody']
})

export const certificates = [
  {
    name: 'Foundations of UX Design',
    provider: 'Google',
    issuanceDate: 'Sep 2022',
    credentials: 'S7QXXMK93KPU'
  },
  {
    name: 'Introduction to Back-End Development',
    provider: 'Meta',
    issuanceDate: 'Oct 2022',
    credentials: '4EV9QWAVSJ97'
  },
  {
    name: 'Introduction to Databases for Back-End Development',
    provider: 'Meta',
    issuanceDate: 'Nov 2022',
    credentials: '6D7JSCNGXA9N'
  },
  {
    name: 'Introduction to Front-End Development',
    provider: 'Meta',
    issuanceDate: 'Jan 2023',
    credentials: 'AK5S39VSNNCB'
  },
  {
    name: 'AWS Cloud Technical Essentials',
    provider: 'Amazon Web Services (AWS)',
    issuanceDate: 'Aug 2023',
    credentials: 'TLM7YTCXS3EQ'
  },
  {
    name: 'Version Control',
    provider: 'Meta',
    issuanceDate: 'Oct 2023',
    credentials: '8HPG64UXWADB'
  },
  {
    name: 'Python Basics',
    provider: 'University of Michigan',
    issuanceDate: 'Oct 2023',
    credentials: '5F4BCTM5JS7G'
  },
  {
    name: 'Programming with JavaScript',
    provider: 'Meta',
    issuanceDate: 'Oct 2023',
    credentials: '6FPGQU7BUXZ5'
  },
  {
    name: 'Principles of UX/UI Design',
    provider: 'Meta',
    issuanceDate: 'Oct 2023',
    credentials: 'Z7G47PQRCSF4'
  },
  {
    name: 'IT Support Specialization Certificate',
    provider: 'Google',
    issuanceDate: 'May 2024',
    credentials: 'KNLGDHFZNAA4',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/KNLGDHFZNAA4'
  }
]

export const education = [
  {
    degree: 'Postgraduate Diploma in Tertiary Education',
    provider: 'UCSI University, Kuala Lumpur',
    graduated: 'Apr 2022',
    major: 'Educational psychology, sociology, and philosophy; microteaching'
  },
  {
    degree: 'Master of Music',
    provider: 'UCSI Institute of Music, Kuala Lumpur',
    graduated: 'Apr 2018',
    major: 'Performance studies; chamber music (string quartet)',
    teachers:
      '• Julie Dessureault (cello)<br> • Orfeo Trio, Raphaël Chrétien, Ruth Rosique, Guillaume Chilemme (ensemble)<br> • Asier Polo, Thomas Duran, Thomas Loewenheim (masterclasses)'
  },
  {
    degree: 'Bachelor of Classical Music (with honours)',
    provider: 'UCSI Institute of Music, Kuala Lumpur',
    graduated: 'Aug 2016',
    major: 'Classical music performance',
    teachers:
      '• Julie Dessureault, Leonid Shukaev (cello)<br> • Lee Yin Hwa, Alla Yanisheva, Orfeo Trio (ensemble)<br> • Gleb Stepanov, Alexander Buzlov, Albert Wang (masterclasses)'
  }
]

export const languages = [
  {
    name: 'English',
    level: 'Trilingual native speaker',
    spoken: 'Fluent',
    written: 'Fluent'
  },
  {
    name: 'Malay',
    level: 'Trilingual native speaker',
    spoken: 'Fluent',
    written: 'Proficient'
  },
  {
    name: 'Hakka Chinese (客家話)',
    level: 'Trilingual native speaker',
    spoken: 'Fluent',
    written: '-'
  },
  {
    name: 'Mandarin Chinese (简体/繁体)',
    level: '12 years of school; UEC (SM3) B4',
    spoken: 'Fluent',
    written: 'Proficient'
  },
  {
    name: 'German (Deutsch)',
    level: 'CEFR A2',
    spoken: 'Conversational',
    written: 'Intermediate'
  },
  {
    name: 'Spanish (Español)',
    level: 'CEFR A1',
    spoken: 'Basic',
    written: 'Basic'
  },
  {
    name: 'French (Français)',
    level: 'CEFR A1',
    spoken: 'Basic',
    written: 'Basic'
  },
  {
    name: 'Japanese (日本語)',
    level: 'JLPT N5',
    spoken: 'Basic',
    written: 'Basic'
  }
]

export const works = [
  {
    name: 'FlyEasy',
    desc: "First self-initiated project as I was learning to code. Concept website for a fictitious travel agency, with the purpose of practising the use of Bootstrap's components.",
    link: 'https://stephjohnsons.com/flyeasy/'
  },
  {
    name: 'Stephen Johnson-Tseu',
    desc: 'Responsive personal website originally built as a portfolio, now expanded to support multiple work-related tools. Developed with Vue.js (with Pinia for state management), Bootstrap, Node.js backend. Hosted on GitHub Pages, and primary database on Supabase. Integrated Bandsintown API for displaying upcoming concert dates. Private tools (password available upon request) include: a class tracker for monitoring student lessons, and a chat template generator to assist with customer communications.',
    link: 'https://stephjohnsons.com/#/'
  },
  {
    name: 'Red Carpet Artist Management',
    desc: "My other company's responsive website, built to showcase artists and services. Built with Vue.js, hosted on Vercel, with media assets hosted on AWS EC2 for scalable storage. Focused on performance optimization and visual presentation for artist portfolios.",
    link: 'https://rcam.my/'
  },
  {
    name: 'SimpleLoyalty (Client-facing)',
    desc: "Previous company's website, previously known as Mulah Technologies. An SaaS product used for CRM in food and beverage industry. Daily tasks included translating Figma prototypes into scalable front- and back-end components and pages, integration with platform APIs such as POS systems and Meta, database design for revamped dashboards with appropriate documentations and automatic tests in Rails, and refactoring legacy code. Important technologies used: Vue.js, Ruby on Rails, Bootstrap, PostgreSQL, GraphQL. Unable to share more information due to confidentiality.",
    link: 'https://dashboard.simpleloyalty.com/'
  },
  {
    name: 'SimpleLoyalty (Consumer-facing)',
    desc: 'Same as above, on top of optimising pages and components for mobile-first design with Tailwind instead of Bootstrap.',
    link: 'https://app.simpleloyalty.com/'
  },
  {
    name: 'GitHub',
    desc: 'Other embarassing projects...',
    link: 'https://github.com/stephjohnsons'
  }
]

export const designs = [
  {
    client: 'Kamerata KL',
    description:
      'Kamerata Kuala Lumpur (Kamerata KL) is a chamber orchestra made up of outstanding up-and-coming Malaysian musicians. Founded by Foo Yin Hong and Nasran Nawi, Kamerata KL is currently led by Ergys Koni in their artistic direction in delivering high-quality chamber music performances, while providing a platform for outstanding artists to showcase their craft. <br> Since its inaugural performance in March 2018, Kamerata KL has enjoyed a dynamic musical journey: having performed in over 20 concerts with various soloists of the highest calibres such as Carlos Mejía, Maïa Darmé, Dr Poom Prommachart, Saskia Lethiec, Valerie Almard, Izzywan Musib, and Ang Mei Foong, among many others.'
  }
]
