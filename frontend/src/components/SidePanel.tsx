import { useUserInfo } from '../hooks/useUserInfo';

const SidePanel = () => {
  const { name } = useUserInfo();

  return (
    <aside>
      {name && <div>Hello, {name}!</div>}
      <div>SidePanel</div>
      <div>SidePanel</div>
      <div>SidePanel</div>
      <div>SidePanel</div>
      <div>SidePanel</div>
    </aside>
  );
};

export default SidePanel;