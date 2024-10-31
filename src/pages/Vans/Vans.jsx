import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getVans } from "../../api"

function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [vansList, setVansList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const typeFilter = searchParams.get('type')



    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVansList(data)
            } catch {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    const displayedVans = typeFilter
        ? vansList.filter(van => van.type.toLowerCase() === typeFilter)
        : vansList


    const vanElements = displayedVans.map(van => (

        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{ search: searchParams.toString(), typeFilter: typeFilter }}

                aria-label={`View details for ${van.name}, priced at $${van.price} per day`}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>

    ))

    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">

                <button
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
                    onClick={() => setSearchParams({ type: 'simple' })}
                >
                    Simple
                </button>

                <button
                    className={`van-type luxury ${typeFilter === "simple" ? "selected" : null}`}
                    onClick={() => setSearchParams({ type: 'luxury' })}
                >
                    Luxury
                </button>

                <button
                    className={`van-type rugged ${typeFilter === "simple" ? "selected" : null}`}
                    onClick={() => setSearchParams({ type: 'rugged' })}
                >
                    Rugged
                </button>

                {typeFilter ? <button
                    className="van-type clear-filters"
                    onClick={() => setSearchParams({})}
                >
                    Clear
                </button> : null}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}

export default Vans