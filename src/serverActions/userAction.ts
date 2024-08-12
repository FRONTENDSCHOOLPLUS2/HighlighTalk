// NOTE - 회원가입 serverAction 으로 구현 시에 사용될 ....ㅎ

// 'use server';

// const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// export async function signup(formData: FormData) {
//   const userData = {
//     type: formData.get('type') || 'user',
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//   };

//   const res = await fetch(`${API_SERVER}/users`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'client-id': `${CLIENT_ID}`,
//     },
//     body: JSON.stringify(userData),
//   });

//   const data = await res.json();
//   console.log('🌟userAction data ->', data);
//   return data;
// }
