import { useDispatch } from 'react-redux';
import { searchKeyword } from "../../redux/contacts/sliceFilter";
import { FilterInput, FilterTitle, FilterBox } from './Filter.styled'


export const Filter = () => {
    const dispatch = useDispatch();    

    const onChange = (evt) => {
        dispatch(searchKeyword(evt.target.value));
    }

    return (
        <FilterBox>
        <FilterTitle>Find contacts by name:</FilterTitle>
        <FilterInput type="text" onChange={onChange} />
        </FilterBox>
    );
}

