import React, { Component } from "react";
import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Modal,
  Segment,
} from "semantic-ui-react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      dataPost: {
        id: 0,
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
      },
      edit: false,
      open: false,
    };
  }

  handleReload() {
    axios.get(`http://localhost:3004/data-karyawan`).then((res) => {
      this.setState({
        dataApi: res.data,
      });
    });
  }

  handleRemove = (e) => {
    console.log(e.target.value);
    axios
      .delete(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then((res) => {
        this.handleReload();
      });
  };

  inputChange = (e) => {
    let newdataPost = { ...this.state.dataPost };
    if (this.state.edit === false) {
      newdataPost["id"] = new Date().getTime();
    }
    newdataPost[e.target.name] = e.target.value;

    this.setState(
      {
        dataPost: newdataPost,
      },
      () => {
        console.log(this.state.dataPost);
      }
    );
  };

  clearFrom = () => {
    let newdataPost = { ...this.state.dataPost };
    newdataPost["id"] = "";
    newdataPost["jabatan"] = "";
    newdataPost["jenis_kelamin"] = "";
    newdataPost["nama_karyawan"] = "";
    newdataPost["tanggal_lahir"] = "";

    this.setState({ dataPost: newdataPost });
  };

  onSubmitForm = () => {
    if (this.state.edit === false) {
      axios
        .post(`http://localhost:3004/data-karyawan`, this.state.dataPost)
        .then((res) => {
          this.handleReload();
          this.clearFrom();
        });
    }
  };

  saveData = () => {
    axios
      .put(
        `http://localhost:3004/data-karyawan/${this.state.dataPost.id}`,
        this.state.dataPost
      )
      .then((res) => {
        this.handleReload();
        this.clearFrom();
        this.handleClose();
        this.setState({ edit: false });
      });
  };

  getDataId = (e) => {
    axios
      .get(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then((res) => {
        this.setState({
          dataPost: res.data,
          edit: true,
        });
      });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      edit: false,
    });
  };

  componentDidMount() {
    this.handleReload();
  }
  render() {
    return (
      <div>
        <Segment>
          <Header as="h2" textAlign="center">
            Data Karyawan
          </Header>
          <Divider clearing />
          <Grid columns="equal" textAlign="center">
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column>
              <Input
                type="text"
                name="nama_karyawan"
                placeholder="Nama..."
                onChange={this.inputChange}
              ></Input>{" "}
              <Input
                type="text"
                name="jabatan"
                placeholder="Jabatan..."
                onChange={this.inputChange}
              ></Input>{" "}
              <Input
                list="jeniskelamin"
                name="jenis_kelamin"
                placeholder="Jenis Kelamin..."
                onChange={this.inputChange}
              />
              <datalist id="jeniskelamin">
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </datalist>{" "}
              <Input
                type="date"
                name="tanggal_lahir"
                placeholder="Tanggal Lahir..."
                onChange={this.inputChange}
              ></Input>{" "}
              <Button type="submit" primary onClick={this.onSubmitForm}>
                Add Data
              </Button>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </Segment>
        <br />
        <br />
        <Grid columns="equal">
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column>
            <Card.Group>
              {this.state.dataApi.map((dat, index) => {
                return (
                  <Card key={index}>
                    <Card.Content>
                      <Image floated="right">
                        <Icon.Group size="big">
                          <Icon loading size="big" name="circle notch" />
                          <Icon name="user" />
                        </Icon.Group>
                      </Image>
                      <Card.Header>{dat.nama_karyawan}</Card.Header>
                      <Card.Meta>{dat.jabatan}</Card.Meta>
                      <Card.Description>
                        Jenis Kelamin : {dat.jenis_kelamin}
                      </Card.Description>
                      <Card.Description>
                        Tanggal Lahir : {dat.tanggal_lahir}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Modal
                          size="small"
                          dimmer="blurring"
                          closeIcon
                          open={this.state.open}
                          trigger={
                            <Button
                              basic
                              color="green"
                              onClick={this.getDataId}
                              value={dat.id}
                            >
                              Edit
                            </Button>
                          }
                          onClose={this.handleClose}
                          onOpen={this.handleOpen}
                        >
                          <Header icon="edit" content="Edit Data Karyawan" />
                          <Modal.Content>
                            <Image floated="right">
                              <Icon.Group size="massive">
                                <Icon name="user" />
                                <Icon corner="bottom right" name="edit" />
                              </Icon.Group>
                            </Image>
                            <Grid columns="equal">
                              <Grid.Row>
                                <Grid.Column width={4}>
                                  <h4>Nama :</h4>
                                </Grid.Column>
                                <Grid.Column>
                                  <Input
                                    type="text"
                                    name="nama_karyawan"
                                    placeholder="Nama..."
                                    onChange={this.inputChange}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row>
                                <Grid.Column width={4}>
                                  <h4>Jabatan :</h4>
                                </Grid.Column>
                                <Grid.Column>
                                  <Input
                                    type="text"
                                    name="jabatan"
                                    placeholder="Jabatan..."
                                    onChange={this.inputChange}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row>
                                <Grid.Column width={4}>
                                  <h4>Jenis Kelamin :</h4>
                                </Grid.Column>
                                <Grid.Column>
                                  <Input
                                    list="jeniskelamin"
                                    name="jenis_kelamin"
                                    placeholder="Jenis Kelamin..."
                                    onChange={this.inputChange}
                                  />
                                  <datalist id="jeniskelamin">
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                  </datalist>
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row>
                                <Grid.Column width={4}>
                                  <h4>Tanggal Lahir :</h4>
                                </Grid.Column>
                                <Grid.Column>
                                  <Input
                                    type="date"
                                    name="tanggal_lahir"
                                    placeholder="Tanggal Lahir..."
                                    onChange={this.inputChange}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button color="red" onClick={this.handleClose}>
                              <Icon name="remove" />
                            </Button>
                            <Button color="green" onClick={this.saveData}>
                              <Icon name="checkmark" />
                            </Button>
                          </Modal.Actions>
                        </Modal>
                        <Button
                          onClick={this.handleRemove}
                          value={dat.id}
                          basic
                          color="red"
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Content>
                    <hr />
                  </Card>
                );
              })}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
