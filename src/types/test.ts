type ChatThemeType = 'money' | 'health' | 'love' | 'daily';
type LoveEmotionType = 'happy' | 'unrest' | 'trust' | 'love' | 'stress' | 'interested';

export interface LoveTestData {
  relationshipAnalysis: {
    summary: string;
    analysis: {
      names: string;
      compatibilityScore: number;
      reason: string;
      relationshipProbability: {
        becomeCouple: number;
        marriageProbability: number;
      };
      etc: string[];
      betterLover: {
        [key: string]: number;
      };
      personalFactors: {
        [key in ChatThemeType]: number;
      };
    }[];
  };

  interestedAbout: {
    person: string;
    interests: {
      [key in LoveEmotionType]: number;
    };
  }[];
}

type EmotionType = '기쁨' | '슬픔' | '불안' | '놀람' | '분노';

export interface FreeTestData {
  topic: { summary: { title: string; content: string }[] };
  mbti: {
    analysis: {
      names: string;
      value: string;
      reason: string;
      ability: { energy: number; social: number; intelligence: number }[];
      etc: string[];
    }[];
  };
  talkCount: {
    counts: {
      [key: string]: number;
    };
  };
  mostWords: {
    topWords: {
      [key: string]: number;
    };
  };
  peoples: string[];
  talkbangEmotion: {
    [key in EmotionType]: number;
  };
}
