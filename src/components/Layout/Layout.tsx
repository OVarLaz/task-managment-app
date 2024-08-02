import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from '../Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpened] = useDisclosure();
  const [desktopOpened] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      withBorder={false}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
