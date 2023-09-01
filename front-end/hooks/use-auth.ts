// import useSWR from "swr";
// import { PublicConfiguration } from "swr/_internal";

// export function useAuth(options?: Partial<PublicConfiguration>) {
//   const {
//     data: profile,
//     error,
//     mutate,
//   } = useSWR("/users/profile", {
//     dedupingInterval: 60 * 60 * 1000,
//     revalidateOnFocus: false,
//     ...options,
//   });
//   async function Login() {}
//   async function Logout() {}
//   return {
//     profile,
//     error,
//     Login,
//     Logout,
//   };
// }
