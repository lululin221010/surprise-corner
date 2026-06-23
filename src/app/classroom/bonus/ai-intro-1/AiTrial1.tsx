'use client';
// 📄 路徑：src/app/classroom/bonus/ai-intro-1/AiTrial1.tsx
// AI書院系列1試讀本：入門3堂 + 進階2堂 + 高階1堂

import { useState } from 'react';
import Link from 'next/link';
import '../../classroom.css';

// ── 型別 ──────────────────────────────────────────────────

interface Quiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface Slide {
  title: string;
  body: string;
}

interface AiLesson {
  id: string;
  title: string;
  emoji: string;
  description: string;
  duration: string;
  tier: 'basic' | 'intermediate' | 'advanced';
  slides: Slide[];
  quizzes: Quiz[];
}

// ── 課程資料 ──────────────────────────────────────────────

const AI_LESSONS: AiLesson[] = [
  {
    id: 'trial-ai-b-1',
    title: 'AI是怎麼來的',
    emoji: '🕰️',
    description: '七十年前，幾個數學家聚在一起，提出了一個瘋狂的問題。',
    duration: '15分鐘',
    tier: 'basic',
    slides: [
      { title: '一個瘋狂的提問', body: '1956年夏天，美國一所大學裡，幾個數學家聚在一起開了一場會議。他們提出一個聽起來很瘋狂的問題：**「機器能不能像人一樣思考？」**\n\n那一年，世界上第一台電腦才剛出現沒多久，連計算機都還很稀奇。但這群人已經開始討論，未來有沒有可能做出會「思考」的機器。\n\n這場會議，後來被認為是「人工智慧」這個詞正式誕生的起點。' },
      { title: '1956：達特茅斯會議', body: '這場會議在達特茅斯學院（Dartmouth College）舉行，所以後來被稱為**達特茅斯會議**。\n\n與會的學者提出了一個大膽假設：人類的思考、學習、推理，原則上都可以用機器來模擬。這個假設，定義了往後幾十年AI研究要追的方向。\n\n「Artificial Intelligence（人工智慧）」這個詞，就是在這場會議上被正式提出來的。' },
      { title: '1970s：第一次「AI寒冬」', body: '會議之後，研究者一開始很樂觀，覺得「會思考的機器」很快就能做出來。但現實沒這麼簡單。\n\n到了1970年代，大家發現當時的技術遠遠不夠，電腦的運算能力太弱，資料也不夠，很多承諾跳了票。政府和企業的資金一度大幅減少，這段低潮期後來被稱為**「AI寒冬」**。' },
      { title: '1997：深藍打敗世界冠軍', body: '1997年，IBM開發的電腦系統「深藍（Deep Blue）」，在西洋棋比賽中擊敗了當時的世界冠軍棋王卡斯帕洛夫。\n\n這是AI第一次在大眾面前展現出「打敗人類」的實力，震驚全世界。\n\n但深藍能贏，靠的是**超強的運算能力，把每一種可能的下法都快速算過一遍**，不是因為它「懂」西洋棋的策略或「想通了」什麼。' },
      { title: '2022：ChatGPT引爆全民熱潮', body: '2022年底，一個叫ChatGPT的對話機器人上線，短短幾天內吸引數百萬人使用，掀起全球熱潮。\n\n這是第一次，一般大眾不需要任何技術背景，就能直接用「打字聊天」的方式體驗到AI的能力。從這之後，AI不再只是科技公司或研究機構的事，變成每個人日常生活都可能用到的工具。' },
      { title: '本堂重點整理', body: '📝 **本堂重點：**\n1. 「人工智慧」這個詞誕生於1956年的達特茅斯會議\n2. AI發展不是一路順遂，中間經歷過資金和技術的低潮期\n3. 深藍打敗棋王（1997）靠的是運算能力，不是真正的「思考」\n4. 2022年ChatGPT讓AI走進大眾生活' },
    ],
    quizzes: [
      { question: '「人工智慧（Artificial Intelligence）」這個詞最早是在什麼場合被正式提出的？', options: ['1956年的達特茅斯會議', '1997年深藍打敗棋王的比賽現場', '2022年ChatGPT上線發布會', '電腦剛發明的那一刻就自動有了這個詞'], answerIndex: 0, explanation: '「人工智慧」一詞正式誕生於1956年的達特茅斯會議，這場會議聚集了多位學者，提出機器能否模擬人類思考的大膽假設。' },
      { question: '朋友說「深藍打敗世界棋王，代表AI在1997年就已經會像人類一樣思考了」，這個說法哪裡有問題？', options: ['深藍靠的是強大的運算能力快速算過每種可能下法，不是真正理解策略或「想通」棋局', '這個說法完全正確，深藍確實在思考', '深藍其實沒有打敗棋王，這是誤傳', '深藍的勝利跟AI完全無關'], answerIndex: 0, explanation: '深藍的勝利主要靠的是龐大的運算能力，把可能的下法都計算過一遍，這跟人類理解棋局策略、進行創造性思考的方式不同。' },
      { question: '從AI發展的歷史來看，下面哪個描述最準確？', options: ['AI的發展過程中經歷過資金和技術的低潮期（如1970年代的AI寒冬），不是一路順遂的直線進步', 'AI從1956年提出後，技術就一路穩定進步，從未遇到任何瓶頸', 'AI技術完全是在2022年ChatGPT上線後才突然出現的，之前都不存在', 'AI的發展跟運算能力、資料量完全無關，純粹靠理論突破'], answerIndex: 0, explanation: 'AI發展史上確實經歷過低潮期，1970年代因技術和資金不足出現「AI寒冬」。AI的進步跟運算能力、資料量、技術架構的突破都密切相關，並非一路線性發展。' },
    ],
  },
  {
    id: 'trial-ai-b-2',
    title: 'AI不是在查資料，是在猜',
    emoji: '🎲',
    description: '你以為AI每次回答前都在查資料庫？其實它根本沒有資料庫可以查。',
    duration: '15分鐘',
    tier: 'basic',
    slides: [
      { title: '你以為AI是怎麼回答你的？', body: '想像你問AI：「台灣最高的山是哪座？」幾秒鐘後，它回答「玉山」。\n\n很多人會覺得：AI應該是去某個資料庫裡「查」到這個答案的吧？就像你用搜尋引擎查資料一樣。\n\n但這個想像，跟AI實際運作的方式差很多。' },
      { title: '核心概念：AI在「猜下一個字」', body: '**AI的本質，是在預測「接下來最可能出現的字」是什麼，不是在查資料庫找答案。**\n\n當你問「台灣最高的山是」，AI會根據它學過的大量文字，計算出接下來最可能出現的字是「玉」，然後是「山」。它是一個字一個字「猜」出來的，不是去某個地方把現成答案撈出來。' },
      { title: '比喻：很會接話的朋友', body: '想像一個讀過非常多書、看過非常多文章的朋友。你說一句話的開頭，他常常能很準地接下去——不是因為他「查」到了答案，是因為他見過太多類似的句子，知道接下來大概會接什麼。\n\nAI就像這個朋友，但讀過的東西多到難以想像。它不是資料庫查詢系統，是一個極度擅長「接話」的系統。' },
      { title: '為什麼不是「查資料庫」？', body: '如果AI是查資料庫，應該每次問同樣的問題，都得到完全一樣、逐字相同的答案，就像查字典一樣。\n\n但實際上，你問AI同一個問題兩次，答案可能用詞略有不同——這正是因為它每次都是重新「猜」一遍，不是去固定的地方撈出同一段文字。' },
      { title: '本堂重點整理', body: '📝 **本堂重點：**\n1. AI的本質是「猜下一個字」，不是查資料庫找答案\n2. 這個猜測是根據大量學習過的文字，有根據、非隨機\n3. 流暢的回答不代表內容一定正確，兩者是不同的事\n4. 理解這點能幫你更聰明地判斷什麼時候該自己查證' },
    ],
    quizzes: [
      { question: 'AI回答問題的核心運作方式，最準確的描述是什麼？', options: ['根據學習過的大量文字，預測「接下來最可能出現的字」，一個字一個字猜出來', '連到一個固定的資料庫，把現成答案撈出來', '每次都隨機亂猜，跟丟硬幣的機率差不多', '由真人在背後即時打字回答'], answerIndex: 0, explanation: 'AI的本質是基於學習過的文字模式，預測下一個最可能的字，這是一個有根據的猜測過程，不是查詢固定資料庫，也不是隨機亂猜或真人代答。' },
      { question: '你問AI同一個問題兩次，發現兩次的用詞不完全一樣，這個現象最可能的原因是什麼？', options: ['AI是基於猜測機制重新生成答案，不是查詢固定資料庫撈出同一段文字', '這代表AI出了故障，需要重新啟動', 'AI每次都連網重新搜尋了一次', '這代表AI在故意給你錯誤資訊'], answerIndex: 0, explanation: '因為AI每次回答都是重新進行「猜測下一個字」的過程，不是從固定地方撈出逐字相同的內容，所以用詞上可能會有些差異，這是正常現象，不是故障或惡意行為。' },
      { question: '朋友說「AI在猜字，所以基本上就是亂猜，不可信」，這個說法哪裡有問題？', options: ['AI的猜測是建立在學習過大量文字的基礎上，是有根據的猜測，準確率通常很高，不是隨機亂猜', '這個說法完全正確，AI的猜測跟丟硬幣機率一樣，完全不可信', 'AI其實不是在猜，是在查資料庫，所以朋友的前提就錯了', 'AI的猜測只有在某些特定問題上才有根據，其他時候都是亂猜'], answerIndex: 0, explanation: '這是把「猜測」跟「隨機亂猜」混為一談的常見迷思。AI的猜字是基於海量學習資料的有根據預測，跟完全隨機的亂猜是不同等級的事。' },
    ],
  },
  {
    id: 'trial-ai-b-3',
    title: 'Token是什麼',
    emoji: '🧩',
    description: '你打的每一句話，AI看到的根本不是「字」，是一種叫Token的拼圖碎片。',
    duration: '15分鐘',
    tier: 'basic',
    slides: [
      { title: '你打的字，AI是怎麼「看」的？', body: '上一堂講過，AI是在「猜下一個字」。但這裡有個更精確的說法：AI猜的，其實不完全是「字」，而是一種叫**Token**的單位。\n\n這聽起來有點技術，但理解它，能幫你更懂AI為什麼有時候對某些語言、某些內容處理得特別好或特別差。' },
      { title: '核心概念：Token是AI的「拼圖碎片」', body: '**Token，是AI處理文字時使用的基本單位，可以是一個完整的字、一個詞的片段、甚至是一個標點符號。**\n\n中文跟英文被拆解成Token的方式不太一樣。比方英文的「running」可能被拆成「run」+「ning」兩個Token；中文的「你好」可能整個算一個或兩個Token，依不同模型設計而定。\n\n簡單說：AI不是直接看你打的句子，是先把這句話拆解成一塊一塊的拼圖碎片，再去處理這些碎片。' },
      { title: '為什麼要拆成Token，不直接用「字」？', body: '如果AI直接以「字」為單位處理，會遇到一個問題：人類語言裡的字詞組合方式太多變化，直接記住每個完整詞彙，效率很低。\n\n拆成Token之後，AI可以用較少的基本單位，組合出無限多的詞彙和句子——就像用有限的樂高積木，拼出各種造型。' },
      { title: '常見誤解：Token就是「字數」？', body: '很多人以為Token數量等於你打的字數，這不完全準確。\n\n**中文一個字，常常會被算成1個以上的Token；英文一個常見單字，有時反而只算1個Token。不同語言、不同模型，換算方式都不一樣。**\n\n這也是為什麼有些AI產品會限制每次對話能使用的Token數量，而不是直接限制「字數」——因為Token才是AI實際處理的基本單位。' },
      { title: '本堂重點整理', body: '📝 **本堂重點：**\n1. Token是AI處理文字的基本單位，可能是一個字、詞的片段、或標點符號\n2. AI先把你的句子拆成Token，再轉換成數字進行運算\n3. Token數量跟字數不完全相等，中英文的換算方式也不同\n4. 理解Token，有助於理解後面提到的對話長度限制等概念' },
    ],
    quizzes: [
      { question: 'Token最準確的定義是什麼？', options: ['AI處理文字時使用的基本單位，可以是完整字、詞的片段、或標點符號', '跟「字數」完全相等的計算單位', '只存在於英文，中文沒有Token的概念', '是AI連網查詢資料時使用的網址格式'], answerIndex: 0, explanation: 'Token是AI處理語言的基本單位，可能是完整字、詞的片段或標點符號，跟「字數」不完全相等，且中英文都有各自的Token拆解方式。' },
      { question: '一位使用者發現，輸入同樣字數的中文跟英文句子，AI計算出來的Token數量不一樣，這個現象最可能的原因是什麼？', options: ['不同語言被拆解成Token的方式不同，Token數量跟字數本來就不是直接對應的關係', 'AI對中文有故障，無法正確計算', '這代表其中一種語言的句子被打錯了', 'Token只適用於英文，中文不會被拆解成Token'], answerIndex: 0, explanation: '中英文被拆解成Token的方式不同，導致同樣字數的句子，最終的Token數量可能不一樣，這是正常現象，跟「字數」本來就不是完全對應的概念。' },
      { question: '「Token數量就等於你打的字數，兩者完全一樣」，這個說法哪裡有問題？', options: ['中文一個字常被算成1個以上的Token，英文常見單字有時只算1個Token，兩者並非完全相等', '這個說法完全正確，Token就是字數的另一種說法', 'Token只在使用者打很長的句子時才會跟字數不同', 'Token的數量永遠比字數少，不可能比字數多'], answerIndex: 0, explanation: '這是常見的迷思。Token跟字數的換算方式因語言和模型設計而不同，中文一個字有時會被算成多個Token，不能簡單地把兩者視為完全相等的概念。' },
    ],
  },
  {
    id: 'trial-ai-a-1',
    title: '預訓練是什麼',
    emoji: '🏋️',
    description: '海量文字餵進去，AI學到的不是答案，是「語言的常識」。這堂帶你看懂訓練最關鍵的第一步。',
    duration: '20分鐘',
    tier: 'intermediate',
    slides: [
      { title: '訓練跟預訓練，差在哪？', body: '入門冊第4堂提過，AI靠「餵資料、練習預測」變聰明。但這個過程其實分階段——**預訓練，是所有訓練的第一步，也是最龐大的一步**。\n\n把它想成一個人在成為某領域專家之前，要先把通識都讀完。AI在學會「客服話術」「寫程式」這些專長之前，得先經歷一段「什麼都讀」的階段。' },
      { title: '預訓練在做一件事：學會「接下一個字」', body: '預訓練的核心動作，其實簡單到有點意外：**把網路上的海量文字丟給AI，讓它一次又一次練習「猜下一個字是什麼」**。\n\n不是寫考卷，沒有人在旁邊告訴它對或錯——文字本身就是答案。AI看到「今天天氣很」，試著猜下一個字，猜完直接跟原文對照，猜對了強化這個猜法，猜錯了調整參數。\n\n這個過程在數兆個字上重複幾億次。' },
      { title: '地基打得好不好，看資料的「廣度」', body: '預訓練不會特別針對某個任務優化，它追求的是**廣度**——讀過越多元的文字，AI的「常識庫」越完整。\n\n這也解釋了一個你可能遇過的現象：同一個AI，聊天氣、聊歷史、聊程式都還算靠譜，但問到很冷門的地方小眾話題，常常開始語焉不詳，甚至講錯。\n\n很可能的原因是——**這塊知識在預訓練資料裡出現的次數太少**，沒有足夠的練習量把規律學紮實。' },
      { title: '常見誤解：預訓練不是「理解」', body: '很多人聽完會有個直覺：「所以AI其實『理解』了世界？」\n\n嚴格說不是。預訓練學到的，是**文字之間統計上的關聯規律**——什麼字後面常接什麼字、什麼概念常一起出現。這跟人類「理解」一件事背後有意圖、有情境感受，是不同層次的東西。' },
      { title: '本堂重點整理', body: '📝 本堂重點：\n\n- 預訓練＝用海量文字，讓AI練習「猜下一個字」，從中學會語言規律和世界知識\n- 這種不需要人工標答案的學習方式，叫**自監督學習**\n- 預訓練追求的是**廣度**，資料覆蓋越完整，AI常識越紮實\n- 預訓練學到的是**統計規律**，不是「理解」——這是後面講幻覺、推理限制的重要基礎' },
    ],
    quizzes: [
      { question: '預訓練（pretraining）這個階段，AI主要在做什麼？', options: ['學會特定公司的客服SOP和話術', '用海量文字資料反覆練習「猜下一個字」，從中累積語言規律與常識', '記住每一個使用者過去說過的話', '直接連網查詢最新資訊'], answerIndex: 1, explanation: '預訓練的核心是自監督學習：讓AI在大量文字上反覆練習接龍，從中學會語言和世界知識。客服話術是微調的事，記住個別使用者對話則不是模型訓練的運作方式。' },
      { question: '如果預訓練資料裡，某個領域的內容量特別少，最可能發生什麼？', options: ['AI在那個領域反而會回答得特別精準', 'AI在那個領域的回答容易變得模糊、用詞貧乏，甚至出錯', 'AI會自動跳過那個領域的問題不回答', 'AI的整體訓練速度會變快'], answerIndex: 1, explanation: '預訓練靠「量」累積規律，某領域內容太少，AI對那塊的語言規律和知識掌握就會比較弱，常見表現是回答模糊、籠統甚至出錯。' },
      { question: '你問一個通用AI完全不同領域的兩個問題——寫詩、解釋光合作用——它都能給出像樣的答案。這種「什麼都懂一點」的能力，主要來自哪個階段？', options: ['預訓練階段讀過的大量多元領域文字', '使用者付費才解鎖的隱藏功能', '每次提問當下即時連網搜尋', '客服人員在背後手動回覆'], answerIndex: 0, explanation: '這種跨領域的基礎能力，正是預訓練階段「讀過各種文字」累積出來的廣度，不是付費解鎖、也不是即時搜尋或人工介入的結果。' },
      { question: '同事跟你聊了一整個下午的AI，下班前說：「它應該已經把我今天講的事都學起來了吧，下次再聊會記得。」這個想法的問題在哪？', options: ['沒問題，這就是預訓練的效果', '對話內容只會在當下被當作上下文參考使用，不會讓模型的參數因此永久改變，模型不會「記住」這場對話', 'AI只會記住付費用戶說的話', '只要聊得夠久，就會自動觸發一次新的預訓練'], answerIndex: 1, explanation: '預訓練（以及後續的微調）是在模型上線前完成的，參數在那之後是固定的。日常聊天時AI能「接得上話」，靠的是當下的上下文視窗，對話結束後不會被寫進模型參數裡。' },
    ],
  },
  {
    id: 'trial-ai-a-2',
    title: '微調是什麼',
    emoji: '🎯',
    description: '同一個AI模型，怎麼變成法律小幫手、醫療問答機、客服專員？這堂拆解「微調」這一步在幹嘛。',
    duration: '20分鐘',
    tier: 'intermediate',
    slides: [
      { title: '通才怎麼變專才？', body: '預訓練讓AI讀遍了「半個網路」的文字，變成一個什麼都懂一點的通才。但你一定用過或聽過那種特別「專業」的AI——法律小幫手、醫療問答機器人、客服專員AI。\n\n它們的底子，很可能跟你平常聊天用的通用AI一模一樣。差別在哪裡？答案是這堂課的主題：**微調**。' },
      { title: '微調＝在通才基礎上，加一輪「專業訓練」', body: '微調（fine-tuning）是在預訓練已經完成的模型基礎上，**用一小批特定領域、特定任務的資料，再做一輪訓練**，讓模型的輸出風格和知識重心，往某個方向偏移。\n\n打個比方：預訓練像大學通識教育，什麼都接觸一點；微調像研究所的專業訓練——地基沒變，但某個方向的能力被特別加強了。' },
      { title: '資料量差很多：質比量重要', body: '預訓練動輒是數兆個Token的等級；微調用的資料量小得多，可能是幾千筆到幾十萬筆，差距可以是百萬倍以上。\n\n但「少」不代表「不重要」——微調資料的**品質**比量還關鍵。例如客服對話紀錄、醫療問答配對、附註解的程式碼，每一筆都是針對任務精心整理過的範例，而不是隨手撈來的網路文字。' },
      { title: '微調不是砍掉重練', body: '很重要的一點：微調不是把模型歸零重新訓練，而是在**原本的參數基礎上做局部調整**。\n\n這也是為什麼微調後的模型，通常還保留大部分原本的通用能力——只是某些方向的「反應傾向」被強化了。法律AI還是聽得懂你的日常閒聊，只是回答法律問題時特別到位。' },
      { title: '本堂重點整理', body: '📝 本堂重點：\n\n- 微調＝在預訓練完成的模型基礎上，用較小規模、特定領域資料再訓練一輪\n- 微調資料量遠小於預訓練，但**品質比量重要**\n- 微調是局部調整，不是砍掉重練，模型仍保留大部分通用能力\n- 微調若做得不好可能導致「災難性遺忘」，但這不是必然結果' },
    ],
    quizzes: [
      { question: '微調（fine-tuning）的核心做法是？', options: ['從零開始重新訓練一個全新模型', '在已完成預訓練的模型基礎上，用較小規模、特定領域的資料再訓練一輪，強化特定能力', '只是換一套使用者介面和字體', '讓使用者自己上傳資料就能即時改變模型參數'], answerIndex: 1, explanation: '微調是在預訓練模型的基礎上做局部調整，用較小但精準的資料強化某個方向的能力，而不是從零重練或單純改介面。' },
      { question: '如果一家公司用品質很差、充滿錯誤的客服紀錄去微調模型，最可能發生什麼？', options: ['模型會自動偵測並忽略錯誤資料', '模型的整體運算速度會明顯變快', '模型可能把那些錯誤的回答方式也學起來，實際使用時複製出類似的問題', '完全不會有影響，因為預訓練的基礎足夠穩固'], answerIndex: 2, explanation: '微調資料的品質直接影響模型學到的「反應傾向」。資料裡的錯誤模式，模型同樣有可能學進去，在實際對話中重現類似的問題。' },
      { question: '你發現某個AI工具回答法律問題時，用詞和邏輯都很像專業律師，合理的推測是？', options: ['它是完全獨立打造、跟通用AI無關的全新系統', '它很可能是在通用預訓練模型基礎上，用大量法律文件和問答資料做過微調', '這純粹是巧合，所有AI回答法律問題的水準都一樣', '這代表它一定具備連網查詢最新法條的能力'], answerIndex: 1, explanation: '專業AI工具，常見的作法是在通用預訓練模型上用領域資料微調，而不是從零打造全新系統。這也是為什麼評估這類工具時，要問微調資料的來源和品質。' },
      { question: '微調完成後，模型通常還保有哪些能力？', options: ['只保有微調特化的那個領域的能力，其他通用能力全部消失', '大部分預訓練學到的通用能力還在，只是某些方向的反應傾向被強化了', '微調會讓模型完全忘記預訓練學到的一切', '微調只影響輸出格式，對內容完全沒有影響'], answerIndex: 1, explanation: '微調是在原有參數基礎上做局部調整，不是砍掉重練，所以通用能力大多會保留，只是特定方向的反應被加強了。「災難性遺忘」是可能發生的風險，不是必然結果。' },
    ],
  },
  {
    id: 'trial-ai-m-1',
    title: 'AI公司怎麼賺錢',
    emoji: '💰',
    description: 'OpenAI一年營收超過上百億美元，它到底怎麼賺的？三種模式，看懂AI公司的生意經。',
    duration: '25分鐘',
    tier: 'advanced',
    slides: [
      { title: '一個數字，先給你嚇一跳', body: 'OpenAI 2025年的年化營收已經衝破百億美元門檻，而它在三年前還是一家燒錢的非營利轉型公司。\n\n這筆錢從哪裡來？答案不是單一來源，而是**三條收入管道同時在跑**：一般人付的訂閱費、開發者付的API費、企業付的授權費。' },
      { title: '管道一：訂閱制', body: '最直覺的模式：你每個月付一筆固定費用，換取使用權。\n\nChatGPT Plus、Claude Pro，都是這種模式。重點是**你付的不是「用量」，是「資格」**——不管你那個月用10次還是1000次，月費都一樣。\n\n對AI公司來說，訂閱制的好處是**收入可預測**。對使用者來說，好處是**不用算每次對話花多少錢**，心理負擔小。' },
      { title: '管道二：API計費', body: '這是開發者在付的錢，跟一般用戶完全不同的邏輯。\n\n開發者把AI接進自己的產品（例如客服機器人、寫作工具），每次呼叫AI，依照**處理的Token數量**計費——你的問題愈長、AI回答愈長，費用愈高。\n\n這是一種**用多少付多少**的模式，跟訂閱制完全相反。' },
      { title: '管道三：企業授權', body: '第三種是金額最大、但你最不容易看到的——**企業級合作**。\n\n大公司不會只用網頁版ChatGPT，他們要的是**客製化、私有部署、資料不外流**的版本。這種合約通常以「年約」計算，金額從幾十萬到上千萬都有可能。' },
      { title: '常見誤解：免費版是在做公益？', body: '很多人以為AI公司提供免費版，是佛心來的。**其實免費版是獲客漏斗的第一步**。\n\n免費用戶體驗到價值之後，一部分會升級訂閱，這叫**轉換率**。AI公司願意在免費版投入成本，是因為**長期換來的訂閱收入划算**。' },
      { title: '本堂重點整理', body: '📝 本堂重點整理：\n\n1. AI公司主要靠**三條管道**賺錢：訂閱制／API計費／企業授權\n2. 三種模式對應**三種不同客群**的需求\n3. 免費版不是公益，是**獲客策略**的一環\n4. 理解這套邏輯，下一堂會帶你看**整個AI工具市場**怎麼分類' },
    ],
    quizzes: [
      { question: 'AI公司的三種主要收入模式，下列哪個配對是正確的？', options: ['訂閱制看用量計費，API計費是固定月費', '訂閱制是固定月費，API計費依Token用量計費', '訂閱制只給企業用，API計費只給一般人用', '三種模式其實是同一種定價方式換包裝'], answerIndex: 1, explanation: '訂閱制的邏輯是「付資格」而非「付用量」，固定月費不限用量；API計費則相反，依照處理的Token數量計費，用多少付多少。兩者服務的客群與定價邏輯本質不同。' },
      { question: '一家AI公司同時做訂閱制和API兩種收費，下列哪個推論最合理？', options: ['這代表公司定價策略混亂，還沒想清楚', '訂閱制成本一定比API高很多', '兩種模式分別針對「圖方便的一般人」和「要精準計算成本的開發者」，是有意的市場區隔', 'API計費的存在，是因為訂閱制賠錢需要補貼'], answerIndex: 2, explanation: '同時經營兩種定價模式，是常見的市場區隔策略：一般人要的是「不用算錢」的安心感，開發者要的是「成本可控、用多少算多少」的彈性。兩者並存是設計，不是混亂。' },
      { question: '某AI新創在行銷文案中強調「我們的免費版完全是回饋社會，沒有任何商業考量」，這句話最值得質疑的地方是？', options: ['免費版本來就不該被質疑，公司說了算', '免費版通常仍是獲客策略的一環，背後有轉換訂閱用戶的商業考量，全無商業考量的說法值得存疑', '免費版一定是在偷偷訓練資料賺錢', '這句話沒有問題，AI公司都很佛心'], answerIndex: 1, explanation: '免費版的存在，商業上常見的理由是作為獲客漏斗、提高未來轉換訂閱的機會。一家公司宣稱「完全沒有商業考量」，與業界常見的定價邏輯不符，是值得進一步查證的說法。' },
      { question: '一家公司同時對一般消費者推出9.99美元/月訂閱、對開發者推出API計費、對大型企業簽署百萬美元級年約，這個組合反映出什麼商業邏輯？', options: ['公司定價沒有章法，看人喊價', '同一套AI核心技術，依照客群需求被包裝成不同商品，分層攫取不同規模客戶的價值', '企業授權的存在純粹是為了補貼訂閱制的虧損', '這種組合在軟體業很少見，是AI公司獨創'], answerIndex: 1, explanation: '這是典型的「同一核心技術、分層定價」策略：用低價訂閱觸及大眾、用彈性計費服務開發者、用高價客製合約鎖定企業，藉此從不同規模與需求的客群中分別獲取最大商業價值。' },
      { question: '一間新創公司想把AI客服功能放進自己的App，且希望成本隨用戶量成長而成長、不想先付一筆固定大錢，最適合選哪種模式？', options: ['訂閱制，因為比較便宜', 'API計費，依實際呼叫量付費，跟自己的成長曲線同步', '企業授權，因為新創也算企業', '三種都不適合，應該自己訓練模型'], answerIndex: 1, explanation: 'API計費的核心特性就是「用多少付多少」，成本會隨著實際呼叫量（也就是用戶成長）同步增加，不需要在還沒驗證商業模式前先承擔企業授權那種固定大筆合約。' },
    ],
  },
];

const TRIAL_GROUPS = [
  { key: 'basic',        label: '🤖 入門', lessons: AI_LESSONS.filter(l => l.tier === 'basic') },
  { key: 'intermediate', label: '⚙️ 進階', lessons: AI_LESSONS.filter(l => l.tier === 'intermediate') },
  { key: 'advanced',     label: '💡 高階', lessons: AI_LESSONS.filter(l => l.tier === 'advanced') },
];

const CATALOG_BY_KEY: Record<string, { label: string; price: string; lessons: { title: string; isTrial: boolean }[] }> = {
  basic:        { label: '🤖 AI入門', price: 'NT$249', lessons: [
    { title: 'AI是怎麼來的', isTrial: true },
    { title: 'AI不是在查資料，是在猜', isTrial: true },
    { title: 'Token是什麼', isTrial: true },
    { title: '訓練是什麼意思', isTrial: false },
    { title: 'AI怎麼「記住」東西', isTrial: false },
    { title: 'AI幻覺是什麼', isTrial: false },
    { title: 'Prompt是什麼意思', isTrial: false },
    { title: '怎麼問AI問題比較有效', isTrial: false },
    { title: '上下文視窗是什麼', isTrial: false },
    { title: 'AI能不能連網？', isTrial: false },
    { title: 'AI的知識截止日是什麼意思', isTrial: false },
    { title: 'RAG是什麼', isTrial: false },
    { title: 'Embedding是什麼', isTrial: false },
    { title: 'AI的極限在哪裡', isTrial: false },
    { title: 'AI能不能有創意？', isTrial: false },
  ]},
  intermediate: { label: '⚙️ AI進階', price: 'NT$349', lessons: [
    { title: '預訓練是什麼', isTrial: true },
    { title: '微調是什麼', isTrial: true },
    { title: '對齊訓練是什麼', isTrial: false },
    { title: '為什麼AI有時候「拒絕」你', isTrial: false },
    { title: 'RLHF是什麼', isTrial: false },
    { title: '災難性遺忘是什麼', isTrial: false },
    { title: 'Agent是什麼', isTrial: false },
    { title: 'AI推理能力的邊界', isTrial: false },
    { title: '多模態AI是什麼', isTrial: false },
    { title: '量化和剪枝是什麼', isTrial: false },
    { title: 'AI安全是在擔心什麼', isTrial: false },
  ]},
  advanced:     { label: '💡 AI高階', price: 'NT$449', lessons: [
    { title: 'AI公司怎麼賺錢', isTrial: true },
    { title: 'AI工具地圖：文字/圖片/影音/程式', isTrial: false },
    { title: '開源vs閉源AI，差在哪？', isTrial: false },
    { title: 'AI算力競賽是什麼', isTrial: false },
    { title: '訓練AI要花多少錢', isTrial: false },
    { title: '邊緣AI是什麼', isTrial: false },
    { title: 'AI監管與法規現況', isTrial: false },
    { title: 'AI版權問題', isTrial: false },
    { title: '未來的AI：AGI是什麼', isTrial: false },
  ]},
};

// ── 工具函式 ──────────────────────────────────────────────

function renderBody(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={{ margin: '0 0 0.5rem 0', lineHeight: 1.75 }}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

function tierLabel(tier: AiLesson['tier']) {
  if (tier === 'basic') return '入門';
  if (tier === 'intermediate') return '進階';
  return '高階';
}

function lessonToGroupKey(lesson: AiLesson) {
  if (lesson.tier === 'basic') return 'basic';
  if (lesson.tier === 'intermediate') return 'intermediate';
  return 'advanced';
}

// ── 單堂完成頁 ────────────────────────────────────────────

function LessonDonePage({ groupKey, onContinue }: { groupKey: string; onContinue: () => void }) {
  const catalog = CATALOG_BY_KEY[groupKey];
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '1rem' }}>
        <div style={{ marginBottom: '1.4rem' }}>
          <div style={{ color: '#1e1b4b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            📖 {catalog.label} 完整目錄
            <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.5rem' }}>{catalog.price}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {catalog.lessons.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '6px', background: l.isTrial ? 'rgba(124,58,237,0.08)' : 'transparent' }}>
                <span style={{ color: l.isTrial ? '#a78bfa' : '#d1d5db', fontSize: '0.7rem', flexShrink: 0, width: '1.4rem' }}>
                  {l.isTrial ? '✅' : `${i + 1}.`}
                </span>
                <span style={{ color: l.isTrial ? '#374151' : '#9ca3af', fontSize: '0.8rem' }}>{l.title}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.8rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', borderLeft: '3px solid #7c3aed', color: '#6b7280', fontSize: '0.78rem' }}>
            ✨ 以上精彩內容，前往小舖解鎖
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎖️</div>
          <div style={{ color: '#92400e', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>好康體驗證書</div>
          <div style={{ color: '#78350f', fontSize: '0.78rem', lineHeight: 1.6 }}>本堂完成！可收藏紀念，無折抵功能</div>
        </div>
        <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', borderRadius: '30px', padding: '0.75rem', textDecoration: 'none', textAlign: 'center', marginBottom: '0.8rem' }}>
          前往小舖購買完整版 →
        </a>
        <div style={{ textAlign: 'center' }}>
          <button onClick={onContinue} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
            繼續下一堂 →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 測驗元件 ──────────────────────────────────────────────

function QuizPanel({ quiz, onPass }: { quiz: Quiz; onPass: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === quiz.answerIndex;

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>✏️ 隨堂測驗</div>
      <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.9rem', lineHeight: 1.6 }}>{quiz.question}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.9rem' }}>
        {quiz.options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.6)', border = '1px solid #e5e7eb', color = '#374151';
          if (answered) {
            if (i === quiz.answerIndex) { bg = '#f0fdf4'; border = '1px solid #22c55e'; color = '#15803d'; }
            else if (i === selected) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#b91c1c'; }
          } else if (selected === i) { bg = '#ede9fe'; border = '1px solid #7c3aed'; color = '#5b21b6'; }
          return (
            <button key={i} onClick={() => !answered && setSelected(i)}
              style={{ background: bg, border, color, borderRadius: '10px', padding: '0.65rem 0.9rem', textAlign: 'left', fontSize: '0.85rem', cursor: answered ? 'default' : 'pointer', fontWeight: i === quiz.answerIndex && answered ? 600 : 400, transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ background: correct ? '#f0fdf4' : '#fef2f2', border: `1px solid ${correct ? '#86efac' : '#fca5a5'}`, borderRadius: '10px', padding: '0.75rem', marginBottom: '0.9rem', fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>
          {correct ? '✅ 答對了！' : '❌ 再想想——'} {quiz.explanation}
        </div>
      )}
      {answered && (
        <button onClick={onPass}
          style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', borderRadius: '30px', padding: '0.65rem', cursor: 'pointer' }}>
          繼續 →
        </button>
      )}
    </div>
  );
}

// ── 單堂課元件 ────────────────────────────────────────────

function LessonView({ lesson, onComplete, onBack }: { lesson: AiLesson; onComplete: () => void; onBack: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);

  const totalSteps = lesson.slides.length + lesson.quizzes.length;
  const currentStep = showQuiz ? lesson.slides.length + quizIdx : slideIdx;
  const progress = Math.round((currentStep / totalSteps) * 100);
  const slide = lesson.slides[slideIdx];
  const isLastSlide = slideIdx === lesson.slides.length - 1;

  function handleQuizPass() {
    if (quizIdx < lesson.quizzes.length - 1) setQuizIdx(q => q + 1);
    else onComplete();
  }

  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '0.85rem', cursor: 'pointer' }}>← 返回課程列表</button>
          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{lesson.emoji} {lesson.title}</div>
        </div>

        {/* 進度條 */}
        <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '1.2rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)', transition: 'width 0.3s', borderRadius: '2px' }} />
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', minHeight: '320px' }}>
          {!showQuiz ? (
            <>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                {slideIdx + 1} / {lesson.slides.length} 頁
              </div>
              <h2 style={{ color: '#1e1b4b', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.9rem' }}>{slide.title}</h2>
              <div style={{ color: '#374151', fontSize: '0.9rem' }}>{renderBody(slide.body)}</div>
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.4rem' }}>
                {slideIdx > 0 && (
                  <button onClick={() => setSlideIdx(i => i - 1)}
                    style={{ flex: 1, background: '#f3f4f6', border: 'none', borderRadius: '30px', padding: '0.6rem', color: '#374151', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 600 }}>
                    ← 上一頁
                  </button>
                )}
                <button onClick={() => isLastSlide ? setShowQuiz(true) : setSlideIdx(i => i + 1)}
                  style={{ flex: 2, background: isLastSlide ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : '#ede9fe', border: 'none', borderRadius: '30px', padding: '0.6rem', color: isLastSlide ? '#fff' : '#5b21b6', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 700 }}>
                  {isLastSlide ? '開始測驗 →' : '下一頁 →'}
                </button>
              </div>
            </>
          ) : (
            <QuizPanel quiz={lesson.quizzes[quizIdx]} onPass={handleQuizPass} />
          )}
        </div>

        <div style={{ color: '#94a3b8', fontSize: '0.73rem', textAlign: 'center', marginTop: '0.8rem' }}>
          {tierLabel(lesson.tier)} · {lesson.duration} · 免費試讀
        </div>
      </div>
    </div>
  );
}

// ── 主元件 ────────────────────────────────────────────────

const STORAGE_KEY = 'sc_ai_trial1_done';

export default function AiTrial1() {
  const [activeLesson, setActiveLesson] = useState<AiLesson | null>(null);
  const [doneGroupKey, setDoneGroupKey] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
    catch { return new Set(); }
  });

  function handleComplete() {
    if (!activeLesson) return;
    const next = new Set(completed).add(activeLesson.id);
    setCompleted(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    setDoneGroupKey(lessonToGroupKey(activeLesson));
    setActiveLesson(null);
  }

  if (doneGroupKey) {
    return <LessonDonePage groupKey={doneGroupKey} onContinue={() => setDoneGroupKey(null)} />;
  }

  if (activeLesson) {
    return <LessonView lesson={activeLesson} onComplete={handleComplete} onBack={() => setActiveLesson(null)} />;
  }

  let globalIdx = 0;
  return (
    <div className="classroom-content">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* 麵包屑 */}
        <div style={{ marginBottom: '1rem', fontSize: '12px', color: '#64748b' }}>
          <Link href="/classroom" style={{ color: '#7c3aed', textDecoration: 'none' }}>小教室</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <Link href="/classroom/bonus" style={{ color: '#7c3aed', textDecoration: 'none' }}>好康書院</Link>
          <span style={{ margin: '0 0.4rem' }}>›</span>
          <span>AI書院試讀本</span>
        </div>

        <h2 style={{ color: '#1e1b4b', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          🤖 AI書院・系列1試讀本
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          入門 3 堂 × 進階 2 堂 × 高階 1 堂，免費體驗完整學習路徑。
        </p>

        {TRIAL_GROUPS.map(group => (
          <div key={group.key} style={{ marginBottom: '0.8rem' }}>
            <div style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', margin: '0 0 0.4rem 0.2rem' }}>
              {group.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {group.lessons.map(lesson => {
                const i = globalIdx++;
                const done = completed.has(lesson.id);
                return (
                  <button key={lesson.id} onClick={() => setActiveLesson(lesson)}
                    className={`course-list-item${done ? ' done' : ''}`}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: done ? '#dcfce7' : '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: done ? '#15803d' : '#7c3aed', fontSize: '0.78rem', fontWeight: 700 }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#1e1b4b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{lesson.emoji} {lesson.title}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>⏱ {lesson.duration}</div>
                    </div>
                    <div style={{ color: done ? '#15803d' : '#a78bfa', fontSize: '0.8rem' }}>{done ? '✓' : '→'}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#faf5ff', border: '1px solid #c4b5fd', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>想繼續學下去？</div>
          <div style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1rem' }}>購買電子書即可解鎖全部課堂，入門 NT$249 起</div>
          <a href="https://still-time-corner.vercel.app/digital" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.6rem 1.8rem', borderRadius: '30px', textDecoration: 'none' }}>
            前往小舖購買 →
          </a>
        </div>
      </div>
    </div>
  );
}
