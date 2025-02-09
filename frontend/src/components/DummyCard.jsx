function DummyCard() {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoe" /></figure>
            <div className="card-body">
                <h2 className="card-title">Running Shoes</h2>
                <p>Designed for performance and durability.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default DummyCard