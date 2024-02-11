import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store"

const ProductSorting = () => {
  const { productStore: { setOrderBy, setDirectOrder }} = useStore();

  const orderByOptions = [
    { value: 0, text: 'Nombre' },
    { value: 1, text: 'Categoria' },
  ];

  const directionOrderOptions = [
    { value: 0, text: 'Ascendiente' },
    { value: 1, text: 'Descendiente' },
  ];

  return (
    <>
      <p className="fs-6">Ordenar Por</p>
      <div className="row">
        <div className="col d-flex">
          <select name="sortBy" id="sortBy" className="form-select" onChange={ (e: any) => setOrderBy(parseInt(e.target.value)) }>
            <option value="-1">Seleccionar...</option>
            {orderByOptions.map(option => (
              <option value={ option.value } key={ option.value }>{ option.text }</option>
            ))}
          </select>
          <select name="sortDirec" id="sortDirec" className="form-select" onChange={ (e: any) => setDirectOrder(parseInt(e.target.value)) }>
            <option value="-1">Seleccionar...</option>
            {directionOrderOptions.map(option => (
              <option value={ option.value } key={ option.value }>{ option.text }</option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default observer(ProductSorting);
