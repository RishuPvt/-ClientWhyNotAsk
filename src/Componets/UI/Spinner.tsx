export default function Spinner5() {
    return (
      <section className="bg-white py-20 dark:bg-dark flex justify-center items-center min-h-screen opacity-[0.5]">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8">
  
            <div className="inline-flex h-16 items-center justify-center gap-4 rounded-lg border border-stroke bg-transparent px-8 py-4 text-lg font-medium text-dark dark:border-dark-3 dark:text-white shadow-xl transform transition-all duration-300 hover:scale-105 ">
              <span>
                <svg
                  className="animate-spin"
                  width="40"
                  height="40"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <mask id="path-2-inside-1_2527_20940" fill="white">
                    <path d="M18.4736 13.0353C18.9931 13.2214 19.5703 12.9518 19.7037 12.4163C20.0051 11.2058 20.0781 9.94661 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6278 0.597345 12.4247 0.218536 11.186 0.0705813C10.6381 0.0051315 10.1811 0.449069 10.1707 1.00081C10.1602 1.55254 10.6008 2.0019 11.147 2.08101C12.0682 2.21444 12.9618 2.508 13.7863 2.95091C14.9052 3.5519 15.865 4.4106 16.5862 5.45601C17.3075 6.50142 17.7695 7.7035 17.9341 8.96286C18.0554 9.89095 18.0127 10.8305 17.8103 11.7391C17.6904 12.2778 17.9541 12.8492 18.4736 13.0353Z" />
                  </mask>
                  <path
                    d="M18.4736 13.0353C18.9931 13.2214 19.5703 12.9518 19.7037 12.4163C20.0051 11.2058 20.0781 9.94661 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6278 0.597345 12.4247 0.218536 11.186 0.0705813C10.6381 0.0051315 10.1811 0.449069 10.1707 1.00081C10.1602 1.55254 10.6008 2.0019 11.147 2.08101C12.0682 2.21444 12.9618 2.508 13.7863 2.95091C14.9052 3.5519 15.865 4.4106 16.5862 5.45601C17.3075 6.50142 17.7695 7.7035 17.9341 8.96286C18.0554 9.89095 18.0127 10.8305 17.8103 11.7391C17.6904 12.2778 17.9541 12.8492 18.4736 13.0353Z"
                    stroke="#3758F9"
                    strokeWidth="4"
                    mask="url(#path-2-inside-1_2527_20940)"
                  />
                </svg>
              </span>
              Loading...
            </div>
          </div>
        </div>
      </section>
    );
  }
  