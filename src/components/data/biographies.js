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
