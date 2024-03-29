import { createContext, ReactNode, useState } from 'react';

import { PostType } from '../types/post';

interface UserType {
  username: string | null
  __typename: string | null
}

interface LikedPost {
  id: number | null
  content: string | null
  title: string | null
  likes: number | null
  user: UserType | null
  __typename: string | null
}

interface UserContextProps {
  userId: number | null
  setUserId: React.Dispatch<React.SetStateAction<number | null>>
  username: string | null
  setUsername: React.Dispatch<React.SetStateAction<string | null>>
  name: string | null
  setName: React.Dispatch<React.SetStateAction<string | null>>
  resetUserInfo: () => void
  likedPosts: LikedPost[] | null
  setLikedPosts: React.Dispatch<React.SetStateAction<LikedPost[] | []>>
  userPosts: PostType[] | null
  setUserPosts: React.Dispatch<React.SetStateAction<PostType[] | []>>
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
  userPosts: [],
  setUserPosts: () => null,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<LikedPost[] | []>([]);
  const [userPosts, setUserPosts] = useState<PostType[] | []>([]);
  // const likedPosts: LikedPost[] = [];

  const resetUserInfo = () => {
    setUserId(null),
    setUsername(null),
    setName(null);
    setLikedPosts([]);
    setUserPosts([]);
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
    userPosts,
    setUserPosts,
  };

  return (
    <UserContext.Provider value={defaultValues} >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;