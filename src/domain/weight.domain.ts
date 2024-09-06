export type Weight = number;

/**
 * 1부터 10까지의 랜덤한 가중치를 반환합니다.
 * @returns {Weight} 랜덤한 가중치
 */
export const getRandomWeight = (): Weight => {
  const maxWeight = 10;
  return Math.floor(Math.random() * maxWeight) + 1;
};
