// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// const useConfirmPageLeave = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       event.preventDefault();
//       event.returnValue = ''; // 이 줄은 브라우저 호환성을 위해 필요합니다.
//       return '변경된 내용이 있습니다. 정말로 페이지를 이동하시겠습니까?';
//     };

//     const handleRouteChangeStart = (url: string) => {
//       if (!window.confirm('변경된 내용이 있습니다. 정말로 페이지를 이동하시겠습니까?')) {
//         throw 'routeChange aborted.';
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     router.events.on('routeChangeStart', handleRouteChangeStart);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       router.events.off('routeChangeStart', handleRouteChangeStart);
//     };
//   }, []);
// };

// export default useConfirmPageLeave;
