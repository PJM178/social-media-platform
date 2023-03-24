import { createContext, ReactNode, useState } from 'react';

interface LikedPost {
  postId: number | null
  userId: number | null
}

interface UserContextProps {
  userId: number | null,
  setUserId: React.Dispatch<React.SetStateAction<number | null>>,
  username: string | null,
  setUsername: React.Dispatch<React.SetStateAction<string | null>>,
  name: string | null,
  setName: React.Dispatch<React.SetStateAction<string | null>>,
  resetUserInfo: () => void,
  likedPosts: LikedPost[]
  setLikedPosts: React.Dispatch<React.SetStateAction<LikedPost[] | []>>,
}

export const UserContext = createContext<UserContextProps>({
  userId: null,
  setUserId: () => null,
  username: null,
  setUsername: () => null,
  name: null,
  setName: () => null,
  resetUserInfo: () => null,
  likedPosts: [],
  setLikedPosts: () => null,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<LikedPost[] | []>([]);
  // const likedPosts: LikedPost[] = [];

  const resetUserInfo = () => {
    setUserId(null),
    setUsername(null),
    setName(null);
    setLikedPosts([]);
  };

  const defaultValues: UserContextProps = {
    userId,
    setUserId,
    username,
    setUsername,
    name,
    setName,
    resetUserInfo,
    likedPosts,
    setLikedPosts,
  };

  return (
    <UserContext.Provider value={defaultValues} >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;