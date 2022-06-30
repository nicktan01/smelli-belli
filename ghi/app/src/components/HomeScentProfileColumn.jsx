function HomeScentProfileColumn(props) {
  return (
    <div className="col">
      {props.list.map((homeScentProfile) => {
        return (
          <div className="outer-container pt-3">
            <div 
              key={homeScentProfile.id} 
              className="card mb-3 shadow"
              style={{ minWidth: "100px" }}
            >
                <img 
                  src={process.env.PUBLIC_URL + "/images/homeprofilecard.png"}
                  className="card-img-top"
                  style={{ objectFit: "scale-down" }}
                  alt="placeholder for scent profile"
                />
                <div className="card-body">
                  <h5 className="card-title">{homeScentProfile.answer_2} & {homeScentProfile.answer_3}</h5>
                  <h6 className="card-footer text-muted">
                    {homeScentProfile.created} 
                  </h6>
                </div>
            </div>              
          </div>
        )
      })}
    </div>
  );
}

export default HomeScentProfileColumn;