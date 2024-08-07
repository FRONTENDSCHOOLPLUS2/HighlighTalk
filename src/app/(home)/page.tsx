import Image from 'next/image';
import './home.scss';
function MainPage() {
  return (
    <main className="MainPage">
      <div className="main_service">
        <div className="main_slide">
          <Image width={520} height={400} src="/image/mainslide1.svg" alt="img"></Image>
        </div>
      </div>
    </main>
  );
}
export default MainPage;
