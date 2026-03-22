// 塔羅牌邏輯函數
import { allTarotCards, spreadTypes } from './tarotData';

// 洗牌函數（Fisher-Yates 洗牌算法）
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 抽牌函數
export function drawCards(count, deck) {
  const shuffled = shuffleDeck(deck);
  return shuffled.slice(0, count).map((card) => ({
    ...card,
    isReversed: Math.random() > 0.5 // 50% 機率逆位
  }));
}

// 根據牌陣類型抽牌
export function drawSpread(spreadTypeId) {
  const spread = spreadTypes.find(s => s.id === spreadTypeId);
  if (!spread) {
    throw new Error('Invalid spread type');
  }

  const cards = drawCards(spread.cardCount, allTarotCards);

  return cards.map((card, index) => ({
    ...card,
    position: spread.positions[index]
  }));
}

// 獲取牌意解釋
export function getCardMeaning(card, isReversed = false) {
  if (isReversed) {
    return card.reversed || {
      meaning: '逆位',
      description: '這張牌處於逆位，代表需要特別注意的方面。'
    };
  }
  return card.upright || {
    meaning: '正位',
    description: '這張牌處於正位，代表積極的能量。'
  };
}

// 格式化牌意顯示
export function formatCardReading(card, position) {
  const meaning = getCardMeaning(card, card.isReversed);
  return {
    card: {
      name: card.name,
      nameEn: card.nameEn,
      emoji: card.emoji,
      number: card.number,
      suit: card.suit,
      isReversed: card.isReversed,
      color: card.color
    },
    position: position,
    meaning: meaning.meaning,
    description: meaning.description
  };
}

// 獲取所有牌陣類型
export function getAllSpreadTypes() {
  return spreadTypes;
}

// 獲取所有塔羅牌
export function getAllCards() {
  return allTarotCards;
}

// 根據 ID 獲取單張牌
export function getCardById(id) {
  return allTarotCards.find(card => card.id === id);
}

// 隨機抽一張牌
export function drawSingleCard() {
  const card = allTarotCards[Math.floor(Math.random() * allTarotCards.length)];
  return {
    ...card,
    isReversed: Math.random() > 0.5
  };
}
