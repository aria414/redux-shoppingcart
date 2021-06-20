import { connect } from "react-redux";
import OneProduct from "../products/OneProduct";

const Fave = ({ fave }) => {
  return (
    <section>
      <h2 className="headline">Favorites</h2>
      <div className="product-list">
        {fave.map((item) => (
          <OneProduct key={item.id} productData={item} />
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    fave: state.shop.fave,
  };
};

export default connect(mapStateToProps)(Fave);
