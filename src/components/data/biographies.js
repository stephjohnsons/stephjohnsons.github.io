import { reactive } from 'vue'

export const biographies = {
  English: [
    'performer | educator | curator',
    'Stephen has performed extensively and internationally across 3 continents as a cellist. A native of Kota Kinabalu, he has performed with the American Festival Orchestra, the YPHIL International Philharmonic, and the National Symphony Orchestra of Malaysia, among many others. Having studied and attended masterclasses with cellists Julie Dessureault, Asier Polo, Jacob Shaw, Leonid Shukaev, Thomas Duran, Thomas Loewenheim, and the late Alexander Buzlov, Stephen was greatly influenced to be a great enthusiast of various genres and soundscapes.',
    'As a performer, he favours creative communication between artistic hive minds to generate exhilarating experiences for attending audiences. His most recent season featured concerts with the Denver Philharmonic and the Chor der Bayerische Philharmonie at the Herkulessaal in Munich, Germany; two Disney in Concerts in Malaysia; a concert tour with Lay Zhang in Singapore and Malaysia; cello-bass recital with Giacomo Banella.',
    'Notable projects in the 2023/2024 will include his engagement at the Mas Palou Artist Residency 2023, Spain, curating a interdisciplinary/socio-artistic project “no!” with German pianist Daniel Bucurescu, piano quintet concert tour in Indonesia, showcases with the big band Tarakucha! featuring singers Sean Ghazi & Ida Mariana, and Singaporean singer Nathania Ong’s homecoming concert at the Esplanade.',
    'As an educator, Stephen has extensive cello pedagogical experience - he taught at the British International School, Epsom College, University of Malaya, and later received his diploma in education in 2022. Stephen also occasionally tutors for the ‘Genius Seni Muzik’, the youth orchestra programme at the Istana Budaya, Kuala Lumpur. Stephen was also the head of Diploma programmes at the UCSI Institute of Music; presently he teaches at UCSI and Sunway Universities as an adjunct instructor.',
    'Stephen performs on a 2014 Han Zhao-sheng cello.',
    'Last edited Apr 2024. Do not use or amend without permission.'
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
  'As a teacher, Stephen has taught students from all walks of life ranging from ages 6 to 60 for the past 13 years. He started out as an assistant conductor at both the Kian Kok String- and Youth Orchestra, gave individual lessons to stringed instruments at Yamaha Tawau, and was later a cello tutor at the Epsom College in Malaysia and British International School of Kuala Lumpur.',
  'He then progressed to instrumental and academic classes teaching as faculty at the University of Malaya (adjunct) and now UCSI University. Stephen is also a long-time tutor for the Genius Seni Muzik programme at Istana Budaya.',
  'In his lessons, Stephen focuses mainly on the awareness of the body, strong aural skills, and concepts of musical and acoustical aesthetics in his lessons. He also emphasises on providing individualised lesson plans to students of various learning styles. Masterclasses given around Malaysia, namely at the Sunway University and Century Music School (Kuching).',
  'In academia, Stephen was appointed the Head of Diploma Programmes at the Institute of Music, UCSI University for 2 years since 2021, where he oversees and manages the curriculum for Diploma in Music programmes. As a lecturer, he has taught theory, aural, orchestral instrument and string pedagogy, performance skills, and chamber music classes. He holds a postgraduate diploma in education.',
  'Stephen is currently the cello faculty for Sunway University and UCSI Institute of Music.',
  'Updated Dec 2022. Do not use or amend without permission.'
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
  'Areas of Interest and Teachings': [
    'Post-romantic & fin-de-siècle (programmatic) music',
    'Analytical models in music theory',
    'Cello literature and string pedagogy',
    'Chamber music'
  ],
  'Interdisciplinary Areas': [
    'User experience design',
    'Visual, interface, and graphic design',
    'Software development'
  ],
  'Other Trainings and Experience': [
    'Classroom Management & Safety',
    'Special Educational Needs (SEN)'
  ],
  'Research and Creative Output': [
    'Cheong, Tseu. tba. Music Theory Rudiments. (Book) - to be published soon',
    'Tseu. 2022. Physical Considerations in Teaching the Cello. (Presentation)'
  ]
})

export const devBio = [
  "Outside of music, I develop websites and I love all things tech and artsy. When I'm not practicing on my cello, I'm usually knee-deep in looking out for latest design trends and web development technologies. I started out in mid-2021 as a self-taught developer, and since learning the bits and pieces of the tech industry, I decided that I would dive into the industry in early 2023, and got a position as a software developer later.",
  'In web development, I currently specialise in front-end development, but I have a little bit of experience with everything from UI/UX writing and design to coding to QA, and also project management.',
  'I also get the occasional design gigs and am always looking for new ways to improve my skills.',
  'Updated Apr 2024. Do not use or amend without permission.'
]

export const devProfile = reactive({
  'Front-End Development': [
    'Vanilla HTML, CSS, Javascript',
    'Bootstrap CSS and Tailwind CSS',
    'Typescript',
    'Vue.js',
    'Angular',
    'React',
    'GraphQL',
    'REST APIs'
  ],
  'Back-End Development': ['Ruby on Rails', 'Node.js', 'Python'],
  CMS: ['Wordpress', 'Wix'],
  Wireframing: ['Figma'],
  'Design and Art': ['Adobe Photoshop', 'Adobe Illustrator'],
  Music: ['Logic Pro', 'Sibelius'],
  Marketing: ['Mailchimp'],
  Other: ['Git', 'Postman', 'QA Testing', 'Microsoft 365', 'Google Workspace']
})

export const certificates = [
  {
    name: 'Technical Support Fundamentals',
    provider: 'Google',
    issuanceDate: 'Apr 2020',
    credentials: 'N7MCXSEG6MEU'
  },
  {
    name: 'Operating Systems and You: Becoming a Power User',
    provider: 'Google',
    issuanceDate: 'Apr 2020',
    credentials: 'ZWKKXVDMMF8F'
  },
  {
    name: 'The Bits and Bytes of Computer Networking',
    provider: 'Google',
    issuanceDate: 'Apr 2020',
    credentials: 'JFN9XPSVYPDE'
  },
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
    name: 'Introduction to Google SEO',
    provider: 'University of California, Davis',
    issuanceDate: 'May 2024',
    credentials: '-'
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
    major: 'Performance studies; chamber music',
    teachers:
      '• Julie Dessureault (cello)<br> • Orfeo Trio, Raphaël Chrétien, Ruth Rosique, Guillaume Chilemme (ensemble)<br> • Asier Polo, Thomas Duran (masterclass)'
  },
  {
    degree: 'Bachelor of Classical Music (with honours)',
    provider: 'UCSI Institute of Music, Kuala Lumpur',
    graduated: 'Aug 2016',
    major: 'Classical music performance',
    teachers:
      '• Julie Dessureault, Leonid Shukaev (cello)<br> • Gleb Stepanov, Alexander Buzlov (masterclasses)'
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
    written: 'Conversational'
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
    spoken: 'Conversational',
    written: 'Proficient'
  },
  {
    name: 'German (Deutsch)',
    level: 'CEFR A2',
    spoken: 'Conversational',
    written: 'Conversational'
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
    written: '-'
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
    desc: 'Self-initiated project. Concept website for a fictitious travel agency based in Malaysia, with the purpose of practising the use of Bootstrap components and framework.',
    link: 'https://stephjohnsons.com/flyeasy/'
  },
  {
    name: 'Quote for Instagram Posts',
    desc: 'Self-initiated project. A website to generate inspirational quotes for Instagram posts, with the purpose of practising the use of Tailwind CSS and integrating API into a site.',
    link: 'https://stephjohnsons.com/quotes/'
  },
  {
    name: 'Ionic',
    desc: "Self-initiated project.Inspired by @ui.shreyash's UI design (posted on Instagram), and wanted to recreate the same design based on his UI. Buttons, table layout were slightly changed.",
    link: '-'
  },
  {
    name: 'Weather App',
    desc: "Self-initiated project. An app that generates weather information of a local city based on user's search.",
    link: '-'
  }
]

export const designs = [
  {
    client: 'Kamerata KL',
    description:
      'Kamerata Kuala Lumpur (Kamerata KL) is a chamber orchestra made up of outstanding up-and-coming Malaysian musicians. Founded by Foo Yin Hong and Nasran Nawi, Kamerata KL is currently led by Ergys Koni in their artistic direction in delivering high-quality chamber music performances, while providing a platform for outstanding artists to showcase their craft. <br> Since its inaugural performance in March 2018, Kamerata KL has enjoyed a dynamic musical journey: having performed in over 20 concerts with various soloists of the highest calibres such as Carlos Mejía, Maïa Darmé, Dr Poom Prommachart, Saskia Lethiec, Valerie Almard, Izzywan Musib, and Ang Mei Foong, among many others.'
  }
]
