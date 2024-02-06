import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <main className='flex min-h-screen w-full flex-col'>
      <div className='flex w-full text-2xl gap-x-3 justify-end p-24'>
        <Header/>
      </div>
      <div className='flex flex-col w-full align-center justify-center p-24'>
        <div className='flex flex-col justify-center items-center mt-24'>
          <p className='flex text-6xl mb-12 text-center'>City Of Vancouver</p>
          <p className='flex text-xl w-3/5 text-center'>Welcome to Venture! Explore Vancouver's diverse neighborhoods to find the perfect match for your lifestyle.</p>
        </div>
      </div>
      <div className=" flex w-full bg-black text-white">
        <div className='flex w-full text-xs gap-x-3 justify-center h-24 text-white px-24 py-10'>
          <Footer/>
        </div>
      </div>
    </main>
  )
}
