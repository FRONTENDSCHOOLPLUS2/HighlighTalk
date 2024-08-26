interface Product {
  type: string;
  title: string;
  url: string;
  description: string;
  price: string | number;
}

interface TestProduct {
  [key: string]: Product;
}

export const TEST_PRODUCT: TestProduct = {
  freetest: {
    type: 'freetest',
    title: '우리 단톡방 분석 서비스',
    url: '/freetest',
    description: 'GPT-4o-mini 모델을 사용하여\n사용자의 대화 내용을 분석 해주는 서비스입니다.',
    price: 'FREE',
  },

  lovetest: {
    type: 'lovetest',
    title: '우리 연애 이대로 괜찮을까?',
    url: '/lovetest',
    description: '썸,연애,결혼 상대방의 대화 방식에서\n우리의 관계를 알아보세요❤️',
    price: 5,
  },
};
