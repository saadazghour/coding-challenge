const ModalComponent = ({ isOpen, onClose, pokemonData }: any) => {
  if (!isOpen) return null;

  const imageUrl =
    pokemonData?.sprites?.other["official-artwork"].front_default;

  return (
    <div className="fixed inset-0 bg-black z-[999] bg-opacity-50 flex justify-center items-center">
      <div className="max-w-sm p-6 mx-auto bg-white rounded-lg">
        <div className="relative flex flex-col items-center mt-20 mb-6 bg-white rounded-md shadow-sm ">
          <div className="">
            {imageUrl && (
              <div className="relative h-40 mx-auto -mt-20 w-50">
                <img
                  src={imageUrl}
                  className="rounded-full"
                  alt={pokemonData.name}
                  height="200"
                  width="200"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <div className="p-2">
            <h1 className="mt-2 mb-4 text-xl font-semibold leading-none tracking-tighter capitalize text-neutral-600 lg:text-3xl">
              {pokemonData.name}
            </h1>
          </div>
          <hr />

          <div className="flex items-center justify-center ">
            <div className="flex flex-col items-center border-r-2 border-r-gray-200 px-7">
              <p className="text-lg leading-relaxed text-gray-500 capitalize dark:text-white">
                {pokemonData.height}
              </p>
              <p className="mt-2 text-base font-bold leading-relaxed text-gray-700 dark:text-white">
                Height
              </p>
            </div>

            <div className="flex flex-col items-center border-r-2 border-r-gray-200 px-7">
              <p className="text-lg leading-relaxed text-gray-500 capitalize dark:text-white">
                {pokemonData.order}
              </p>
              <p className="mt-2 text-base font-bold leading-relaxed text-gray-700 dark:text-white">
                Order
              </p>
            </div>

            <div className="flex flex-col items-center px-7">
              <p className="text-lg leading-relaxed text-gray-500 capitalize dark:text-white">
                {pokemonData.base_experience}
              </p>
              <p className="mt-2 text-base font-bold leading-relaxed text-gray-700 dark:text-white">
                XP
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
