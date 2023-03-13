import Header from './components/Header';
import AllPosts from './components/AllPosts';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';

const App = () => {
  return (
    <div>
      <Header />
      <AllPosts />
      <SidePanel />
      <PostForm />
    </div>
  );
};

export default App;
