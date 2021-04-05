import { tsAst } from '../../ts-tag'

tsAst`<FormField label="Field label">
  <TextInput placeholder="type here" />
</FormField>`

tsAst`<FormField label="Field label" component={() => <TextInput placeholder="type here" />}></FormField>`

const placeholder = 'type here'
tsAst`<TextInput
  placeholder="${placeholder}"
  value={value}
  a11yTitle="aaa"
  onChange={event => setValue(event.target.value)}
/>`
