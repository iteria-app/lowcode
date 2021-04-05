import { ts } from '../../ts-tag'

ts`<FormField label="Field label">
  <TextInput placeholder="type here" />
</FormField>`

ts`<FormField label="Field label" component={() => <TextInput placeholder="type here" />}></FormField>`

const placeholder = 'type here'
ts`<TextInput
  placeholder="${placeholder}"
  value={value}
  a11yTitle="aaa"
  onChange={event => setValue(event.target.value)}
/>`
