// 塔羅牌資料庫 - 78張完整塔羅牌
export const majorArcana = [
  { id: 0, name: '愚者', nameEn: 'The Fool', number: 0, suit: 'major', upright: { meaning: '新的開始、冒險、自由、純真', description: '代表新的旅程開始，充滿無限可能。你正站在人生的轉折點，準備踏上未知的旅程。' }, reversed: { meaning: '魯莽、不負責任、缺乏方向', description: '可能過於衝動，缺乏計劃。需要停下來思考，避免做出不負責任的決定。' }, emoji: '🎭', color: '#FFD700' },
  { id: 1, name: '魔術師', nameEn: 'The Magician', number: 1, suit: 'major', upright: { meaning: '行動、意志力、專注、技能', description: '你擁有實現目標的能力和資源。現在是採取行動的最佳時機，專注於你的目標。' }, reversed: { meaning: '缺乏方向、技能不足、意志薄弱', description: '可能缺乏執行計劃的能力或資源。需要重新評估你的方法和目標。' }, emoji: '✨', color: '#FF6B6B' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', number: 2, suit: 'major', upright: { meaning: '直覺、內在智慧、神秘、潛意識', description: '相信你的直覺和內在智慧。答案已經在你心中，靜下心來聆聽內在的聲音。' }, reversed: { meaning: '缺乏直覺、秘密、斷絕連結', description: '可能忽略了內在的聲音，或與直覺失去連結。需要重新與自己建立連結。' }, emoji: '🌙', color: '#4ECDC4' },
  { id: 3, name: '皇后', nameEn: 'The Empress', number: 3, suit: 'major', upright: { meaning: '豐盛、母性、創造力、自然', description: '代表豐盛和創造力。你正處於一個豐收的時期，享受生活的美好和自然的恩賜。' }, reversed: { meaning: '依賴、缺乏成長、過度保護', description: '可能過於依賴他人，或缺乏獨立性。需要找到自己的平衡點。' }, emoji: '👑', color: '#95E1D3' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', number: 4, suit: 'major', upright: { meaning: '權威、結構、穩定、父親', description: '代表權威和結構。你擁有領導能力和組織能力，能夠建立穩定的基礎。' }, reversed: { meaning: '控制欲、僵化、缺乏紀律', description: '可能過於控制或缺乏靈活性。需要找到權威與同理心之間的平衡。' }, emoji: '⚡', color: '#F38181' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', number: 5, suit: 'major', upright: { meaning: '傳統、教育、精神指導、儀式', description: '代表傳統和學習。尋求導師的指導，遵循既有的規則和傳統。' }, reversed: { meaning: '反叛、非傳統、個人信念', description: '可能想要打破傳統，走自己的路。這是一個探索個人信念的時期。' }, emoji: '📿', color: '#AA96DA' },
  { id: 6, name: '戀人', nameEn: 'The Lovers', number: 6, suit: 'major', upright: { meaning: '愛情、選擇、和諧、關係', description: '代表愛情和重要的選擇。你可能面臨重要的決定，需要平衡理性與感性。' }, reversed: { meaning: '不平衡、錯誤選擇、缺乏和諧', description: '關係可能出現不平衡，或需要重新評估你的選擇。' }, emoji: '💕', color: '#FCBAD3' },
  { id: 7, name: '戰車', nameEn: 'The Chariot', number: 7, suit: 'major', upright: { meaning: '控制、意志、勝利、決心', description: '代表決心和勝利。你有能力控制局面，克服障礙，達成目標。' }, reversed: { meaning: '缺乏控制、方向不明、失敗', description: '可能缺乏方向或控制力。需要重新聚焦，找到前進的道路。' }, emoji: '🏇', color: '#FFD93D' },
  { id: 8, name: '力量', nameEn: 'Strength', number: 8, suit: 'major', upright: { meaning: '內在力量、勇氣、耐心、控制', description: '代表內在的力量和勇氣。真正的力量來自內心的平靜和耐心。' }, reversed: { meaning: '軟弱、缺乏信心、自我懷疑', description: '可能缺乏自信或感到無力。需要重新連接內在的力量。' }, emoji: '💪', color: '#6BCB77' },
  { id: 9, name: '隱者', nameEn: 'The Hermit', number: 9, suit: 'major', upright: { meaning: '內省、尋找、指導、孤獨', description: '代表內省和尋找答案。這是一個自我探索的時期，答案在內心深處。' }, reversed: { meaning: '孤立、迷失、缺乏方向', description: '可能感到孤立或迷失方向。需要尋求幫助，不要獨自承擔一切。' }, emoji: '🕯️', color: '#4D96FF' },
  { id: 10, name: '命運之輪', nameEn: 'Wheel of Fortune', number: 10, suit: 'major', upright: { meaning: '變化、週期、命運、轉折', description: '代表命運的轉折點。變化即將到來，這是生命週期的自然部分。' }, reversed: { meaning: '壞運、缺乏控制、阻力', description: '可能遇到阻礙或感到無力改變。記住，這只是暫時的。' }, emoji: '🎡', color: '#9B59B6' },
  { id: 11, name: '正義', nameEn: 'Justice', number: 11, suit: 'major', upright: { meaning: '正義、平衡、真理、責任', description: '代表正義和平衡。你的行為會有後果，誠實和公平是關鍵。' }, reversed: { meaning: '不公、缺乏責任、不平衡', description: '可能面臨不公或需要承擔責任。需要尋求平衡和正義。' }, emoji: '⚖️', color: '#3498DB' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', number: 12, suit: 'major', upright: { meaning: '暫停、犧牲、新視角、等待', description: '代表暫停和新的視角。有時候，我們需要停下來，從不同角度看待問題。' }, reversed: { meaning: '拖延、抗拒、不必要的犧牲', description: '可能過於拖延或抗拒改變。需要採取行動，不要無謂地等待。' }, emoji: '🙃', color: '#E74C3C' },
  { id: 13, name: '死神', nameEn: 'Death', number: 13, suit: 'major', upright: { meaning: '結束、轉變、重生、放下', description: '代表結束和轉變。舊的必須結束，新的才能開始。這是重生的象徵。' }, reversed: { meaning: '抗拒改變、停滯、拖延', description: '可能抗拒必要的改變。需要放下過去，擁抱新的開始。' }, emoji: '🔄', color: '#2C3E50' },
  { id: 14, name: '節制', nameEn: 'Temperance', number: 14, suit: 'major', upright: { meaning: '平衡、調和、耐心、節制', description: '代表平衡和調和。找到生活中的平衡點，調和不同的元素。' }, reversed: { meaning: '不平衡、過度、缺乏調和', description: '可能缺乏平衡或過度。需要找到中間地帶，恢復和諧。' }, emoji: '⚗️', color: '#16A085' },
  { id: 15, name: '惡魔', nameEn: 'The Devil', number: 15, suit: 'major', upright: { meaning: '束縛、誘惑、物質主義、成癮', description: '代表束縛和誘惑。你可能被某些事物束縛，需要意識到並打破這些束縛。' }, reversed: { meaning: '解放、打破束縛、覺醒', description: '正在打破束縛，獲得自由。這是一個覺醒和解放的時期。' }, emoji: '😈', color: '#8B4513' },
  { id: 16, name: '塔', nameEn: 'The Tower', number: 16, suit: 'major', upright: { meaning: '突然變化、破壞、啟示、覺醒', description: '代表突然的變化和破壞。舊的結構必須倒塌，才能建立新的。' }, reversed: { meaning: '避免災難、內在變化、抗拒', description: '可能避免了外在的災難，但內在的變化仍在進行。' }, emoji: '⚡', color: '#E67E22' },
  { id: 17, name: '星星', nameEn: 'The Star', number: 17, suit: 'major', upright: { meaning: '希望、靈感、平靜、指引', description: '代表希望和靈感。即使在黑暗中，星星也會指引你前進。' }, reversed: { meaning: '絕望、缺乏信心、失去希望', description: '可能感到絕望或失去方向。記住，希望永遠存在。' }, emoji: '⭐', color: '#3498DB' },
  { id: 18, name: '月亮', nameEn: 'The Moon', number: 18, suit: 'major', upright: { meaning: '幻覺、恐懼、潛意識、不確定', description: '代表幻覺和恐懼。你的恐懼可能不是真實的，需要面對內心的陰影。' }, reversed: { meaning: '釋放恐懼、真相、清晰', description: '正在釋放恐懼，獲得清晰。真相即將顯現。' }, emoji: '🌙', color: '#9B59B6' },
  { id: 19, name: '太陽', nameEn: 'The Sun', number: 19, suit: 'major', upright: { meaning: '快樂、成功、活力、啟蒙', description: '代表快樂和成功。這是一個充滿活力和樂觀的時期，一切都會順利。' }, reversed: { meaning: '過度樂觀、缺乏方向、延遲', description: '可能過於樂觀或缺乏實際計劃。需要平衡樂觀與現實。' }, emoji: '☀️', color: '#F39C12' },
  { id: 20, name: '審判', nameEn: 'Judgement', number: 20, suit: 'major', upright: { meaning: '反思、評估、覺醒、寬恕', description: '代表反思和覺醒。這是一個評估過去、寬恕自己和他人的時期。' }, reversed: { meaning: '缺乏自我覺察、自我批評、缺乏寬恕', description: '可能缺乏自我覺察或過於自我批評。需要學會寬恕和接納。' }, emoji: '📯', color: '#E74C3C' },
  { id: 21, name: '世界', nameEn: 'The World', number: 21, suit: 'major', upright: { meaning: '完成、成就、整合、圓滿', description: '代表完成和成就。你已經完成了一個重要的階段，準備開始新的旅程。' }, reversed: { meaning: '缺乏完成、延遲、不完整', description: '可能還沒有完成目標，或感到不完整。需要繼續努力，完成未竟之事。' }, emoji: '🌍', color: '#27AE60' }
];

// 權杖牌組 - 完整牌義
const wandsCards = [
  { id: 22, name: '權杖王牌', nameEn: 'Ace of Wands', number: 1, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '新的開始、靈感、創造力、熱情', description: '權杖王牌代表新的創意計畫和熱情的開始。你充滿能量和動力，準備開始新的冒險。抓住這個機會，讓創意火花燃燒。' }, 
    reversed: { meaning: '延遲、缺乏動力、挫折', description: '可能缺乏動力或計畫受阻。需要重新點燃熱情，找到新的靈感。' } 
  },
  { id: 23, name: '權杖2', nameEn: '2 of Wands', number: 2, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '規劃、決策、探索、遠見', description: '權杖2代表規劃未來和做出選擇。你站在十字路口，需要決定下一步。相信你的遠見，勇敢地探索新的可能性。' }, 
    reversed: { meaning: '缺乏計劃、害怕未知、猶豫不決', description: '可能害怕離開舒適區或缺乏明確計劃。需要克服恐懼，做出決定。' } 
  },
  { id: 24, name: '權杖3', nameEn: '3 of Wands', number: 3, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '擴展、遠見、領導力、機會', description: '權杖3代表計劃開始實現，視野擴展。你的努力開始看到成果，新的機會即將到來。保持遠見和信心。' }, 
    reversed: { meaning: '延遲、缺乏遠見、計劃受阻', description: '計劃可能遇到障礙或延遲。需要重新評估策略，保持耐心。' } 
  },
  { id: 25, name: '權杖4', nameEn: '4 of Wands', number: 4, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '慶祝、和諧、穩定、里程碑', description: '權杖4代表慶祝和穩定。你達成了重要的里程碑，值得慶祝這個成就。享受這個和諧穩定的時期。' }, 
    reversed: { meaning: '不穩定、缺乏和諧、延遲慶祝', description: '可能缺乏穩定或和諧。需要解決基礎問題，才能真正放鬆慶祝。' } 
  },
  { id: 26, name: '權杖5', nameEn: '5 of Wands', number: 5, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '競爭、衝突、挑戰、意見分歧', description: '權杖5代表競爭和意見分歧。雖然有挑戰和衝突，但這也是成長和學習的機會。保持開放心態，尋求建設性的解決方案。' }, 
    reversed: { meaning: '避免衝突、解決分歧、內在衝突', description: '正在解決衝突或避免不必要的競爭。需要找到和平的方式處理分歧。' } 
  },
  { id: 27, name: '權杖6', nameEn: '6 of Wands', number: 6, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '勝利、認可、成功、自信', description: '權杖6代表勝利和公開的認可。你的努力得到回報，享受成功和讚美。這是自信和成就的時刻。' }, 
    reversed: { meaning: '缺乏認可、自我懷疑、失敗', description: '可能缺乏外界認可或自我懷疑。記住，真正的成功來自內在的滿足。' } 
  },
  { id: 28, name: '權杖7', nameEn: '7 of Wands', number: 7, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '防守、堅持、挑戰、勇氣', description: '權杖7代表堅守立場和防禦。你可能面臨挑戰或競爭，但有能力捍衛自己的位置。保持勇氣和決心。' }, 
    reversed: { meaning: '放棄、壓力過大、缺乏信心', description: '可能感到不堪負荷或想要放棄。需要重新評估是否值得繼續戰鬥。' } 
  },
  { id: 29, name: '權杖8', nameEn: '8 of Wands', number: 8, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '快速行動、進展、訊息、旅行', description: '權杖8代表快速的進展和行動。事情開始加速，可能有好消息或旅行計劃。抓緊時機，順勢而為。' }, 
    reversed: { meaning: '延遲、挫折、缺乏方向', description: '進展可能受阻或延遲。保持耐心，等待合適的時機。' } 
  },
  { id: 30, name: '權杖9', nameEn: '9 of Wands', number: 9, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '堅韌、毅力、防備、接近成功', description: '權杖9代表堅韌和毅力。雖然疲憊，但你接近成功。保持警惕，堅持到最後。' }, 
    reversed: { meaning: '精疲力竭、偏執、放棄', description: '可能感到精疲力竭或過度防備。需要休息和恢復，不要過度消耗自己。' } 
  },
  { id: 31, name: '權杖10', nameEn: '10 of Wands', number: 10, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '負擔、責任、壓力、過度承擔', description: '權杖10代表沉重的負擔和責任。你可能承擔太多，感到壓力。學會委派和放手，不要獨自承擔一切。' }, 
    reversed: { meaning: '放下負擔、委派、解脫', description: '正在放下不必要的負擔，學會委派。感到輕鬆和解脫。' } 
  },
  { id: 32, name: '權杖侍者', nameEn: 'Page of Wands', number: 11, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '熱情、探索、好消息、好奇心', description: '權杖侍者代表熱情和探索的精神。保持好奇心，勇於嘗試新事物。可能有令人興奮的消息或機會。' }, 
    reversed: { meaning: '缺乏方向、不成熟、壞消息', description: '可能缺乏明確方向或過於衝動。需要更多計劃和成熟度。' } 
  },
  { id: 33, name: '權杖騎士', nameEn: 'Knight of Wands', number: 12, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '冒險、衝動、熱情、行動', description: '權杖騎士代表冒險和行動。充滿熱情和能量，準備追求目標。但要注意不要過於衝動。' }, 
    reversed: { meaning: '魯莽、不耐煩、缺乏自制', description: '可能過於衝動或缺乏自制力。需要在熱情和理性之間找到平衡。' } 
  },
  { id: 34, name: '權杖皇后', nameEn: 'Queen of Wands', number: 13, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '自信、熱情、獨立、魅力', description: '權杖皇后代表自信和獨立。你充滿魅力和熱情，能夠激勵他人。相信自己的能力和直覺。' }, 
    reversed: { meaning: '自我中心、嫉妒、缺乏自信', description: '可能過於自我中心或缺乏自信。需要找回內在的力量和平衡。' } 
  },
  { id: 35, name: '權杖國王', nameEn: 'King of Wands', number: 14, suit: 'wands', element: '火', emoji: '🔥', color: '#FF6B6B', 
    upright: { meaning: '領導力、遠見、企業家精神、大膽', description: '權杖國王代表強大的領導力和遠見。你有能力將創意轉化為現實，激勵他人追隨你的願景。' }, 
    reversed: { meaning: '專橫、衝動、缺乏自制', description: '可能過於專橫或缺乏自制力。需要在領導和傾聽之間找到平衡。' } 
  }
];

// 聖杯牌組 - 完整牌義
const cupsCards = [
  { id: 36, name: '聖杯王牌', nameEn: 'Ace of Cups', number: 1, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '新的愛情、情感滿溢、直覺、創造力', description: '聖杯王牌代表新的情感開始，可能是新的愛情、友誼或創意靈感。你的心靈杯子滿溢著愛和喜悅，這是一個充滿感恩和情感連結的時期。' }, 
    reversed: { meaning: '情感封閉、失望、創意受阻', description: '可能在情感上感到封閉或失望。需要重新打開心扉，允許愛和創意流動。' } 
  },
  { id: 37, name: '聖杯2', nameEn: '2 of Cups', number: 2, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '夥伴關係、愛情、和諧、平衡', description: '聖杯2代表兩個人之間的深刻連結，可能是愛情、友誼或商業夥伴關係。這是一段互相尊重、平等和諧的關係。' }, 
    reversed: { meaning: '關係失衡、分離、溝通不良', description: '關係可能出現裂痕或不平衡。需要重新溝通，找回平衡和理解。' } 
  },
  { id: 38, name: '聖杯3', nameEn: '3 of Cups', number: 3, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '慶祝、友誼、團體合作、歡樂時光', description: '聖杯3代表慶祝和友誼的時刻。與朋友或社群一起慶祝成就，享受團體的支持和歡樂。這是一個充滿社交活動和快樂的時期。' }, 
    reversed: { meaning: '孤立、過度放縱、三角關係、友誼破裂', description: '可能感到被排擠或過度放縱。需要注意人際關係的平衡，避免三角關係或衝突。' } 
  },
  { id: 39, name: '聖杯4', nameEn: '4 of Cups', number: 4, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '沉思、不滿足、冷漠、錯過機會', description: '聖杯4代表對現狀的不滿或冷漠。你可能專注於負面情緒，而忽略了眼前的機會。是時候重新評估你的優先順序了。' }, 
    reversed: { meaning: '覺醒、接受新機會、重新投入', description: '正在從冷漠中醒來，準備接受新的機會。重新找回對生活的熱情和感激。' } 
  },
  { id: 40, name: '聖杯5', nameEn: '5 of Cups', number: 5, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '失望、悲傷、失落、專注於負面', description: '聖杯5代表失望和悲傷。你可能專注於失去的東西，而忽略了仍然擁有的。雖然悲傷是自然的，但也要記得還有希望。' }, 
    reversed: { meaning: '接受、向前看、療癒、寬恕', description: '正在從失望中恢復，學會接受和寬恕。開始看到希望，準備向前邁進。' } 
  },
  { id: 41, name: '聖杯6', nameEn: '6 of Cups', number: 6, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '懷舊、童年、純真、重逢', description: '聖杯6代表懷舊和童年的純真。可能與老朋友重逢，或回憶起美好的過去。這是一個充滿溫暖回憶的時期。' }, 
    reversed: { meaning: '困在過去、理想化、缺乏現實感', description: '可能過度沉溺於過去，無法活在當下。需要放下過去，擁抱現在和未來。' } 
  },
  { id: 42, name: '聖杯7', nameEn: '7 of Cups', number: 7, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '幻想、選擇、白日夢、不切實際', description: '聖杯7代表多種選擇和幻想。你面臨許多可能性，但要小心不切實際的幻想。需要專注於真正重要的目標。' }, 
    reversed: { meaning: '決定、現實、聚焦、清晰', description: '正在從幻想中清醒，做出實際的決定。找到清晰的方向，專注於可實現的目標。' } 
  },
  { id: 43, name: '聖杯8', nameEn: '8 of Cups', number: 8, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '離開、尋找、放棄、靈性追尋', description: '聖杯8代表離開不再滿足你的情況。你正在尋找更深層的意義和滿足。這是一個靈性成長的時期。' }, 
    reversed: { meaning: '逃避、害怕改變、困在情況中', description: '可能害怕離開舒適區，或逃避必要的改變。需要勇氣面對，做出必要的決定。' } 
  },
  { id: 44, name: '聖杯9', nameEn: '9 of Cups', number: 9, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '滿足、願望成真、快樂、成就', description: '聖杯9是「願望牌」，代表滿足和快樂。你的願望即將成真，享受這個成就和滿足的時刻。這是情感上的完滿。' }, 
    reversed: { meaning: '貪婪、不滿足、自滿、物質主義', description: '可能過於自滿或貪婪，永遠感到不滿足。需要學會感恩和知足。' } 
  },
  { id: 45, name: '聖杯10', nameEn: '10 of Cups', number: 10, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '家庭幸福、和諧、圓滿、永恆的愛', description: '聖杯10代表家庭和情感的圓滿。這是一個充滿愛、和諧和幸福的時期。你擁有穩定的關係和情感滿足。' }, 
    reversed: { meaning: '家庭問題、破裂、不和諧、價值觀衝突', description: '家庭或關係可能出現問題。需要重新溝通，修復關係，找回和諧。' } 
  },
  { id: 46, name: '聖杯侍者', nameEn: 'Page of Cups', number: 11, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '創意訊息、直覺、好奇、敏感', description: '聖杯侍者代表創意和直覺的訊息。保持開放和好奇的心，新的創意或情感機會即將到來。' }, 
    reversed: { meaning: '情緒不成熟、不切實際、封閉', description: '可能在情感上不夠成熟，或對新機會封閉。需要成長和開放心胸。' } 
  },
  { id: 47, name: '聖杯騎士', nameEn: 'Knight of Cups', number: 12, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '浪漫、魅力、理想主義、追求夢想', description: '聖杯騎士代表浪漫和理想主義。追隨你的心和夢想，但也要保持實際的平衡。可能有浪漫的邀約或創意的追求。' }, 
    reversed: { meaning: '不切實際、情緒化、花心、幻滅', description: '可能過於理想化或情緒化。需要在夢想和現實之間找到平衡。' } 
  },
  { id: 48, name: '聖杯皇后', nameEn: 'Queen of Cups', number: 13, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '同理心、直覺、關懷、情感智慧', description: '聖杯皇后代表深刻的同理心和情感智慧。你能理解他人的感受，提供溫暖的支持。信任你的直覺和內在智慧。' }, 
    reversed: { meaning: '情緒依賴、過度敏感、缺乏邊界', description: '可能過度敏感或缺乏情感邊界。需要保護自己的能量，建立健康的界限。' } 
  },
  { id: 49, name: '聖杯國王', nameEn: 'King of Cups', number: 14, suit: 'cups', element: '水', emoji: '💧', color: '#4ECDC4', 
    upright: { meaning: '情感成熟、冷靜、外交、平衡', description: '聖杯國王代表情感的成熟和智慧。你能在保持同理心的同時保持冷靜和理性。這是情感控制和平衡的大師。' }, 
    reversed: { meaning: '情緒操控、冷漠、壓抑情感', description: '可能壓抑情感或操控他人。需要誠實面對自己的感受，以健康的方式表達情緒。' } 
  }
];

// 寶劍牌組 - 完整牌義  
const swordsCards = [
  { id: 50, name: '寶劍王牌', nameEn: 'Ace of Swords', number: 1, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '清晰思考、真理、突破、新想法', description: '寶劍王牌代表清晰的思維和真理。你獲得了新的洞察力和理解，能夠清楚地看到事物的本質。這是智慧和突破的時刻。' }, 
    reversed: { meaning: '困惑、缺乏清晰、誤解', description: '可能感到困惑或缺乏清晰的思考。需要尋求真相，避免被誤導。' } 
  },
  { id: 51, name: '寶劍2', nameEn: '2 of Swords', number: 2, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '僵局、艱難選擇、逃避、平衡', description: '寶劍2代表艱難的選擇和僵局。你可能在兩個選項之間猶豫不決，需要面對現實，做出選擇。' }, 
    reversed: { meaning: '決定、揭示真相、打破僵局', description: '正在打破僵局，做出決定。真相開始顯現，準備向前邁進。' } 
  },
  { id: 52, name: '寶劍3', nameEn: '3 of Swords', number: 3, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '心碎、悲傷、痛苦、背叛', description: '寶劍3代表心碎和情感痛苦。雖然痛苦，但這也是療癒的開始。允許自己悲傷，才能真正痊癒。' }, 
    reversed: { meaning: '療癒、寬恕、從痛苦中恢復', description: '正在從痛苦中療癒，學會寬恕和放下。傷口開始癒合，準備重新開始。' } 
  },
  { id: 53, name: '寶劍4', nameEn: '4 of Swords', number: 4, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '休息、恢復、冥想、暫停', description: '寶劍4代表休息和恢復的需要。你需要暫停，讓身心恢復能量。這是冥想和反思的時期。' }, 
    reversed: { meaning: '精疲力竭、缺乏休息、焦慮', description: '可能過度勞累或缺乏休息。需要強制自己休息，避免崩潰。' } 
  },
  { id: 54, name: '寶劍5', nameEn: '5 of Swords', number: 5, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '衝突、失敗、自私、惡意', description: '寶劍5代表衝突和不光彩的勝利。可能贏得了戰鬥，但失去了尊重。需要反思你的行為和動機。' }, 
    reversed: { meaning: '和解、寬恕、從衝突中學習', description: '正在從衝突中學習，尋求和解。學會寬恕，放下怨恨。' } 
  },
  { id: 55, name: '寶劍6', nameEn: '6 of Swords', number: 6, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '過渡、離開、前進、療癒旅程', description: '寶劍6代表過渡和向前移動。你正在離開困難的情況，朝著平靜和療癒前進。這是一個過渡的時期。' }, 
    reversed: { meaning: '抗拒改變、困在過去、延遲', description: '可能抗拒必要的改變或困在過去。需要勇氣向前邁進。' } 
  },
  { id: 56, name: '寶劍7', nameEn: '7 of Swords', number: 7, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '欺騙、策略、秘密、逃避', description: '寶劍7代表策略或欺騙。可能有人不誠實，或你在逃避某些責任。需要誠實面對問題。' }, 
    reversed: { meaning: '揭露真相、懺悔、面對後果', description: '真相開始揭露，需要面對後果。這是誠實和負責任的時候。' } 
  },
  { id: 57, name: '寶劍8', nameEn: '8 of Swords', number: 8, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '困境、限制、自我束縛、無助', description: '寶劍8代表感到被困和無助。但這些限制大多是自我設限。你有能力解放自己。' }, 
    reversed: { meaning: '解放、重獲自由、新視角', description: '正在打破自我限制，重獲自由。看到新的可能性和出路。' } 
  },
  { id: 58, name: '寶劍9', nameEn: '9 of Swords', number: 9, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '焦慮、恐懼、噩夢、擔憂', description: '寶劍9代表焦慮和恐懼。你的擔憂可能被放大了。需要尋求支持，面對你的恐懼。' }, 
    reversed: { meaning: '釋放焦慮、希望、療癒', description: '正在釋放焦慮和恐懼，找到希望。黎明即將到來。' } 
  },
  { id: 59, name: '寶劍10', nameEn: '10 of Swords', number: 10, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '結束、失敗、痛苦結局、觸底', description: '寶劍10代表痛苦的結束和觸底。雖然痛苦，但這也是重新開始的機會。最壞的已經過去。' }, 
    reversed: { meaning: '恢復、重生、從廢墟中站起', description: '正在從最低點恢復，準備重新開始。最壞的時刻已經過去。' } 
  },
  { id: 60, name: '寶劍侍者', nameEn: 'Page of Swords', number: 11, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '好奇、警覺、新想法、溝通', description: '寶劍侍者代表好奇心和警覺性。保持警惕，尋求真相。新的想法和訊息即將到來。' }, 
    reversed: { meaning: '八卦、謊言、不成熟的溝通', description: '可能有八卦或不誠實的溝通。需要更謹慎地使用語言。' } 
  },
  { id: 61, name: '寶劍騎士', nameEn: 'Knight of Swords', number: 12, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '行動、雄心、衝動、直接', description: '寶劍騎士代表迅速的行動和決心。充滿雄心和動力，但要注意不要過於魯莽。' }, 
    reversed: { meaning: '魯莽、攻擊性、缺乏計劃', description: '可能過於衝動或攻擊性。需要在行動前思考，避免傷害他人。' } 
  },
  { id: 62, name: '寶劍皇后', nameEn: 'Queen of Swords', number: 13, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '獨立、清晰思考、誠實、直接', description: '寶劍皇后代表獨立和清晰的思維。你能客觀地看待情況，誠實而直接。用智慧而非情緒做決定。' }, 
    reversed: { meaning: '冷酷、批判、情感封閉', description: '可能過於冷酷或批判。需要在理性和同理心之間找到平衡。' } 
  },
  { id: 63, name: '寶劍國王', nameEn: 'King of Swords', number: 14, suit: 'swords', element: '風', emoji: '⚔️', color: '#95E1D3', 
    upright: { meaning: '權威、真理、智慧、公正', description: '寶劍國王代表智慧和公正的權威。用邏輯和理性做決定，追求真理和正義。這是智慧領導者的象徵。' }, 
    reversed: { meaning: '操控、殘酷、濫用權力', description: '可能濫用智慧或權力。需要用同理心平衡理性，避免過於冷酷。' } 
  }
];

// 錢幣牌組 - 完整牌義
const pentaclesCards = [
  { id: 64, name: '錢幣王牌', nameEn: 'Ace of Pentacles', number: 1, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '新機會、豐盛、物質開始、繁榮', description: '錢幣王牌代表新的物質機會和繁榮。這可能是新工作、投資或穩定的開始。抓住這個機會，建立穩固的基礎。' }, 
    reversed: { meaning: '錯失機會、缺乏規劃、不穩定', description: '可能錯失機會或缺乏實際計劃。需要更務實和穩定的方法。' } 
  },
  { id: 65, name: '錢幣2', nameEn: '2 of Pentacles', number: 2, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '平衡、多任務、適應、靈活', description: '錢幣2代表平衡多個責任。你在努力保持平衡，需要靈活和適應。找到優先順序，避免過度負荷。' }, 
    reversed: { meaning: '失衡、過度承諾、混亂', description: '可能失去平衡或過度承諾。需要重新安排優先順序，恢復秩序。' } 
  },
  { id: 66, name: '錢幣3', nameEn: '3 of Pentacles', number: 3, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '團隊合作、技能、學習、建設', description: '錢幣3代表團隊合作和技能發展。你的努力和專業得到認可。這是學習和建設的時期。' }, 
    reversed: { meaning: '缺乏團隊合作、品質不佳、孤軍奮戰', description: '可能缺乏合作或品質不達標。需要尋求幫助，提升技能。' } 
  },
  { id: 67, name: '錢幣4', nameEn: '4 of Pentacles', number: 4, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '控制、安全、保守、囤積', description: '錢幣4代表控制和安全感。你可能過於保守或囤積資源。需要在安全和慷慨之間找到平衡。' }, 
    reversed: { meaning: '慷慨、放手、財務自由', description: '正在放手，學會慷慨。找到財務和情感的自由。' } 
  },
  { id: 68, name: '錢幣5', nameEn: '5 of Pentacles', number: 5, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '貧困、損失、孤立、困難', description: '錢幣5代表困難和損失。雖然艱難，但幫助就在眼前。不要害怕尋求支持。' }, 
    reversed: { meaning: '恢復、改善、接受幫助', description: '正在從困難中恢復，情況開始改善。準備接受幫助和支持。' } 
  },
  { id: 69, name: '錢幣6', nameEn: '6 of Pentacles', number: 6, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '慷慨、給予、接受、平衡', description: '錢幣6代表慷慨和平衡的給予。你可能在給予或接受幫助。這是分享和感恩的時刻。' }, 
    reversed: { meaning: '自私、不平等、濫用慷慨', description: '可能有不平等的給予或接受。需要建立健康的界限和平衡。' } 
  },
  { id: 70, name: '錢幣7', nameEn: '7 of Pentacles', number: 7, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '耐心、投資、長期目標、評估', description: '錢幣7代表耐心等待成果。你已經投入努力，現在需要評估進展。堅持下去，收穫即將到來。' }, 
    reversed: { meaning: '缺乏耐心、浪費努力、沒有進展', description: '可能感到沮喪或浪費努力。需要重新評估策略，保持耐心。' } 
  },
  { id: 71, name: '錢幣8', nameEn: '8 of Pentacles', number: 8, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '勤奮、技能發展、專注、工藝', description: '錢幣8代表勤奮和技能發展。專注於提升你的技能，努力工作會帶來成功。這是學習和精進的時期。' }, 
    reversed: { meaning: '缺乏專注、完美主義、低品質', description: '可能缺乏專注或過於完美主義。需要找到平衡，避免倦怠。' } 
  },
  { id: 72, name: '錢幣9', nameEn: '9 of Pentacles', number: 9, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '獨立、豐盛、自給自足、奢華', description: '錢幣9代表獨立和物質成功。你通過努力達到了自給自足，享受你的成就和舒適。這是獨立和自豪的時刻。' }, 
    reversed: { meaning: '依賴、財務不穩、過度工作', description: '可能過於依賴他人或財務不穩定。需要找到真正的獨立和平衡。' } 
  },
  { id: 73, name: '錢幣10', nameEn: '10 of Pentacles', number: 10, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '財富、遺產、家庭、長期成功', description: '錢幣10代表長期的財務成功和家庭遺產。這是豐盛和穩定的頂峰，享受你建立的一切。' }, 
    reversed: { meaning: '財務損失、家庭問題、不穩定', description: '可能面臨財務或家庭問題。需要重新建立穩定和連結。' } 
  },
  { id: 74, name: '錢幣侍者', nameEn: 'Page of Pentacles', number: 11, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '好機會、學習、實際計劃、勤奮', description: '錢幣侍者代表新的學習機會和實際計劃。保持勤奮和專注，新的機會即將到來。' }, 
    reversed: { meaning: '缺乏計劃、拖延、不切實際', description: '可能缺乏實際計劃或拖延。需要更務實和專注於目標。' } 
  },
  { id: 75, name: '錢幣騎士', nameEn: 'Knight of Pentacles', number: 12, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '勤奮、可靠、堅持、務實', description: '錢幣騎士代表勤奮和可靠。穩定地朝著目標前進，雖然緩慢但穩定。這是負責任和務實的象徵。' }, 
    reversed: { meaning: '懶惰、停滯、缺乏進展', description: '可能過於懶惰或停滯不前。需要重新找回動力和方向。' } 
  },
  { id: 76, name: '錢幣皇后', nameEn: 'Queen of Pentacles', number: 13, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '務實、照顧、豐盛、安全', description: '錢幣皇后代表務實的照顧和豐盛。你能創造舒適和安全的環境，同時保持務實和慷慨。' }, 
    reversed: { meaning: '自我照顧不足、物質主義、不平衡', description: '可能忽略自我照顧或過於物質主義。需要在給予和接受之間找到平衡。' } 
  },
  { id: 77, name: '錢幣國王', nameEn: 'King of Pentacles', number: 14, suit: 'pentacles', element: '土', emoji: '💰', color: '#F38181', 
    upright: { meaning: '豐盛、成功、領導力、穩定', description: '錢幣國王代表物質成功和穩定的領導。你已經建立了堅實的基礎，享受你的成就和豐盛。這是成功和慷慨的象徵。' }, 
    reversed: { meaning: '貪婪、固執、物質主義', description: '可能過於貪婪或固執。需要記住，真正的財富包括情感和精神的滿足。' } 
  }
];

// 合併所有塔羅牌
export const allTarotCards = [
  ...majorArcana,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards
];

// 牌陣類型
export const spreadTypes = [
  { 
    id: 'single', 
    name: '單張牌', 
    nameEn: 'Single Card', 
    description: '簡單直接的指引', 
    cardCount: 1, 
    positions: [
      { id: 'present', name: '現在', description: '當下的狀況' }
    ] 
  },
  { 
    id: 'three', 
    name: '三張牌', 
    nameEn: 'Three Card Spread', 
    description: '過去、現在、未來', 
    cardCount: 3, 
    positions: [
      { id: 'past', name: '過去', description: '過去的情況' }, 
      { id: 'present', name: '現在', description: '當下的狀況' }, 
      { id: 'future', name: '未來', description: '未來的發展' }
    ] 
  },
  { 
    id: 'five', 
    name: '五張牌', 
    nameEn: 'Five Card Spread', 
    description: '深入分析', 
    cardCount: 5, 
    positions: [
      { id: 'situation', name: '現況', description: '當前狀況' }, 
      { id: 'challenge', name: '挑戰', description: '面臨的挑戰' }, 
      { id: 'past', name: '過去', description: '過去的影響' }, 
      { id: 'future', name: '未來', description: '未來的發展' }, 
      { id: 'outcome', name: '結果', description: '可能的結果' }
    ] 
  }
];
