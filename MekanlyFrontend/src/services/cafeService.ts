import { mockCafes } from "../data/mockCafes";
import { Cafe } from "../types/cafe";
// Bu servis, kafe verilerini yönetmek ve sağlamak için basit bir arayüz sunar. 
// Gerçek bir uygulamada, bu servis API çağrıları yaparak sunucudan veri alabilir.
// Şu anda, mock verilerle çalışıyor ve asenkron işlemleri simüle etmek için setTimeout kullanıyor. 

export const cafeService = {
  getAllCafes: async (): Promise<Cafe[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCafes);
      }, 500);
    });
  },

  getCafeById: async (id: string): Promise<Cafe | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCafes.find((cafe) => cafe.id === id));
      }, 300);
    });
  },
};
