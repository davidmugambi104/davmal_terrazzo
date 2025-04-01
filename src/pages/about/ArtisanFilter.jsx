import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  TextField, 
  Slider, 
  InputAdornment,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Stack,
  Typography,
  Fade,
  Collapse,
  IconButton,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ArrowDropDownCircle
} from '@mui/icons-material';

const FilterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(4),
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  '& .MuiFormControl-root': {
    minWidth: 240,
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      marginRight: 0,
    },
  },
}));

const ExperienceSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.light}40`,
    },
    '&.Mui-active': {
      height: 32,
      width: 32,
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: theme.palette.text.secondary,
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      backgroundColor: theme.palette.common.white,
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderTop: `8px solid ${theme.palette.primary.dark}`,
    },
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow']),
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.light,
  },
}));

const ClearChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.error.main,
    transform: 'scale(1.05)',
  },
  '& .MuiChip-deleteIcon': {
    color: theme.palette.error.contrastText,
  },
}));

const experienceMarks = [
  { value: 0, label: '0' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30+' }
];

const ArtisanFilter = ({ filters, regions, craftTypes, onFilterChange }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  const handleSliderChange = (event, newValue) => {
    onFilterChange('experience', newValue);
  };

  const clearFilters = () => {
    onFilterChange('all', null);
    setExpanded(true);
  };

  return (
    <FilterContainer>
      <Box display="flex" alignItems="center" mb={3}>
        <FilterIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h5" component="div">
          Advanced Artisan Filters
        </Typography>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{ ml: 'auto' }}
          aria-label={expanded ? 'Collapse filters' : 'Expand filters'}
        >
          <ArrowDropDownCircle
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: theme.transitions.create('transform'),
            }}
          />
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto">
        <Stack direction="row" flexWrap="wrap" useFlexGap>
          <FormControl variant="outlined">
            <InputLabel shrink>Geographic Region</InputLabel>
            <CustomSelect
              name="region"
              value={filters.region}
              onChange={handleInputChange}
              label="Geographic Region"
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    '& .MuiMenuItem-root': {
                      padding: theme.spacing(1.5),
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value=""><em>All Regions</em></MenuItem>
              {regions.map(region => (
                <MenuItem key={region} value={region}>
                  <Box display="flex" alignItems="center">
                    <span role="img" aria-label={region} style={{ marginRight: 8 }}>
                      {getRegionFlag(region)}
                    </span>
                    {region}
                  </Box>
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel shrink>Craft Specialization</InputLabel>
            <CustomSelect
              name="craftType"
              value={filters.craftType}
              onChange={handleInputChange}
              label="Craft Specialization"
            >
              <MenuItem value=""><em>All Crafts</em></MenuItem>
              {craftTypes.map(craft => (
                <MenuItem key={craft} value={craft}>
                  <Box display="flex" alignItems="center">
                    {getCraftIcon(craft)}
                    <span style={{ marginLeft: 8 }}>{craft}</span>
                  </Box>
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>

          <FormControl variant="outlined" sx={{ width: 360 }}>
            <InputLabel shrink>Years of Experience</InputLabel>
            <ExperienceSlider
              name="experience"
              value={filters.experience || 0}
              onChange={handleSliderChange}
              step={1}
              min={0}
              max={30}
              marks={experienceMarks}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} years`}
              sx={{ mt: 3, px: 2 }}
              components={{
                Thumb: CustomThumb,
              }}
            />
          </FormControl>

          {Object.values(filters).some(Boolean) && (
            <Fade in={Object.values(filters).some(Boolean)}>
              <Box display="flex" alignItems="center" ml={2}>
                <ClearChip 
                  label="Reset Filters" 
                  onClick={clearFilters}
                  deleteIcon={<ClearIcon />}
                  onDelete={clearFilters}
                  variant="outlined"
                />
              </Box>
            </Fade>
          )}
        </Stack>
      </Collapse>
    </FilterContainer>
  );
};

ArtisanFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  regions: PropTypes.array.isRequired,
  craftTypes: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

// Custom slider thumb component
const CustomThumb = (props) => (
  <span {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    </svg>
  </span>
);

// Helper functions for icons (mock implementations)
const getRegionFlag = (region) => '🌍';
const getCraftIcon = (craft) => '🎨';

export default ArtisanFilter;