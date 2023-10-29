import { useEffect, useState } from "react";
import { Products } from "../../types/Products";
import { ProductService } from "../../services/ProductService";
import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import ProductModal from "../ProductModal/ProductModal";
import { EditButton } from "../EditButton/EditButon";
import { DeleteButton } from "../DeleteButton/DeleteButton";
const ProductTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [products, setProducts] = useState<Products[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);



    //Este hook se va a ejecutar cada vez que se renderize el componente
    useEffect(() => {

        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchProducts = async () => {
            const products = await ProductService.getProducts();
            setProducts(products);
            setIsLoading(false);
        };

        fetchProducts();

    }, [refreshData]);

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(products, null, 2));
    //Se inicializa un producto vacio cuando vallamos a crear uno nuevo, para evitar "undefined"
    const initializeNewProduct = (): Products => {
        return {
            id: 0,
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "",
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [product, setProduct] = useState<Products>(initializeNewProduct);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, prod: Products, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setProduct(prod);
        setShowModal(true);
    };
    
    return(
        <>
            <Button onClick={() => handleClick("Nuevo Producto", initializeNewProduct(), ModalType.CREATE)}>
                Nuevo Producto
            </Button>

            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Categoria</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td><img src={product.image} alt={product.title} style={{width: '50px'}} /></td>
                                <td><EditButton onClick={() => handleClick("Editar Producto", product, ModalType.UPDATE)}/></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Producto", product, ModalType.DELETE)}/></td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal &&(
                <ProductModal                 
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                prod={product}
                refreshData={setRefreshData}
                />

            )}
        </>
    )
}

export default ProductTable;
