
export default function PageNotFound() {
    return (
       
        <div className="bg-secondary2 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-primary border-4 border-accent2 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-secondary2">404</p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-accent">Page Not Found</p>
                <p className="text-secondary mt-4 pb-4 border-b-2 text-center">Sorry, the page you are looking for could not be found.</p>
                <a href="/Home" className="flex items-center space-x-2 bg-accent2 border border-accent hover:bg-accent text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
                    <svg xmlns="" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                    </svg>
                    <span>Return Home</span>
                </a>
            </div>
        </div>
       
    )
};