import Header from '../../components/header'

export default function Home() {
  return (
    <main className='flex min-h-screen w-full flex-col p-24'>
      <div className='flex w-full text-2xl gap-x-3 justify-end'>
        <Header/>
      </div>
      <div className='flex flex-col w-full align-center justify-center'>
        <div className='flex flex-col justify-center items-center mt-24'>
          <p className='flex text-6xl mb-12 text-center'>City Of Vancouver</p>
          <p className='flex text-xl w-3/5 text-center'>Welcome to Venture! Explore Vancouver's diverse neighborhoods to find the perfect match for your lifestyle.</p>
        </div>
      </div>
    </main>
  )
}
