import { useState } from 'react'
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ProductSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const { productStore: { setFilterBy, setFilterValue }} = useStore();


  const filterByOptions = [
    { value: 0, text: 'Nombre' },
    { value: 1, text: 'Descripción' },
    { value: 2, text: 'Categoria' },
  ];

  return (
    <>
      <p className="fs-6">Buscar Por</p>
      <div className="row">
        <div className="col d-flex">
          <select name="sortBy" id="sortBy" className="form-select" onChange={ (e: any) => setFilterBy(parseInt(e.target.value)) }>
            <option value="-1">Seleccionar...</option>
            {filterByOptions.map(option => (
              <option value={ option.value } key={ option.value }>{ option.text }</option>
            ))}
          </select>
          <input type="text" id='searchValue' name='searchValue' className="form-control" placeholder="Buscar..." onChange={val => setSearchValue(val.target.value)} />
          <button type='button' className="btn btn-primary" onClick={() => setFilterValue(searchValue)}>Buscar</button>
        </div>
      </div>
    </>
  )
}

export default observer(ProductSearch);
