import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  useTheme,
  LinearProgress
} from '@mui/material';
import { 
  PeopleAlt, 
  Public, 
  WorkHistory, 
  EmojiEvents 
} from '@mui/icons-material';

const StatCard = ({ icon, title, value, subtext }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{
            backgroundColor: theme.palette.primary.light,
            borderRadius: '50%',
            p: 1.5,
            mr: 2
          }}>
            {icon}
          </Box>
          <div>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </div>
        </Box>
        {subtext && (
          <Typography variant="caption" color="text.secondary">
            {subtext}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const NetworkStatistics = ({ stats }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard 
            icon={<PeopleAlt fontSize="large" />}
            title="Total Artisans"
            value={stats.totalArtisans.toLocaleString()}
            subtext={`Across ${stats.countries} countries`}
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard 
            icon={<WorkHistory fontSize="large" />}
            title="Avg. Experience"
            value={`${stats.averageExperience.toFixed(1)} years`}
            subtext="Collective craftsmanship"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard 
            icon={<EmojiEvents fontSize="large" />}
            title="Certifications"
            value="1.2k+"
            subtext="Industry recognized"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Distribution
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Textile Arts</Typography>
                <LinearProgress variant="determinate" value={45} sx={{ height: 8 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Metalwork</Typography>
                <LinearProgress variant="determinate" value={28} sx={{ height: 8 }} />
              </Box>
              <Box>
                <Typography variant="body2">Pottery</Typography>
                <LinearProgress variant="determinate" value={17} sx={{ height: 8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

NetworkStatistics.propTypes = {
  stats: PropTypes.shape({
    totalArtisans: PropTypes.number,
    averageExperience: PropTypes.number,
    countries: PropTypes.number
  }).isRequired
};

export default NetworkStatistics;