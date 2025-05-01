import Header from "@/components/header/Header";

export default async function Home() {
  return (
      <>
        <Header/>
        <div className='bg-sky-50 h-full w-full flex items-center justify-center'>
          <h1>Welcome!</h1>
        </div>
      </>
  );
}
