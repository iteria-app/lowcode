const identifierPlaceholder = "`${entityName}.${propertyName}`";
const entityNamePlaceholder = "`${entityName}`";
const propertyNamePlaceholder = "`${propertyName}`";
const template = `
import { useIntl } from 'react-intl';
import { TextField, Avatar } from '@material-ui/core';

export const StringInputTemplate = ({ entityName, propertyName, formik }) => {
  const intl = useIntl();

  return (
    <TextField
      fullWidth
      type="input"
      label={intl.formatMessage({ id: ${identifierPlaceholder} })}
      value={formik.values[${propertyNamePlaceholder}]}
      onChange={formik.handleChange}
    />
  );
};

export const DateTimeInputTemplate = ({ entityName, propertyName, formik }) => {
  const intl = useIntl();

  return (
    <TextField
        fullWidth
        type="datetime"
        label={intl.formatMessage({ id: ${identifierPlaceholder} })}
        value={intl.formatDate(formik.values[${propertyNamePlaceholder}])} 
        onChange={formik.handleChange}
        InputLabelProps={{ shrink: true }}
    />
  );
}; 

export const AvatarInputTemplate = ({ entityName, propertyName, formik }) => {
  return <Avatar src={formik.values[${propertyNamePlaceholder}]} />;
}; 
`;
export const inputTemplate = {
    text: template,
    templateExpressionPlaceholders: ['entityName', 'propertyName']
};
