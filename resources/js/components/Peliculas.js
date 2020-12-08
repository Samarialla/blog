import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap4-modal';
import Nav from './Nav';
class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: null,
            modal: false,
            titulo: '',
            validacion: '',
            edit: false,
            modalDelete: false,
            search: '',
            limit: '',
            offset: '',
            criticas: '',
            id: '',
            comentarios: '',
            etiquetas:''

        };

    }

    //carga  los al renderizar el componente
    async componentDidMount() {
        await this.getdata();
        // await this.getdataPeliculasCometarios();
    }

    //obtenemos los datos de uri
    async getdata() {
        const formData = new FormData()
        formData.append('limit', this.state.limit)
        formData.append('offset', this.state.offset)
        const url = `/api/peliculas?limit=${this.state.limit}&offset=${this.state.offset}`;
        Axios.get(url).then(response => {
            this.setState({ peliculas: response.data })
            //console.log(this.state.peliculas)

        }).catch(error => {
            alert("Error " + error)
        })
    }
    async getdataPeliculasCometarios() {
        const formData = new FormData()
        const url = `/api/comentarios?id=${this.state.id}`;
        Axios.get(url).then(response => {
            //this.setState({ comentarios: response.data.mensaje })
            response.data.map((number) =>
                this.setState({ comentarios: number.mensaje })
            );

        }).catch(error => {
            alert("Error " + error)
        })


    }



    render() {
        const { peliculas } = this.state;
        const { modal } = this.state;
        const { modalDelete } = this.state;

        // para realizar la busqueda
        const onchange = e => {
            this.setState({ search: e.target.value });
        };



        // abre el modal
        const handleOpenModal = (event) => {
            event.preventDefault();
            this.setState({ modal: true });

        }

        //cierra el modal
        const handleCloseModal = event => {
            event.preventDefault();
            // se limpia para state para evitar error al cerrar o abrir el modal
            this.setState(
                {
                    modal: false,
                    validacion: '',
                    edit: false,
                    modalDelete: false,
                    id: ''
                })
        }


        const handleChangeLimit = (event) => {
            this.setState({ limit: event.target.value });
            //console.log(this.state.limit)
             this.getdata();
        }

        /******fin de crear*********/



        return (
            <>
            <Nav></Nav>
                <div className="container">
                    <div className='row'>
                        <h1>Peliculas</h1>
                    </div>
                    <hr />
                    <div className='col-lg-2'>
                        <select name="prov_descr" className="form-control " value={this.state.limit} onChange={handleChangeLimit}>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='50'>50</option>

                        </select>
                    </div>
                    {peliculas && this.renderList()}
                </div>
                <Modal></Modal>
                <Modal visible={modal} onClickBackdrop={handleCloseModal}>
                    <div className="modal-header">
                        <h1>Ver Peliculas</h1>
                    </div>
                    <div className="modal-body">
                        <form className='container'>
                            <div>
                                <label>Titulo * {this.state.id}</label>
                            </div>
                            <div  >
                                <input type='text' className='form-control' value={this.state.titulo}></input>
                                <span className='validacion'>{this.state.validacion}</span>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <label>Etiqueta*</label>
                                </div>
                                <div>
                                    <input type='text' className='form-control' value={this.state.etiquetas} readOnly={true} required></input>
                                    <span className='validacion'>{this.state.validacion}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Comentarios*</label>
                                <textarea rows={3} value={this.state.comentarios == '' ? 'La misma no cuenta con comentarios' : this.state.comentarios} readOnly={true} />
                            </div>
                            <div className='form-group'>
                                <label>Criticas*</label>
                                <textarea rows={3} value={this.state.criticas == '' ? 'La misma no cuenta con criticas' : this.state.criticas} readOnly={true} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary " data-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>

                    </div>
                </Modal>




            </>
        );
    }

    renderList() {
        const { results, current_page, per_page, total, to, from } = this.state.peliculas;


        const editPelicula = (pelicula, index) => {
            this.setState({ modal: true })
            //Modal.setAppElement('body');
            this.setState({
                etiquetas: pelicula.etiquetas,
                titulo: pelicula.titulo,
                // id:index +1
            })
            // console.log(index)
            const url = `/api/comentarios?id=${index + 1}`;
            Axios.get(url).then(response => {
                //this.setState({ comentarios: response.data.mensaje })
                response.data.map((number) =>
                    this.setState({ comentarios: number.mensaje })
                );
            }).catch(error => {
                alert("Error " + error)
            })
            const urls = `/api/criticas?id=${index + 1}`;
            Axios.get(urls).then(response => {
                //this.setState({ comentarios: response.data.mensaje })
                response.data.map((number) =>
                    this.setState({ criticas: number.mensaje })
                );

            }).catch(error => {
                alert("Error " + error)
            })


        }


        const paginacion = (event) => {
            event.preventDefault();
            this.setState({ offset: offset + 1 })

        }

        return (
            <>
                <div className='container'>
                    <table className="table table-bordered order-table ">
                        <thead className='thead-dark'>
                            <tr>
                                <th>#</th>
                                <th>Titulo</th>
                                <th>Etiqueta</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody id="bodytable">
                            {this.state.peliculas.results.map((pel, index) => {

                                return <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td >{pel.titulo}</td>
                                    <td >{pel.etiquetas}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => editPelicula(pel, index, this.setState({ edit: true }))}><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Ver</button>
                                    </td>

                                </tr>

                            })}
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-center'>
                        <ul className=''>
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={this.state.peliculas.count}
                                //itemsCountPerPage={this.state.peliculas.next}
                                totalItemsCount={this.state.peliculas.count}
                                onChange={() => paginacion()}

                            />
                        </ul>
                        <div className='totales_grid'>
                            <p className=''><b>Total de datos mostrado :</b> {this.state.peliculas.count} </p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default Peliculas;

if (document.getElementById('example')) {
    ReactDOM.render(<Peliculas />, document.getElementById('example'));
}
