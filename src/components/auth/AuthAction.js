// const calculateRemainingTime = (expirationTime) => {
//     const currentTime = new Date().getTime();
//     const adjExpirationTime = new Date(expirationTime).getTime();
//     const remainingDuration = adjExpirationTime - currentTime;
//     return remainingDuration;
//   };

export const loginTokenHandler = (expirationTime) => {
    expirationTime = expirationTime * 1000; // JWT exp 값은 초 단위이므로, 밀리초 단위로 변환
    const currentTime = new Date().getTime(); // 현재 시간을 밀리초 단위로 가져옴
    const timeUntilExpiration = expirationTime - currentTime; // 만료까지 남은 시간 계산

    // localStorage.setItem('expirationTime', String(expirationTime));
    // console.log(String(expirationTime));
    // const remainingTime = calculateRemainingTime(expirationTime);
    // console.log(remainingTime);

    return timeUntilExpiration;
  };