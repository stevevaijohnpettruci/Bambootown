import BackgroundImage from "@/components/ui/background-image";
import { Link } from "@inertiajs/react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <main className="w-full">
      <BackgroundImage src="/Background-1.jpg" alt="Bambootown Background-1">
        <div className="flex flex-col items-center mt-8 text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            LISTEN TO OUR NEW SONG
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-4xl font-extrabold tracking-wide"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            WESTBANK 1987
          </motion.h2>
          <div className="bg-gray-300 mt-5 h-40 w-40">
            <img src="/" alt="NEW RELEASES" />
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <div className=" mt-5 text-white flex gap-5">
              <Link
                href="https://open.spotify.com/intl-id/artist/6tQbT1EZBePLBe1Dxgb2uu"
                className="w-20 h-max hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1134 340"
                  fill="currentColor"
                  className="w-full h-full"
                  role="img"
                  aria-label="Spotify Logo"
                >
                  <title>Spotify</title>
                  <path d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z" />
                </svg>
              </Link>
              <Link href="" className="w-20 h-max hover:text-black ">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 84.3 20.7"
                  className="w-full h-full"
                  fill="currentColor"
                  aria-label="Custom Logo"
                >
                  <path
                    d="M35.4,20.1V6.6h-0.1l-5.4,13.5h-2.1L22.4,6.6h-0.1v13.5h-2.5V1.8H23l5.8,14.6h0.1l5.8-14.6H38v18.3L35.4,20.1L35.4,20.1z
                                            M52.1,20.1h-2.6v-2.3h-0.1c-0.7,1.6-2.1,2.5-4.1,2.5c-2.9,0-4.6-1.9-4.6-5V6.7h2.7v8.1c0,2,1,3.1,2.8,3.1c2,0,3.1-1.4,3.1-3.5V6.7
                                            h2.7L52.1,20.1L52.1,20.1z M59.5,6.5c3.1,0,5,1.7,5.1,4.2h-2.5c-0.2-1.3-1.1-2.1-2.6-2.1C58,8.6,57,9.3,57,10.4c0,0.8,0.6,1.4,2,1.7
                                            l2.1,0.5c2.7,0.6,3.7,1.7,3.7,3.6c0,2.4-2.2,4.1-5.3,4.1c-3.3,0-5.3-1.6-5.5-4.2h2.7c0.2,1.4,1.2,2.1,2.8,2.1c1.6,0,2.6-0.7,2.6-1.8
                                            c0-0.9-0.5-1.4-1.9-1.7l-2.1-0.5c-2.5-0.6-3.7-1.8-3.7-3.8C54.4,8.1,56.4,6.5,59.5,6.5z M66.8,3.2c0-0.9,0.7-1.6,1.6-1.6
                                            c0.9,0,1.6,0.7,1.6,1.6c0,0.9-0.7,1.6-1.6,1.6C67.5,4.8,66.8,4.1,66.8,3.2L66.8,3.2z M67,6.7h2.7v13.4H67V6.7z M81.1,11.3
                                            c-0.3-1.4-1.3-2.6-3.1-2.6c-2.1,0-3.5,1.8-3.5,4.6c0,2.9,1.4,4.6,3.5,4.6c1.7,0,2.7-0.9,3.1-2.5h2.6c-0.3,2.8-2.5,4.8-5.7,4.8
                                            c-3.8,0-6.2-2.6-6.2-6.9c0-4.2,2.4-6.9,6.2-6.9c3.4,0,5.4,2.2,5.7,4.8L81.1,11.3L81.1,11.3z M11.5,3.6C10.8,4.4,9.7,5.1,8.6,5
                                            C8.4,3.8,9,2.6,9.6,1.9c0.7-0.9,1.9-1.5,2.9-1.5C12.6,1.5,12.2,2.7,11.5,3.6L11.5,3.6z M12.5,5.2c0.6,0,2.4,0.2,3.6,2
                                            c-0.1,0.1-2.1,1.3-2.1,3.8c0,3,2.6,4,2.6,4c0,0.1-0.4,1.4-1.3,2.8c-0.8,1.2-1.7,2.4-3,2.4c-1.3,0-1.7-0.8-3.2-0.8
                                            c-1.5,0-2,0.8-3.2,0.8c-1.3,0-2.3-1.3-3.1-2.5c-1.7-2.5-3-7-1.2-10c0.8-1.5,2.4-2.5,4-2.5c1.3,0,2.5,0.9,3.2,0.9
                                            C9.5,6.1,10.9,5.1,12.5,5.2L12.5,5.2z"
                  />
                </svg>
              </Link>
              <Link href="" className="w-20 h-max hover:text-black">
                <svg
                  width="992"
                  height="279"
                  viewBox="0 0 992 279"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  aria-label="Deezer"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M353.119 68.1904H408.081C442.112 68.1904 466.176 90.8303 466.176 123.01C466.176 155.19 442.112 177.83 408.081 177.83H353.119V68.1904ZM395.836 148.213H405.803C416.482 148.213 422.178 141.094 422.178 123.01C422.178 104.927 416.482 97.8074 405.803 97.8074H395.836V148.213ZM562.999 177.83H472.724V68.1904H562.999V97.8074H515.298V110.48H560.151V134.686H515.298V148.213H562.999V177.83ZM663.525 177.83H573.251V68.1904H663.525V97.8074H615.825V110.48H660.678V134.686H615.825V148.213H663.525V177.83ZM991.164 177.83C985.012 161.065 976.408 143.177 964.834 123.126C978.37 119.156 986.465 110.622 986.465 97.5226C986.465 77.5881 968.097 68.1904 939.049 68.1904H879.246V177.83H921.962V132.478C931.453 148.462 938.445 163.546 943.036 177.83H991.164ZM921.962 117.172V97.8074H936.771C943.036 97.8074 946.596 101.225 946.596 107.49C946.596 113.755 943.036 117.172 936.771 117.172H921.962ZM868.994 177.83H778.719V68.1904H868.994V97.8074H821.294V110.48H866.147V134.686H821.294V148.213H868.994V177.83ZM673.779 97.8074H717.855C699.568 112.77 684.518 129.717 672.924 148.213V177.83H769.891V148.213H721.425C732.531 132.055 748.05 115.965 769.891 97.8074V68.1904H673.779V97.8074Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M232.97 42.8737C235.539 27.9837 239.309 18.6204 243.485 18.6026H243.493C251.28 18.6294 257.592 51.1012 257.592 91.1924C257.592 131.284 251.271 163.782 243.476 163.782C240.28 163.782 237.331 158.264 234.957 149.017C231.205 182.867 223.419 206.136 214.405 206.136C207.431 206.136 201.172 192.158 196.97 170.114C194.101 212.038 186.88 241.783 178.44 241.783C173.143 241.783 168.314 229.996 164.739 210.804C160.44 250.421 150.508 278.18 138.926 278.18C127.344 278.18 117.394 250.43 113.113 210.804C109.564 229.996 104.735 241.783 99.4118 241.783C90.9722 241.783 83.7686 212.038 80.8818 170.114C76.6797 192.158 70.4383 206.136 63.4465 206.136C54.442 206.136 46.6469 182.875 42.895 149.017C40.5379 158.291 37.5717 163.782 34.376 163.782C26.5809 163.782 20.26 131.284 20.26 91.1924C20.26 51.1012 26.5809 18.6026 34.376 18.6026C38.5604 18.6026 42.3035 27.9926 44.8989 42.8737C49.0569 17.1985 55.8103 0.510986 63.4465 0.510986C72.5129 0.510986 80.3698 24.1114 84.0864 58.3808C87.7235 33.4389 93.241 17.5383 99.4206 17.5383C108.081 17.5383 115.443 48.8118 118.171 92.4355C123.3 70.0692 130.725 56.0377 138.944 56.0377C147.162 56.0377 154.587 70.0781 159.707 92.4355C162.444 48.8118 169.797 17.5383 178.458 17.5383C184.628 17.5383 190.137 33.4389 193.792 58.3808C197.5 24.1114 205.357 0.510986 214.423 0.510986C222.033 0.510986 228.812 17.2075 232.97 42.8737ZM0.0891113 84.0528C0.0891113 66.1311 3.67328 51.5989 8.0961 51.5989C12.5189 51.5989 16.1031 66.1311 16.1031 84.0528C16.1031 101.974 12.5189 116.507 8.0961 116.507C3.67328 116.507 0.0891113 101.974 0.0891113 84.0528ZM261.743 84.0528C261.743 66.1311 265.327 51.5989 269.75 51.5989C274.172 51.5989 277.757 66.1311 277.757 84.0528C277.757 101.974 274.172 116.507 269.75 116.507C265.327 116.507 261.743 101.974 261.743 84.0528Z"
                  />
                </svg>
              </Link>
              <Link href="" className="w-20 h-max text-white hover:text-black">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 1000 291.379"
                  enableBackground="new 0 0 1000 291.379"
                  xmlSpace="preserve"
                  fill="currentColor"
                >
                  <g>
                    <path
                      d="M177.083,93.525c18.819,13.441,41.864,21.35,66.755,21.35V77.189c-13.894-2.958-26.194-10.215-35.442-20.309
                                                c-15.83-9.873-27.235-26.161-30.579-45.225h-34.896v191.226c-0.079,22.293-18.18,40.344-40.502,40.344
                                                c-13.154,0-24.84-6.267-32.241-15.975c-13.216-6.667-22.279-20.354-22.279-36.16c0-22.355,18.131-40.48,40.501-40.48
                                                c4.286,0,8.417,0.667,12.292,1.896v-38.098c-48.039,0.992-86.674,40.224-86.674,88.474c0,24.086,9.621,45.921,25.236,61.875
                                                c14.087,9.454,31.045,14.968,49.29,14.968c48.899,0,88.54-39.621,88.54-88.496V93.525z"
                    />
                    <path
                      d="M310.062,85.572v31.853h37.311v121.374h37.326V118.285h30.372l10.414-32.712H310.062z M615.544,85.572v31.853h37.311
                                                v121.374h37.326V118.285h30.371l10.413-32.712H615.544z M432.434,103.648c0-9.981,8.146-18.076,18.21-18.076
                                                c10.073,0,18.228,8.095,18.228,18.076c0,9.982-8.15,18.077-18.228,18.077C440.58,121.72,432.434,113.63,432.434,103.648z
                                                M432.434,134.641h36.438v104.158h-36.438V134.641z M484.496,85.572v153.226h36.452v-39.594l11.283-10.339l35.577,50.793h39.05
                                                l-51.207-74.03l45.997-44.768h-44.258l-36.442,36.153V85.572H484.496z M877.623,85.572v153.226h36.457v-39.594l11.278-10.339
                                                l35.587,50.793H1000l-51.207-74.03l45.995-44.768h-44.256l-36.452,36.153V85.572H877.623z"
                    />
                    <path
                      d="M792.578,239.659c34.988,0,63.358-28.136,63.358-62.84c0-34.703-28.37-62.844-63.358-62.844h-0.865
                                                c-34.99,0-63.355,28.14-63.355,62.844s28.365,62.84,63.355,62.84H792.578z M761.336,176.819c0-16.881,13.8-30.555,30.817-30.555
                                                c17.005,0,30.804,13.674,30.804,30.555s-13.799,30.563-30.804,30.563C775.136,207.379,761.336,193.7,761.336,176.819z"
                    />
                  </g>
                </svg>
              </Link>
            </div>
            <div className="mt-5 flex gap-4 ">
              <Link href="" className="w-25 h-max text-white hover:text-black">
                <svg
                  viewBox="0 0 140 65"
                  fill="currentColor"
                  className="-translate-3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M115.42 32.138l-1.728-.691c-.691-.26-1.181-.49-1.382-.749-.259-.26-.375-.49-.375-.922 0-.921.692-1.44 2.103-1.44.806 0 1.613.116 2.362.375.259.057.432.115.489.115.173 0 .317-.115.317-.374v-.605a.95.95 0 0 0-.115-.432c-.058-.115-.173-.173-.375-.26a8.646 8.646 0 0 0-2.793-.49c-1.181 0-2.189.318-2.909.865-.749.547-1.124 1.382-1.124 2.304 0 1.44.807 2.477 2.42 3.11l1.872.692c.634.26 1.008.432 1.238.691.26.26.317.49.317.864 0 .49-.173.922-.547 1.181-.374.26-.922.432-1.613.432-1.066 0-2.045-.115-3.053-.432-.259-.058-.432-.115-.547-.115-.173 0-.259.115-.259.374v.634a.95.95 0 0 0 .115.432c.057.058.173.173.374.26 1.008.431 2.103.633 3.37.633 1.296 0 2.304-.317 3.111-.922.806-.634 1.181-1.44 1.181-2.477 0-.749-.173-1.296-.548-1.814-.403-.49-1.037-.922-1.901-1.239zm-8.208-5.155h-1.296c-.375 0-.49.173-.49.432v8.266c-1.065.691-2.102 1.066-3.168 1.066-.691 0-1.181-.173-1.498-.548-.317-.374-.432-.921-.432-1.728v-7.056c0-.317-.115-.432-.432-.432H98.6c-.317 0-.432.115-.432.432v7.719c0 1.065.26 1.93.807 2.477.547.547 1.382.864 2.419.864 1.44 0 2.851-.49 4.234-1.498l.115.749c0 .173.058.259.173.317.057.057.173.057.374.057h.922c.317 0 .432-.115.432-.432V27.415c0-.317-.115-.432-.432-.432zm-15.064-.317c-1.44 0-2.908.49-4.348 1.555-.49-1.066-1.44-1.555-2.794-1.555s-2.737.49-4.119 1.44l-.115-.691c0-.173-.058-.26-.173-.317-.058-.058-.173-.058-.317-.058h-1.008c-.317 0-.432.116-.432.432v10.311c0 .317.115.432.432.432h1.296c.317 0 .432-.115.432-.432v-8.38c1.066-.635 2.103-1.009 3.226-1.009.634 0 1.066.173 1.296.547.26.375.432.864.432 1.613v7.143c0 .317.115.432.432.432h1.296c.317 0 .432-.115.432-.432v-8.295c1.124-.691 2.19-1.008 3.226-1.008.634 0 1.066.173 1.296.547.26.375.432.864.432 1.613v7.143c0 .317.115.432.432.432h1.296c.317 0 .432-.115.432-.432V29.92c0-1.065-.259-1.872-.806-2.419-.46-.518-1.21-.835-2.276-.835zm35.168 2.794c.547-.634 1.44-.922 2.678-.922.634 0 1.239.058 1.815.26.173.057.259.057.374.057.173 0 .317-.115.317-.432v-.634c0-.173-.058-.374-.115-.432-.058-.057-.173-.173-.317-.26-.806-.172-1.613-.373-2.362-.373-1.728 0-3.053.49-4.032 1.555-.922 1.008-1.44 2.477-1.44 4.349s.432 3.283 1.382 4.291c.922 1.008 2.247 1.498 3.975 1.498.922 0 1.815-.115 2.477-.432.173-.058.317-.115.374-.26.058-.057.058-.258.058-.431v-.634c0-.317-.115-.432-.317-.432-.057 0-.173 0-.317.058-.691.172-1.382.316-1.987.316-1.181 0-2.045-.316-2.621-.921-.547-.634-.806-1.613-.806-2.91v-.316c.028-1.382.288-2.362.864-2.995zm-5.847-2.477h-1.296c-.317 0-.432.115-.432.432v10.31c0 .318.115.433.432.433h1.296c.317 0 .432-.115.432-.432V27.415c0-.26-.144-.432-.432-.432zm.374-4.234c-.259-.26-.633-.375-1.065-.375-.432 0-.749.116-1.008.375-.26.26-.375.547-.375.922 0 .374.115.748.375.921.259.26.547.375 1.008.375.46 0 .748-.116 1.008-.375.259-.26.374-.547.374-.921-.029-.375-.086-.75-.317-.922zM47.967 41.355c-4.32 1.843-9.015 2.707-13.25 2.707-6.307 0-12.413-1.728-17.338-4.58-.432-.259-.749.173-.403.52 4.58 4.118 10.628 6.624 17.338 6.624 4.81 0 10.37-1.498 14.2-4.35.633-.46.086-1.152-.547-.921z" />
                    <path d="M45.547 39.8c-.345.23-.288.547.087.518 1.238-.173 4.003-.49 4.464.144.49.662-.547 3.226-1.008 4.378-.144.345.173.49.49.23 2.073-1.728 2.592-5.328 2.188-5.847-.432-.518-4.003-.979-6.22.577zm-26.411-1.556h2.045c.23 0 .403-.173.403-.345V32.31c0-1.238-.058-2.909 1.411-2.909 1.44 0 1.239 1.728 1.239 2.91v5.558c0 .173.173.345.374.374h2.045c.202 0 .403-.173.403-.374V32.31c0-.605-.028-1.498.173-2.016a1.352 1.352 0 0 1 1.239-.864c.605 0 1.037.202 1.21.893.086.403.057 1.526.057 1.958v5.559c0 .173.173.346.374.374h2.017c.201 0 .403-.172.403-.374v-6.624c0-1.124.144-2.42-.519-3.284-.576-.806-1.497-1.152-2.361-1.152-1.21 0-2.333.634-2.823 1.959-.547-1.325-1.382-1.959-2.65-1.959-1.238 0-2.218.634-2.678 1.959h-.058v-1.383c-.029-.173-.173-.346-.374-.346h-1.901c-.202 0-.404.173-.404.375V37.87a.459.459 0 0 0 .375.374zm21.227-7.114c-1.181.144-2.736.23-3.86.72-1.267.547-2.189 1.67-2.189 3.341 0 2.103 1.354 3.168 3.053 3.168 1.44 0 2.247-.345 3.37-1.497.375.547.519.806 1.181 1.382a.436.436 0 0 0 .49-.057c.403-.346 1.152-1.008 1.613-1.354.172-.115.144-.346 0-.547-.375-.548-.778-.95-.778-1.901v-3.168c0-1.354.086-2.593-.893-3.514-.777-.778-2.074-1.008-3.082-1.008-1.958 0-4.118.72-4.58 3.14-.057.258.145.373.289.402l1.958.202c.173 0 .288-.173.346-.375.173-.835.864-1.238 1.642-1.238.403 0 .892.173 1.123.547.288.403.26 1.008.26 1.498v.26h.057zm-.375 4.263c-.317.576-.835.921-1.41.921-.779 0-1.24-.604-1.24-1.497 0-1.728 1.556-2.074 3.054-2.074v.432c-.03.835-.03 1.498-.404 2.218zm30.703-8.583c-1.411 0-2.218.662-2.794 2.103h-.057V27.3c-.058-.173-.173-.289-.375-.289h-1.9a.431.431 0 0 0-.404.346V37.87c0 .173.173.345.375.374h2.045c.201 0 .403-.173.403-.374v-5.674c0-.72.057-1.354.317-1.988.23-.518.69-.835 1.18-.835 1.412 0 1.268 1.67 1.268 2.823v5.703c.029.172.173.288.374.316h2.045c.202 0 .374-.144.403-.316v-6.596c0-1.008 0-2.448-.547-3.283-.518-.893-1.411-1.21-2.333-1.21zm-17.655 8.583c-1.152-.663-2.535-.835-3.831-.807l3.485-4.954c.317-.46.518-.748.518-.95v-1.267c0-.202-.172-.375-.403-.375h-6.71a.363.363 0 0 0-.375.375v1.497c0 .202.173.375.403.375h3.514l-4.032 5.789c-.26.374-.26.778-.26 1.008v1.527c0 .23.26.46.49.345 2.276-1.238 5.04-1.123 7.085-.029.26.144.49-.115.49-.345v-1.613c-.057-.23-.115-.46-.374-.576zm-35.83.95c-.374-.547-.777-.95-.777-1.9v-3.169c0-1.354.086-2.592-.893-3.514-.778-.777-2.074-1.008-3.082-1.008-1.959 0-4.119.72-4.58 3.14-.057.259.144.374.288.403l1.959.201c.173 0 .288-.172.346-.374.172-.835.864-1.238 1.641-1.238.404 0 .893.172 1.124.547.288.403.259 1.008.259 1.498v.259c-1.181.144-2.736.23-3.86.72-1.238.49-2.131 1.613-2.131 3.283 0 2.103 1.354 3.168 3.053 3.168 1.44 0 2.247-.345 3.37-1.497.374.547.518.806 1.18 1.382a.436.436 0 0 0 .49-.057c.403-.346 1.152-1.008 1.613-1.354.144-.087.144-.317 0-.49zm-4.032-.95c-.317.576-.835.922-1.411.922-.778 0-1.239-.605-1.239-1.498 0-1.728 1.556-2.074 3.053-2.074v.432c-.029.835 0 1.498-.403 2.218zm45.824-8.583c-2.967 0-4.609 2.563-4.58 5.818 0 3.254 1.613 5.847 4.58 5.847 2.88 0 4.694-2.564 4.694-5.76 0-3.313-1.641-5.905-4.694-5.905zm-.03 9.505c-1.612 0-1.583-2.737-1.583-4.004 0-1.267.086-3.34 1.613-3.34.662 0 1.123.287 1.353 1.007.26.835.288 1.901.288 2.794 0 1.325-.086 3.542-1.67 3.542z" />
                  </g>
                </svg>
              </Link>
              <Link
                href=""
                className="w-15 -translate-x-1 h-max text-white hover:text-black"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 1128 384"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g></g>
                  <g>
                    <path
                      opacity="1.00"
                      d=" M 366.39 14.28 C 397.15 9.87 429.12 13.29 458.00 24.91 C 500.36 41.50 535.63 75.07 554.49 116.44 C 570.34 150.74 574.50 190.12 566.94 227.08 C 559.55 262.59 541.07 295.77 514.49 320.48 C 513.28 321.70 511.76 323.00 512.03 324.92 C 511.92 338.14 512.05 351.36 512.00 364.58 C 495.56 361.98 479.31 358.27 462.92 355.41 C 458.94 355.40 455.42 357.74 451.68 358.84 C 424.36 368.58 394.63 371.33 365.96 367.08 C 331.27 362.01 298.25 346.29 272.40 322.63 C 249.26 301.66 231.77 274.51 222.35 244.74 C 210.52 207.53 211.24 166.38 224.74 129.73 C 235.44 100.13 254.25 73.55 278.47 53.48 C 303.43 32.66 334.21 18.92 366.39 14.28 M 449.90 48.98 C 454.34 52.33 459.23 55.02 463.71 58.31 C 478.70 69.05 492.72 81.20 505.30 94.70 C 517.85 108.07 528.85 122.81 539.03 138.04 C 530.44 105.50 509.31 75.66 479.41 59.53 C 470.14 54.68 460.36 50.34 449.90 48.98 M 452.60 70.94 C 456.21 73.89 460.28 76.19 464.03 78.93 C 480.33 90.74 494.87 104.95 507.16 120.88 C 511.29 126.20 514.84 131.93 518.95 137.27 C 514.68 121.20 506.39 106.15 494.83 94.18 C 483.36 82.69 468.73 73.77 452.60 70.94 M 450.92 92.10 C 462.56 100.23 474.08 108.86 483.11 119.94 C 488.56 125.89 493.08 132.58 497.86 139.05 C 495.58 131.34 492.46 123.80 487.85 117.18 C 479.32 104.55 465.97 95.01 450.92 92.10 M 382.45 101.59 C 366.74 103.31 351.46 109.30 338.82 118.81 C 322.64 130.70 310.76 148.30 305.68 167.72 C 300.89 185.69 301.82 205.20 308.51 222.58 C 314.76 239.01 325.95 253.54 340.31 263.69 C 355.50 274.68 374.27 280.50 392.99 280.34 C 412.32 280.28 431.57 273.66 446.85 261.82 C 464.45 248.54 476.63 228.41 480.56 206.74 C 483.71 189.03 481.57 170.34 474.09 153.95 C 465.52 134.82 449.99 118.89 431.07 109.87 C 416.07 102.58 399.01 99.82 382.45 101.59 M 244.07 240.94 C 248.70 266.09 263.69 288.59 283.19 304.79 C 297.82 316.51 314.89 325.41 333.07 330.05 C 324.49 323.97 315.51 318.40 307.44 311.60 C 286.72 295.06 268.24 275.70 252.96 254.02 C 249.89 249.73 247.32 245.10 244.07 240.94 M 266.11 243.69 C 267.99 254.84 273.09 265.23 279.54 274.43 C 292.12 292.10 311.44 304.41 332.25 310.01 C 327.20 305.91 321.58 302.57 316.46 298.55 C 297.86 284.26 281.48 266.96 268.77 247.22 C 267.93 246.00 267.03 244.83 266.11 243.69 M 287.91 243.37 C 289.05 251.15 292.82 258.29 297.37 264.59 C 306.24 276.74 319.73 285.01 334.13 288.91 C 330.03 285.64 325.55 282.87 321.41 279.63 C 312.71 272.72 304.66 264.97 297.73 256.27 C 294.20 252.16 291.62 247.33 287.91 243.37 Z"
                    />
                    <path
                      opacity="1.00"
                      d=" M 634.78 17.55 C 672.47 8.35 713.18 11.54 748.75 27.19 C 781.56 41.44 809.84 65.86 828.77 96.20 C 847.62 126.10 857.13 161.75 855.72 197.06 C 854.69 230.21 844.01 262.96 825.39 290.40 C 804.92 320.81 774.85 344.65 740.53 357.55 C 706.07 370.66 667.48 372.55 631.86 363.09 C 603.09 355.50 576.28 340.56 554.80 319.96 C 575.74 293.55 590.29 262.08 596.35 228.90 C 601.86 239.43 608.66 249.44 617.66 257.31 C 631.79 270.06 650.05 278.26 669.04 279.92 C 683.93 281.36 699.19 279.08 712.91 273.05 C 732.04 264.98 748.04 249.89 757.44 231.40 C 771.59 204.06 770.19 169.36 753.67 143.36 C 743.22 126.54 727.07 113.26 708.41 106.56 C 690.38 99.81 670.16 99.39 651.74 104.82 C 636.55 109.49 622.58 118.14 611.86 129.90 C 605.43 136.42 600.88 144.41 596.34 152.28 C 593.09 135.67 588.17 119.33 580.93 104.01 C 574.10 88.69 564.88 74.61 554.82 61.25 C 577.22 40.22 604.90 24.84 634.78 17.55 Z"
                    />
                    <path
                      opacity="1.00"
                      d=" M 93.01 17.70 C 119.01 17.48 145.00 17.70 171.00 17.59 C 174.57 17.56 178.14 17.61 181.70 17.87 C 181.63 96.59 181.70 175.31 181.67 254.03 C 181.48 278.31 172.64 302.41 157.03 321.01 C 137.41 344.87 106.94 359.54 75.99 359.47 C 52.90 359.40 29.80 359.63 6.71 359.35 C 6.51 329.86 6.55 300.37 6.69 270.89 C 29.49 270.74 52.28 270.91 75.07 270.82 C 84.54 271.03 93.24 262.63 92.98 253.08 C 93.03 174.62 92.97 96.16 93.01 17.70 Z"
                    />
                    <path
                      opacity="1.00"
                      d=" M 833.62 17.81 C 863.05 17.40 892.51 17.64 921.95 17.69 C 938.69 46.75 955.37 75.86 972.03 104.98 C 972.94 106.52 973.91 108.04 974.91 109.55 C 992.48 79.78 1009.35 49.59 1026.65 19.65 C 1027.68 16.99 1030.69 17.70 1032.97 17.57 C 1060.73 17.79 1088.51 17.33 1116.27 17.80 C 1106.30 36.16 1095.54 54.10 1085.27 72.30 C 1063.40 110.62 1041.21 148.78 1019.56 187.20 C 1022.46 194.01 1026.86 200.11 1030.36 206.64 C 1054.37 248.64 1078.49 290.57 1102.52 332.55 C 1109.01 344.14 1115.92 355.48 1122.22 367.17 C 1105.82 367.47 1089.40 367.21 1073.00 367.30 C 1060.05 367.13 1047.07 367.62 1034.15 367.09 C 1030.72 363.59 1029.03 358.75 1026.39 354.66 C 1009.21 324.85 992.35 294.86 974.93 265.20 C 967.73 276.71 961.35 288.72 954.48 300.43 C 944.79 317.41 934.99 334.34 925.29 351.32 C 922.03 356.50 919.64 362.27 915.84 367.08 C 898.25 367.61 880.61 367.14 863.00 367.30 C 851.23 367.20 839.46 367.51 827.70 367.13 C 835.79 351.93 844.75 337.22 853.17 322.20 C 875.31 283.67 897.37 245.10 919.49 206.56 C 922.94 200.03 927.35 193.96 930.18 187.14 C 902.87 138.82 874.99 90.77 847.45 42.56 C 842.89 34.28 837.73 26.32 833.62 17.81 Z"
                    />
                    <path
                      opacity="1.00"
                      d=" M 386.39 168.50 C 392.75 166.71 400.05 167.56 405.37 171.65 C 412.41 176.66 415.77 186.15 413.47 194.47 C 411.21 203.55 402.43 210.54 393.03 210.32 C 384.64 210.67 376.48 205.31 373.16 197.67 C 370.39 191.53 370.72 184.05 374.18 178.25 C 376.87 173.65 381.34 170.15 386.39 168.50 Z"
                    />
                  </g>
                </svg>
              </Link>
              <Link href="" className="w-25 h-max text-white hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50.952113 7.2030219"
                  fill="currentColor"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 0h612v792H0Z" />
                    </clipPath>
                  </defs>
                  <path
                    d="M0 0h-3.669v13.013h-4.745v3.145H4.745v-3.145H0Z"
                    transform="matrix(.35278 0 0 -.35278 18.61153342 6.80236959)"
                  />
                  <path
                    d="M98.25811 184.54008h-1.302103v-5.70018h1.302103Z"
                    transform="translate(-72.79775058 -177.73777041)"
                  />
                  <path
                    d="M0 0h6.383v-3.189H-3.69v16.158H0Z"
                    transform="matrix(.35278 0 0 -.35278 48.43574942 5.67749959)"
                  />
                  <g
                    clip-path="url(#a)"
                    transform="matrix(.35278 0 0 -.35278 -35.67602658 179.85532959)"
                  >
                    <path
                      d="M0 0h5.979c4.411 0 8.8-2.336 8.8-8.035 0-5.372-4.302-8.123-8.582-8.123H0Zm3.581-12.991H5.87c3.079 0 5.131 1.921 5.131 4.978 0 2.904-2.074 4.868-5.044 4.868H3.581Z"
                      transform="translate(185.5858 506.7018)"
                    />
                  </g>
                  <path
                    d="M0 0h4.057L-2.6 16.158h-3.81L-13.131 0h3.947l1.191 3.188h6.813zm-7.004 6.059 2.434 6.319 2.411-6.319z"
                    transform="matrix(.35278 0 0 -.35278 42.23356942 6.80236959)"
                  />
                  <path
                    d="m0 0-4.729-4.73L-9.459 0l4.73 4.728Z"
                    transform="matrix(.35278 0 0 -.35278 6.93839742 1.93272959)"
                  />
                  <path
                    d="m0 0-4.729-4.73L-9.459 0l4.73 4.73Z"
                    transform="matrix(.35278 0 0 -.35278 6.93839742 5.26979959)"
                  />
                  <path
                    d="m0 0-4.73-4.73L-9.459 0l4.729 4.729Z"
                    transform="matrix(.35278 0 0 -.35278 3.60150942 1.93286959)"
                  />
                  <path
                    d="m0 0-4.729-4.73L-9.459 0l4.73 4.729Z"
                    transform="matrix(.35278 0 0 -.35278 10.27511042 1.93286959)"
                  />
                </svg>
              </Link>
              <Link href="" className="w-20 h-max text-white hover:text-black">
                <svg
                  version="1.1"
                  id="svg3336"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 523.3 150"
                  enable-background="new 0 0 523.3 150"
                  fill="currentColor"
                >
                  <g
                    id="g3344"
                    transform="matrix(1.25,0,0,-1.25,-240.25,333.85454)"
                  >
                    <g>
                      <path
                        d="M332.2,193.1c0,3.5,4.3,7.2,4.7,6.8c3-2.7,8.8-5.4,13.7-5.4c4.4,0,6.4,1.3,6.4,3.7c0,2.9-3.6,2.9-8.3,3.9
                                                    c-7.7,1.6-15.5,4.9-15.5,14.5c0,9.6,7,15.5,19.7,15.5c12.1,0,17.4-4.2,17.4-8.9c0-4-4.8-7.5-5.1-7.2c-3.1,2.9-7.9,5-12.2,5
                                                    c-4.1,0-6.2-1.3-6.2-3.6c0-2.7,3.7-2.5,8.6-3.6c9.1-2,16-6,16-14.5c0-10.1-6.9-15.8-20.9-15.8
                                                    C337.1,183.5,332.2,188.2,332.2,193.1"
                      />
                      <path
                        d="M376.2,190.8v33.9c0,4.5,2.1,6.7,6,6.7h2.1c4.1,0,6.3-2.2,6.3-6.7v-10.8h14.8v10.8c0,4.5,2.1,6.7,6,6.7
                                                    h2.1c4.1,0,6.2-2.2,6.2-6.7v-33.9c0-4.4-2.1-6.7-6.2-6.7h-2.1c-3.9,0-6,2.3-6,6.7v11h-14.8v-11c0-4.4-2.1-6.7-6.3-6.7h-2.1
                                                    C378.2,184.1,376.2,186.4,376.2,190.8"
                      />
                      <path
                        d="M470.9,190.2v0.6c0,4.2,1.4,5.7,3.8,8.3l17.6,20.1h-14.5c-4.1,0-6.3,1.5-6.3,5.6v0.6c0,4,2.1,5.6,6.3,5.6
                                                    h25.9c5.2,0,7.3-2.8,7.3-5.6v-0.7c0-4.1-1.5-5.8-3.8-8.2l-17.9-20.1h15.9c4.1,0,6.3-1.6,6.3-5.7v-0.6c0-4-2.1-5.7-6.3-5.7h-26.9
                                                    C473,184.5,470.9,187.4,470.9,190.2"
                      />
                      <path
                        d="M444.5,232.3c-9.3,0-18.1-4.5-18.1-10.4c0-7.3,9-7.1,9-7.1c1,4,4.2,6,8.4,6c6.5,0,8.9-3.2,8.9-7.8h-3.2
                                                    c-18.5,0-25.5-7.4-25.5-15.9c0-8.2,6.8-13.7,15.8-13.7c6.2,0,12.2,2.3,13.4,6.7c0.6-3.4,3.7-6.4,7.9-6.4c3.7,0,5.5,1.3,5.6,1.7
                                                    V214C466.6,225.7,458.8,232.3,444.5,232.3z M452.6,201.8c0-4.9-3.7-8.2-8.5-8.2c-3.5,0-5.7,1.8-5.7,4.7c0,4.7,6.3,6.7,11.1,6.8
                                                    h3.2V201.8z"
                      />
                      <path
                        d="M534.8,232.3c-9.3,0-18.1-4.5-18.1-10.4c0-7.3,9-7.1,9-7.1c1,4,4.2,6,8.4,6c6.5,0,8.9-3.2,8.9-7.8h-3.2
                                                    c-18.5,0-25.5-7.4-25.5-15.9c0-8.2,6.8-13.7,15.8-13.7c6.2,0,12.2,2.3,13.4,6.7c0.6-3.4,3.7-6.4,7.9-6.4c3.7,0,5.5,1.3,5.6,1.7
                                                    V214C556.9,225.7,549.1,232.3,534.8,232.3z M542.9,201.8c0-4.9-3.7-8.2-8.5-8.2c-3.5,0-5.7,1.8-5.7,4.7c0,4.7,6.3,6.7,11.1,6.8
                                                    h3.1V201.8z"
                      />
                      <path
                        d="M562.2,190.8v33.7c0,4.6,2.3,6.9,6.4,6.9h4.1c3.8,0,5.1-0.9,6.4-3.9l7.5-18.6l7.6,18.6
                                                    c1.4,3.2,2.9,3.9,6.1,3.9h4c4.3,0,6.6-2.3,6.6-6.9v-33.7c0-4.4-1.5-6.7-5.6-6.7h-2.3c-3.9,0-5.6,2.3-5.6,6.7v19.9l-4.9-13.7
                                                    c-0.6-1.8-0.7-3.5-6.1-3.5c-5.4,0-5.2,1.7-6,3.5l-4.8,13.1v-19.4c0-4.4-1.4-6.7-5.6-6.7h-2.3C563.8,184.1,562.2,186.4,562.2,190.8
                                                    "
                      />
                    </g>
                    <g>
                      <path
                        fill="currentColor"
                        d="M241.8,184.1c-6.3,0-12.5,2.1-17.4,6.2c-5.9,5.1-9.4,12-9.9,19.5c-0.4,7.3,2,14.3,7,19.8
                                                    c5.6,6.1,15.5,15.7,16,16.1c2.7,2.6,7,2.5,9.6-0.2c2.6-2.7,2.5-7-0.2-9.6c-0.1-0.1-10.1-9.6-15.3-15.4c-2.5-2.7-3.7-6.2-3.5-9.8
                                                    c0.2-3.8,2.1-7.4,5.2-10.1c4.1-3.6,12.2-4.3,17.3,0.2c3,2.7,6.7,6.7,6.7,6.7c2.5,2.8,6.8,2.9,9.6,0.4c2.8-2.5,2.9-6.8,0.4-9.6
                                                    c-0.2-0.2-4.1-4.5-7.7-7.6C254.8,186.3,248.3,184.1,241.8,184.1 M282.8,184.6c-5.6-6.1-15.6-15.7-16-16.1c-1.3-1.2-3-1.9-4.7-1.9
                                                    c-1.8,0-3.6,0.7-4.9,2.1c-2.6,2.7-2.5,7,0.2,9.6c0.1,0.1,10.1,9.6,15.3,15.4c2.5,2.7,3.7,6.2,3.5,9.8c-0.2,3.8-2.1,7.4-5.2,10.1
                                                    c-4.1,3.5-12.2,4.3-17.3-0.2c-3-2.7-6.7-6.7-6.7-6.7c-2.5-2.8-6.8-2.9-9.6-0.4c-2.8,2.5-2.9,6.8-0.4,9.6c0.2,0.2,4.1,4.5,7.7,7.6
                                                    c9.6,8.6,25.5,8.8,35.2,0.4c5.9-5.1,9.4-12,9.9-19.5C290.3,197,287.8,190,282.8,184.6"
                      />
                    </g>
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </main>
  );
}
