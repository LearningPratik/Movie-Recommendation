import { useId } from "react"

function InputBox( {

    label,
    movie,
    movieOptions = [],
    selectMovie = "",
    movieDisable = false,
    currencyDisable = false, 
    className = ""
} ) {
   
    const movieInputId = useId()

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
        <div className="w-1/2 flex flex-wrap justify-end text-right">
            <p className="text-black/40 mb-2 w-full">Currency Type</p>
            <select
                className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                value = { selectMovie }
                disabled = { movieDisable }
            >

                 {movieOptions.map((movie) => (
                            <option key={movie} value={movie}>
                            {movie}
                            </option>
                        ))}

            </select>
        </div>
    </div>
    )
}

export default InputBox