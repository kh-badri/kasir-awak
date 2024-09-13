import { React, Component } from "react";
import { Card, Row, Badge, Col, ListGroup } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constans";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah : menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState(prevState => ({
      jumlah: prevState.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
    }));
  }
  
  kurang = () => {
    if (this.state.jumlah > 1) {
      this.setState(prevState => ({
        jumlah: prevState.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
      }));
    }
  }

  //Edit Pesanan 
  changeHandler = (event) => {
    this.setState ({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    };

    axios
      .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Pesanan Berhasil Diupdate",
          text: " Sukses Update Pesanan " +data.product.nama,
          icon: "success",
          button: false,
          timer: 1800,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }

    // Hapus Pesanan
    hapusPesanan = (id) => {
      this.handleClose();
    
  
      axios
        .delete(API_URL + "keranjangs/"+id)
        .then((res) => {
          this.props.getListKeranjang();
          swal({
            title: "Pesanan Berhasil Dihapus",
            text: " Sukses Update Pesanan " +this.state.keranjangDetail.product.nama,
            icon: "error",
            button: false,
            timer: 1800,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={3}>
                    <h4 > 
                      <Badge className="bg-dark text-white">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang 
            handleClose={this.handleClose}
            {...this.state} 
            tambah={this.tambah} 
            kurang={this.kurang}
            changeHandler={this.changeHandler}
            handleSubmit={this.handleSubmit}
            hapusPesanan={this.hapusPesanan}/>
          </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
