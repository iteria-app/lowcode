export const entityFieldMuiMap = `
(eF) => {
  return {
    field: eF.name,
    flex: 1,
    type: eF.type,
    valueFormatter: getValueFormatterFunction(eF.type),
    renderHeader: (params: GridColumnHeaderParams) => (
      <FormattedMessage id={\`\${eF.name}.\${eF.type}\`} defaultMessage={eF.name} />)
  }
}
`

export const entityFieldGrommetMap = `
(eF) => {
  return {
    property: eF.name,
    header: <FormattedMessage id={\`\${eF.name}.\${eF.type}\`} defaultMessage={eF.name} />,
    render: getValueFormatterFunction(eF.type)
  }
}
`

export const listComponentTemplate = `
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { GridColumnHeaderParams, DataGrid } from '@material-ui/data-grid';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
export default function SmenaTable({ smena }) {
  const intl = useIntl();
  const navigate = useNavigate();
  const entityField = useEntityFields()
  const columns = entityField.map(() => {})

  return (
    <DataGrid
      onRowClick={params =>
        navigate('/app/codegen-smena-detail', { state: params.row })
      }
      columns={columns}
      rows={smena}
      pageSize={10}
      rowsPerPageOptions={[2, 3, 4, 5, 6, 20]}
    />
  );
}

`
