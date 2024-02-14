/* eslint-disable no-nested-ternary */
import React from 'react';

import {
  Box,
  Grid,
  Select,
  MenuItem,
  useTheme,
  TextField,
  Typography,
  useMediaQuery,
  FormHelperText,
} from '@mui/material';

import {
  dialCodeMap,
  countryCodeMap,
  dialCodeCountryCodeMap,
  localPhoneNumbersByDialCodeMap,
} from './data/phoneNumber';

const PhoneNumberForm = ({
  inpValue,
  onInpChange,
  dialCode,
  onDialCodeChange,
  countryCode,
  onCountryCodeChange,
  showDialCodeSelector = true,
  utilName,
  errorMessage,
  isValid = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validatePhoneNumberUtilView = utilName === 'isValidPhoneNumber';
  const showHelperMessage = validatePhoneNumberUtilView && inpValue.length > 5;
  const error = showHelperMessage ? !isValid : null;

  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5">Please enter phone number</Typography>
          {showDialCodeSelector ? (
            <FormHelperText>
              One dial code can be applied to multiple regions ex: +1 shared by countries like the
              United States, Canada, Barbados, Bermuda
            </FormHelperText>
          ) : null}
        </Grid>
        <Grid item xs={isMobile ? 12 : 10} marginTop={1}>
          <Box display="flex" alignItems="flex-start">
            {showDialCodeSelector ? (
              <Select
                size="small"
                value={dialCode}
                onChange={(ev) => onDialCodeChange(ev.target.value)}
                sx={{
                  height: '57px',
                  alignItems: 'center',
                  display: 'flex',
                  marginRight: 1,
                  width: '130px',
                  justifyContent: 'center',
                }}
              >
                {Object.entries(dialCodeMap).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textOverflow: 'initial',
                      }}
                    >
                      <div width="30px">+ {code}</div>
                      <img
                        width="40px"
                        style={{
                          marginLeft: 8,
                          marginRight: 8,
                        }}
                        loading="lazy"
                        src={`/i18nify-playground/assets/flags/${dialCodeCountryCodeMap[
                          code
                        ][0].toLocaleLowerCase()}.svg`}
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            ) : null}
            <Box>
              <TextField
                fullWidth
                value={inpValue}
                onChange={(ev) => {
                  onInpChange(ev.target.value);
                }}
                size="large"
                placeholder={localPhoneNumbersByDialCodeMap[dialCode]}
                error={error}
                color={showHelperMessage ? (isValid ? 'success' : 'error') : ''}
              />
              {validatePhoneNumberUtilView ? (
                <Typography
                  marginTop={1}
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{
                    visibility: showHelperMessage ? 'visible' : 'hidden',
                    color: isValid ? 'green' : 'red',
                  }}
                >
                  {errorMessage}
                </Typography>
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={isMobile ? 12 : 10} marginTop={3}>
        <Typography variant="h5">Please select the country</Typography>
        <FormHelperText>
          {utilName} expects the country code as second argument, this is not mandatory. i18nify all
          ways take the dial code as secondary priority
        </FormHelperText>
      </Grid>
      <Grid item xs={isMobile ? 7 : 6} marginTop={1}>
        <Select
          fullWidth
          size="small"
          value={countryCode}
          onChange={(ev) => onCountryCodeChange(ev.target.value)}
        >
          <MenuItem value={'--'}>--</MenuItem>
          {Object.entries(countryCodeMap).map(([code, name]) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};
export default PhoneNumberForm;
