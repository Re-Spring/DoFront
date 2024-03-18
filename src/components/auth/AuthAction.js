// const calculateRemainingTime = (expirationTime) => {
//     const currentTime = new Date().getTime();
//     const adjExpirationTime = new Date(expirationTime).getTime();
//     const remainingDuration = adjExpirationTime - currentTime;
//     return remainingDuration;
//   };

// export const loginTokenHandler = (expirationTime, logout) => {
//   let logoutTimer;
//   const expirationTimeMs = expirationTime * 1000; // JWT exp 값은 초 단위이므로, 밀리초 단위로 변환
//   // const currentTime = new Date().getTime(); // 현재 시간을 밀리초 단위로 가져옴
//   const currentTime = Date.now(); // 현재 시간 (밀리초 단위)
//   const timeUntilExpiration = expirationTimeMs - currentTime; // 만료까지 남은 시간 계산
//   console.log("만료시간 확인 : ", timeUntilExpiration);

//   // localStorage.setItem('expirationTime', String(expirationTime));
//   // console.log(String(expirationTime));
//   // const remainingTime = calculateRemainingTime(expirationTime);
//   // console.log(remainingTime);

//   if (timeUntilExpiration > 0) {
//     logoutTimer = setTimeout(logout, timeUntilExpiration);
//   } else {
//     // 이미 만료된 경우 즉시 로그아웃 실행
//     logout();
//   }

//   return timeUntilExpiration;
// };