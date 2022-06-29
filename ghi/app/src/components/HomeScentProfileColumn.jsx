function HomeScentProfileColumn(props) {
  return (
    <div className="container">
      {props.list.map((homeScentProfile) => {
        return (
          <div 
            key={homeScentProfile.id} 
            className="card mb-3 shadow"
          >
              <img 
                src={process.env.PUBLIC_URL + "/images/homeprofilecard.png"}
                className="card-img-top"
                alt="placeholder for scent profile"
              />
              <div className="card-body" style={{ height: "110px" }}>
                <h5 className="card-title">{homeScentProfile.answer_2} & {homeScentProfile.answer_3}</h5>
                <h6 className="card-footer text-muted">
                  {homeScentProfile.created} 
                </h6>
              </div>
          </div>              
        )
      })}
    </div>
  );
}

export default HomeScentProfileColumn;