function BodyScentProfileColumn(props) {
  return (
    <div className="col">
      {props.list.map((bodyScentProfile) => {
        return (
          <div 
            key={bodyScentProfile.id} 
            className="card mb-3 shadow"
          >
              <img 
                src="https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg"
                className="card-img-top"
                alt="placeholder for scent profile"
              />
              <div className="card-body">
                <h5 className="card-title">{bodyScentProfile.answer_2} & {bodyScentProfile.answer_3}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {bodyScentProfile.created}
                </h6>
              </div>
          </div>          
        )
      })}
    </div>
  );
}

export default BodyScentProfileColumn;