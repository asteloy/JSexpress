function CartItem(props) {


    return (
        <div className="m-3 p-2 col-12 card d-flex flex-row gap-3 justify-content-center align-items-center" style={{width: '100%'}}>
            <img src={props.image} width="100px" height="100px" className="" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <div className="row d-flex flex-row ">
                        <select className="mb-3 form-select" aria-label="Default select example" defaultValue={props.count} onChange={event => props.handleItemQuality(event.target.value, props)}>
                            <option selected disabled>Количество</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button className="btn btn-danger" onClick={() => props.removeCartItem(props)}>Удалить</button>
                    </div>
                </div>
                <div className="card-body d-flex justify-content-center align-items-center ">
                    <h5 className="card-title">{+props.count * +props.price} ₽</h5>
                </div>
        </div>
    )
}

export default CartItem;