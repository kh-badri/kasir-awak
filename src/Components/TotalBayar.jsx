import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../utils/constans";

export default class TotalBayar extends Component {
  submitTotalBayar = (TotalBayar) => {
    const pesanan = {
      total_bayar: TotalBayar,
      menus: this.props.keranjangs,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };
  render() {
    const TotalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    // Total Bayar ..
    return (
      <div className="mr-2">
        <Row>
          <Col
            xs={{ span: 6, offset: 7 }}
          >
            <h5>
              Total Harga : {""}
              <br />
              <strong className="float-right">
                Rp. {numberWithCommas(TotalBayar)}
              </strong>
            </h5>
            <Button
              variant="primary"
              block
              className="mb-2  mr-2"
              size="lg"
              onClick={() => this.submitTotalBayar(TotalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <srong> BAYAR </srong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
