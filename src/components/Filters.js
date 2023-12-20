// @ts-check
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControlLabel } from '@mui/material';
import '../styles/Global.scss';
import '../styles/Filters.scss';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { useWindowSize } from '@uidotdev/usehooks';

/**
 * @typedef {import('../interfaces').FiltersProps} FiltersProps
 * @typedef {import('../interfaces').OurSelectProps} OurSelectProps
 * @typedef {import('../interfaces').OurCheckboxProps} OurCheckboxProps
 */

const SELECT_ITEM_HEIGHT = 48;
const SELECT_ITEM_PADDING_TOP = 8;

const selectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: SELECT_ITEM_HEIGHT * 4.5 + SELECT_ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * @type {React.FC<OurSelectProps>}
 * @returns {React.ReactElement}
 */
export const OurSelect = props => {
  const handleChangeSelect = setter => event => {
    const {
      target: { value },
    } = event;
    const items = typeof value === 'string' ? value.split(',') : value;
    setter(items);
  };
  const { width } = useWindowSize();
  const formWidth = width <= 351 ? 175 : width <= 800 ? 250 : 300;
  return (
    <FormControl sx={{ m: 1, width: formWidth }}>
      <InputLabel id={`${props.name.replace(' ', '-')}-multiple-checkbox-label`} className='filterTextColor inputLabel'>
        {props.name} {`${props.selected.length}/${props.choices.length}`}
      </InputLabel>
      <Select
        labelId={`${props.name}-multiple-select-label`}
        id={`${props.name}-multiple-select`}
        multiple
        value={props.selected}
        onChange={handleChangeSelect(props.selectSetter)}
        input={<OutlinedInput label={props.name} />}
        renderValue={selected => selected.join(', ')}
        MenuProps={selectMenuProps}
        className='filterTextColor filterSelect'
      >
        {props.choices.map(choice => (
          <MenuItem key={choice} value={choice}>
            <Checkbox checked={props.selected.indexOf(choice) > -1} />
            <ListItemText primary={choice} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

/**
 * @type {React.FC<OurCheckboxProps>}
 * @returns {React.ReactElement}
 */
export const OurCheckbox = props => {
  return (
    <FormControlLabel
      checked={props.checked}
      onChange={props.onChange}
      className='filterTextColor nonowner'
      control={<Checkbox />}
      label={props.label}
      disabled={props.disabled}
    />
  );
};

/**
 * @type {React.FC<FiltersProps>}
 * @returns {React.ReactElement}
 */
const Filters = ({ filters, matchCount, handleClearFilters, clearFiltersDisabled, show }) => {
  return (
    <div className={show && !show.expanded ? 'displayFlex' : ''}>
      {show && (
        <>
          <div className='filterToggleShow' onClick={() => show.setExpanded(e => !e)}>
            {show.expanded ? <ArrowDropDown className='filterTextColor' /> : <ArrowRight className='filterTextColor' />}
            <div className='filterTextColor'>{show.expanded ? 'Hide' : 'Show'} Filters</div>
          </div>
        </>
      )}
      <div className='displayFlex filtersContainer'>
        {(!show || show?.expanded) && (
          <>
            <div>{filters.map(filter => filter)}</div>
            <Button
              size='small'
              variant='outlined'
              className='filterClearButton marginLeftAuto'
              style={clearFiltersDisabled ? { backgroundColor: 'unset' } : { backgroundColor: '#222' }}
              onClick={handleClearFilters}
              disabled={clearFiltersDisabled}
            >
              Clear Filters
            </Button>
          </>
        )}
      </div>
      {matchCount != null && (
        <div
          className={`filterTextColor matches ${show && !show.expanded ? 'marginLeftAuto filterMatchesRight' : ''}`}
        >{`${matchCount} Match${matchCount > 1 ? 'es' : ''}`}</div>
      )}
    </div>
  );
};

export default Filters;
