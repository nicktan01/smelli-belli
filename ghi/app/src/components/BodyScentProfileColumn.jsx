function BodyScentProfileColumn(props) {
  return (
    <div className="col">
      {props.list.map((bodyScentProfile) => {
        return (
          <div className="outer-container">
            <div
              key={bodyScentProfile.id}
              className="card mb-3 shadow"
              style={{ minWidth: "100px" }}
            >
                <img
                  src={process.env.PUBLIC_URL + "/images/bodyprofilecard.png"}
                  className="card-img-top"
                  style={{ objectFit: "scale-down" }}
                  alt="placeholder for scent profile"
                />
                <div className="card-body">
                  <h5 className="card-title">{bodyScentProfile.answer_2} & {bodyScentProfile.answer_3}</h5>
                  <h6 className="card-footer text-muted">
                    {bodyScentProfile.created}
                  </h6>
                </div>
            </div>
          </div>  
        )
      })}
    </div>
  );
}

export default BodyScentProfileColumn;