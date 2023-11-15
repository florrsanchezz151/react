import { Button, Form,  Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Rubro } from "../../types/Rubro";
import * as Yup from "yup";
import {useFormik} from "formik";
import { RubroService } from "../../services/RubroService";
//notif al usuario
import { toast } from 'react-toastify';


type RubroModalProps = {
    show: boolean;
    onHide: () => void;
    nombre:string
    modalType: ModalType;
    rub: Rubro;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const RubroModal = ({ show, onHide, nombre, modalType, rub, refreshData }: RubroModalProps) => {
    //CREATE - UPDATE
    const handleSaveUpdate = async (ru: Rubro) => {
        try {
            const isNew = rub.id === 0;
            if (isNew) {
                await RubroService.createRubro(ru);
            } else {
                await RubroService.updateRubro(ru.id, ru);
            }
            toast.success(isNew ? "Rubro Creado" : "Rubro Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un Error');
        }
    };
    //DELETE
    const handleDelete = async () => {
        try {
            await RubroService.deleteRubro(rub.id);
            toast.success("Rubro borrado", {
                position: "top-center",
            });

            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    }

    
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        nombre: Yup.string().required('El nombre es requerido'),
        estadoRubro: Yup.string().required('El estado es requerido'),
        });
    };
    const formik = useFormik({
        initialValues: rub,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Rubro) => handleSaveUpdate(obj),
    });




    return(
        <>
            {modalType === ModalType.DELETE ? (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro que desea eliminar el Rubro?<br/> <strong>{rub.nombre}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                    Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                    Borrar
                    </Button>
                </Modal.Footer>
            </Modal>

                </>
            ) : (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    <Modal.Header closeButton>
                        <Modal.Title>{nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"Formulario"}
                        <Form onSubmit={formik.handleSubmit}>
                            
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="nombre"
                                        type="text"
                                        value={formik.values.nombre || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formEstado">
                                    <Form.Label>Estado Rubro</Form.Label>
                                    <Form.Control
                                        name="estadoRubro"
                                        type="text"
                                        value={formik.values.estadoRubro || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.estadoRubro && formik.touched.estadoRubro)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.estadoRubro}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            
                                
                            <Modal.Footer className="mt-4">
                                <Button variant="secondary" onClick={onHide}>
                                     Cancelar
                                </Button>

                                <Button variant ="primary" type="submit" disabled={!formik.isValid}>
                                    Guardar
                                </Button>

                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
                </>
            )}
        </>
    )
}

export default RubroModal;
