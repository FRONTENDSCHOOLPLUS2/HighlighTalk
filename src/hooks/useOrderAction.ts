import { createOrderData, fetchOrderData } from '@/serverActions/orderAction';

export function useOrderActions() {
  const createOrder = async (userId: string, transactionType: string) => {
    try {
      await createOrderData(userId, transactionType);
      return true;
    } catch (error) {
      console.error('🐛 결제 내역 생성 실패', error);
      throw error;
    }
  };

  const fetchOrder = async () => {
    try {
      await fetchOrderData();
      return true;
    } catch (error) {
      console.error('🐛 결제 내역 불러오기 실패', error);
      throw error;
    }
  };

  return {
    createOrder,
    fetchOrder,
  };
}
