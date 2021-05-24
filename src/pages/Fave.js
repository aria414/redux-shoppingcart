import { connect } from "react-redux";
import OneProduct from "../components/OneProduct";

const Fave = ({ fave }) => {
  console.log(fave);

  return (
    <div className="fave-container">
      <h2>Fave Page</h2>

      <div>
        {fave.map((item) => (
          <OneProduct key={item.id} productData={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fave: state.shop.fave,
  };
};

export default connect(mapStateToProps)(Fave);
