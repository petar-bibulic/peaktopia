import Nav from '@components/Nav';
import Footer from '@components/Footer';
import MinimalSidebar from '@components/MinimalSidebar';
import LastChapter from '@components/presentation/LastChapter';
import Welcome from '@components/presentation/Welcome';
import HowToUse from '@components/presentation/HowToUse';

export default async function Home() {
  return (
    <MinimalSidebar>
      <Nav />
      <main className="flex flex-col items-center">
        <Welcome />
        <HowToUse />
        <LastChapter />
      </main>
      <Footer />
    </MinimalSidebar>
  );
}
