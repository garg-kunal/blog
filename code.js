import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from '../../setup';
import { ImagePicker } from 'react-file-picker';
export default class Company extends Component {
 constructor(props) {
 super(props);
 this.state = {
 logo: "",
 messages: [],
 show: false,
 pic: ""
 };
this.handleSubmit = this.handleSubmit.bind(this);
 this.handleClose = this.handleClose.bind(this);
 this.handleShow = this.handleShow.bind(this);
 }
handleClose = () => {
 this.setState({ show: false });
 };
handleShow = () => {
 this.setState({ show: true });
 };
handleSubmit(event) {
 event.preventDefault();
 if (this.state.logo.length === 0) {
 alert("Please Add Image");
 }
 else {
 let form = new FormData();
 form.append("file", this.state.logo);
const headers = {
 headers: {
 'Authorization': "Token " + localStorage.getItem("token"),
 "Content-Type": "multipart/form-data",
 }
 }
 this.setState({
 messages: []
 })
axios.post('/save_details', form, headers)
 .then((res) => {
if (res.data.status === 200)
 this.props.history.push('/save');
 else if (res.data.status !== 201)
 this.state.messages.push(res.data.status_message.message)
 this.setState({
 show: true
 })
})
 .catch((err) => {
 console.log(err)
 })
}
 }
render() {
 return (
 <div className="container-fluid" style={{ padding: "0" }}>
 <div className="container mt-3 mx-auto company-detail-main" >
<form onSubmit={this.handleSubmit}>
 <div className="">
 <div className="row no-gutters">
 <div className="col-md-3 col-lg-3 col-12 ">
 <div className="form-group">
 <img
 src={this.state.logo}
 style={{ height: "140px", width: "150px", border: "1px solid #4A00E0" }}
 className="img-fluid company-logo-main" alt=" logo" />
 <br />
<ImagePicker
 extensions={['jpg', 'jpeg', 'png']}
 dims={{ minWidth: 100, maxWidth: 5000, minHeight: 100, maxHeight: 5000 }}
 onChange={(base64) => { this.setState({ logo: decodeURI(base64) }, () => { console.log("WELoxme" + this.state.logo); }) }}
 onError={errMsg => (alert(errMsg))}
 >
 <button className="btn btns text-center mx-auto">
 + Add Image
 </button>
 </ImagePicker>
 </div>
 </div>
 
 </div>
 
 <center>
 <button
 type="submit"
 style={{
 backgroundColor: "#89EA91",
 color: "white",
 borderRadius: "30px",
 }}
 className="btn btn-lg col-7 mb-3"
 >
 Save Data
 </button>
 </center>
 </div>
 </form>
 <Modal
 show={this.state.show}
 onHide={this.handleClose}
 backdrop="static"
 keyboard={false}
 >
 <Modal.Header closeButton />
 <Modal.Body>
 {this.state.messages}
 </Modal.Body>
 </Modal>
 </div>
 </div>
);
 }
}
