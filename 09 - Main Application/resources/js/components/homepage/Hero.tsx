export default function Hero() {
    return (
        <div id="hero" className="relative min-h-90 bg-black bg-[url(/images/hero.jpg)] bg-cover bg-center">
            <div className="absolute z-30 min-h-90 w-full bg-black opacity-60"></div>
            <h1 className="font-poppins absolute bottom-25 left-7 z-40 text-5xl font-extrabold tracking-wider text-white">BooksHacking</h1>
            <h2 className="font-poppins absolute bottom-8 left-7 z-40 text-5xl text-white">
                Become The <span className="text-primary-text">BEAST</span> Version of Yourself
            </h2>
        </div>
    );
}
