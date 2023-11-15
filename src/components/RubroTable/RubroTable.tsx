import { useEffect, useState } from "react"
import { Rubro } from "../../types/Rubro";
import { RubroService } from "../../services/RubroService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from '../../types/ModalType';
import RubroModal from "../RubroModal/RubroModal";
import EditButton from "../EditButton/EditButon";
import DeleteButton from "../DeleteButton/DeleteButton";



const RubroTable = () => {
    //var q va a contener los datos recibidos x la API
    const [rubros, setRubros] = useState<Rubro[]>([]);

    //var q muestra el componente Loader hasta q se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //var q va a actualizar los datos de la tabla luego de c/operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //hook q se va a ejecutar c/vez q se renderice el componente
    //o refresData cambie de estado
    useEffect(() => {
        //llamada a la fc para obtener todos los rubros declarados en ProductService
        const fetchRubros = async () => {
            const rubros = await RubroService.getRubros();
            setRubros(rubros);
            setIsLoading(false);
        };

        fetchRubros();
    }, [refreshData]);

    //Test, log modificado parta mostrar datos de manera mas legible
    console.log(JSON.stringify(rubros, null, 2));

    //CONST para inicializar un rubro x defecto y evitar 'undefined'
    //cuando vayamos a crear un rubro nuevo
    const initializeNewRubro = (): Rubro => {
        return {
            id: 0,
            nombre: "",
            estadoRubro: "",
        };
    };

    //Rub seleccionado q se va a pasar como prop al Modal
    const [rubro, setRubro] = useState<Rubro>(initializeNewRubro);

    //const para manejar el estado del modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState("");

    //logica del modal
    const handleClick = (newNombre: string, rub: Rubro, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setRubro(rub);
        setShowModal(true);
    };

    return (
        <>
            <Button onClick={() => handleClick("Nuevo Rubro", initializeNewRubro(),
                ModalType.CREATE)}> Nuevo Rubro </Button>

            {isLoading ? <Loader /> : (
                
                
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rubros.map(rubro => (
                            <tr key={rubro.id}>
                                <td>{rubro.nombre}</td>
                                <td>{rubro.estadoRubro}</td>
                                <td><EditButton onClick={() => handleClick("Editar Rubro", rubro, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Rubro", rubro, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {showModal && (
                <RubroModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    nombre={nombre}
                    modalType={modalType}
                    rub={rubro}
                    refreshData={setRefreshData}
                />
            )}

        </>
    )
}

export default RubroTable
