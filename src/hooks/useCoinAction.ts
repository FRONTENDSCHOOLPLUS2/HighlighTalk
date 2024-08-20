import { updateCoinData } from '@/serverActions/coinAction';

export function useCoinActions() {
  const updateCoin = async (userId: string, newCoin: number) => {
    try {
      await updateCoinData(userId, newCoin);
      return true;
    } catch (error) {
      console.error('🐛 업데이트 실패', error);
      throw error;
    }
  };

  return {
    updateCoin,
  };
}
