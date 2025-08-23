import MainPage from "@/components/main-page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 lg:h-screen lg:overflow-hidden">
      <p className="py-8 px-5 text-xl">
        Next Js, TailwindCSS and Tanstack Query
      </p>
      <div className="flex flex-col items-center justify-center pb-20 md:px-36">
        <MainPage />
      </div>
    </div>
  );
}
